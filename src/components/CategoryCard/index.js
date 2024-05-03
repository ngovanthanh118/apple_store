import { useNavigate } from "react-router-dom"

export default function CategoryCard({ category }) {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col gap-2 justify-center items-center bg-[#323232] rounded-2xl cursor-pointer" onClick={() => navigate(`/category/${category.url}/${category._id}`)}>
            <img className="w-full h-auto" src={process.env.REACT_APP_API_URL + '/images/' + category.image} alt='Anh' />
            <p className="text-white py-3 font-normal text-base">{category.name}</p>
        </div>
    )
}