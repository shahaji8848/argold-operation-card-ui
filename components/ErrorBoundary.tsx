'use client';
import React, { ReactNode, useState } from 'react';

interface ErrorFallbackProps {
  error: Error;
}

function ErrorFallback({ error }: ErrorFallbackProps) {
  return (
    <div>
      <h1>Oops! Something went wrong.</h1>
      <p>Error: {error.message}</p>
      <p>Please try again later.</p>
    </div>
  );
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

export default function ErrorBoundary({ children }: ErrorBoundaryProps) {
  const [hasError, setHasError] = useState(false);

  function handleOnError(error: Error) {
    // Update state to trigger the error fallback UI
    setHasError(true);
    // You can log the error to an error reporting service here
    console.error('Error Boundary caught an error:', error);
  }

  return hasError ? (
    <ErrorFallback error={new Error('Unknown error')} />
  ) : (
    children
  );
}
