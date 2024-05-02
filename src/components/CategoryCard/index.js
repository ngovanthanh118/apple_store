export default function CategoryCard({ category }) {
    return (
        <div className="flex flex-col gap-2 justify-center items-center bg-[#323232] rounded-2xl">
            <img className="w-full h-auto" src={process.env.REACT_APP_API_URL + '/images/' + category.image} alt='Anh' />
            <p className="text-white py-3 font-normal text-base">{category.name}</p>
        </div>
    )
}