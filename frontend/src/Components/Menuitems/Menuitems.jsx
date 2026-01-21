import { useState } from "react";
import Dropdown from "../Dropdown/Dropdown";

const MenuItems = ({ items, depthLevel }) => {
 const [dropdown, setDropdown] = useState(false);

 const handleClick = () => {
 setDropdown((prev) => !prev);
 };

 return (
 <li className="relative list-none">
 {items.submenu ? (
 <>
 <button
 type="button"
 aria-expanded={dropdown ? "true" : "false"}
 aria-haspopup="true"
 onClick={handleClick}
 className="flex items-center justify-between w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-200 transition"
 >
 {items.title}
 <span className="ml-2">{depthLevel > 0 ? "»" : "▾"}</span>
 </button>
 {/* Dropdown submenu */}
 <Dropdown
 submenus={items.submenu}
 dropdown={dropdown}
 depthLevel={depthLevel}
 />
 </>
 ) : (
 <a
 href={items.url}
 className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition"
 >
 {items.title}
 </a>
 )}
 </li>
 );
};

export default MenuItems;
