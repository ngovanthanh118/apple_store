import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Context } from '../../components/Contexts';
import { setCookie } from '../../ultis';
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
                setCookie("token", res.data.token);
                setAccounts(res.data.token);
                if (res.data.admin) {
                    window.location = 'https://apple-store-dashboard-60fb324dec5b.herokuapp.com';
                }
                else {
                    navigate('/');
                }
            })
            .catch(err => console.error(err));
    }

    return (
        <div className="flex justify-center items-center p-8 min-h-screen">
            <div className="flex flex-col items-center">
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
        </div>
    )
}