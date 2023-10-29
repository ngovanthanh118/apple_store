import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../components/Contexts";

export default function ProductDetail() {
    const url = window.location.pathname;
    const [data, setData] = useState([]);
    const { addProduct } = useContext(Context);
    const [title, setTitle] = useState('');
    const [comment, setComment] = useState('');
    const [feedback, setFeedback] = useState([]);
    const [postComment, setPostComment] = useState('');
    var currentdate = new Date();
    var datetime = currentdate.getDate() + "-"
        + (currentdate.getMonth() + 1) + "-"
        + currentdate.getFullYear() + " "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();
    useEffect(() => {
        window.scroll(0, 0);
    }, []);
    useEffect(() => {
        axios.get("/products")
            .then((res) => setData(res.data))
            .catch(err => console.error(err));
    }, [])
    useEffect(() => {
        axios.get('/comments')
            .then(res => setFeedback(res.data))
            .catch(err => console.error(err));
    }, [postComment])
    const product = data.find(proc => proc.id === parseInt(url[url.length - 1])) || { ...data[data.length - 1] };
    const fillComment = feedback.filter(cmt => cmt.product_id === product.id)
    const handleComment = (ev) => {
        ev.preventDefault();
        axios.post('/comments', {
            title: title,
            comment: comment,
            date: datetime,
            product_id: product.id
        })
            .then(res => setPostComment(res.data))
            .catch(err => console.error(err))
    }
    console.log(postComment)
    return (
        <div className="p-8">
            <div className="mt-26 flex justify-center gap-6">
                <div className="w-full bg-white rounded-xl">
                    <img src={'/' + product.img} alt="" />
                </div>
                <div className="p-4">
                    <h1 className="text-3xl font-bold">{product.name}</h1>
                    <p className="text-justify leading-7 mt-2">{product.description}</p>
                    <div className="flex gap-8 items-center py-1 mt-4">
                        <h1 className="font-bold text-2xl text-black">${product.price}</h1>
                        <Link className="rounded-2xl outline outline-green-900 outline-2 text-green-900 px-4 py-1 cursor-pointer flex gap-2 items-center btn-add"
                            onClick={() => addProduct({ ...product })}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                            </svg>
                            <span className="font-medium text-sm ">Add to cart</span>
                        </Link>
                    </div>
                </div>
            </div>
            <div>
                <h1 className="text-3xl font-bold my-4">Reviews</h1>
                <div className="flex justify-around ">
                    <div className="bg-white px-8 py-10 rounded-xl h-max">
                        <h1 className="text-2xl font-bold my-2">Add a review</h1>
                        <form onSubmit={handleComment}>
                            <input type="text" placeholder="Title" value={title} onChange={(ev) => setTitle(ev.target.value)} />
                            <input type="text" placeholder="What do you think?" value={comment} onChange={(ev) => setComment(ev.target.value)} />
                            <button className="bg-green-900 text-white rounded-xl mt-4">Submit your review</button>
                        </form>
                    </div>
                    <div className="bg-white p-8 rounded-xl w-2/4">
                        <h1 className="text-2xl font-bold my-2">All reviews</h1>
                        {!fillComment.length && (
                            <p className="p-4">No comment</p>
                        )}
                        {fillComment.length > 0 && fillComment.map(fb => (
                            <div key={fb.id} className="p-4 flex flex-col gap-4 border-t-2 border-gray-200 border-solid">
                                <div className="flex justify-between item-center">
                                    <h1 className="text-lg font-normal">{fb.title}</h1>
                                    <span className="text-base font-normal text-gray-400">{fb.date}</span>
                                </div>
                                <p className="text-lg font-light text-slate-900">{fb.comment}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}