'use client';

const ECategoryFilter = ({ selected, onChange, categories }) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-6">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onChange(category)}
          aria-pressed={selected === category}
          className={`px-4 py-2 rounded-full border font-medium transition-all duration-200 ${
            selected === category
              ? "bg-indigo-600 text-white shadow-md"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default ECategoryFilter;
