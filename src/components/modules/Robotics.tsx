import React, { useState, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Grid, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Slider } from '../ui/slider';
import { Button } from '../ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Simple 2-DOF Robotic Arm Component for Preview
const RoboticArm = ({ theta1, theta2 }: { theta1: number, theta2: number }) => {
  const armRef1 = useRef<THREE.Group>(null);
  const armRef2 = useRef<THREE.Group>(null);

  useFrame(() => {
    if (armRef1.current) armRef1.current.rotation.y = THREE.MathUtils.degToRad(theta1);
    if (armRef2.current) armRef2.current.rotation.z = THREE.MathUtils.degToRad(theta2);
  });

  return (
    <group position={[0, -1, 0]}>
      {/* Base */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.5, 0.6, 0.2, 32]} />
        <meshStandardMaterial color="#334155" />
      </mesh>
      
      {/* Link 1 */}
      <group ref={armRef1}>
        <mesh position={[0, 1, 0]}>
          <boxGeometry args={[0.2, 2, 0.2]} />
          <meshStandardMaterial color="#06b6d4" />
        </mesh>
        
        {/* Link 2 */}
        <group ref={armRef2} position={[0, 2, 0]}>
          <mesh position={[0, 1, 0]}>
            <boxGeometry args={[0.2, 2, 0.2]} />
            <meshStandardMaterial color="#3b82f6" />
          </mesh>
          
          {/* End Effector */}
          <mesh position={[0, 2, 0]}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial color="#ef4444" />
          </mesh>
        </group>
      </group>
    </group>
  );
};

const Robotics = () => {
  const [angles, setAngles] = useState({ t1: 45, t2: -30 });
  const [dof, setDof] = useState(2);

  // Simplified trajectory data
  const trajectoryData = Array.from({ length: 20 }, (_, i) => ({
    time: i,
    position: Math.sin(i / 3) * angles.t1 + angles.t2,
    velocity: Math.cos(i / 3) * angles.t1
  }));

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2 mb-4">
        {[2, 3, 4, 6].map(n => (
          <button 
            key={n}
            onClick={() => setDof(n)}
            className={`py-2 rounded-lg text-xs font-bold uppercase tracking-widest border transition-all ${dof === n ? 'bg-cyan-500 border-cyan-400 text-white' : 'bg-white/5 border-white/10 text-slate-500'}`}
          >
            {n} DOF
          </button>
        ))}
      </div>

      <Card className="bg-slate-900/50 border-white/5 overflow-hidden">
        <CardHeader className="p-4 pb-0">
          <CardTitle className="text-sm text-cyan-400">Kinematics Preview</CardTitle>
        </CardHeader>
        <CardContent className="p-0 h-64 relative">
          <Canvas camera={{ position: [5, 5, 5], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Suspense fallback={null}>
              <RoboticArm theta1={angles.t1} theta2={angles.t2} />
              <Grid infiniteGrid fadeDistance={20} sectionColor="#1e293b" cellColor="#0f172a" />
              <OrbitControls enableZoom={false} />
              <Environment preset="city" />
            </Suspense>
          </Canvas>
          <div className="absolute bottom-2 left-2 text-[10px] font-mono text-slate-500 bg-black/60 p-2 rounded backdrop-blur-sm">
            T1: {angles.t1.toFixed(1)}° | T2: {angles.t2.toFixed(1)}°
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4">
        <Card className="bg-white/5 border-white/5">
          <CardHeader className="p-4">
            <CardTitle className="text-xs uppercase tracking-widest text-slate-400">Joint Parameters</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4 space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Theta 1 (Base)</span>
                <span className="text-cyan-400 font-mono">{angles.t1}°</span>
              </div>
              <Slider 
                value={[angles.t1]} 
                min={-180} max={180} step={1} 
                onValueChange={([v]) => setAngles(prev => ({ ...prev, t1: v }))}
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Theta 2 (Shoulder)</span>
                <span className="text-cyan-400 font-mono">{angles.t2}°</span>
              </div>
              <Slider 
                value={[angles.t2]} 
                min={-180} max={180} step={1} 
                onValueChange={([v]) => setAngles(prev => ({ ...prev, t2: v }))}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/5">
          <CardHeader className="p-4">
            <CardTitle className="text-xs uppercase tracking-widest text-slate-400">Trajectory Analysis</CardTitle>
          </CardHeader>
          <CardContent className="p-0 h-40">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trajectoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" />
                <XAxis dataKey="time" hide />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '8px', fontSize: '10px' }}
                />
                <Line type="monotone" dataKey="position" stroke="#06b6d4" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="velocity" stroke="#3b82f6" strokeWidth={2} dot={false} strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex gap-2">
        <Button className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white border-none h-12 rounded-xl">
          Inverse Solve
        </Button>
        <Button variant="outline" className="flex-1 border-white/10 text-slate-400 h-12 rounded-xl">
          Export G-Code
        </Button>
      </div>
    </div>
  );
};

export default Robotics;