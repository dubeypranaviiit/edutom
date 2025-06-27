"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { FaStar, FaRegStar } from "react-icons/fa";
import { testimonials } from "@/Assets/assets";

const renderStars = (rating) => {
  return (
    <div className="flex gap-1 text-yellow-500 mt-1">
      {Array.from({ length: 5 }, (_, i) =>
        i < rating ? <FaStar key={i} /> : <FaRegStar key={i} />
      )}
    </div>
  );
};

const Testimonial = () => {
  return (
    <section className="py-24 px-4 sm:px-6 max-w-3xl mx-auto text-black">
      <h2 className="text-4xl font-bold text-center mb-16 tracking-tight">
        What Our Book Lovers Say
      </h2>

      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <div className="border border-gray-300 p-8 rounded-xl shadow-md bg-white">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover grayscale"
                />
                <div>
                  <h4 className="text-lg font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                  {renderStars(testimonial.rating)}
                </div>
              </div>
              <p className="text-sm italic text-gray-800">“{testimonial.quote}”</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Testimonial;
