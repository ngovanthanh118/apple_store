import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../../components/Contexts";
import productService from "../../services/productService";
import { formatNumberWithDot } from "../../ultis";

export default function ProductDetail() {
    const { addProduct } = useContext(Context);
    const { _id } = useParams();
    const [data, setData] = useState([]);
    const [imageShow, setImageShow] = useState('');
    useEffect(() => {
        const fetchProduct = async () => {
            await productService.getProduct(_id)
                .then(res => {
                    setData(prev => prev = res.data);
                    setImageShow(prev => prev = res.data.image[0])
                })
                .catch(err => console.log(err))
        }
        fetchProduct();
        window.scroll(0, 0);
    }, [_id])
    return (
        <div className="px-20 py-8">
            <div className="mobile-product-detail mt-26 grid grid-cols-2">
                <div className="overflow-x-auto flex flex-col justify-between items-center">
                    <img src={`${process.env.REACT_APP_API_URL}/images/${imageShow}`} alt="img_show" />
                    <div className="flex justify-around gap-3">
                        {data.image && data.image?.map((img, index) => (
                            <div className="bg-white rounded-lg flex items-center justify-center cursor-pointer">
                                <img key={index + 1} src={`${process.env.REACT_APP_API_URL}/images/${img}`} alt="img_thumb" width="80px" height="80px" />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <h1 className="text-3xl text-white font-bold">{data.name}</h1>
                    <div className="flex gap-8 items-center py-1">
                        {data?.discount > 0 ?
                            <div className="flex gap-2 items-center">
                                <h1 className="font-bold text-xl text-white">{formatNumberWithDot(data.discount)}đ</h1>
                                <p className="font-normal text-base text-white line-through">{formatNumberWithDot(data.price)}đ</p>
                                <span className="text-white text-base font-normal ">-{100 - Math.round(data.discount / data.price * 100)}%</span>
                            </div> :
                            <h1 className="font-bold text-2xl text-white">{formatNumberWithDot(data.price)}đ</h1>
                        }
                    </div>
                    <div className="flex flex-col gap-2 justify-center items-start">
                        <h1 className="text-white text-base font-medium">Dung lượng</h1>
                        <div className="flex items-center gap-2">
                            {data.capacity && data.capacity.map((item, index) => (
                                <div key={index} className="p-2 text-white text-sm bg-[#1C1C1D] rounded-md">{item}</div>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 justify-center items-start">
                        <h1 className="text-white text-base font-medium">Màu: Titan xanh</h1>
                        <div className="flex items-center gap-2">
                            {data.color && data.color.map((item, index) => (
                                <div key={index} style={{ backgroundColor: item }} className="p-4 border border-white border-solid rounded-full"></div>
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
                            <p className="text-sm font-normal">{data.resolution} Pixels</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 border-b-[1px] items-center border-gray-300 py-4">
                            <h1 className="text-sm font-normal w-40">Màn hình rộng:</h1>
                            <p className="text-sm font-normal">{data.screenSize}" - Tần số quét {data.refreshRate} Hz</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 border-b-[1px] items-center border-gray-300 py-4">
                            <h1 className="text-sm font-normal w-40">Chip xử lý (CPU):</h1>
                            <p className="text-sm font-normal">{data.cpu}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 border-b-[1px] items-center border-gray-300 py-4">
                            <h1 className="text-sm font-normal w-40">RAM:</h1>
                            <p className="text-sm font-normal">{data.ram} GB</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 border-b-[1px] items-center border-gray-300 py-4">
                            <h1 className="text-sm font-normal w-40">Dung lượng pin:</h1>
                            <p className="text-sm font-normal">{data.baterryLife} mAh</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 border-b-[1px] border-gray-300 py-4">
                            <h1 className="text-sm font-normal w-40">Hỗ trợ sạc tối đa:</h1>
                            <p className="text-sm font-normal">{data.chargerCapacity} W</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}