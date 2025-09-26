'use client';
const FilterRadioGroup = ({ icon, label, options, selectedValue, onChange }) => (
  <div>
    <h3 className="font-semibold text-gray-700 text-sm mb-2 flex items-center gap-2">
      <span>{icon}</span> {label}
    </h3>
    <div className="space-y-1">
      {options.map((val) => (
        <label key={val} className="flex items-center gap-2 text-sm text-gray-600">
          <input
            type="radio"
            name={label}
            value={val}
            checked={selectedValue === val}
            onChange={() => onChange(val)}
            className="accent-blue-600"
          />
          {val}
        </label>
      ))}
    </div>
  </div>
);
export default FilterRadioGroup;

// const FilterRadioGroup = ({ label, options, selectedValue, onChange }) => {
//   return (
//     <div className="mb-6">
//       <h3 className="font-semibold text-sm text-gray-700 mb-2">{label}</h3>
//       <div className="space-y-2">
//         {options.map((value) => (
//           <label
//             key={value}
//             className="flex items-center gap-2 text-sm text-gray-600"
//           >
//             <input
//               type="radio"
//               name={label}
//               checked={selectedValue === value}
//               onChange={() => onChange(value)}
//               className="accent-blue-600"
//             />
//             {value}
//           </label>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FilterRadioGroup;