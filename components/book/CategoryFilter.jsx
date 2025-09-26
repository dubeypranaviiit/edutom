'use client';

const CategoryFilter = ({ selected, onChange, categories }) => {
  return (
    <div className="flex flex-wrap gap-3 mb-6">
   

      {categories && categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`px-4 py-2 rounded-full border font-medium transition ${
            selected === cat
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
