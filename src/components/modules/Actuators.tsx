import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Slider } from '../ui/slider';
import { Button } from '../ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Settings2, Zap, Gauge, Flame } from 'lucide-react';

interface ActuatorsProps {
  unitSystem: 'SI' | 'Imperial';
}

const Actuators: React.FC<ActuatorsProps> = ({ unitSystem }) => {
  const [load, setLoad] = useState(5.0); // kg or lbs
  const [torque, setTorque] = useState(0.5); // Nm or oz-in
  
  const simData = Array.from({ length: 20 }, (_, i) => ({
    time: i,
    temp: 25 + (i * i * 0.1) * (load / 2),
    current: (torque * 2) + Math.random()
  }));

  const unitWeight = unitSystem === 'SI' ? 'kg' : 'lbs';
  const unitTorque = unitSystem === 'SI' ? 'Nm' : 'oz-in';

  return (
    <div className="space-y-4">
      <div className="flex gap-2 mb-4">
        {['DC Motor', 'Stepper', 'Servo'].map(type => (
          <button 
            key={type}
            className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase tracking-widest border transition-all ${type === 'DC Motor' ? 'bg-emerald-500 border-emerald-400 text-white' : 'bg-white/5 border-white/10 text-slate-500'}`}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4">
        <Card className="bg-white/5 border-white/5">
          <CardHeader className="p-4">
            <CardTitle className="text-xs uppercase tracking-widest text-slate-400">Load Profile</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4 space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Total Mass ({unitWeight})</span>
                <span className="text-emerald-400 font-mono">{load.toFixed(1)}</span>
              </div>
              <Slider 
                value={[load]} 
                min={0} max={20} step={0.1} 
                onValueChange={([v]) => setLoad(v)}
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Peak Torque ({unitTorque})</span>
                <span className="text-emerald-400 font-mono">{torque.toFixed(2)}</span>
              </div>
              <Slider 
                value={[torque]} 
                min={0} max={10} step={0.05} 
                onValueChange={([v]) => setTorque(v)}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-white/5">
          <CardHeader className="p-4 flex flex-row items-center justify-between">
            <CardTitle className="text-sm text-emerald-400">Thermal & PWM Simulation</CardTitle>
            <Flame className="w-4 h-4 text-orange-500" />
          </CardHeader>
          <CardContent className="p-0 h-40">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={simData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" />
                <XAxis dataKey="time" hide />
                <YAxis hide />
                <Line type="monotone" dataKey="temp" stroke="#f97316" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="current" stroke="#10b981" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-emerald-500/10 border-emerald-500/20">
            <CardContent className="p-4">
              <div className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest mb-1">Recommended</div>
              <div className="text-lg font-bold text-white">NEMA 23</div>
              <div className="text-[10px] text-slate-400 mt-1">Safety Factor: 1.8x</div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/5">
            <CardContent className="p-4">
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Power Req</div>
              <div className="text-lg font-bold text-white">24V / 5.2A</div>
              <div className="text-[10px] text-slate-400 mt-1">~125W Continuous</div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white border-none h-12 rounded-xl">
        Generate Sizing Report
      </Button>
    </div>
  );
};

export default Actuators;