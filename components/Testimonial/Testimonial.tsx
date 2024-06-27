// components/TestimonialForm.js

import React from "react";
import FormTestimonial from "./FormTestimonial";

const TestimonialForm = () => {
  return (
    <div className="max-w-xl mx-auto h-screen">
      <h1 className="heading lg:max-w-[45vw] mb-10">
        Leave a <span className="text-purple">Testimonial</span>
      </h1>
      <FormTestimonial />
    </div>
  );
};

export default TestimonialForm;
