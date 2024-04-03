import Link from 'next/link';
import { useUser } from '@supabase/auth-helpers-react'
import NavDropdown from './NavDropdown.js'
import Image from 'next/image'

const NavBar = () => {
  const user = useUser();
  return (
    <header className="bg-[#120002] w-full h-[144px] sm:h-[72px]">
      <div className="flex justify-between">
        <div className="block sm:flex align-middle">
          <Link href="/">
            <div className="flex hover:cursor-pointer">
              <div className="relative ml-4 mt-1 h-[70px] w-[70px] place-self-center">
                <Image 
                  alt="dmt logo" 
                  src="/images/logos/white-logo.svg"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <h3 className="place-self-center w-32 ml-4 text-lg text-white font-[dmt]">
                Dungeon Master Toolbox
              </h3>
            </div>
          </Link>
        </div>
        <div className="flex flex-col-reverse place-self-center mr-4 sm:flex-row">
          <NavDropdown />
          <Link href="/profile">
            <p className="text-center text-xl mb-4 sm:mb-0 text-white hover:text-[#00554B] sm:place-self-center">Profile</p>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default NavBar;