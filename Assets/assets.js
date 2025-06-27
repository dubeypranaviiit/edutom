import auth from "./auth.jpg"
import logo from "./logo.jpeg"
import about from "./about.jpeg"
import shelf from "./shelf.jpeg"
import book1 from "./book_1.jpg"
import book2 from "./book_2.jpg"
import book3 from "./book_4.jpeg"
export const assets = {
 auth,logo,about,shelf
    }
    import {
  FiUser,
  FiShoppingBag,
  FiHeart,
  FiSettings,
  FiCheckCircle,
  FiXCircle,
  FiMapPin,
  FiPlus,
  FiLogOut,
} from "react-icons/fi";
export const headerB=[
book1,book2,book3
]
 export const links = [
    {
     label: "Account Setting",
    children: [
         { href: "/profile", label: "Profile Information", icon: <FiPlus /> },
      { href: "/profile/addresses", label: "Manage Addresses", icon: <FiMapPin /> },
     
    ],
  },
  {
    label: "Orders",
    children: [
      { href: "/profile/orders", label: "All Orders", icon: <FiShoppingBag /> },
      { href: "/profile/orders/completed", label: "Completed", icon: <FiCheckCircle /> },
      { href: "/profile/orders/cancelled", label: "Cancelled", icon: <FiXCircle /> },
    ],
  },

  
  { href: "/profile/wishlist", label: "Wishlist", icon: <FiHeart /> },
  { href: "/profile/settings", label: "Settings", icon: <FiSettings /> },
  { href: "/logout", label: "Logout", icon: <FiLogOut /> },
];
export const testimonials = [
  {
    name: "Neha Sharma",
    role: "Avid Reader",
    rating: 5,
    quote: "This site is a paradise for book lovers. The recommendations are always on point, and the delivery is super fast!",
    image: "https://randomuser.me/api/portraits/women/21.jpg",
  },
  {
    name: "Rohan Das",
    role: "College Student",
    rating: 4,
    quote: "I found rare books here that I couldn’t find elsewhere. The collection is vast and well-organized.",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    name: "Priya Nair",
    role: "Book Blogger",
    rating: 5,
    quote: "From fiction to self-help, every book I’ve bought has arrived in perfect condition. I highly recommend it!",
    image: "https://randomuser.me/api/portraits/women/58.jpg",
  },
];
