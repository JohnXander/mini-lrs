import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

export default function Header() {
  const { currentUser } = useSelector((state: RootState) => state.user);

  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to='/' >
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">Mini</span>
            <span className="text-slate-700">LRS</span>
          </h1>
        </Link>
        <form className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input 
            type="text" 
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <FaSearch classname="text-slate-600" />
        </form>
        <ul className='flex gap-4'>
          <Link to='/' >
            <li className='hidden sm:inline text-slate-700 hover:underline cursor-pointer'>
              Home
            </li>
          </Link>
          <Link to='/about' >
            <li className='hidden sm:inline text-slate-700 hover:underline cursor-pointer'>
              About
            </li>
          </Link>
          <Link to='/profile' >
            {
              currentUser ? (
                <img 
                  src={currentUser.avatar} 
                  alt="profile"
                  className='rounded-full h-7 w-7 object-cover'
                />
              ) : (
                <li className='hidden sm:inline text-slate-700 hover:underline cursor-pointer'>
                  Sign In
                </li>
              )
            }
          </Link>
        </ul>
      </div>
    </header>
  )
}
