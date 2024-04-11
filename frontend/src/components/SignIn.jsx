import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import axios from 'axios';
import { useLogin } from "../context";
export function SignIn(){
    const {login, setLogin} = useLogin();
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const nav = useNavigate();
    function clickHandler(){
        nav("/");
    }
    
    const emailHandler = (e) => {
        setEmail(e.target.value);
    }

    const passwordHandler = (e) => {
        setPass(e.target.value);
    }

    const submitHandler = async (event) => {
        event.preventDefault();

        try{
            const res = await axios({
                url: "http://localhost:3000/api/v1/user/signin",
                method: "post",
                data:{
                    username: email,
                    password: pass
                }
            });
            setLogin(1);
            console.log(login);
            const jwtToken = res.data.token;
            localStorage.setItem("token", jwtToken);
            nav("/dashboard");
        }

        catch{
            Swal.fire({
                title: "Incorrect Credentials",
                icon: "error",
                timer: 2000,
                timerProgressBar: true
            })
        }
        
    }

    return (
        <div className="flex justify-around items-center bg-stone-400 h-screen text-slate-950">
            <div className="flex flex-col justify-between bg-stone-50 rounded-lg p-6">
                <div className="text-4xl font-bold text-center">
                    Sign In
                </div>
                <div className="p-4 text-xl w-[90%] text-center text-gray-400 font-medium">
                    Enter your credentials to access your account
                </div>
                <form className="p-4 flex flex-col justify-between" onSubmit={submitHandler}>
                    <label className="block text-xl font-medium mb-2" for="username">
                        Email
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-8" type="text" placeholder="johnDoe@gmail.com" onChange={emailHandler} />

                    <label className="block text-xl font-medium mb-2" for="username">
                        Password
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-8" type="password" onChange={passwordHandler} />

                    <button type="submit" className="w-[100%] bg-stone-950 text-slate-200 rounded-lg text-lg h-[45px] font-semibold">Sign In</button>
                </form>

                <div className="text-center text-lg font-medium">
                    Don't have an account? <span className="underline hover:text-stone-700 cursor-pointer" onClick={clickHandler}>Sign Up</span>
                </div>
            </div>
        </div>
    )
}