'use client'
import { FaFacebook,FaFacebookF, FaTwitter, FaInstagram, FaLinkedin,FaLinkedinIn, FaPhone } from "react-icons/fa";
import Link from "next/link";
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 w-full">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          
          {/* Brand Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">EduTome</h3>
            <p className="text-gray-400">
              Discover your next great read with EduTome — your trusted source for books and knowledge.
            </p>
          </div>

          {/* MyBook Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Help</h3>
            <ul className="text-gray-400 space-y-2">
              <li>
                <a href="/contact" className="hover:text-white transition-colors">Contact Us</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Refund & Shipping Policy</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
              </li>
            </ul>
          </div>

  
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <ul className="text-gray-400 space-y-2">
              <li>Booty More</li>
              <li>Ranchi, 834001</li>
              <li className="flex items-center gap-2">
                <FaPhone size={18} />
                <span>9430190554</span>
              </li>
              <li>Email: info@edutome.com</li>
            </ul>
          </div>

        
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
           
        <div className="flex items-center gap-4 text-white text-lg">
          <Link href="https://facebook.com" target="_blank" aria-label="Facebook">
            <FaFacebookF className="hover:text-blue-500 transition duration-300 cursor-pointer" />
          </Link>
          <Link href="https://twitter.com" target="_blank" aria-label="Twitter">
            <FaTwitter className="hover:text-sky-400 transition duration-300 cursor-pointer" />
          </Link>
          <Link href="https://instagram.com" target="_blank" aria-label="Instagram">
            <FaInstagram className="hover:text-pink-500 transition duration-300 cursor-pointer" />
          </Link>
          <Link href="https://linkedin.com" target="_blank" aria-label="LinkedIn">
            <FaLinkedinIn className="hover:text-blue-400 transition duration-300 cursor-pointer" />
          </Link>
        </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-400 text-sm">
          <p>© 2025 EduTome. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
