import CategoryCard from "../CategoryCard";

export default function CategoryBox({ categories }) {
    return (
        <div className="flex justify-center gap-4 items-center mt-10">
            {categories.map(category => (
                <CategoryCard title={category.name} category={category} key={category._id} />
            ))}
        </div>
    )
}