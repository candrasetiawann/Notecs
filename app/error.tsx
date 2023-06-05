"use client"
import { useEffect } from "react";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function ErrorComponent({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col justify-center my-auto">
      <h2 className="text-center">Something went wrong!</h2>
      <button className="px-4 py-2 rounded-sm bg-red-600 text-white mx-auto" onClick={reset}>Try again</button>
    </div>
  );
}
