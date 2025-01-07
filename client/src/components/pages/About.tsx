import React from 'react';

const About: React.FC = () => (
  <div className="prose lg:prose-xl mx-auto">
    <h1 className="text-4xl font-display text-slime">About Super Kid Slimes</h1>
    <p>
      Welcome to Super Kid Slimes! We're passionate about creating the most amazing,
      safe, and fun slimes for kids of all ages. Our slimes are handcrafted with
      love and care, using only the highest quality ingredients that are safe for
      children.
    </p>
    <p>
      Every slime we make is thoroughly tested to ensure it provides the perfect
      balance of stretch, squish, and satisfaction. We believe in sparking creativity
      and bringing joy through the magical world of slime!
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
      <div className="card">
        <h2 className="text-2xl font-display text-fun-purple mb-4">Our Mission</h2>
        <p className="text-gray-600">
          To create the most amazing, safe, and fun slimes that inspire creativity
          and bring joy to kids everywhere.
        </p>
      </div>
      <div className="card">
        <h2 className="text-2xl font-display text-fun-blue mb-4">Quality Promise</h2>
        <p className="text-gray-600">
          We use only the highest quality ingredients and thoroughly test each
          batch for safety and fun factor.
        </p>
      </div>
    </div>
  </div>
);

export default About; 