import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { fetchUsersFailure, fetchUsersStart, fetchUsersSuccess } from "../../redux/user/userSlice";
import { User } from "./Learners.types";
import { LearnerModal } from "./components/LearnerModal";

export default function Learners() {
  const { allUsers, loading, error } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUsers();
  }, [dispatch]);

  const fetchUsers = async () => {
    try {
      dispatch(fetchUsersStart());

      const res = await fetch('/api/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      dispatch(fetchUsersSuccess(data));
    } catch (error: unknown) {
      if (error instanceof Error) {
        dispatch(fetchUsersFailure(error.message));
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };

  return (
    <div className="p-3 max-w-6xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Learners
      </h1>
      {loading && <p>Loading learners...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <ul className='flex flex-col gap-1'>
          {allUsers.map((user, index) => (
            <li 
              className='flex justify-between gap-2 border border-slate-200 p-2 hover:cursor-pointer hover:bg-slate-200' 
              key={index}
              onClick={() => {
                setSelectedUser(user);
                setIsModalOpen(true);
              }}>
              {user.username}
            </li>
          ))}
        </ul>
      )}
      {isModalOpen && selectedUser && (
        <LearnerModal
          learner={selectedUser}
          onRequestClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  )
}
