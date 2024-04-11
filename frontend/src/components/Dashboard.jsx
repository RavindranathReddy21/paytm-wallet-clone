import { useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../context";
import Swal from 'sweetalert2';
export function Dashboard() {
    const [filter, setFilter] = useState("-1");
    const [users, setUsers] = useState([]);
    const [balance, setBalance] = useState(0);
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const {login, setLogin} = useLogin();
    const nav = useNavigate();
    const changeHandler = (e) => {
        let res = e.target.value;
        if (!res.length) res = "-1";
        setFilter(res);
    }



    useEffect(() => {
        const fetchData = async () => {
            const res = await axios({
                url: "http://localhost:3000/api/v1/user/bulk?filter=" + filter,
                method: "get"
            });

            setUsers(res.data.users);
        };
        fetchData();

    }, [filter]);

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
        const fetchBalance = async () => {
            try {
                const res = await axios({
                    url: "http://localhost:3000/api/v1/account/balance",
                    method: "get",
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                })
                setFirstname(res.data.firstname);
                setLastname(res.data.lastname);
                setBalance(res.data.balance);
            }

            catch {
                console.log("login error");
                nav("/");
            }


        }
        fetchBalance();
    }, [])

    return (
        <div className="bg-stone-50">
            <Navbar firstname={firstname} lastname={lastname} />
            <div className="bg-stone-50 h-screen flex flex-col ml-8 text-stone-950">
                <div className="text-2xl font-bold mt-8 mb-16">
                    Your Balance ${balance}
                </div>

                <div>
                    <label className="block font-bold mb-2 text-3xl" for="users">
                        Users
                    </label>
                    <input className="shadow appearance-none border rounded w-[97%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-8 h-[40%]" type="text" placeholder="Search users.." onChange={changeHandler} />
                </div>
                <div className="mt-8">
                    {users.map(user => user.firstName != firstname && <User id={user.firstName + " " + user.lastName} key={user.username} user={user} />)}
                </div>

            </div>
        </div>
    )
}

function User({ user }) {
    const nav = useNavigate();
    return (
        <div className="flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center mb-4">
                    <div className="flex items-center justify-center rounded-full mr-4 bg-stone-200 h-[50px] w-[50px] font-medium cursor-pointer text-lg">
                        {user.firstName[0] + user.lastName[0]}
                    </div>
                    <div className="font-bold text-xl">
                        {user.firstName + " " + user.lastName}
                    </div>
                </div>

                <div className="flex items-center justify-center group mr-16 w-fit rounded-xl bg-stone-950 p-1 font-medium text-stone-50 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-95 hover:drop-shadow-none h-[50px] text-lg mb-4" 
                onClick={() => {
                    nav("/sendmoney?id="+user._id+"&firstname="+user.firstName+"&lastname="+user.lastName);
                }}>
                    <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-stone-950 cursor-pointer">
                        <p>Send Money</p>
                    </div>
                </div>
            </div>
        </div>
    )
}