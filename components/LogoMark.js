export default function LogoMark({ size = 32 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M20 4 C11.2 4 4 11.2 4 20"
        stroke="#4B3FF2"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M4 20 C4 28.8 11.2 36 20 36 C25.3 36 30 33.4 32.9 29.4"
        stroke="#0E9C8C"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M36 20 C36 11.2 28.8 4 20 4"
        stroke="#14161C"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.15"
      />
      <path d="M18.5 1.5 L23 4 L18.5 6.5 Z" fill="#4B3FF2" />
      <path d="M35.8 32 L32.4 29 L36.6 27.8 Z" fill="#0E9C8C" />
      <circle cx="20" cy="20" r="4.5" fill="#14161C" />
    </svg>
  );
}
