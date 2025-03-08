'use client';
import React, { useEffect, useState } from 'react';

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
      <video autoPlay muted loop className="w-[100px] h-[100px]">
        <source src="/assets/pulse.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default Loading;
