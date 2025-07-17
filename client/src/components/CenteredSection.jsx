import React from "react";

const CenteredSection = ({props}) => (
  <section className="py-12 ">
    <div className="max-w-3xl mx-auto text-center px-4">
      <h2 className="text-3xl font-semibold mb-4">{props.title}</h2>
      <p className="text-lg text-gray-600">
      {props.desc}
      </p>
    </div>
  </section>
);

export default CenteredSection;
