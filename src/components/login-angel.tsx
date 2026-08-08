/** Soft animated angel — decorative atmosphere only. */
export function LoginAngel({ className = "" }: { className?: string }) {
  return (
    <div
      className={`login-angel pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 160 200"
        className="h-full w-full drop-shadow-sm"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse
          className="login-angel-halo"
          cx="80"
          cy="40"
          rx="26"
          ry="9"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.55"
        />

        <g
          className="login-angel-wing-left"
          style={{ transformOrigin: "72px 90px" }}
        >
          <path
            d="M72 88c-24-8-44-2-54 14 16 0 32-4 44-10 3-8 7-12 10-4z"
            fill="currentColor"
            fillOpacity="0.12"
            stroke="currentColor"
            strokeWidth="1"
            strokeOpacity="0.45"
          />
        </g>

        <g
          className="login-angel-wing-right"
          style={{ transformOrigin: "88px 90px" }}
        >
          <path
            d="M88 88c24-8 44-2 54 14-16 0-32-4-44-10-3-8-7-12-10-4z"
            fill="currentColor"
            fillOpacity="0.12"
            stroke="currentColor"
            strokeWidth="1"
            strokeOpacity="0.45"
          />
        </g>

        <path
          d="M64 102c3 30 8 54 16 70 8-16 13-40 16-70-5-3-22-3-32 0z"
          fill="currentColor"
          fillOpacity="0.1"
          stroke="currentColor"
          strokeWidth="1"
          strokeOpacity="0.4"
        />

        <circle
          cx="80"
          cy="74"
          r="13"
          fill="currentColor"
          fillOpacity="0.1"
          stroke="currentColor"
          strokeWidth="1"
          strokeOpacity="0.45"
        />

        <path
          d="M75 114c2 5 3.5 7 5 7s3-2 5-7"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeOpacity="0.4"
        />
      </svg>
    </div>
  );
}
