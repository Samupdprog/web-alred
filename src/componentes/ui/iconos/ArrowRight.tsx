type ArrowIconProps = {
  size?: number;
  className?: string;
};

export function ArrowRight({
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
        d="M5 10h9M10.5 5.5 15 10l-4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
