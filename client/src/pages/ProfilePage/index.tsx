import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect, useRef, useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from "../../firebase";
import { FormData } from "./Profile.types";
import { 
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
} from "../../redux/user/userSlice";

export default function Profile() {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const { currentUser, loading, error } = useSelector((state: RootState) => state.user);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState<FormData>({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (file){
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file: File) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
        console.error(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            setFormData({ ...formData, avatar: downloadURL});
          })
      }
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value});
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!currentUser) {
        throw new Error('User is not authenticated.');
      }

      dispatch(updateUserStart());

      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(updateUserFailure(data.message));

        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error: unknown) {
      if (error instanceof Error) {
        dispatch(updateUserFailure(error.message));
      } else {
        console.error('Unexpected error:', error);
      }
    }
  }

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());

      const res = await fetch(`/api/user/delete/${currentUser?._id}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));

        return;
      }

      dispatch(deleteUserSuccess(data));
    } catch (error: unknown) {
      if (error instanceof Error) {
        dispatch(deleteUserFailure(error.message));
      } else {
        console.error('Unexpected error:', error);
      }
    }
  }

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();

      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));

        return;
      }

      dispatch(signOutUserSuccess(data));
    } catch (error: unknown) {
      if (error instanceof Error) {
        dispatch(signOutUserFailure(error.message));
      } else {
        console.error('Unexpected error:', error);
      }
    }
  }


  return (
   <div className="p-3 max-w-lg mx-auto">
    <h1 className="text-3xl font-semibold text-center my-7">
      Profile
    </h1>
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input 
        type="file" 
        ref={fileRef} 
        accept="image/*"
        onChange={(e) => {
          const selectedFile = e.target.files?.[0];
          if (selectedFile) {
            setFile(selectedFile);
          }
        }}
        hidden />
      <img 
        src={formData.avatar ||currentUser?.avatar} 
        alt=""
        className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2 hover:brightness-95"
        onClick={() => (fileRef.current as HTMLInputElement | null)?.click()}
      />
      <p className="text-sm self-center">
        {
          fileUploadError ? (
            <span className="text-red-700">
              Image Upload Error (image must be less than 2mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-700">
              {`Uploading ${filePerc}%`}
            </span>
          ) : filePerc === 100 ? (
            <span className="text-green-700">
              Successfully Uploaded!
            </span>
          ) : null
        }
      </p>
      <input
        id="username"
        type="text"
        placeholder="username"
        defaultValue={currentUser?.username}
        className="border p-3 rounded-lg"
        onChange={handleChange}
      />
      <input
        id="email"
        type="email"
        placeholder="email"
        defaultValue={currentUser?.email}
        className="border p-3 rounded-lg"
        onChange={handleChange}
      />
      <input
        id="password"
        type="password"
        placeholder="password"
        className="border p-3 rounded-lg"
        onChange={handleChange}
      />
      <button 
        className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
        disabled={loading}
      >
        { loading ? 'Loading...' : 'Update' }
      </button>
    </form>
    <div className="flex justify-between mt-5">
      <span 
        className="text-red-700 cursor-pointer hover:underline"
        onClick={handleDeleteUser}>
        Delete account
      </span>
      <span 
        className="text-red-700 cursor-pointer hover:underline"
        onClick={handleSignOut}>
        Sign out
      </span>
    </div>
    <p className="text-red-700 mt-5">{ error ? error : '' }</p>
    <p className="text-green-700 mt-5">{ updateSuccess ? 'User updated successfully!' : '' }</p>
   </div>
  )
}
