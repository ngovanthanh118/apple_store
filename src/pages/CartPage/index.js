import { useContext, useEffect, useState, useMemo } from "react";
import { Context } from "../../components/Contexts";
import { isString, uniqBy } from "lodash";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function CartPage() {
    const { cartProducts, setCartProducts, addProduct, removeProduct, accounts } = useContext(Context);
    const [product, setProduct] = useState([]);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [note, setNote] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        const filterCartById = uniqBy(cartProducts, "_id");
        setProduct(filterCartById);
    }, [cartProducts]);
    useEffect(() => {
        window.scroll(0, 0);

    }, []);
    const moreOfThisProduct = (product) => {
        addProduct(product);
    }
    const removeThisProduct = (product) => {
        removeProduct(product)
    }
    const total = useMemo(() => {
        const totalPrice = cartProducts.reduce((acc, curr) => {
            return acc + parseInt(curr.price);
        }, 0)
        return totalPrice;
    }, [cartProducts]);
    const quantityProduct = (procduct) => {
        return cartProducts.filter(proc => proc._id === procduct._id).length;
    }
    const filterCart = useMemo(() => {
        const newCart = product.map(proc => {
            const quantity = quantityProduct(proc);
            return { ...proc, quantity };
        })
        return newCart;
    }, [product])
    const handleCheckout = async () => {
        const orderPost = {
            user_id: accounts._id || accounts,
            name: name,
            phone: phone,
            address: address,
            details: filterCart,
            note: note
        }
        if (
            address === '' ||
            note === '' || phone === '') {
            alert('Please enter complete information');
        }
        else if (cartProducts.length === 0) {
            alert('Your cart is empty');
        }
        else if (!!!accounts) {
            alert('Please login to checkout!');
        }
        else {
            axios.post('/orders', orderPost)
                .then(res => {
                    navigate('/checkout');
                    setCartProducts([]);
                })
                .catch(err => console.log(err))
        }
    }
    return (
        <div className="mobile-cart-page grid grid-cols-3 gap-10 p-10 min-h-screen">
            <div className="col-span-2 bg-white rounded-lg p-8 h-max">
                <h2 className="font-bold mb-8 text-left text-4xl">Cart</h2>
                <div>
                    {!cartProducts?.length && (
                        <h3>Your cart is empty</h3>
                    )}
                    {cartProducts?.length > 0 && (
                        <table>
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filterCart?.map(product => (
                                    <tr key={product._id}>
                                        <td>
                                            <img src={"https://apple-store-server.vercel.app/api/v1/images/" + product.image} alt={product.img} />
                                            {product.name}
                                        </td>
                                        <td>
                                            <div className="mobile-quantity flex items-center">
                                                <button onClick={() => removeThisProduct({ ...product })}>-</button>
                                                <span>{product.quantity}</span>
                                                <button onClick={() => moreOfThisProduct({ ...product })}>+</button>
                                            </div>
                                        </td>
                                        <td>
                                            ${product.price * quantityProduct(product)}
                                        </td>
                                    </tr>
                                ))}
                                <tr className="total">
                                    <td colSpan={2}>Total:</td>
                                    <td>${total}</td>
                                </tr>
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
            <div className="flex flex-col bg-white rounded-lg p-8 h-max">
                <h2 className="font-bold text-4xl text-center mb-6">Order infomation</h2>
                <div>
                    <input type="text"
                        placeholder="Name"
                        value={name}
                        onChange={ev => setName(ev.target.value)}
                    />
                    <input type="text"
                        placeholder="Phone"
                        value={phone}
                        onChange={ev => setPhone(ev.target.value)}
                    />
                    <input type="text"
                        placeholder="Address"
                        value={address}
                        onChange={ev => setAddress(ev.target.value)}
                    />
                    <textarea value={note} placeholder="Note" onChange={ev => setNote(ev.target.value)}>
                        {note}
                    </textarea>
                </div>
                <button className="bg-green-900 text-white font-base p-3 mt-4" onClick={handleCheckout}>Continue to payment</button>
            </div>
        </div>
    )
}