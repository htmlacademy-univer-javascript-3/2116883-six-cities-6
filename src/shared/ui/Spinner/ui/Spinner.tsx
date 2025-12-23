import type { FC } from 'react';

const Spinner: FC = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px',
      gap: '12px',
    }}
  >
    <svg width={48} height={48} viewBox="0 0 50 50" aria-label="Loading">
      <circle
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke="#4481c3"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="50"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 25 25"
          to="360 25 25"
          dur="1s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
    <span>Loading...</span>
  </div>
);

export default Spinner;
