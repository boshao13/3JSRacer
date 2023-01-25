import { useEffect, useState } from "react";

export const useControls = (vehicleApi, chassisApi) => {
  let [controls, setControls] = useState({ });

  // useeffect to listen for keys
  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      setControls((controls) => ({ ...controls, [e.key.toLowerCase()]: true }));
    });
    window.addEventListener("keyup", (e) => {
      setControls((controls) => ({ ...controls, [e.key.toLowerCase()]: false }));
    });
    return () => {
      window.removeEventListener("keydown", (e) => {
        setControls((controls) => ({ ...controls, [e.key.toLowerCase()]: true }));
      });
      window.removeEventListener("keyup", (e) => {
        setControls((controls) => ({ ...controls, [e.key.toLowerCase()]: false }));
      });
    }
  }, []);
  //if not rendered yet return
  useEffect(() => {
    if(!vehicleApi || !chassisApi) return;
    if (controls.w) {
      vehicleApi.applyEngineForce(150, 2);
      vehicleApi.applyEngineForce(150, 3);
    } else if (controls.s) {
      vehicleApi.applyEngineForce(-150, 2);
      vehicleApi.applyEngineForce(-150, 3);
    } else {
      vehicleApi.applyEngineForce(0, 2);
      vehicleApi.applyEngineForce(0, 3);
    }

    if (controls.a) {
      vehicleApi.setSteeringValue(0.35, 2);
      vehicleApi.setSteeringValue(0.35, 3);
      vehicleApi.setSteeringValue(-0.1, 0);
      vehicleApi.setSteeringValue(-0.1, 1);
    } else if (controls.d) {
      vehicleApi.setSteeringValue(-0.35, 2);
      vehicleApi.setSteeringValue(-0.35, 3);
      vehicleApi.setSteeringValue(0.1, 0);
      vehicleApi.setSteeringValue(0.1, 1);
    } else {
      // set all to 0
      for(let i = 0; i < 4; i++) {
        vehicleApi.setSteeringValue(0, i);
      }
    }
    // reset cars position
    if (controls.r) {
      chassisApi.position.set(-1.5, 5, 3);
      chassisApi.velocity.set(0, 0, 0);
      chassisApi.angularVelocity.set(0, 0, 0);
      chassisApi.rotation.set(0, 0, 0);
    }
  }, [controls, vehicleApi, chassisApi]);

  return controls;
}