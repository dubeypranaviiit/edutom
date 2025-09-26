'use client';
const FilterCheckboxGroup = ({ icon, label, options, selectedValues, onChange }) => (
  <div>
    <h3 className="font-semibold text-gray-700 text-sm mb-2 flex items-center gap-2">
      <span>{icon}</span> {label}
    </h3>
    <div className="flex flex-wrap gap-2">
      {options.map((val) => (
        <label
          key={val}
          className="flex items-center gap-1 text-xs bg-gray-100 px-3 py-1 rounded-full cursor-pointer hover:bg-blue-100 transition"
        >
          <input
            type="checkbox"
            checked={selectedValues.includes(val)}
            onChange={() => onChange(val)}
            className="accent-blue-600"
          />
          {val}
        </label>
      ))}
    </div>
  </div>
);
export default FilterCheckboxGroup;

// const FilterCheckboxGroup = ({ label, options, selectedValues, onChange }) => {
//   return (
//     <div className="mb-6">
//       <h3 className="font-semibold text-sm text-gray-700 mb-2">{label}</h3>
//       <div className="flex flex-wrap gap-2">
//         {options.map((value) => (
//           <label
//             key={value}
//             className="flex items-center gap-2 text-sm text-gray-600 border px-3 py-1 rounded-full hover:bg-gray-100 cursor-pointer"
//           >
//             <input
//               type="checkbox"
//               checked={selectedValues.includes(value)}
//               onChange={() => onChange(value)}
//               className="accent-blue-600 hidden"
//             />
//             <span>{value}</span>
//           </label>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FilterCheckboxGroup;