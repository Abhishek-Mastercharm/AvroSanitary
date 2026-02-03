import React from 'react';

interface WhatsAppButtonProps {
    phoneNumber?: string;
    message?: string;
    position?: 'top-right' | 'bottom-right';
    className?: string; // Allow custom overrides
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
    phoneNumber = "919501311070", // Default from HeroSection
    message = "Hello, I am interested in your products!",
    position = "top-right",
    className = ""
}) => {
    // Base classes for the button
    const baseClasses = "fixed z-50 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg p-3 sm:p-4 flex items-center justify-center transition-all duration-300 group hover:scale-110 animate-fadeInOut";

    // Position classes
    const positionClasses = position === 'top-right'
        ? "top-3 right-3 sm:top-5 sm:right-5"
        : "bottom-6 right-6";

    const finalClasses = `${baseClasses} ${positionClasses} ${className}`;

    // URL Encode the message
    const encodedMessage = encodeURIComponent(message);
    const href = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={finalClasses}
            aria-label="WhatsApp"
            title="Contact us on WhatsApp"
        >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" className="w-6 h-6 sm:w-8 sm:h-8">
                <path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.832 4.58 2.236 6.37L4 29l7.824-2.05A11.94 11.94 0 0016 27c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 22c-1.77 0-3.468-.46-4.94-1.33l-.352-.207-4.646 1.217 1.24-4.527-.23-.36A9.94 9.94 0 016 15c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10zm5.29-7.71c-.29-.145-1.71-.844-1.974-.94-.264-.096-.456-.145-.648.146-.192.29-.744.94-.912 1.134-.168.193-.336.217-.624.072-.288-.145-1.216-.448-2.318-1.428-.857-.764-1.436-1.705-1.606-1.994-.168-.29-.018-.447.127-.592.13-.13.288-.336.432-.504.144-.168.192-.29.288-.483.096-.193.048-.362-.024-.507-.072-.145-.648-1.566-.888-2.146-.234-.563-.474-.486-.648-.495-.168-.007-.36-.009-.552-.009-.192 0-.504.072-.768.362-.264.29-1.008.984-1.008 2.396 0 1.412 1.032 2.773 1.176 2.965.144.193 2.032 3.104 4.928 4.23.688.297 1.224.474 1.642.606.69.22 1.32.189 1.818.115.555-.082 1.71-.698 1.953-1.372.24-.674.24-1.252.168-1.372-.072-.12-.264-.193-.552-.338z" />
            </svg>
        </a>
    );
};

export default WhatsAppButton;
