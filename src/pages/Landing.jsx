import React, { useEffect, useCallback } from 'react';
import Particles from 'react-particles';
import { loadSlim } from 'tsparticles-slim';
import { Button } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';

const preset = {
  name: 'Star',
  particles: {
    number: {
      value: 15,
      density: {
        enable: false,
      },
    },
    color: {
      value: '#eeffaa',
    },
    shape: {
      type: 'circle',
      options: {
        star: {
          sides: 5,
        },
      },
    },
    opacity: {
      value: 0.5,
    },
    size: {
      value: 4,
    },
    move: {
      enable: true,
      speed: 2,
    },
  },
  wobble: {
    enable: true,
    distance: 10,
    speed: 10,
  },
  zIndex: {
    value: {
      min: 0,
      max: 100,
    },
    opacityRate: 10,
    sizeRate: 10,
    velocityRate: 10,
  },
};

export default function Landing() {
  const navigate = useNavigate();

  const navtoHome = function () {
    navigate('/home');
  };
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
  }, []);
  return (
    <div
      className="w-full bg-center bg-cover h-screen flex items-center"
      style={{
        backgroundImage: "url('/landing.png')",
      }}
    >
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={preset}
      />
      <div className="flex items-center w-5/6 bg-none start-40 mx-auto">
        <div className="max-w-2xl mb-8 start-40 left-40">
          <h1 className="text-4xl font-norican leading-snug tracking-tight text-white lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight">
            WhimsWorld
          </h1>
          <p className="py-5 text-xl font-poiret leading-normal text-gray-300 lg:text-xl xl:text-2xl dark:text-gray-300">
            A web application that brings the magic of interactive storytelling to life.
          </p>

          <Button
            onClick={navtoHome}
            className="flex flex-col bg-whimsidarkblue items-start space-y-3 sm:space-x-4 sm:space-y-0 sm:items-center sm:flex-row"
          >
            Enter WhimsWorld
          </Button>
        </div>
      </div>
    </div>
  );
}
