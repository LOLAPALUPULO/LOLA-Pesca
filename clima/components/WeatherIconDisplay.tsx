import React from 'react';

interface WeatherIconDisplayProps {
  condition: string;
}

const WeatherIconDisplay: React.FC<WeatherIconDisplayProps> = ({ condition }) => {
  const normalizedCondition = condition.toLowerCase();

  let icon: React.ReactNode;
  let ariaLabel: string;
  let animationClass = '';

  // Tailwind CSS keyframe animations (these need to be defined in your CSS, e.g., index.html style block or a main CSS file)
  // For this example, I'll use common utility classes which Tailwind's JIT should handle,
  // but for custom animations like 'spin-slow' or 'float-cloud', they'd need to be declared.
  // I'll define them inline for quick demonstration but a CSS file would be better for complex ones.

  // Define custom keyframes for animations (conceptually in a CSS file or via Tailwind config)
  // For simplicity and immediate effect, I'm using generic Tailwind classes where possible
  // For specific animations like `animate-float-cloud` or `animate-rain-fall`,
  // you'd typically extend your `tailwind.config.js` or define them directly in a `<style>` tag.

  const commonIconProps = {
    className: `w-32 h-32 md:w-48 md:h-48 text-yellow-500 transition-all duration-500 ease-in-out`,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1", // Reduced stroke width for a lighter look
    strokeLinecap: "round",
    strokeLinejoin: "round",
    'aria-hidden': "true", // Hide from screen readers, as text summary will provide full info
  };


  switch (true) {
    case normalizedCondition.includes('soleado'):
    case normalizedCondition.includes('despejado'):
      icon = (
        <svg {...commonIconProps} className={`${commonIconProps.className} text-yellow-500 animate-[spin_60s_linear_infinite]`} aria-label="Soleado">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      );
      ariaLabel = 'Soleado';
      break;

    case normalizedCondition.includes('nublado'):
    case normalizedCondition.includes('nubes'):
      icon = (
        <svg {...commonIconProps} className={`${commonIconProps.className} text-gray-400 animate-[wiggle_4s_ease-in-out_infinite]`} aria-label="Nublado">
          <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
        </svg>
      );
      ariaLabel = 'Nublado';
      break;

    case normalizedCondition.includes('lluvia'):
    case normalizedCondition.includes('chubascos'):
      icon = (
        <svg {...commonIconProps} className={`${commonIconProps.className} text-blue-500 animate-[bounce_1s_ease-in-out_infinite_alternate]`} aria-label="Lluvia">
          <path d="M16 13V9a4 4 0 1 0-8 0v4"></path>
          <path d="M12 17v5"></path>
          <path d="M12 12l-.29-2.84c-.07-.62-.31-1.22-.67-1.78l-1.38-2.12c-.52-.8-1.2-1.42-1.99-1.88a7.002 7.002 0 0 0-2.43-.88l-1.63-.22c-.37-.05-.73-.13-1.09-.23"></path>
          <line x1="12" y1="19" x2="12" y2="21"></line>
          <line x1="8" y1="17" x2="8" y2="19"></line>
          <line x1="16" y1="17" x2="16" y2="19"></line>
        </svg>
      );
      ariaLabel = 'Lluvia';
      break;

    case normalizedCondition.includes('nieve'):
    case normalizedCondition.includes('nevada'):
      icon = (
        <svg {...commonIconProps} className={`${commonIconProps.className} text-blue-300 animate-[pulse_2s_ease-in-out_infinite]`} aria-label="Nieve">
          <path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"></path>
          <line x1="8" y1="16" x2="8.01" y2="16"></line>
          <line x1="8" y1="20" x2="8.01" y2="20"></line>
          <line x1="12" y1="18" x2="12.01" y2="18"></line>
          <line x1="12" y1="22" x2="12.01" y2="22"></line>
          <line x1="16" y1="16" x2="16.01" y2="16"></line>
          <line x1="16" y1="20" x2="16.01" y2="20"></line>
        </svg>
      );
      ariaLabel = 'Nieve';
      break;

    case normalizedCondition.includes('tormenta'):
      icon = (
        <svg {...commonIconProps} className={`${commonIconProps.className} text-gray-600 animate-[flash_0.8s_ease-in-out_infinite]`} aria-label="Tormenta">
          <path d="M14 20v-4a2 2 0 0 1 2-2h4l-7-7-7 7h4a2 2 0 0 1 2 2v4"></path>
          <line x1="10" y1="18" x2="14" y2="18"></line>
          <path d="M12 2v-2"></path>
          <path d="M4 17a4 4 0 0 0 4 4h4a4 4 0 0 0 4-4v-2"></path>
          <path d="M20 17a4 4 0 0 0-4-4h-4a4 4 0 0 0-4 4v2"></path>
        </svg>
      );
      ariaLabel = 'Tormenta';
      break;

    default:
      icon = (
        <svg {...commonIconProps} className={`${commonIconProps.className} text-gray-300`} aria-label="Condición desconocida">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="10" y1="10" x2="14" y2="14"></line>
          <line x1="14" y1="10" x2="10" y2="14"></line>
        </svg>
      );
      ariaLabel = 'Condición desconocida';
      break;
  }

  return (
    <div className="flex justify-center items-center mb-6" role="img" aria-label={`Icono de clima: ${ariaLabel}`}>
      {icon}
      {/* Custom Tailwind CSS animations must be configured in tailwind.config.js
          or declared directly in CSS. For demonstration purposes, I'm using
          the JIT compiler's ability to handle arbitrary values for 'animate',
          but in a real project, these would be explicitly defined for better control. */}
      <style>{`
        @keyframes wiggle {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-\\[wiggle_4s_ease-in-out_infinite\\] {
          animation: wiggle 4s ease-in-out infinite;
        }
        @keyframes flash {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
        .animate-\\[flash_0\\.8s_ease-in-out_infinite\\] {
          animation: flash 0.8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default WeatherIconDisplay;
