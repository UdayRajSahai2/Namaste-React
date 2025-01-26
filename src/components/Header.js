import { LOGO_URL } from "../utils/constants";
import { useState } from "react";
import { Link } from "react-router";
import useOnlineStatus from "../utils/useOnlineStatus";

const Header = () => {
  const [btnName, setBtnName] = useState("Login");
  const onlineStatus = useOnlineStatus();
  return (
    <div className= "flex justify-between">
      <div className="logo-container">
        <img className="logo w-48" src={LOGO_URL} />
      </div>
      <div className="flex items-center">
        <ul className="flex p-8 m-12">
          <li className="px-4">
            Online Status : {onlineStatus ? "✅" : "🔴"}
          </li>
          <li className="px-4">
            <Link to="/"> Home </Link>
          </li>
          <li className="px-4">
            <Link to="/about">About Us </Link>
          </li>
          <li className="px-4">
            <Link to="/contact">Contact Us</Link>
          </li>
          <li className="px-4">
            <Link to="/grocery">Grocery</Link>
          </li>
          <li className="px-4">🛒</li>
          <button 
            onClick={() => {
              btnName === "Login" ? setBtnName("Logout") : setBtnName("Login");
            }}
            className="login"
          >
            {btnName}
          </button>
        </ul>
      </div>
    </div>
  );
};
export default Header;
