import React from 'react';

interface NotFoundProps {
  message?: string;
}

export default function NotFound({
  message = 'The requested resource could not be found.',
}: NotFoundProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">404</h2>
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
}
