"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { FaStar } from "react-icons/fa";
import { bookCategories,authors,priceRanges,ratings } from "@/Assets/data";


const BookFilterSidebar = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const updateParams = (key, value, isMulti) => {
    const params = new URLSearchParams(searchParams.toString());

    if (isMulti) {
      const existing = params.getAll(key);
      if (existing.includes(value)) {
        params.delete(key);
        existing
          .filter((v) => v !== value)
          .forEach((v) => params.append(key, v));
      } else {
        params.append(key, value);
      }
    } else {
      if (params.get(key) === value) {
        // Allow unselecting radio button
        params.delete(key);
      } else {
        params.set(key, value);
      }
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  const isChecked = (key, value) => {
    const values = searchParams.getAll(key);
    return values.includes(value);
  };

  return (
    <div className="space-y-8 text-sm bg-white text-black p-4 rounded-md shadow-md">
      {/* Category */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Category</h3>
        {bookCategories.map((cat) => (
          <label key={cat} className="flex items-center mb-1 cursor-pointer">
            <input
              type="checkbox"
              className="mr-2"
              checked={isChecked("category", cat)}
              onChange={() => updateParams("category", cat, true)}
            />
            {cat}
          </label>
        ))}
      </div>

      {/* Price */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Price</h3>
        {priceRanges.map((price) => (
          <label key={price} className="flex items-center mb-1 cursor-pointer">
            <input
              type="radio"
              name="price"
              className="mr-2"
              checked={searchParams.get("price") === price}
              onClick={() => {
                if (searchParams.get("price") === price) {
                  updateParams("price", price, false); // deselect
                }
              }}
              onChange={() => {
                if (searchParams.get("price") !== price) {
                  updateParams("price", price, false); // select new
                }
              }}
            />
            {price}
          </label>
        ))}
      </div>

      {/* Author */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Author</h3>
        {authors.map((author) => (
          <label key={author} className="flex items-center mb-1 cursor-pointer">
            <input
              type="checkbox"
              className="mr-2"
              checked={isChecked("author", author)}
              onChange={() => updateParams("author", author, true)}
            />
            {author}
          </label>
        ))}
      </div>

      {/* Rating */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Rating</h3>
        {ratings.map((r) => (
          <label key={r} className="flex items-center mb-1 cursor-pointer">
            <input
              type="radio"
              name="rating"
              className="mr-2"
              checked={searchParams.get("rating") === r.toString()}
              onClick={() => {
                if (searchParams.get("rating") === r.toString()) {
                  updateParams("rating", r.toString(), false);
                }
              }}
              onChange={() => {
                if (searchParams.get("rating") !== r.toString()) {
                  updateParams("rating", r.toString(), false);
                }
              }}
            />
            <div className="flex items-center text-yellow-500">
              {[...Array(r)].map((_, i) => <FaStar key={i} />)}
              <span className="ml-1 text-gray-600">& up</span>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default BookFilterSidebar;
