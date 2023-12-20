import { NavLink } from "react-router-dom";
import { RiPlantLine } from "react-icons/ri";

const Navbar = () => {
  return (
    <>
      <nav className='bg-secondary rounded h-8 w-full flex items-center justify-center lg:w-3/5 lg:rounded-none lg:h-12 lg:justify-start lg:bg-transparent'>
        <ul>
          <li className='flex items-center lg:flex-row-reverse'>
            <NavLink to="/">
                <h1 className='font-bold text-lg mr-1 lg:text-3xl lg:mr-2'>Smartgrow</h1>
            </NavLink>
            <RiPlantLine className="w-6 h-6 text-green-900 lg:w-11 lg:h-11" />
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar
