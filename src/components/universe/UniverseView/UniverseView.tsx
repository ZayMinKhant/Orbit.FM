import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Sphere } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import { planetsData } from '../../../data/planets';
import { useAudio } from '../../../contexts/AudioContext';
import * as THREE from 'three';

// Planet component
interface PlanetProps {
  planet: any;
  onClick: () => void;
}

const Planet: React.FC<PlanetProps> = ({ planet, onClick }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
      if (hovered) {
        meshRef.current.scale.setScalar(1.1);
      } else {
        meshRef.current.scale.setScalar(1.0);
      }
    }
  });

  return (
    <group position={[planet.position.x / 50, planet.position.y / 50, planet.position.z / 50]}>
      <Sphere
        ref={meshRef}
        args={[planet.size / 100, 32, 32]}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial 
          color={planet.color} 
          emissive={hovered ? planet.color : '#000000'}
          emissiveIntensity={hovered ? 0.3 : 0}
        />
      </Sphere>
      {hovered && (
        <Text
          position={[0, planet.size / 80 + 0.5, 0]}
          fontSize={0.3}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {planet.name}
        </Text>
      )}
    </group>
  );
};

// Star field background
const StarField = () => {
  const points = useRef<THREE.Points>(null);
  
  const starGeometry = React.useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(1000 * 3);
    
    for (let i = 0; i < 1000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 2000;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2000;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2000;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, []);

  useFrame((state, delta) => {
    if (points.current) {
      points.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <points ref={points} geometry={starGeometry}>
      <pointsMaterial size={2} color="white" />
    </points>
  );
};

const UniverseView: React.FC = () => {
  const navigate = useNavigate();
  const { dispatch } = useAudio();

  const handlePlanetClick = (planet: any) => {
    // Set the current planet in audio context
    dispatch({ type: 'SET_PLANET', payload: planet });
    
    // Navigate to planet interface
    navigate(`/planet/${planet.id}`);
    
    // Start playing first track of the planet (mock for now)
    const mockTrack = {
      id: 1,
      title: `${planet.name} Theme`,
      artist: 'Space Composer',
      duration: 240,
      url: `/sounds/${planet.id}/theme.mp3` // placeholder
    };
    
    dispatch({ type: 'PLAY_TRACK', payload: mockTrack });
  };

  return (
    <div className="w-full h-screen bg-space-dark relative overflow-hidden">
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        style={{ background: 'linear-gradient(to bottom, #000011 0%, #000000 100%)' }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        
        {/* Star field background */}
        <StarField />
        
        {/* Render all planets */}
        {Object.values(planetsData).map((planet: any) => (
          <Planet
            key={planet.id}
            planet={planet}
            onClick={() => handlePlanetClick(planet)}
          />
        ))}
        
        {/* Camera controls */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={5}
          maxDistance={50}
        />
      </Canvas>
      
      {/* UI Overlay */}
      <div className="absolute top-6 left-6 z-10">
        <h1 className="space-font text-4xl text-space-glow mb-2">
          3D Music Universe
        </h1>
        <p className="text-white/70 text-lg">
          Click on a planet to explore its musical realm
        </p>
      </div>
      
      {/* Planet Legend */}
      <div className="absolute bottom-6 right-6 z-10 bg-black/50 p-4 rounded-lg backdrop-blur-sm">
        <h3 className="space-font text-lg text-white mb-3">Planets</h3>
        <div className="space-y-2">
          {Object.values(planetsData).map((planet: any) => (
            <div key={planet.id} className="flex items-center space-x-3">
              <div 
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: planet.color }}
              />
              <span className="text-white/80 text-sm">{planet.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UniverseView;