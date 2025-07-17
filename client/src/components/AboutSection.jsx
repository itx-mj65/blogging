import React from "react";
import LatestBlogsHeader from "./LatestBlogsHeader";

function AboutSection() {


    return (
        <section className="py-16 bg-white">
            <div className="max-w-4xl mx-auto px-4 text-center">
                
                    <LatestBlogsHeader props={{ title: "Welcome to Mind Drape", desc: " Unfolding inspiration, one meaningful post at a time — weaving stories that spark ideas and leave a lasting impression." }} />
               
                <div className="grid grid-cols-1 sm:grid-cols-3 md:gap-49 gap-14">
                    {/* Vision */}
                    <div className="space-y-2">
                        <img
                            src="https://static.thenounproject.com/png/2032217-200.png"
                            alt="Vision Icon"
                            className="mx-auto w-20 h-20"
                        />
                        <h3 className="font-semibold">Our Vision</h3>
                        <p className="text-gray-600 text-sm">To ignite a spark in every mind we touch.</p>
                    </div>
                    {/* Voice */}
                    <div className="space-y-2">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/1177/1177568.png"
                            alt="Voice Icon"
                            className="mx-auto w-20 h-20"
                        />
                        <h3 className="font-semibold">Our Voice</h3>
                        <p className="text-gray-600 text-sm">Authentic, warm, and always uplifting.</p>
                    </div>
                    {/* Promise */}
                    <div className="space-y-2">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/833/833472.png"
                            alt="Promise Icon"
                            className="mx-auto w-20 h-20"
                        />
                        <h3 className="font-semibold">Our Promise</h3>
                        <p className="text-gray-600 text-sm">Inspiration and insight in every scroll.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutSection;
