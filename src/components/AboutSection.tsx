import React from 'react';

const AboutSection = () => {
  return (
    <section id="about" className="fade-in-row py-8 bg-white relative">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-charcoalBlack mb-2 sm:mb-4 md:mb-6">
          About <span className="text-goldenBronze">Us</span>
        </h2>
        <div className="mx-auto mb-2 sm:mb-4 md:mb-6 w-20 sm:w-28 md:w-32 h-1 rounded bg-gradient-to-r from-goldenBronze to-yellow-400 shadow-lg"></div>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-charcoalBlack mb-4 sm:mb-6 md:mb-8">
          AVRO Sanitaryware is committed to quality, innovation, and customer satisfaction. Our products are designed to elevate spaces with style and reliability.
        </p>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-charcoalBlack mb-4 sm:mb-6 md:mb-8">
        We blend tradition with modernity to deliver the best in sanitaryware.
        </p>
      </div>
    </section>
  );
};

export default AboutSection;
