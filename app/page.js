import HeaderBanner from "@/components/home/HeaderBanner";
import Testimonial from "@/components/home/Testimonial";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-screen min-h-screen bg-white mt-10">
      <HeaderBanner />
     <Testimonial />
    </div>
  );
}
