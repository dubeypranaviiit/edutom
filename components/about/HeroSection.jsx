"use client";
import Image from "next/image";
import { assets } from "@/Assets/assets";

const HeroSection = () => {
  return (
    <div className="bg-white">
   
      <div className="h-[50vh] w-full overflow-hidden">
     <Image
  src={assets.about}
  alt="about us"
  className="w-full h-full object-cover mt-10 my-20" 
  loading="lazy"
/>
      </div>

   
      <div className="max-w-5xl mx-auto px-6 py-12 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-black mb-6 tracking-wide">
          EduTom
        </h1>
        <p className="text-black text-sm md:text-lg leading-relaxed">
          🌟 A World of Books, All in One Place.
          <br />
          At Book Haven, we offer a carefully curated collection for every type of reader.
          Whether you enjoy classic literature, trending bestsellers, gripping mysteries, or heartwarming romances,
          we have something that suits your taste.
          <br className="hidden md:block" />
          Our library also includes inspiring biographies, self-help guides, educational non-fiction, science, history, and more.
          Whether you're reading for fun, learning, or escape — you'll find books that connect with you.
          Discover new titles and authors as you explore our ever-growing selection today.
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
