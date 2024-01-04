import { NavLink } from "react-router-dom";

import { HiCheck } from "react-icons/hi2";
import { HiMiniXMark } from "react-icons/hi2";

const NavBarDesktop = () => {
  const activeStyle = "underline underline-offset-2";
  return (
    <>
      <nav className="hidden lg:flex w-full h-14 px-6 justify-between">
        <ul className="flex items-center gap-4">
          <li>
            <NavLink to="/">
              <h1 className="font-bold text-primary text-2xl">Smartgrow</h1>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              <h2 className="font-medium text-primary text-xl">Cultivo</h2>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/hidroponico"
              className={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              <h2 className="font-medium text-primary text-xl">Hidroponico</h2>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/sistema"
              className={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              <h2 className="font-medium text-primary text-xl">Sistema</h2>
            </NavLink>
          </li>
        </ul>
        <div className="text-xl flex items-center gap-6">
          <div className="flex items-center gap-2">
            <HiCheck className="h-6 w-6 text-secondary" />
            <p className="text-primary">Entrada de agua</p>
          </div>
          <div className="flex items-center gap-2">
            <HiCheck className="h-6 w-6 text-secondary" />
            <p className="text-primary">Salida de agua</p>
          </div>
          <div className="flex items-center gap-2">
            <HiMiniXMark className="h-6 w-6 text-quartiary" />
            <p className="text-primary">Recirculacion</p>
          </div>
          <div className="flex items-center gap-2">
            <HiMiniXMark className="h-6 w-6 text-quartiary" />
            <p className="text-primary">MQTT</p>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBarDesktop;
