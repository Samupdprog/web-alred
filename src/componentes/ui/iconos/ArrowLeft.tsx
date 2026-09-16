type ArrowIconProps = {
  size?: number;
  className?: string;
};

export function ArrowLeft({
  size = 18,
  className,
}: ArrowIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className={className}
      focusable="false"
    >
      <path
        d="M15 10H6m3.5-4.5L5 10l4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
