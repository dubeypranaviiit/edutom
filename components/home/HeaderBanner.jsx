'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import { headerB } from '@/Assets/assets'; // Make sure this is an array
import Image from 'next/image';

const HeaderBanner = () => {
  return (
    <div className="w-full h-[500px] sm:h-[600px] md:h-[650px] lg:h-[700px] relative">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{ clickable: true }}
        className="w-full h-full"
      >
        {headerB.map((imgSrc, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <Image
                src={imgSrc}
                alt={`Banner ${index}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeaderBanner;
