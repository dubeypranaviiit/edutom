'use client';

import { Popover } from '@headlessui/react';
import { FiChevronDown } from 'react-icons/fi';

const categories = ['Fiction', 'Non-Fiction', 'Comics', 'Romance', 'Science'];

export default function CategoryPopover() {
  return (
    <Popover className="relative">
      <Popover.Button className="flex items-center gap-1 text-gray-800 font-medium hover:text-blue-600">
        Categories
        <FiChevronDown />
      </Popover.Button>

      <Popover.Panel className="absolute z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black/5 p-3 space-y-2">
        {categories.map((cat, idx) => (
          <a
            key={idx}
            href={`/categories/${cat.toLowerCase()}`}
            className="block px-3 py-1 rounded hover:bg-blue-100 text-sm text-gray-700"
          >
            {cat}
          </a>
        ))}
      </Popover.Panel>
    </Popover>
  );
}
