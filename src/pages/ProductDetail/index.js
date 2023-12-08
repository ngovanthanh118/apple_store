import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../../components/Contexts";

export default function ProductDetail() {
    const { _id } = useParams();
    const [data, setData] = useState([]);
    const { addProduct } = useContext(Context);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [comments, setComments] = useState([]);
    useEffect(() => {
        window.scroll(0, 0);
    }, [_id]);
    useEffect(() => {
        axios.get("/products/" + _id)
            .then((res) => setData(res.data.data))
            .catch(err => console.error(err));
        axios.get("/comments/" + _id)
            .then(res => setComments(res.data.data))
            .catch(err => console.log(err));
    }, [_id])
    const handleComment = (ev) => {
        ev.preventDefault();
        axios.post('/comments', {
            title: title,
            comment: content,
            product_id: _id
        })
            .then(res => setComments(prev => [...prev, res.data.data]))
            .catch(err => console.error(err))
    }
    return (
        <div className="p-8">
            <div className="mt-26 flex gap-6">
                <div className="bg-white rounded-xl">
                    <img src={"https://apple-store-server-8705f39d5697.herokuapp.com/api/v1/images/" + data.image} alt="" />
                </div>
                <div className="p-4">
                    <h1 className="text-3xl font-bold">{data.name}</h1>
                    <p className="text-justify leading-7 mt-2">{data.description}</p>
                    <div className="flex gap-8 items-center py-1 mt-4">
                        <h1 className="font-bold text-2xl text-black">${data.price}</h1>
                        <Link className="rounded-2xl outline outline-green-900 outline-2 text-green-900 px-4 py-1 cursor-pointer flex gap-2 items-center btn-add"
                            onClick={() => addProduct({ ...data })}
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
                            <input type="text" placeholder="What do you think?" value={content} onChange={(ev) => setContent(ev.target.value)} />
                            <button className="bg-green-900 text-white rounded-xl mt-4">Submit your review</button>
                        </form>
                    </div>
                    <div className="bg-white p-8 rounded-xl w-2/4">
                        <h1 className="text-2xl font-bold my-2">All reviews</h1>
                        {!comments.length && (
                            <p className="p-4">No comment</p>
                        )}
                        {comments.length > 0 && comments.map(cmt => (
                            <div key={cmt._id} className="p-4 flex flex-col gap-4 border-t-2 border-gray-200 border-solid">
                                <div className="flex justify-between item-center">
                                    <h1 className="text-lg font-normal">{cmt.title}</h1>
                                    <span className="text-base font-normal text-gray-400">{cmt.date}</span>
                                </div>
                                <p className="text-lg font-light text-slate-900">{cmt.comment}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}