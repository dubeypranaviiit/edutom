import HeaderBanner from "@/components/home/HeaderBanner";
import Testimonial from "@/components/home/Testimonial";
import Image from "next/image";
import BookHome from "@/components/book/BookHome";
import EBookHome from "@/components/book/e-book/EBookHome";
import TopRatedBooks from "@/components/book/TopRatedBooks";
import NewArrivalBooks from "@/components/book/NewArrivalBooks";
import DealOfTheDay from "@/components/book/DealofTheDay";
export default function Home() {
  return (
    <div className="w-screen min-h-screen bg-white mt-10">
      <HeaderBanner />
      <BookHome />
      <EBookHome />
      <TopRatedBooks />
      <NewArrivalBooks />
      <DealOfTheDay />
     <Testimonial />
    </div>
  );
}
