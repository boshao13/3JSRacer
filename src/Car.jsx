import { useBox, useRaycastVehicle } from "@react-three/cannon";
import { useFrame, useLoader } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Quaternion, Vector3 } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useControls } from "./useControls";
import { useWheels } from "./useWheels";
import { Wheels } from "./Wheels";

export function Car({ thirdPerson }) {
  //define model dimensions and position
  const position = [-1.5, 5, 3];
  const width = 0.15;
  const height = 0.15;
  const front = 0.15
  const wheelRadius = 0.1;
  const bodyArgs = [width, height, front * 2];
  //truck args usebox
  const [cBody, chassisApi] = useBox(() => ({
      allowSleep: false,
      args: bodyArgs,
      mass: 180,
      position,
    }),
    useRef(null),
  );
    //import truck glb
  let result = useLoader(
    GLTFLoader,
    process.env.PUBLIC_URL + "/models/truck.glb"
  ).scene;

  const [wheels, wheelInfos] = useWheels(width, height, front, wheelRadius);
  const [vehicle, vehicleApi] = useRaycastVehicle(() => ({
      cBody,
      wheelInfos,
      wheels,}),
    useRef(null));

  useControls(vehicleApi, chassisApi);
  useFrame((state) => {
    if(!thirdPerson) return;

    let position = new Vector3(0,0,0);
    position.setFromMatrixPosition(cBody.current.matrixWorld);
    let quaternion = new Quaternion(0, 0, 0, 0);
    quaternion.setFromRotationMatrix(cBody.current.matrixWorld);
    let wheelDir = new Vector3(0,0,1);
    wheelDir.applyQuaternion(quaternion);
    wheelDir.normalize();
    // CAMERA SETTINGS (X, Y , ROTATION)
    let cameraPosition = position.clone().add(wheelDir.clone().multiplyScalar(1).add(new Vector3(0, 0.3, 0)));

    wheelDir.add(new Vector3(0, 0.2, 0));
    state.camera.position.copy(cameraPosition);
    state.camera.lookAt(position);
  });
  //have to trigger model load after initial render
  useEffect(() => {
    if (!result) return;
    let mesh = result;
    mesh.scale.set(0.0008, 0.0008, 0.0008);
    mesh.children[0].position.set(-150, -18, -67);
  }, [result]);

  return (
    <group ref={vehicle}>
      <group ref={cBody}>
        <primitive object={result} rotation-y={Math.PI/2} position={[0, -0.09, 0]}/>
      </group>
      <Wheels wheelRef={wheels[0]} radius={wheelRadius} />
      <Wheels wheelRef={wheels[1]} radius={wheelRadius} />
      <Wheels wheelRef={wheels[2]} radius={wheelRadius} />
      <Wheels wheelRef={wheels[3]} radius={wheelRadius} />
    </group>
  );
}