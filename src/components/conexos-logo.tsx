interface ConexosLogoProps {
  size?: number;
  className?: string;
  variant?: 'gradient' | 'solid' | 'white';
}

export default function ConexosLogo({
  size = 40,
  className = "",
  variant = 'gradient'
}: ConexosLogoProps) {
  const gradientId = `conexos-gradient-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* Gradiente Naranja → Rosa */}
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(15, 100%, 60%)" />
          <stop offset="100%" stopColor="hsl(330, 100%, 58%)" />
        </linearGradient>

        {/* Filtro de glow */}
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Red de conexión minimalista - 6 nodos en hexágono */}
      <g filter={variant === 'gradient' ? 'url(#glow)' : undefined}>
        {/* Nodo central */}
        <circle
          cx="50"
          cy="50"
          r="8"
          fill={variant === 'white' ? 'white' : `url(#${gradientId})`}
          opacity={variant === 'solid' ? 0.9 : 1}
        />

        {/* 6 nodos exteriores en círculo */}
        {[0, 60, 120, 180, 240, 300].map((angle, i) => {
          const radian = (angle * Math.PI) / 180;
          const x = 50 + 30 * Math.cos(radian);
          const y = 50 + 30 * Math.sin(radian);

          return (
            <g key={angle}>
              {/* Línea conectando al centro */}
              <line
                x1="50"
                y1="50"
                x2={x}
                y2={y}
                stroke={variant === 'white' ? 'white' : `url(#${gradientId})`}
                strokeWidth="2.5"
                opacity={variant === 'gradient' ? 0.6 : 0.4}
                strokeLinecap="round"
              />

              {/* Nodo exterior */}
              <circle
                cx={x}
                cy={y}
                r="6"
                fill={variant === 'white' ? 'white' : `url(#${gradientId})`}
                opacity={variant === 'solid' ? 0.8 : 0.95}
              />
            </g>
          );
        })}

        {/* Conexiones entre nodos exteriores (formando hexágono) */}
        {[0, 60, 120, 180, 240, 300].map((angle, i) => {
          const radian1 = (angle * Math.PI) / 180;
          const radian2 = ((angle + 60) * Math.PI) / 180;
          const x1 = 50 + 30 * Math.cos(radian1);
          const y1 = 50 + 30 * Math.sin(radian1);
          const x2 = 50 + 30 * Math.cos(radian2);
          const y2 = 50 + 30 * Math.sin(radian2);

          return (
            <line
              key={`connection-${angle}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={variant === 'white' ? 'white' : `url(#${gradientId})`}
              strokeWidth="2"
              opacity={0.3}
              strokeLinecap="round"
            />
          );
        })}

        {/* Centro brillante */}
        <circle
          cx="50"
          cy="50"
          r="3"
          fill="white"
          opacity={variant === 'white' ? 0.8 : 0.9}
        />
      </g>
    </svg>
  );
}
