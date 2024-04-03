import Link from 'next/link';
import HeaderDropdown from './HeaderDropdown.js'
import { useUser } from '@supabase/auth-helpers-react'

const Header = () => {
  const user = useUser();
  return (
    <header className="bg-gray-900 text-white py-4 px-8 mb-4">
      <div>
        <div className="hidden sm:flex justify-between">
          <div className="space-y-2">
            <Link href="/">
              <p className="text-l font-bold text-xl hover:text-blue-500">Home</p>
            </Link>
            <Link href="/profile">
              <p className="text-l font-bold text-xl hover:text-blue-500">Profile</p>
            </Link>
          </div>
          <h1 className="text-2xl font-bold w-full text-center">Dungeon Master ToolBox</h1>
          <div className="space-y-2">
            <Link href={user ? "/logout" : "/login"}>
              <p className="text-center font-bold text-xl hover:text-blue-500">{user ? "Logout" : "Login"}</p>
            </Link>
            <HeaderDropdown />
          </div>
        </div>
        <div className="sm:hidden grid grid-col-1 text-center space-y-4">
          <h1 className="text-4xl font-bold">Dungeon Master ToolBox</h1>
          <div className="flex justify-between">
            <div className="space-y-3">
              <Link href="/">
                <p className="w-full sm:w-1/4 text-l font-bold text-xl hover:text-blue-500">Home</p>
              </Link>
              <Link href="/profile">
                <p className="text-l font-bold text-xl hover:text-blue-500">Profile</p>
              </Link>
            </div>
            <div className="space-y-2">
              <Link href={user ? "/logout" : "/login"}>
                <p className="text-l font-bold text-xl hover:text-blue-500">{user ? "Logout" : "Login"}</p>
              </Link>
              <HeaderDropdown />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;