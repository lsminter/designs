import { useState } from "react";
import Link from 'next/link';

export default function NavDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Pricing", link: "/pricing" },
    { name: "NPC Generator", link: "/npc-generator" },
    { name: "PC Generator", link: "/pc-generator" },
    { name: "Encounter Generator", link: "/encounter-generator" },
    { name: "Loot Generator", link: "/loot-generator" },
  ];

  return (
    <div className="relative inline-block">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-28 px-4 py-2 text-xl font-medium text-white bg-[#120002] rounded-md"
          id="options-menu"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={() => setIsOpen(!isOpen)}
        >
          Menu
          <svg
            className="place-self-center h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      <div
        className={`${
          isOpen ? "block" : "hidden"
        } z-10 mx-2 origin-top-right absolute right-0 mt-2 w-44 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        <div className="py-1 text-center text-sm font-medium bg-site-background rounded-md">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={item.link}
              className="block px-4 py-2 text-sm text-defaultText hover:bg-gray-400 hover:text-gray-900 hover:rounded-md"
              role="menuitem"
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}