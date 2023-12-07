import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Context } from '../../components/Contexts';
export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setAccounts } = useContext(Context)
    const navigate = useNavigate();
    useEffect(() => {
        window.scroll(0, 0);
    }, []);
    const handleLogin = (ev) => {
        ev.preventDefault();
        axios.post('/users/login', {
            email: email,
            password: password
        })
            .then(res => {
                setAccounts(res.data.data);
                navigate('/');
            })
            .catch(err => console.error(err));
    }
    return (
        <div className="flex flex-col items-center mx-auto p-8 min-h-screen">
            <h1 className="text-center text-4xl my-4 font-bold">Login</h1>
            <form className="max-w-md" onSubmit={handleLogin}>
                <input type="email" placeholder="your@email.com" value={email} onChange={ev => setEmail(ev.target.value)} />
                <input type="password" placeholder="password" value={password} onChange={ev => setPassword(ev.target.value)} />
                <button>Login</button>
            </form>
            <span className="mt-4">Don't have an account yet?
                <Link className='ml-2 text-sky-500' to="/register">Register now</Link>
            </span>
        </div>
    )
}