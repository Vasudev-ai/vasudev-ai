import { BrainCircuit } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <BrainCircuit className="h-7 w-7 text-primary" />
      <span className="text-xl font-bold font-headline bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
        Vasudev AI
      </span>
    </div>
  );
}
