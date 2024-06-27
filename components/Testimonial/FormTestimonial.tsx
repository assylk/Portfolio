import React, { useState } from "react";
import axios from "axios";
const FormTestimonial = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  interface FormData {
    name: string;
    email: string;
    message: string;
  }
  const handleSubmit = async (e: any) => {
    const DOMAIN = "http://localhost:3000";
    e.preventDefault();

    // Handle form submission logic here (e.g., send data to server)
    await axios.post(`${DOMAIN}/api/message`, { name, email, message });
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
              required
            />
          </div>
        </div>
        <div className="mb-4 ml-3">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Your Email
          </label>
          <input
            className="px-3 py-2 border rounded-md shadow appearance-none w-full  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
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
          className="resize-none shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="testimonial"
          placeholder="Your Testimonial"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className=" bg-purple/80  text-white font-bold w-full py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Send
        </button>
      </div>
    </form>
  );
};

export default FormTestimonial;
