'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const Loading = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/80">
      <Image
        src="/assets/pulse.gif"
        alt="Loading animation"
        className="object-contain"
        fill
        priority
        data-testid="loading-video"
        sizes="(max-width: 1024px) 100vw, 1024px"
      />
    </div>
  );
};

export default Loading;
