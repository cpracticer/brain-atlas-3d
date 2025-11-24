import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { brainRegions } from './brainData';
import { Text } from '@react-three/drei';

function BrainRegion({ region, isSelected, isHovered, onClick, onHover }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (meshRef.current) {
      const targetScale = isSelected ? 1.3 : (hovered ? 1.15 : 1);
      meshRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.1
      );
    }
  });

  return (
    <group position={region.pos}>
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onClick(region);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          onHover(region);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          onHover(null);
          document.body.style.cursor = 'auto';
        }}
      >
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial
          color={region.color}
          opacity={isSelected ? 1 : 0.85}
          transparent
          emissive={region.color}
          emissiveIntensity={isSelected ? 0.5 : (hovered ? 0.3 : 0)}
        />
      </mesh>
      
      {(isSelected || hovered) && (
        <Text
          position={[0, 0.3, 0]}
          fontSize={0.12}
          color="white"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#000000"
        >
          {region.cn}
        </Text>
      )}
    </group>
  );
}

function BrainModel({ selectedRegion, onRegionClick, onRegionHover }) {
  const groupRef = useRef();

  useFrame(() => {
    if (groupRef.current && !selectedRegion) {
      groupRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main Brain Shape */}
      <mesh>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial
          color="#e8d5c4"
          opacity={0.15}
          transparent
          wireframe={false}
        />
      </mesh>

      {/* Brain Outline */}
      <mesh>
        <sphereGeometry args={[1.52, 32, 32]} />
        <meshBasicMaterial
          color="#999999"
          wireframe
          opacity={0.1}
          transparent
        />
      </mesh>

      {/* Brain Regions */}
      {brainRegions.map((region) => (
        <BrainRegion
          key={region.id}
          region={region}
          isSelected={selectedRegion?.id === region.id}
          onClick={onRegionClick}
          onHover={onRegionHover}
        />
      ))}

      {/* Connecting lines for selected region */}
      {selectedRegion && (
        <line>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([
                0, 0, 0,
                ...selectedRegion.pos
              ])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#ffffff" linewidth={2} opacity={0.5} transparent />
        </line>
      )}
    </group>
  );
}

export default BrainModel;
