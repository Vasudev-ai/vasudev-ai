
export default function Logo() {
  return (
    <div className="flex flex-row items-center justify-center gap-2">
      <svg
        className="h-7 w-7 text-primary"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 4l8 16 8-16"
        />
      </svg>
      <span className="text-xl font-bold font-headline bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
        Vasudev AI
      </span>
    </div>
  );
}
