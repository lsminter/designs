import { useState } from 'react';
import Link from 'next/link';
import { HiOutlineChevronDown } from 'react-icons/hi';

const HeaderDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="group relative dropdown  px-4 text-purple-500 hover:text-purple-700 cursor-pointer font-bold text-base uppercase tracking-wide">
      <div>
        <button
          type="button"
          onMouseOver={toggle}
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <span>Tools</span>
          <HiOutlineChevronDown className="-mr-1 ml-2 h-5 w-5" />
        </button>
      </div>
      <div
        className={`${
          isOpen ? 'block' : 'hidden'
        } group-hover:block dropdown-menu hidden h-auto`}
      >
        <div className="top-9 w-auto bg-white shadow absolute px-3 py-4 rounded-md z-10" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
          <Link href="/pc-generator">
            <p
              className="block px-4 py-2 text-xs rounded-md text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Character Generator
            </p>
          </Link>
          <Link href="/npc-generator">
            <p
              className="block px-4 py-2 text-xs rounded-md text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              NPC Generator
            </p>
          </Link>
          <Link href="/loot-generator">
            <p
              className="block px-4 py-2 text-xs rounded-md text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Loot Generator
            </p>
          </Link>
          <Link href="/encounter-generator">
            <p
              className="block px-4 py-2 text-xs rounded-md text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Random Encounter
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeaderDropdown;
