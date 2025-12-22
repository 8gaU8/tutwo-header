import { Canvas, type ThreeElements, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import * as THREE from "three";
import { FrontSide } from "three";

import background from "./assets/_.jpeg?inline";

// import "./main.css";

export function Box(props: ThreeElements["mesh"]) {
  const ref = useRef<THREE.Mesh>(null!);
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  useFrame((_state, delta) => {
    ref.current.rotation.x += delta;
    ref.current.rotation.y += delta * 0.8;
    ref.current.rotation.z += delta * 0.5;
  });
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={() => click(!clicked)}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
    >
      <torusKnotGeometry args={[2, 0.5, 128, 64]} />
      {/* <meshPhysicalMaterial
        // color={hovered ? "hotpink" : "orange"}
        // side={THREE.DoubleSide}
        // roughness={0.2}
        // iridescence={1}
        // iridescenceIOR={1}
        // iridescenceThicknessRange={[100, 800]}
        // transmission={0.5}
        // ior={1.2}
        // thickness={1}
        // metalness={0}
        // roughness={0}
      /> */}
      <meshStandardMaterial
        color={hovered ? "hotpink" : "green"}
        side={FrontSide}
        roughness={0.8}
        metalness={0.5}
        transparent={true}

        opacity={0.9}
      />
      {/* <MeshTransmissionMaterial
        color={hovered ? "hotpink" : "orange"}
        side={THREE.DoubleSide}
        backsideThickness={1.5}
        thickness={hovered ? 5 : 2}
        transmission={0.5}
      /> */}
    </mesh>
  );
}

createRoot(document.getElementById("root") as HTMLElement).render(
  <div style={{ backgroundImage: `url(${background})` }}>
    <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
      <ambientLight intensity={Math.PI / 2} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={3}
      />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      <Box position={[0, 0, 0]} />
    </Canvas>
  </div>
);
