import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        window.scroll(0,0);
    }, []);
    const data = {
        name: name,
        email: email,
        password: password,
    }
    function registerUser(ev) {
        ev.preventDefault();
        axios.post('/accounts', data)
            .catch(error => console.error(error))
        navigate('/login');
    }
    return (
        <div className="flex flex-col items-center mx-auto p-8 min-h-screen">
            <h1 className="text-center text-4xl my-4 font-bold">Register</h1>
            <form className="max-w-md" onSubmit={registerUser}>
                <input type="text" placeholder="your name" value={name} onChange={ev => setName(ev.target.value)} />
                <input type="email" placeholder="your@email.com" value={email} onChange={ev => setEmail(ev.target.value)} />
                <input type="password" placeholder="password" value={password} onChange={ev => setPassword(ev.target.value)} />
                <button>Register</button>
            </form>
            <span className="mt-4">Already a member?
                <Link className='ml-2 text-sky-500' to="/login">Login in</Link>
            </span>
        </div>
    )
}