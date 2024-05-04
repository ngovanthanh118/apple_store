import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import productService from "../../services/productService";
import { formatNumberWithDot } from "../../ultis";

export default function ProductDetail() {
    const { _id } = useParams();
    const navigate = useNavigate();
    const [productDetail, setProductDetail] = useState({});
    const [producSimalar, setProductSimalar] = useState([]);
    const [imageShow, setImageShow] = useState('');
    const [colorActive, setColorActive] = useState('');
    useEffect(() => {
        const fetchProduct = async () => {
            await productService.getProduct(_id)
                .then(res => {
                    setProductDetail(prev => prev = res.data.productDetail);
                    setProductSimalar(prev => prev = res.data.productSimilar);
                    setImageShow(prev => prev = res.data.productDetail.image[0]);
                    setColorActive(prev => prev = res.data.productDetail.color[0]);
                })
                .catch(err => console.log(err))
        }
        fetchProduct();
        window.scroll(0, 0);
    }, [_id])
    return (
        <div className="px-20 py-8">
            <div className="mobile-product-detail mt-26 grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-4 justify-between items-center">
                    <img src={`${process.env.REACT_APP_API_URL}/images/${imageShow}`} alt="img_show" className="flex-1 object-cover" />
                    <div className="flex justify-around gap-3">
                        {productDetail.image && productDetail.image?.map((img, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-lg p-2 flex items-center justify-center cursor-pointer"
                                onClick={() => setImageShow(prev => prev = img)}
                            >
                                <img key={index + 1} src={`${process.env.REACT_APP_API_URL}/images/${img}`} alt="img_thumb" className="w-[80px] h-[80px]" />
                            </div>
                        ))}

                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <h1 className="text-3xl text-white font-bold">{productDetail.name}</h1>
                    <div className="flex gap-8 items-center py-1">
                        {productDetail?.discount > 0 ?
                            <div className="flex gap-2 items-center">
                                <h1 className="font-bold text-xl text-white">{formatNumberWithDot(productDetail.discount)}đ</h1>
                                <p className="font-normal text-base text-white line-through">{formatNumberWithDot(productDetail.price)}đ</p>
                                <span className="text-white text-base font-normal ">-{100 - Math.round(productDetail.discount / productDetail.price * 100)}%</span>
                            </div> :
                            <h1 className="font-bold text-2xl text-white">{formatNumberWithDot(productDetail.price)}đ</h1>
                        }
                    </div>
                    <div className="flex flex-col gap-2 justify-center items-start">
                        <h1 className="text-white text-base font-medium">Dung lượng</h1>
                        <div className="flex text-white items-center gap-2">
                            {producSimalar && producSimalar.map((item, index) => (
                                <div
                                    key={index}
                                    className={item._id === _id ?
                                        "p-2 text-sm bg-[#1C1C1D] rounded-md cursor-pointer" :
                                        "p-2 text-sm bg-[#2F3033] rounded-md cursor-pointer"
                                    }
                                    onClick={() => navigate(`/product/${item.url}/${item._id}`)}
                                >
                                    {item.capacity}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 justify-center items-start">
                        <h1 className="text-white text-base font-medium">Màu</h1>
                        <div className="flex items-center gap-2">
                            {productDetail.color && productDetail.color.map((item, index) => (
                                <div
                                    key={index}
                                    style={{ backgroundColor: item }}
                                    className={colorActive === item ?
                                        "p-4 border border-white border-solid cursor-pointer rounded-full" :
                                        "p-4 rounded-full cursor-pointer"
                                    }
                                    onClick={() => {
                                        const findImageShowByColor = productDetail.image.find(img => img.includes(item.replace('#', '')))
                                        setColorActive(prev => prev = item);
                                        setImageShow(prev => prev = findImageShowByColor)
                                    }}
                                ></div>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 bg-[#2F3033] p-4 rounded-xl text-white">
                        <div className="pb-4 border-b-[1px] border-[#3E3E3F] flex flex-col gap-1">
                            <h1 className="text-base font-bold">Khuyến mãi</h1>
                            <p className="text-sm font-medium">Giá và khuyến mãi dự kiến áp dụng đến 23:00 | 31/05</p>
                        </div>
                        <div className="py-2">
                            <ul className="list-disc flex flex-col gap-2 pl-4 text-sm">
                                <li> Bảo Hành 24 tháng (12 tháng chính hãng + 12 tháng tại Apple)</li>
                                <li> Thu cũ Đổi mới: Giảm đến 2 triệu (Tuỳ model máy cũ, Không kèm thanh toán qua cổng online, mua kèm)</li>
                                <li> Cơ hội trúng 10 xe máy Yamaha Sirius mỗi tháng, tổng giải thưởng lên đến 390 Triệu </li>
                            </ul>
                        </div>
                    </div>
                    <button className="p-4 bg-[#0071E3] text-white text-center text-xl font-bold rounded-xl w-full">Mua ngay</button>
                </div>
            </div>
            <div className="flex flex-col gap-2 items-center mt-8 bg-white rounded-lg p-4">
                <div className="flex gap-4 items-center">
                    <button className="py-2 px-3 border border-[#0071E3] text-sm rounded-xl text-[#3A3A3A] font-bold border-solid">Mô tả</button>
                    <button className="py-2 px-3 border border-gray-300 text-sm rounded-xl text-[#3A3A3A] font-bold border-solid">Thông số kỹ thuật</button>
                    <button className="py-2 px-3 border border-gray-300 text-sm rounded-xl text-[#3A3A3A] font-bold border-solid">Đánh giá sản phẩm</button>
                </div>
                <div className="w-full flex justify-center">
                    <div className="flex flex-col py-2">
                        <div className="grid grid-cols-2 gap-4 border-b-[1px] items-center border-gray-300 py-4">
                            <h1 className="text-sm font-normal w-40">Độ phân giải:</h1>
                            <p className="text-sm font-normal">{productDetail.resolution} Pixels</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 border-b-[1px] items-center border-gray-300 py-4">
                            <h1 className="text-sm font-normal w-40">Màn hình rộng:</h1>
                            <p className="text-sm font-normal">{productDetail.screenSize}" - Tần số quét {productDetail.refreshRate} Hz</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 border-b-[1px] items-center border-gray-300 py-4">
                            <h1 className="text-sm font-normal w-40">Chip xử lý (CPU):</h1>
                            <p className="text-sm font-normal">{productDetail.cpu}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 border-b-[1px] items-center border-gray-300 py-4">
                            <h1 className="text-sm font-normal w-40">RAM:</h1>
                            <p className="text-sm font-normal">{productDetail.ram} GB</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 border-b-[1px] items-center border-gray-300 py-4">
                            <h1 className="text-sm font-normal w-40">Dung lượng pin:</h1>
                            <p className="text-sm font-normal">{productDetail.baterryLife} mAh</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 border-b-[1px] border-gray-300 py-4">
                            <h1 className="text-sm font-normal w-40">Hỗ trợ sạc tối đa:</h1>
                            <p className="text-sm font-normal">{productDetail.chargerCapacity} W</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}