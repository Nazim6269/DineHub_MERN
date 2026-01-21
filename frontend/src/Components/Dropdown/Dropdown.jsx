import MenuItems from "../Menuitems/Menuitems";

const Dropdown = ({ submenus, dropdown, depthLevel }) => {
 depthLevel = depthLevel + 1;

 // Tailwind classes for dropdown
 const baseDropdownClass =
 "absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md transition-all duration-200 opacity-0 pointer-events-none";
 const showDropdownClass = "opacity-100 pointer-events-auto";

 // Nested submenu adjustments
 const nestedDropdownClass =
 "absolute left-full top-0 mt-0 ml-1 w-48 bg-white shadow-lg rounded-md";

 const dropdownClass =
 depthLevel > 1
 ? nestedDropdownClass
 : `${baseDropdownClass} ${dropdown ? showDropdownClass : ""}`;

 return (
 <ul className={dropdownClass}>
 {submenus.map((submenu, index) => (
 <MenuItems items={submenu} key={index} depthLevel={depthLevel} />
 ))}
 </ul>
 );
};

export default Dropdown;
