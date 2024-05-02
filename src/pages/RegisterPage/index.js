import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');

    const navigate = useNavigate();
    useEffect(() => {
        window.scroll(0, 0);
    }, []);
    const data = {
        name: name,
        email: email,
        password: password,
    }
    function registerUser(ev) {
        ev.preventDefault();
        if (password !== rePassword) {
            alert("Passwords do not match!");
        } else {
            axios.post('/users/register', data)
                .then(res => navigate('/'))
                .catch(error => console.error(error))
        }
    }
    return (
        <div className="flex justify-center items-center p-8 min-h-screen">
            <div className="flex flex-col items-center">
                <h1 className="text-center text-4xl my-4 font-bold">Register</h1>
                <form className="max-w-md" onSubmit={registerUser}>
                    <input type="text" placeholder="your name" value={name} onChange={ev => setName(ev.target.value)} />
                    <input type="email" placeholder="your@email.com" value={email} onChange={ev => setEmail(ev.target.value)} />
                    <input type="password" placeholder="password" value={password} onChange={ev => setPassword(ev.target.value)} />
                    <input type="password" placeholder="confirm password" value={rePassword} onChange={ev => setRePassword(ev.target.value)} />
                    <button>Register</button>
                </form>
                <span className="mt-4">Already a member?
                    <Link className='ml-2 text-sky-500' to="/login">Login in</Link>
                </span>
            </div>
        </div>
    )
}