import { useTrimesh } from "@react-three/cannon";
import { useLoader } from "@react-three/fiber";
import { useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export function Ramp() {
  //bring in ramp glb
  const result = useLoader(GLTFLoader, process.env.PUBLIC_URL + "/models/ramp.glb");
  // first child
  const geometry = result.scene.children[0].geometry;
  const vertices = geometry.attributes.position.array;
  const indices  = geometry.index.array;
  const [ref] = useTrimesh(
    //setstatic
    () => ({
      args: [vertices, indices],
      mass: 0,
      type: "Static",
    }),
    useRef(null)
  );
}