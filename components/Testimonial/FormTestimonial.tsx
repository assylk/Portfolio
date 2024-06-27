import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const FormTestimonial = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const PRODUCTION_DOMAIN = "https://assyl-chouikh.vercel.app/";
  const DEVELOPMENT_DOMAIN = "http://localhost:3000";
  const DOMAIN =
    process.env.NODE_ENV === "production"
      ? PRODUCTION_DOMAIN
      : DEVELOPMENT_DOMAIN;

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
    <form onSubmit={handleSubmit} className="px-8 pt-6 pb-8 mb-4">
      <div className="flex">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Your Name
          </label>
          <div
            className="relative"
            style={{
              borderImage: "linear-gradient(to right, #252762, #8a80d7)",
            }}
          >
            <input
              className="shadow appearance-none w-full text-white px-3 py-2 border rounded-md leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-4 ml-3">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="email"
          >
            Your Email
          </label>
          <input
            className="px-3 py-2 border rounded-md shadow appearance-none w-full  text-white leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="testimonial"
        >
          Message
        </label>
        <textarea
          className="resize-none shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
          id="message"
          placeholder="Your Testimonial"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          disabled={loading}
          className=" bg-purple/80  text-white font-bold w-full py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </form>
  );
};

export default FormTestimonial;
