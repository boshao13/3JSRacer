import "./index.css";
import { createRoot } from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import { Scene } from "./Scene";
import { Physics } from '@react-three/cannon'
import { Name } from './Info.jsx'

createRoot(document.getElementById("root")).render(
  <>
    <Canvas>
      <Physics
  // set gravity
      gravity={[0, -2.0, 0]}>
      <Scene />
      </Physics>
    </Canvas>
  <Name/>
  </>
);
