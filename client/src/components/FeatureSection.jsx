import React from "react";

function FeatureSection() {
  return (
    <section className="py-16 ">
      <div className=" px-12 mx-auto  grid grid-cols-1 md:grid-cols-2 items-center gap-8">
        {/* Left side: Image */}
        <div>
          <img
            src="https://res.cloudinary.com/dutqyxxou/image/upload/v1752745533/product-design-drawing-website-graphic_1_y9ocxf.jpg"
            alt="Feature"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
        {/* Right side: Text and Button */}
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-gray-900">
            Discover the Latest Insights
          </h2>
          <p className="text-lg text-gray-700">
            Stay ahead with our handpicked blog posts—curated for inspiration, clarity, and impact.
          </p>
          <button className="inline-block bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition">
            Explore All Posts
          </button>
        </div>
      </div>
    </section>
);
}

export default FeatureSection;
