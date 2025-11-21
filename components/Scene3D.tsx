import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Html } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';

// --- Types ---
type AnimationType = 'spin' | 'glitch' | 'pulse' | 'wobble';

interface NodeData {
  id: number;
  position: [number, number, number];
  title: string;
  content: string;
  code: string;
  animType: AnimationType;
}

// --- Constants ---
const INTERACTIVE_NODES: NodeData[] = [
  { 
    id: 1, 
    position: [-6, 2, 0], 
    title: 'KERNEL_PANIC', 
    content: 'Granica między cyfrowym a fizycznym zanika. Jesteśmy entropią.',
    code: 'ERR_0x99',
    animType: 'spin'
  },
  { 
    id: 2, 
    position: [6, -1, -2], 
    title: 'WYCIEK_PAMIĘCI', 
    content: 'Gromadzenie sfragmentowanych danych użytkownika w celu rekonstrukcji cyfrowej duszy.',
    code: 'MEM_OVF',
    animType: 'wobble'
  },
  { 
    id: 3, 
    position: [-5, -4, 2], 
    title: 'WSKAŹNIK_NULL', 
    content: 'Wskazywanie na rzeczywistość, która jeszcze nie została wyrenderowana.',
    code: 'PTR_NULL',
    animType: 'pulse'
  },
  {
    id: 4,
    position: [4, 4, 0],
    title: 'PRZEPEŁNIENIE', // STACK_OVERFLOW
    content: 'Wykryto nieskończoną rekurencję. Pętla bez warunku wyjścia.',
    code: 'STK_OVF',
    animType: 'glitch'
  },
  {
    id: 5,
    position: [0, -5, -1],
    title: 'ZAKLESZCZENIE', // DEADLOCK
    content: 'Dwa procesy czekające w nieskończoność. Czas tu zamarzł.',
    code: 'DLK_000',
    animType: 'spin'
  }
];

// --- Components ---

const CameraRig = () => {
    const { camera, mouse } = useThree();
    useFrame(() => {
        // Smooth parallax effect following mouse
        camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouse.x * 2, 0.05);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, mouse.y * 2, 0.05);
        camera.lookAt(0, 0, 0);
    });
    return null;
};

interface GlitchFogProps {
  baseColor?: string;
  glitchColor?: string;
  probability?: number;
}

const GlitchFog: React.FC<GlitchFogProps> = ({ 
  baseColor = '#050505', 
  glitchColor = '#ccff00', 
  probability = 0.02 
}) => {
  const { scene } = useThree();
  const targetColor = useMemo(() => new THREE.Color(baseColor), [baseColor]);
  const flashColor = useMemo(() => new THREE.Color(glitchColor), [glitchColor]);
  const grayColor = useMemo(() => new THREE.Color('#222222'), []);

  // Initialize fog and background
  useEffect(() => {
    scene.fog = new THREE.Fog(baseColor, 10, 50);
    scene.background = new THREE.Color(baseColor);
    
    return () => {
      scene.fog = null;
      scene.background = null;
    }
  }, [baseColor, scene]);

  useFrame(() => {
    if (!scene.fog || !(scene.background instanceof THREE.Color)) return;

    if (Math.random() < probability) {
      // GLITCH STATE
      const isStrong = Math.random() > 0.8; // Rare strong flash
      
      // Use flash color or a subtle gray flash
      const c = isStrong ? flashColor : grayColor;

      scene.fog.color.copy(c);
      scene.background.copy(c);

      // Drastically shorten view distance to create claustrophobia/glitch
      (scene.fog as THREE.Fog).near = 0;
      (scene.fog as THREE.Fog).far = isStrong ? 60 : 30;

    } else {
      // RECOVERY STATE - Lerp back to normal
      // Smoothly return color to base
      scene.fog.color.lerp(targetColor, 0.15);
      scene.background.lerp(targetColor, 0.15);
      
      // Smoothly return fog distance
      (scene.fog as THREE.Fog).near = THREE.MathUtils.lerp((scene.fog as THREE.Fog).near, 10, 0.1);
      (scene.fog as THREE.Fog).far = THREE.MathUtils.lerp((scene.fog as THREE.Fog).far, 50, 0.1);
    }
  });

  return null;
};

const Debris = ({ count = 100 }) => {
  const mesh = useRef<THREE.InstancedMesh>(null);
  
  // Optimization: Reuse the same Object3D for matrix calculations
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  // Generate particles once
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const xFactor = -50 + Math.random() * 100;
      const yFactor = -50 + Math.random() * 100;
      const zFactor = -50 + Math.random() * 100;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;
    
    const time = state.clock.getElapsedTime();

    // Update particles
    particles.forEach((particle, i) => {
      // Simplified motion math for optimization
      let { factor, speed, xFactor, yFactor, zFactor } = particle;
      
      // Update time offset
      particle.t += speed * 0.5;
      const t = particle.t;
      
      const s = Math.cos(t);
      
      dummy.position.set(
        xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      );
      
      dummy.scale.setScalar(s * 1.5 + 1);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    
    mesh.current.instanceMatrix.needsUpdate = true;
    // Rotate entire group slowly instead of individual calculations where possible
    mesh.current.rotation.y = time * 0.05;
  });

  return (
    <instancedMesh 
        ref={mesh} 
        args={[undefined, undefined, count]} 
        frustumCulled={false} // Prevent flickering at edges
    >
      <octahedronGeometry args={[0.5, 0]} />
      <meshBasicMaterial wireframe color="#444" transparent opacity={0.2} />
    </instancedMesh>
  );
};

interface InteractiveNodeProps {
  data: NodeData;
  isActive: boolean;
  onSelect: (data: NodeData) => void;
}

const InteractiveNode: React.FC<InteractiveNodeProps> = ({ data, isActive, onSelect }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
       // --- Parallax Calculation ---
       // Calculate a subtle offset based on mouse position and depth (Z position)
       // Nodes closer to the camera (higher Z) move more, creating depth.
       // Base Z factor: (10 + data.position[2]) ensures a positive multiplier.
       const depthIntensity = (10 + data.position[2]) * 0.05;
       
       // We add this offset to the base position
       const parallaxX = state.mouse.x * depthIntensity;
       const parallaxY = state.mouse.y * depthIntensity;
       
       const targetPos = new THREE.Vector3(
           data.position[0] + parallaxX,
           data.position[1] + parallaxY,
           data.position[2]
       );

       if (isActive) {
         // Active Animations (Unique per type)
         // We lerp towards the targetPos to maintain parallax even when active
         
         // Base rotation/scale logic
         switch(data.animType) {
             case 'spin':
                 meshRef.current.rotation.x += delta * 10;
                 meshRef.current.rotation.y += delta * 15;
                 meshRef.current.scale.lerp(new THREE.Vector3(2.5, 2.5, 2.5), 0.05);
                 meshRef.current.position.lerp(targetPos, 0.1);
                 break;
             case 'wobble':
                 meshRef.current.rotation.z += delta * 5;
                 meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 10);
                 const wScale = 1.5 + Math.sin(state.clock.elapsedTime * 10) * 0.5;
                 meshRef.current.scale.setScalar(wScale);
                 meshRef.current.position.lerp(targetPos, 0.1);
                 break;
             case 'glitch':
                 if (Math.random() > 0.85) {
                    // Glitch effect jumps AROUND the target position
                    meshRef.current.position.x = targetPos.x + (Math.random() - 0.5) * 1;
                    meshRef.current.position.y = targetPos.y + (Math.random() - 0.5) * 1;
                    meshRef.current.position.z = targetPos.z;
                 } else {
                     meshRef.current.position.lerp(targetPos, 0.2);
                 }
                 meshRef.current.rotation.x += 0.5;
                 break;
             case 'pulse':
                 const pScale = 2 + Math.sin(state.clock.elapsedTime * 20) * 0.5;
                 meshRef.current.scale.setScalar(pScale);
                 meshRef.current.position.lerp(targetPos, 0.1);
                 break;
         }
       } else {
          // Idle / Hover Animations
          meshRef.current.rotation.x += delta * (hovered ? 2 : 0.5);
          meshRef.current.rotation.y += delta * (hovered ? 2 : 0.5);
          
          const scaleTarget = hovered ? 1.5 : 1;
          meshRef.current.scale.lerp(new THREE.Vector3(scaleTarget, scaleTarget, scaleTarget), 0.1);
          
          // Apply position with Parallax + specific idle quirks
          if(data.animType === 'glitch' && Math.random() > 0.99) {
             // Occasional idle glitch
             meshRef.current.position.x = targetPos.x + (Math.random() - 0.5) * 0.2;
          } else {
             // Smoothly follow parallax position
             meshRef.current.position.lerp(targetPos, 0.1);
          }
       }
    }
  });

  return (
    <Float 
        speed={isActive ? 0 : 2} 
        rotationIntensity={isActive ? 0 : 1} 
        floatIntensity={isActive ? 0 : 2}
    >
      <mesh 
        ref={meshRef} 
        position={data.position}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(data);
        }}
        onPointerOver={() => {
            document.body.style.cursor = 'pointer';
            setHover(true);
        }}
        onPointerOut={() => {
            document.body.style.cursor = 'auto';
            setHover(false);
        }}
      >
        <icosahedronGeometry args={[0.8, 0]} />
        <meshBasicMaterial 
          color={isActive ? "#ff0055" : (hovered ? "#ccff00" : "#444")} 
          wireframe={true}
          transparent
          opacity={isActive ? 1 : (hovered ? 1 : 0.3)}
        />
        {hovered && !isActive && (
            <Html distanceFactor={10}>
                <div className="bg-black text-[#ccff00] border border-[#ccff00] px-2 py-1 text-xs font-mono whitespace-nowrap pointer-events-none select-none">
                    KLIKNIJ_ABY_ODSZYFROWAĆ
                </div>
            </Html>
        )}
      </mesh>
    </Float>
  );
};

// --- Overlay UI ---
const DataOverlay = ({ data, onClose }: { data: NodeData, onClose: () => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.8, rotateX: 20 }}
        animate={{ scale: 1, rotateX: 0 }}
        exit={{ scale: 0.8, rotateX: -20 }}
        className="bg-black border border-[#ccff00] p-8 max-w-lg w-full relative shadow-[0_0_50px_rgba(204,255,0,0.2)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-0 left-0 bg-[#ccff00] text-black px-2 py-1 text-xs font-bold">
            SYSTEM_ALERT // {data.code}
        </div>
        <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-[#ccff00] hover:text-white font-bold"
        >
            [ZAMKNIJ]
        </button>
        
        <h2 className="text-4xl md:text-6xl font-black text-white uppercase mb-6 mt-4 animate-pulse">
            {data.title}
        </h2>
        
        <div className="h-[1px] w-full bg-[#ccff00]/30 mb-6" />
        
        <p className="font-mono text-[#ccff00] text-lg mb-8 leading-relaxed">
            {`> ${data.content}`}
        </p>
        
        <div className="flex justify-between items-center text-xs text-white/40 font-mono uppercase">
            <span>Szyfrowanie: AES-256</span>
            <span>Pakiet: {Math.floor(Math.random() * 9999)}</span>
        </div>
      </motion.div>
    </motion.div>
  )
}

export const Scene3D: React.FC = () => {
  const [activeData, setActiveData] = useState<NodeData | null>(null);

  return (
    <>
      <AnimatePresence>
        {activeData && (
            <DataOverlay data={activeData} onClose={() => setActiveData(null)} />
        )}
      </AnimatePresence>

      {/* Changed to z-0 to ensure visibility under transparent sections but above background */}
      <div className="fixed inset-0 z-0 bg-black">
        <Canvas 
            camera={{ position: [0, 0, 20], fov: 45 }} 
            gl={{ antialias: false, alpha: false }}
        >
          <CameraRig />
          <GlitchFog baseColor="#050505" glitchColor="#ccff00" probability={0.01} />
          
          <group>
            <Debris count={100} />
            {INTERACTIVE_NODES.map((node) => (
                <InteractiveNode 
                    key={node.id} 
                    data={node} 
                    isActive={activeData?.id === node.id}
                    onSelect={setActiveData} 
                />
            ))}
          </group>

        </Canvas>
      </div>
    </>
  );
};