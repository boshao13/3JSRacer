import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";
import { Car } from "./Car";
import { Ground } from "./Ground";
import { Track } from "./Track";

export function Scene() {
  //camera state
  const [isthirdPerson, setIsThirdPerson] = useState(false);
  const [cameraPosition, setCameraPosition] = useState([-6, 3.9, 6.21]);

  useEffect(() => {
    function keydownHandler(e) {
      if (e.key === "m") {
        console.log('clicked')
        // change position to hover
        if(isthirdPerson) setCameraPosition([-6, 3.9, 6.21 + Math.random() * 0.01]);
        //swap state
        setIsThirdPerson(!isthirdPerson);
      }
    }
    //add to window
    window.addEventListener("keydown", keydownHandler);
    return () => window.removeEventListener("keydown", keydownHandler)}, [isthirdPerson]);

  // FOV perpective camera prop 40
  //load in background image
  return (
    <Suspense fallback={null}>
      <Environment
        files={process.env.PUBLIC_URL + "/textures/envmap.hdr"}
        background={"both"} />
       <PerspectiveCamera makeDefault position={cameraPosition} fov={40} />
      {!isthirdPerson && (
        <OrbitControls target={[-2.64, -0.71, 0.03]} />)}
      <Ground />
      <Track />
      <Car isthirdPerson={isthirdPerson} />
    </Suspense>
  );
}