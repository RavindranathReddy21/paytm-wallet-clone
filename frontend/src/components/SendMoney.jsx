import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"
import Swal from 'sweetalert2';
import { useLogin } from "../context";

export function SendMoney() {
    const [serachParams] = useSearchParams();
    const id = serachParams.get("id");
    const firstname = serachParams.get("firstname");
    const lastname = serachParams.get("lastname");
    const [amount, setAmount] = useState(0);
    const {login, setLogin} = useLogin();
    const nav = useNavigate();

    useEffect(() => {
        if(!login){
            Swal.fire({
                title: "Unauthorized Access..",
                icon: "error",
                timer: 2000,
                timerProgressBar: true
            })
            nav("/signin");
            return
        }
    }, [])

    const changeHandler = (e) => {
        setAmount(parseInt(e.target.value));
    }

    const transferHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await axios({
                url: "http://localhost:3000/api/v1/account/transfer",
                method: "post",
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                },
                data: {
                    to: id,
                    amount: amount
                }
            });
            Swal.fire({
                title: "Transaction successful, redirecting to dashboard..",
                icon: "success",
                timer: 2000,
                timerProgressBar: true
            });
            setTimeout(() => nav("/dashboard"), 2000);
        } catch (error) {
            console.error("Transfer failed:", error);
            Swal.fire({
                title: "Transaction failed, redirecting to dashboard..",
                icon: "error",
                timer: 2000,
                timerProgressBar: true
            });
        }
        setTimeout(() => nav("/dashboard"), 2000);
    }

    return (
        <div className="bg-stone-50 text-stone-950 flex items-center justify-around h-screen">
            <div className="p-8 bg-zinc-100 flex items-center flex-col justify-around drop-shadow-xl rounded-xl">
                <div className="font-bold text-5xl mt-4 mb-16">
                    Send Money
                </div>

                <div className="ml-[100px] flex items-center mr-[130px] mb-[40px]">
                    <div className="h-[70px] w-[70px] bg-green-400 rounded-full flex items-center justify-center text-slate-50 font-medium text-4xl">
                        {firstname && lastname && firstname[0] + lastname[0]}
                    </div>

                    <div className="text-4xl ml-[10px] font-semibold">
                        {firstname && lastname && firstname + " " + lastname}
                    </div>
                </div>

                <div className="flex items-center">
                    <form className="flex flex-col justify-start" onSubmit={transferHandler}>
                        <label className="block text-2xl font-semibold mb-2" for="amount">
                            Amount (in $)
                        </label>
                        <input className="shadow appearance-none border rounded w-[450px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-8 h-[50px]" type="text" placeholder="Enter" onChange={changeHandler} />

                        <button className="w-full bg-green-400 text-slate-50 text-2xl font-medium rounded-lg h-[50px] transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-[95%] duration-300 ">Initiate Transfer</button>
                    </form>

                </div>
            </div>
        </div>
    )
}
