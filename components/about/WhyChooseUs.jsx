import React from "react";
import {
  FaBookOpen,
  FaTags,
  FaShippingFast,
  FaStar,
  FaHeadset
} from "react-icons/fa";

const WhyChooseUs = () => {
  const reasons = [
    {
      icon: <FaBookOpen className="w-8 h-8 text-amber-500" />,
      title: "Curated Collection",
      description: "From timeless classics to trending titles — we handpick books that readers love."
    },
    {
      icon: <FaTags className="w-8 h-8 text-amber-500" />,
      title: "Affordable Pricing",
      description: "Enjoy competitive prices, regular discounts, and great value for every purchase."
    },
    {
      icon: <FaShippingFast className="w-8 h-8 text-amber-500" />,
      title: "Fast & Safe Delivery",
      description: "Get your books delivered quickly and securely, right to your doorstep."
    },
    {
      icon: <FaStar className="w-8 h-8 text-amber-500" />,
      title: "Trusted by Thousands",
      description: "Rated highly by our growing community of passionate readers and learners."
    },
    {
      icon: <FaHeadset className="w-8 h-8 text-amber-500" />,
      title: "Friendly Support",
      description: "Have a question? Our dedicated team is here to help, anytime."
    }
  ];

  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        {/* Left Side - Image */}
        <div className="lg:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1512820790803-83ca734da794"
            alt="Stack of books"
            className="rounded-lg shadow-xl w-full object-cover transform transition-transform duration-300 hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* Right Side - Reasons */}
        <div className="lg:w-1/2">
          <h2 className="text-4xl font-bold mb-8 text-gray-800">
            Why Readers Love EduTom
          </h2>
          <div className="grid gap-6">
            {reasons.map((reason, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 rounded-lg transition-all duration-300 hover:bg-amber-50 hover:shadow-md"
              >
                <div className="flex-shrink-0 mt-1">{reason.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">
                    {reason.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{reason.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
