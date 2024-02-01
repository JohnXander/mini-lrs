import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { fetchUsersFailure, fetchUsersStart, fetchUsersSuccess } from "../../redux/user/userSlice";
import { User } from "./Learners.types";
import { LearnerModal } from "./components/LearnerModal";
import { formatDistanceToNow } from 'date-fns';
import { MAX_LEARNERS } from "./constants/learnerConstants";

export default function Learners() {
  const { allUsers, loading, error } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUsers();
  }, [dispatch]);

  const handleUsersOverload = async () => {
    if (allUsers.length > MAX_LEARNERS) {
      const oldestHalfOfUsers = Math.floor(allUsers.length / 2);
      const userIdsToDelete = allUsers
        .slice(0, oldestHalfOfUsers)
        .map((user) => user._id);
      
      console.log(userIdsToDelete)

      try {
        const res = await fetch('/api/user/delete', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userIds: userIdsToDelete }),
        });

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        await fetchUsers();
      } catch (error) {
        console.error('Error deleting statements:', error);
      }
    }
  };

  const fetchUsers = async () => {
    try {
      handleUsersOverload();
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
      {!loading && !error && allUsers && (
        <ul className='flex flex-col gap-1'>
          {allUsers.slice().reverse().map((user, index) => (
            <li 
              className='flex justify-between items-center gap-2 border border-slate-200 p-2 hover:cursor-pointer hover:bg-slate-200 flex-wrap' 
              key={index}
              onClick={() => {
                setSelectedUser(user);
                setIsModalOpen(true);
              }}>
              <div className='flex items-center gap-3'>
                <img 
                  src={user.avatar} 
                  className='w-8 h-8 rounded-full object-cover'
                />
                <p 
                  className='text-slate-700 max-w-[200px] overflow-hidden overflow-ellipsis whitespace-nowrap'
                  title={user._id}>
                  {user.username}
                </p>
              </div>
              <p 
                className='text-gray-500'
                title={new Date(user.createdAt).toLocaleString()}>
                {`joined ${formatDistanceToNow(new Date(user.createdAt), { addSuffix: true })}`}
              </p>
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
