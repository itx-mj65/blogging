import React from "react";

function LatestBlogsHeader({props}) {
  return (
    <div className="max-w-5xl mx-auto px-4 text-center mb-8">
      <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-gray-900">
       {props.title}
      </h2>
      <div className="flex justify-center mt-2 mb-4">
        <span className="block w-16 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full"></span>
      </div>
      <p className="text-lg sm:text-xl text-gray-600">
        {props.desc}
      </p>
    </div>
  );
}

export default LatestBlogsHeader;
