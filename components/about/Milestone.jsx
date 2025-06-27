// "use client";
// import { assets } from "@/Assets/assets";
// import { motion } from "framer-motion";
// import Image from "next/image";

// const milestones = [
//   { year: "2015", title: "EduTome Launch", description: "Started with a mission to make books more accessible online." },
//   { year: "2017", title: "10K+ Books Listed", description: "Reached a milestone of over 10,000 curated books in all categories." },
//   { year: "2020", title: "Learning Platform", description: "Introduced personalized book recommendations and learning bundles." },
//   { year: "2023", title: "Global Reach", description: "Shipped books to over 25 countries and built a loyal global community." }
// ];

// const Milestone= () => {
//   return (
//     <section className="container mx-auto px-4 py-16">
//       <motion.div
//         initial={{ opacity: 0 }}
//         whileInView={{ opacity: 1 }}
//         viewport={{ once: true }}
//         className="max-w-4xl mx-auto"
//       >
//         <h2 className="text-4xl font-bold text-center mb-12">Our Story</h2>
//         <div className="grid md:grid-cols-2 gap-8 items-center">
//           <Image
//             src={assets.shelf} 
//             alt="EduTome Journey"
//             className="rounded-lg shadow-xl"
//             loading="lazy"
//           />
//           <div>
//             <p className="text-lg text-gray-700 mb-6">
//               Founded in 2015, EduTome has grown from a small idea into a thriving book platform, helping readers and learners around the world discover meaningful content.
//             </p>
//             {milestones.map((milestone, index) => (
//               <div key={index} className="flex gap-4 mb-4">
//                 <div className="text-xl font-bold text-amber-600">{milestone.year}</div>
//                 <div>
//                   <h3 className="font-semibold">{milestone.title}</h3>
//                   <p className="text-gray-600">{milestone.description}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </motion.div>
//     </section>
//   );
// };

// export default Milestone;
"use client";
import { assets } from "@/Assets/assets";
import { motion } from "framer-motion";
import Image from "next/image";

const milestones = [
  { year: "2015", title: "EduTome Launch", description: "Started with a mission to make books more accessible online." },
  { year: "2017", title: "10K+ Books Listed", description: "Reached a milestone of over 10,000 curated books in all categories." },
  { year: "2020", title: "Learning Platform", description: "Introduced personalized book recommendations and learning bundles." },
  { year: "2023", title: "Global Reach", description: "Shipped books to over 25 countries and built a loyal global community." }
];

const Milestone = () => {
  return (
    <section className="bg-white py-16 px-4">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto"
       > 
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12 tracking-tight">
          Our Story
        </h2>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Grayscale Image */}
          <Image
            src={assets.shelf}
            alt="EduTome Journey"
            className="rounded-lg shadow-xl filter grayscale"
            loading="lazy"
          />

          <div>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Founded in 2015, EduTome has grown from a small idea into a thriving book platform, helping readers and learners around the world discover meaningful content.
            </p>

            {milestones.map((milestone, index) => (
              <div key={index} className="flex gap-4 mb-5 items-start">
                <div className="text-xl font-semibold text-amber-500 min-w-[60px]">{milestone.year}</div>
                <div>
                  <h3 className="font-medium text-gray-800">{milestone.title}</h3>
                  <p className="text-sm text-gray-600">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Milestone;

