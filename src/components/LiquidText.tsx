import React from 'react';

interface LiquidTextProps {
  text: string;
  className?: string;
  gradientFrom?: string;
  gradientTo?: string;
  fontSize?: number;
  speed?: number;
}

const LiquidText: React.FC<LiquidTextProps> = ({
  text,
  className = '',
  gradientFrom = '#ef4444',
  gradientTo = '#7f1d1d',
  fontSize = 17,
  speed = 1.5,
}) => {
  const id = React.useId().replace(/:/g, '');

  return (
    <svg
      viewBox="0 0 100 20"
      className={className}
      style={{ overflow: 'visible', display: 'inline-block' }}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id={`gradient-${id}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="5%" stopColor={gradientFrom} />
          <stop offset="95%" stopColor={gradientTo} />
        </linearGradient>
        <pattern
          id={`wave-${id}`}
          x="0"
          y="-2"
          width="120"
          height="24"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M-40 9 Q-30 7 -20 9 T0 9 T20 9 T40 9 T60 9 T80 9 T100 9 T120 9 V24 H-40z"
            fill={`url(#gradient-${id})`}
          >
            <animateTransform
              attributeName="transform"
              begin="0s"
              dur={`${speed}s`}
              type="translate"
              from="0,0"
              to="40,0"
              repeatCount="indefinite"
            />
          </path>
        </pattern>
      </defs>
      <text
        textAnchor="middle"
        x="50"
        y="15"
        fontSize={fontSize}
        fill={`url(#wave-${id})`}
        fillOpacity="0.8"
        fontWeight="bold"
        fontFamily="'Space Grotesk', sans-serif"
      >
        {text}
      </text>
      <text
        textAnchor="middle"
        x="50"
        y="15"
        fontSize={fontSize}
        fill={`url(#gradient-${id})`}
        fillOpacity="0.15"
        fontWeight="bold"
        fontFamily="'Space Grotesk', sans-serif"
      >
        {text}
      </text>
    </svg>
  );
};

export default LiquidText;
