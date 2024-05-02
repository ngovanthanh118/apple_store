import { useContext, useEffect, useState } from "react"
import { Context } from "../../components/Contexts"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getCookie, removeCookie } from "../../ultis";

export default function AccountPage() {
    const { accounts, setAccounts } = useContext(Context);
    const [editName, setEditName] = useState(false);
    const [editPhone, setEditPhone] = useState(false);
    const [editAddress, setEditAddress] = useState(false);
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [image, setImage] = useState('');
    const navigate = useNavigate();
    const loadAccount = () => {
        axios.get('/users', {
            headers: {
                token: getCookie("token")
            }
        })
            .then(res => {
                const user = res.data.data;
                setAccounts(user);
            })
            .catch(err => console.log(err))
    }
    useEffect(() => {
        loadAccount();
    }, [])
    const handleLogout = () => {
        removeCookie("token");
        setAccounts('');
        navigate('/login');
    }
    const handleUpdateAccount = () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', accounts.email);
        formData.append('password', password);
        formData.append('phone', phone);
        formData.append('address', address);
        if (image) {
            formData.append('image', image);
        }
        axios.put('/users/' + accounts._id, formData, {
            headers: {
                token: getCookie("token")
            }
        })
            .then(res => {
                loadAccount();
                setAccounts(res.data.data);
                setEditName(false);
                setEditPhone(false);
                setEditAddress(false);

            })
            .catch(err => console.log(err))
    }
    return (
        <div className="mt-26 p-12 flex flex-col gap-4">
            <div className="flex gap-8 justify-center items-center">
                <div>
                    {accounts.image === "null" ?
                        <div className="flex flex-col gap-2">
                            <div className="flex gap-2 my-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                </svg>
                                <span>No image</span>
                            </div>
                            <div>
                                <input className="hidden" type="file" id="file" onChange={(ev) => setImage(ev.target.files[0])} />
                                <label for="file" className="flex flex-col items-center gap-2 bg-white p-2 rounded-2xl">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                                    </svg>
                                    <span>Choose an image</span>
                                </label>
                            </div>
                        </div> :
                        <img src={"https://apple-store-server.vercel.app/api/v1/images/" + accounts.image} />
                    }
                </div>
                <div className="flex flex-col overflow-hidden">
                    <div className="flex items-center gap-4 my-3">
                        <label className="mr-12 text-sm font-bold">Name: </label>
                        {editName ?
                            <div className="flex items-center gap-2">
                                <input type="text" value={name} onChange={(ev) => setName(ev.target.value)} />
                                <button className="bg-inherit text-blue-900 m-0" onClick={() => setEditName(false)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div> :
                            <div className="flex items-center gap-2">
                                <h1 className="text-sm">{accounts.name}</h1>
                                <button className="bg-inherit text-blue-900 m-0" onClick={() => setEditName(true)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                    </svg>
                                </button>
                            </div>
                        }

                    </div>
                    <div className="flex items-center gap-4 my-3">
                        <label className="mr-12 text-sm font-bold">Email: </label>
                        <h1 className="text-sm">{accounts.email}</h1>
                    </div>
                    <div className="flex items-center gap-4 my-3">
                        <label className="mr-12 text-sm font-bold">Phone: </label>
                        {editPhone ?
                            <div className="flex items-center gap-2">
                                <input type="text" value={phone} onChange={(ev) => setPhone(ev.target.value)} />
                                <button className="bg-inherit text-blue-900 m-0" onClick={() => setEditPhone(false)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div> :
                            <div className="flex items-center gap-2">
                                <h1 className="text-sm">{accounts.phone}</h1>
                                <button className="bg-inherit text-blue-900 m-0" onClick={() => setEditPhone(true)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                    </svg>
                                </button>
                            </div>
                        }
                    </div>
                    <div className="flex items-center gap-4 my-3">
                        <label className="mr-12 text-sm font-bold">Address: </label>
                        {editAddress ?
                            <div className="flex items-center gap-2">
                                <input type="text" value={address} onChange={(ev) => setAddress(ev.target.value)} />
                                <button className="bg-inherit text-blue-900 m-0" onClick={() => setEditAddress(false)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div> :
                            <div className="flex items-center gap-2">
                                <h1 className="text-sm">{accounts.phone}</h1>
                                <button className="bg-inherit text-blue-900 m-0" onClick={() => setEditAddress(true)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                    </svg>
                                </button>
                            </div>
                        }
                    </div>
                    <div className="flex items-center gap-4 my-3">
                        <label className="mr-12 text-sm font-bold">New password: </label>
                        <input
                            type="password"
                            value={password}
                            onChange={ev => setPassword(ev.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-4 my-3">
                        <button className="w-32" onClick={handleUpdateAccount}>
                            Save changes
                        </button>
                    </div>
                </div>
            </div>
            <div className="w-32">
                <button className="flex items-center gap-2 p-3" onClick={handleLogout}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                    </svg>
                    Log out
                </button>
            </div>
        </div>
    )
}