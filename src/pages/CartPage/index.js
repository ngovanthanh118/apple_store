import { useContext, useEffect, useState } from "react";
import { Context } from "../../components/Contexts";
import { uniqBy } from "lodash";
import { useNavigate } from "react-router-dom";
export default function CartPage() {
    const { cartProducts, setCartProducts, addProduct, removeProduct } = useContext(Context);
    const [product, setProduct] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [address, setAddress] = useState('');
    const [country, setCountry] = useState('');
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
    const total = cartProducts.reduce((acc, curr) => {
        return acc + parseInt(curr.price);
    }, 0)
    const handleCheckout = () => {
        if (name === '' ||
            email === '' ||
            city === '' ||
            postalCode === '' ||
            address === '' ||
            country === '') {
            alert('Please enter complete information');
        }
        else if (cartProducts.length === 0) {
            alert('Your cart is empty');
        }
        else {
            setCartProducts([]);
            navigate('/checkout');
        }
    }
    return (
        <div className="grid grid-cols-3 gap-10 p-8 min-h-screen">
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
                                {product.map(product => (
                                    <tr key={product._id}>
                                        <td>
                                            <img src={"http://localhost:4000/api/v1/images/" +product.image} alt={product.img} />
                                            {product.name}
                                        </td>
                                        <td>
                                            <div>
                                                <button onClick={() => removeThisProduct({ ...product })}>-</button>
                                                <span>{cartProducts.filter(proc => proc._id === product._id).length}</span>
                                                <button onClick={() => moreOfThisProduct({ ...product })}>+</button>
                                            </div>
                                        </td>
                                        <td>
                                            ${product.price * cartProducts.filter(proc => proc.id === product.id).length}
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
                    <input type="email"
                        placeholder="Email"
                        value={email}
                        onChange={ev => setEmail(ev.target.value)}
                    />
                    <div className="flex gap-2">
                        <input type="text"
                            placeholder="City"
                            value={city}
                            onChange={ev => setCity(ev.target.value)}
                        />
                        <input type="text"
                            placeholder="Postal Code"
                            value={postalCode}
                            onChange={ev => setPostalCode(ev.target.value)}
                        />
                    </div>
                    <input type="text"
                        placeholder="Street Address"
                        value={address}
                        onChange={ev => setAddress(ev.target.value)}
                    />
                    <input type="text"
                        placeholder="Country"
                        value={country}
                        onChange={ev => setCountry(ev.target.value)}
                    />
                </div>
                <button className="bg-green-900 text-white font-base p-3 mt-4" onClick={handleCheckout}>Continue to payment</button>
            </div>
        </div>
    )
}