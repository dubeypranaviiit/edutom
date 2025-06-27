'use client'
import { useState } from "react";
import {
  FaUser, FaEnvelope, FaPhone, FaShoppingCart, FaClock,
  FaMapMarkerAlt, FaChevronDown, FaSearch, FaFacebook,
  FaTwitter, FaInstagram
} from "react-icons/fa";
import { BsChatDots } from "react-icons/bs";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    orderNumber: "",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedFaq, setExpandedFaq] = useState(null);

  const faqData = [
    {
      category: "Ordering Process",
      questions: [
        {
          q: "How do I place an order?",
          a: "Browse our catalog, add items to your cart, and proceed to checkout."
        },
        {
          q: "What payment methods do you accept?",
          a: "We accept major credit cards, PayPal, and other digital wallets."
        },
        {
          q: "Can I change my order after placing it?",
          a: "Please contact support within 1 hour of placing your order."
        }
      ]
    },
    {
      category: "Shipping Information",
      questions: [
        {
          q: "How long does shipping take?",
          a: "Standard shipping takes 3–5 business days."
        },
        {
          q: "Do you offer international shipping?",
          a: "Yes, we ship worldwide with additional fees."
        },
        {
          q: "How can I track my shipment?",
          a: "You’ll receive a tracking link via email once your order ships."
        }
      ]
    },
    {
      category: "Returns and Refunds",
      questions: [
        {
          q: "What is your return policy?",
          a: "Returns are accepted within 30 days of delivery."
        },
        {
          q: "How do I initiate a return?",
          a: "Contact our support team with your order number."
        },
        {
          q: "When will I get my refund?",
          a: "Refunds are processed within 5–7 business days after receiving the return."
        }
      ]
    }
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (formData.phone && !/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = "Invalid phone number";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        alert("Form submitted successfully!");
        setFormData({ fullName: "", email: "", phone: "", orderNumber: "", message: "" });
      } catch {
        alert("Submission failed. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const filteredFAQs = faqData.map(section => ({
    ...section,
    questions: section.questions.filter(({ q, a }) =>
      q.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(section => section.questions.length);

  return (
    <div className="min-h-screen bg-white text-black px-4 sm:px-6 lg:px-8">
      <div className="text-center py-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800">Contact Us</h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          We're here to help with your book-related queries.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-10 max-w-7xl mx-auto mb-16">
        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-10 rounded-lg shadow space-y-6">
          <h2 className="text-2xl font-semibold">Send us a Message</h2>
          {[
            { label: "Full Name", name: "fullName", type: "text", icon: FaUser },
            { label: "Email", name: "email", type: "email", icon: FaEnvelope },
            { label: "Phone", name: "phone", type: "tel", icon: FaPhone },
            { label: "Order Number", name: "orderNumber", type: "text", icon: FaShoppingCart },
          ].map(({ label, name, type, icon: Icon }) => (
            <div key={name}>
              <label className="flex items-center text-gray-700 mb-2">
                <Icon className="mr-2" /> {label}{name !== 'orderNumber' && ' *'}
              </label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleInputChange}
                className={`w-full p-3 border rounded-lg ${errors[name] ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name]}</p>}
            </div>
          ))}

          <div>
            <label className="text-gray-700 mb-2 block">Message *</label>
            <textarea
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleInputChange}
              className={`w-full p-3 border rounded-lg ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
            ></textarea>
            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>

        {/* Contact Info */}
        <div className="space-y-8">
          <div className="bg-white p-6 sm:p-10 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
            {[
              { label: "123 Bookstore Street, Literary Lane, Reading City, RC 12345", icon: FaMapMarkerAlt, title: "Address" },
              { label: "support@edutom.com", icon: FaEnvelope, title: "Email" },
              { label: "1-800-BOOKS", icon: FaPhone, title: "Phone" },
              { label: "Mon–Fri: 9am–6pm, Sat: 10am–4pm", icon: FaClock, title: "Hours" },
            ].map(({ label, icon: Icon, title }) => (
              <div key={title} className="flex items-start mb-3">
                <Icon className="text-blue-600 mr-3 mt-1" />
                <div>
                  <h3 className="font-medium">{title}</h3>
                  <p className="text-gray-600 text-sm">{label}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 sm:p-10 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Follow Us</h2>
            <div className="flex space-x-4">
              {[FaFacebook, FaTwitter, FaInstagram].map((Icon, idx) => (
                <a href="#" key={idx} className="text-gray-600 hover:text-blue-600">
                  <Icon size={24} />
                </a>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg shadow">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Need help?</h3>
              <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                <BsChatDots className="mr-2" /> Live Chat
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto mb-20">
        <h2 className="text-3xl font-bold text-center mb-6">Frequently Asked Questions</h2>

        <div className="relative mb-10">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="space-y-4">
          {filteredFAQs.length ? filteredFAQs.map((section, i) => (
            <div key={i} className="bg-white shadow rounded-lg">
              <h3 className="px-6 py-4 bg-gray-100 font-semibold text-lg">{section.category}</h3>
              {section.questions.map((faq, j) => {
                const id = `${i}-${j}`;
                const isOpen = expandedFaq === id;
                return (
                  <div key={j} className="border-t">
                    <button
                      onClick={() => setExpandedFaq(isOpen ? null : id)}
                      className="w-full px-6 py-4 flex justify-between items-center text-left hover:bg-gray-50"
                    >
                      <span>{faq.q}</span>
                      <FaChevronDown className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-4 text-gray-600">{faq.a}</div>
                    )}
                  </div>
                );
              })}
            </div>
          )) : (
            <p className="text-center text-gray-500">No FAQs matched your search.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
