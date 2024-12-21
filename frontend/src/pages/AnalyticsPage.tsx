import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import * as THREE from 'three';

interface ChartData {
  label: string;
  value: number;
  color: string;
}

const data: ChartData[] = [
  { label: 'Government Bonds', value: 45000, color: '#60a5fa' },  // Bright blue
  { label: 'Corporate Bonds', value: 30000, color: '#f472b6' },   // Pink
  { label: 'Municipal Bonds', value: 25000, color: '#4ade80' }    // Green
];

const total = data.reduce((sum, item) => sum + item.value, 0);

function PieChart3D() {
  const groupRef = useRef<THREE.Group>(null);

  // Create pie segments
  const segments = data.map((item, index) => {
    const startAngle = (index / data.length) * Math.PI * 2;
    const endAngle = ((index + 1) / data.length) * Math.PI * 2;
    const radius = 2;
    const height = (item.value / total) * 2; // Scale height based on value

    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.arc(0, 0, radius, startAngle, endAngle, false);
    shape.lineTo(0, 0);

    const extrudeSettings = {
      steps: 2,
      depth: height,
      bevelEnabled: true,
      bevelThickness: 0.2,
      bevelSize: 0.1,
      bevelOffset: 0,
      bevelSegments: 5
    };

    return (
      <mesh key={item.label} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <extrudeGeometry args={[shape, extrudeSettings]} />
        <meshPhysicalMaterial
          color={item.color}
          metalness={0.2}
          roughness={0.3}
          clearcoat={0.5}
          clearcoatRoughness={0.3}
          envMapIntensity={0.5}
        />
      </mesh>
    );
  });

  return (
    <group ref={groupRef}>
      {segments}
    </group>
  );
}

const AnalyticsPage: React.FC = () => {
  return (
    <div className="analytics-page">
      <header className="header">
        <h2>Portfolio Analytics</h2>
        <p className="subtitle">Interactive visualization of your investment portfolio</p>
      </header>

      <div className="analytics-content">
        <div className="chart-container">
          <Canvas camera={{ position: [0, 5, 10], fov: 45 }}>
            <color attach="background" args={['#f8fafc']} />
            <Stage environment="city" intensity={0.5}>
              <PieChart3D />
            </Stage>
            <OrbitControls 
              enableZoom={true}
              minPolarAngle={Math.PI / 4}
              maxPolarAngle={Math.PI / 2}
            />
          </Canvas>
        </div>

        <div className="stats-grid">
          <div className="stats-card total-investments">
            <h3>Total Investments</h3>
            <p className="value">${total.toLocaleString()}</p>
          </div>
          {data.map((item) => (
            <div key={item.label} className="stats-card">
              <div className="card-header">
                <span className="color-dot" style={{ backgroundColor: item.color }}></span>
                <h3>{item.label}</h3>
              </div>
              <p className="value">${item.value.toLocaleString()}</p>
              <p className="percentage">
                {((item.value / total) * 100).toFixed(1)}% of portfolio
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
