// components/Loader.jsx
import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-white">
      <DotLottieReact
        src="https://lottie.host/85a29146-c85b-49eb-ab39-d17e09f34f92/7xq87X7uwm.lottie"
        loop
        autoplay
        style={{ width: 200, height: 200 }}
      />
    </div>
  );
};

export default Loader;
