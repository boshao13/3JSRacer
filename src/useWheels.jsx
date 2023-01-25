import { useCompoundBody } from "@react-three/cannon";
import { useRef } from "react";

export const useWheels = (width, height, front, radius) => {
  const wheels = [useRef(null), useRef(null), useRef(null), useRef(null)];

  //standard settings, try friction slip to debug
  const wheelInfo = {
    radius,
    directionLocal: [0, -1, 0],
    axleLocal: [1, 0, 0],
    suspensionStiffness: 80,
    suspensionRestLength: 0.1,
    frictionSlip: 5,
    dampingRelaxation: 2.3,
    dampingCompression: 4.4,
    maxSuspensionForce: 100000,
    rollInfluence: 0.01,
    maxSuspensionTravel: 0.2,
    customSlidingRotationalSpeed: -30,
    useCustomSlidingRotationalSpeed: true,
  };
  const wheelProps = () => ({
    collisionFilterGroup: 0,
    mass: 1,
    shapes: [{
      //must be kinematic
        args: [wheelInfo.radius, wheelInfo.radius, 0.015, 16],
        rotation: [0, 0, -Math.PI / 2],
        type: "Cylinder"}],type: "Kinematic",
  });


  const wheelArgs = [
    {...wheelInfo,
      chassisConnectionPointLocal: [-width * 0.65, height * 0.4, front],
      isFrontWheel: true,
    },
    {...wheelInfo,
      chassisConnectionPointLocal: [width * 0.65, height * 0.4, front],
      isFrontWheel: true,
    },
    {...wheelInfo,
      chassisConnectionPointLocal: [-width * 0.65, height * 0.4, -front],
      isFrontWheel: false,
    },
    { ...wheelInfo,
      chassisConnectionPointLocal: [width * 0.65, height * 0.4, -front],
      isFrontWheel: false,
    },
  ];

  // invoke to attach
  useCompoundBody(wheelProps, wheels[0]);
  useCompoundBody(wheelProps, wheels[1]);
  useCompoundBody(wheelProps, wheels[2]);
  useCompoundBody(wheelProps, wheels[3]);

  return [wheels, wheelArgs];
};