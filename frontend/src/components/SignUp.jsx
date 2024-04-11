import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useState } from "react";
import { useLogin } from "../context";
import Swal from 'sweetalert2';
export function SignUp() {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const nav = useNavigate();
    const {login, setLogin} = useLogin();
    function clickHandler(){
        nav("/signin");
    }
    
    function firstnameHandler(e){
        setFirstname(e.target.value);
    }

    function lastnameHandler(e){
        setLastname(e.target.value);
    }

    function emailHandler(e){
        setEmail(e.target.value);
    }

    function passHandler(e){
        setPass(e.target.value);
    }

    const submitHandler = async (event) => {
        event.preventDefault();

        try{
            const res = await axios({
                url: "http://localhost:3000/api/v1/user/signup",
                method: "post",
                data:{
                    username: email,
                    firstName: firstname,
                    lastName: lastname,
                    password: pass
                }
            })
    
            const jwtToken = res.data.token;
            localStorage.setItem("token", jwtToken);
            setLogin(1);
            Swal.fire({
                title: "Account created successfully, redirecting to dashboard...",
                icon: "success",
                timer: 2000,
                timerProgressBar: true
            })
            setTimeout(() => nav("/dashboard"), 2000);
        }

        catch{
            Swal.fire({
                title: "Couldn't create account, Try again...",
                icon: "error",
                timer: 2000,
                timerProgressBar: true
            })
        }
        
    }

    return (
        <div className="pb-16 flex justify-around items-center bg-stone-400 h-screen text-slate-950">
            <div className="flex flex-col justify-between bg-stone-50 rounded-md p-6">
                <div className="text-4xl font-bold text-center">
                    Sign Up
                </div>
                <div className="p-4 text-xl w-[90%] text-center text-gray-400 font-medium">
                    Enter your information to create an account
                </div>
                <form className="p-4 flex flex-col justify-between" onSubmit={submitHandler}>
                    <label className="block text-xl font-medium mb-2" for="username">
                        First Name
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-8" type="text" placeholder="John" onChange={firstnameHandler} />

                    <label className="block text-xl font-medium mb-2" for="username">
                        Last Name
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-8" type="text" placeholder="Doe" onChange={lastnameHandler} />

                    <label className="block text-xl font-medium mb-2" for="username">
                        Email
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-8" type="text" placeholder="johnDoe@gmail.com" onChange={emailHandler}/>

                    <label className="block text-xl font-medium mb-2" for="username">
                        Password
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-8" type="password" onChange={passHandler}/>

                    <button type="submit" className="w-[100%] bg-stone-950 text-slate-200 rounded-lg text-lg h-[45px] font-semibold">Sign Up</button>
                </form>

                <div className="text-center text-lg font-medium">
                    Already have an account? <span className="underline hover:text-stone-700 cursor-pointer" onClick={clickHandler}>Login</span>
                </div>
            </div>
        </div>
    )
}