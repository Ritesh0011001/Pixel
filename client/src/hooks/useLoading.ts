import { useState } from "react";

function useLoading() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const startLoading = () => {
    setIsLoading(true);
  };

  const stopLoading = () => {
    setIsLoading(false);
  };
  return { isLoading, startLoading, stopLoading };
}

export default useLoading;
