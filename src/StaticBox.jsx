import { useBox } from "@react-three/cannon";



export function StaticBox({ position, scale }) {
  //set static/dynamic
  useBox(() => ({
    args: scale,
    position,
    type: "Static",
  }));
  //box with mesh for debug

}