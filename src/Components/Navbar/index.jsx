import { NavLink } from "react-router-dom";
import { RiPlantLine } from "react-icons/ri";

const Navbar = () => {
  return (
    <>
      <nav className="bg-tertiary rounded-md mb-4 h-8 w-full flex items-center justify-center">
        <ul>
          <li>
            <NavLink to="/">
              <h1 className="font-bold text-lg text-primary">Smartgrow</h1>
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
