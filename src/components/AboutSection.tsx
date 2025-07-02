import React from 'react';

const AboutSection = () => {
  return (
    <section id="about" className="fade-in-row py-20 bg-white relative">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-5xl font-extrabold text-charcoalBlack mb-2">
          About <span className="text-goldenBronze">Us</span>
        </h2>
        <div className="mx-auto mb-8 w-32 h-1 rounded bg-gradient-to-r from-goldenBronze to-yellow-400 shadow-lg"></div>
        <p className="text-xl text-charcoalBlack mb-8">
          AVRO Sanitaryware is committed to quality, innovation, and customer satisfaction. Our products are designed to elevate spaces with style and reliability.
        </p>
        <p className="text-xl text-charcoalBlack mb-8">
        We blend tradition with modernity to deliver the best in sanitaryware.
        </p>
      </div>
    </section>
  );
};

export default AboutSection;
