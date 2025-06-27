// components/ServiceBanner.tsx
'use client'
import { Truck, Wallet, BadgeCheck, RefreshCw } from 'lucide-react'

const Banner= ()=> {
  const services = [
    {
      icon: <Truck className="w-6 h-6" />,
      title: 'Free Delivery',
    },
    {
      icon: <Wallet className="w-6 h-6" />,
      title: 'Cash on Delivery',
    },
    {
      icon: <BadgeCheck className="w-6 h-6" />,
      title: 'Original Products',
    },
    {
      icon: <RefreshCw className="w-6 h-6" />,
      title: 'Easy Replacement',
    },
  ]

  return (
    <div className="bg-emerald-500 py-6 text-white">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {services.map((service, index) => (
          <div key={index} className="flex flex-col items-center justify-center space-y-2">
            <div>{service.icon}</div>
            <span className="font-semibold text-sm sm:text-base">{service.title}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
export default Banner;
