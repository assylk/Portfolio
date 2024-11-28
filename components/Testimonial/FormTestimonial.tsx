import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { DOMAIN } from "@/utils/constant";
const FormTestimonial = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (name === "") return toast.error("Username is Required");
    if (email === "") return toast.error("Email is Required");
    if (message === "") return toast.error("Message is Required");
    try {
      setLoading(true);
      await axios.post(`${DOMAIN}/api/message`, {
        name,
        email,
        message,
      });
      setLoading(false);

      return new Promise((resolve, reject) => {
        toast.success("Message Sent Successfully!", {
          onClose: () => resolve(true), // Resolve when toast is closed
        });
      });
    } catch (error: any) {
      toast.error(error?.response?.data.message);
      console.log(error?.response?.data.message);
      setLoading(false);
    }

    // Clear form fields after submission
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto px-8 pt-6 pb-8 mb-4 bg-gray-900/50 backdrop-blur-sm rounded-xl shadow-xl border border-purple/30"
    >
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label
            className="block text-purple-300 text-sm font-medium mb-2"
            htmlFor="name"
          >
            Your Name
          </label>
          <input
            className="w-full bg-gray-800/50 text-white px-4 py-3 rounded-lg border border-purple/30 
                     focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none
                     transition-all duration-200 placeholder-gray-400"
            id="name"
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex-1">
          <label
            className="block text-purple-300 text-sm font-medium mb-2"
            htmlFor="email"
          >
            Your Email
          </label>
          <input
            className="w-full bg-gray-800/50 text-white px-4 py-3 rounded-lg border border-purple/30 
                     focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none
                     transition-all duration-200 placeholder-gray-400"
            id="email"
            type="email"
            placeholder="john@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-6">
        <label
          className="block text-purple-300 text-sm font-medium mb-2"
          htmlFor="testimonial"
        >
          Message
        </label>
        <textarea
          className="w-full bg-gray-800/50 text-white px-4 py-3 rounded-lg border border-purple/30 
                   focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none
                   transition-all duration-200 placeholder-gray-400 min-h-[120px]"
          id="message"
          placeholder="Share your thoughts..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <div className="mt-8">
        <button
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900
                   text-white font-medium py-3 px-6 rounded-lg transition-all duration-200
                   disabled:opacity-50 disabled:cursor-not-allowed
                   focus:ring-2 focus:ring-purple-500/20 focus:outline-none
                   shadow-lg hover:shadow-purple-500/20"
          type="submit"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Sending...
            </span>
          ) : (
            "Send Message"
          )}
        </button>
      </div>
    </form>
  );
};

export default FormTestimonial;
