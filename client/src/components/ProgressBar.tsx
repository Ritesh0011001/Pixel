import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";

function ProgressBar() {
  const [progress, setProgress] = useState(13);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex justify-center items-center pb-96">
      <Progress value={progress} className="w-[60%]" />
    </div>
  );
}

export default ProgressBar;
