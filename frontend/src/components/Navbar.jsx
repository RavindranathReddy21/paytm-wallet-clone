import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from "../context";
export function Navbar(props) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const {login, setLogin} = useLogin();
    const nav = useNavigate();
    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const clickHandler = () => {
        localStorage.removeItem("token");
        setLogin(0);
        console.log(login);
        nav("/signin");
    };

    return (
        <div className="flex items-center justify-between bg-stone-50 border-b-2 border-stone-200 h-[100px] text-stone-950">
            <div className="text-4xl font-bold ml-4 cursor-pointer">
                Paytm App
            </div>

            <div className="flex justify-between items-center">
                <div className="text-xl mr-8 font-medium">
                    Hello, {props.firstname}
                </div>
                <button id="dropdownHoverButton" className="flex items-center justify-center rounded-full mr-16 bg-stone-200 h-[50px] w-[50px] font-medium cursor-pointer text-lg" onMouseEnter={handleDropdownToggle}>
                    {props.firstname[0] + props.lastname[0]}
                </button>

                {isDropdownOpen && (
                    <div
                        id="dropdownHover"
                        className="z-10 bg-normal divide-y divide-gray-100 rounded-lg shadow w-44 absolute top-12 right-4 mt-[30px] drop-shadow-2xl"
                        onMouseLeave={handleDropdownToggle} >
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownHoverButton">
                            <li className="flex justify-center items-center">
                                <button className="transition-all flex justify-center items-center bg-red-600 w-[130px] h-[30px] rounded-md text-lg hover:bg-red-500" onClick={clickHandler}>
                                    Sign Out <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                                    </svg>

                                </button>
                            </li>
                        </ul>
                    </div>
                )}
            </div>

        </div>
    );
}
