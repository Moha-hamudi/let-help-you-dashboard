import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Bluetooth, Usb, Activity, Zap, Thermometer, Radio } from 'lucide-react';
import { toast } from 'sonner';

const Sensors = () => {
  const [activeSensor, setActiveSensor] = useState('IMU');
  const [streamData, setStreamData] = useState<{t: number, x: number, y: number, z: number}[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    let timer: any;
    if (isConnected) {
      let t = 0;
      timer = setInterval(() => {
        setStreamData(prev => {
          const newData = [
            ...prev, 
            { 
              t, 
              x: Math.sin(t * 0.5) * 10 + (Math.random() - 0.5) * 2,
              y: Math.cos(t * 0.3) * 8 + (Math.random() - 0.5) * 2,
              z: Math.sin(t * 0.8) * 5 + (Math.random() - 0.5) * 2
            }
          ];
          return newData.slice(-40);
        });
        t += 0.2;
      }, 100);
    }
    return () => clearInterval(timer);
  }, [isConnected]);

  const toggleConnection = () => {
    if (!isConnected) {
      toast.info("Connecting via Bluetooth LE...");
      setTimeout(() => {
        setIsConnected(true);
        toast.success("MPU6050 Sensor Connected");
      }, 1500);
    } else {
      setIsConnected(false);
      toast.error("Disconnected");
    }
  };

  const sensors = [
    { id: 'IMU', icon: Activity, label: 'IMU (6-Axis)' },
    { id: 'ENC', icon: Zap, label: 'Encoders' },
    { id: 'TEMP', icon: Thermometer, label: 'Thermal' },
    { id: 'FFT', icon: Radio, label: 'Spectrum' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 no-scrollbar">
        {sensors.map(s => (
          <button
            key={s.id}
            onClick={() => setActiveSensor(s.id)}
            className={`flex items-center gap-2 px-4 py-3 rounded-2xl border whitespace-nowrap transition-all ${activeSensor === s.id ? 'bg-purple-500/10 border-purple-500/30 text-purple-400' : 'bg-white/5 border-white/5 text-slate-500'}`}
          >
            <s.icon className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">{s.label}</span>
          </button>
        ))}
      </div>

      <Card className="bg-slate-900/50 border-white/5">
        <CardHeader className="p-4 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-sm text-purple-400">Live Stream: {activeSensor}</CardTitle>
            <div className="flex items-center gap-2 mt-1">
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
              <span className="text-[10px] text-slate-500 font-mono">{isConnected ? 'DATA_SYNC_ACTIVE' : 'IDLE_OFFLINE'}</span>
            </div>
          </div>
          <Button 
            onClick={toggleConnection}
            variant={isConnected ? "destructive" : "outline"}
            className={`h-9 rounded-xl text-[10px] font-bold uppercase ${!isConnected && 'border-purple-500/30 text-purple-400'}`}
          >
            {isConnected ? 'Disconnect' : 'Connect'}
          </Button>
        </CardHeader>
        <CardContent className="p-0 h-56">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={streamData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" />
              <XAxis dataKey="t" hide />
              <YAxis hide domain={[-15, 15]} />
              <Line type="monotone" dataKey="x" stroke="#c084fc" strokeWidth={2} dot={false} animationDuration={0} />
              <Line type="monotone" dataKey="y" stroke="#818cf8" strokeWidth={2} dot={false} animationDuration={0} />
              <Line type="monotone" dataKey="z" stroke="#22d3ee" strokeWidth={2} dot={false} animationDuration={0} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4">
        <div className="flex gap-4">
          <Card className="flex-1 bg-white/5 border-white/5">
            <CardHeader className="p-3">
              <CardTitle className="text-[10px] uppercase tracking-widest text-slate-500">RMS Value</CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0">
              <div className="text-xl font-bold text-slate-100">8.42 <span className="text-xs text-slate-500">m/s²</span></div>
            </CardContent>
          </Card>
          <Card className="flex-1 bg-white/5 border-white/5">
            <CardHeader className="p-3">
              <CardTitle className="text-[10px] uppercase tracking-widest text-slate-500">Peak Freq</CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0">
              <div className="text-xl font-bold text-slate-100">12.5 <span className="text-xs text-slate-500">Hz</span></div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white/5 border-white/5">
          <CardHeader className="p-4 flex flex-row items-center justify-between">
            <CardTitle className="text-xs uppercase tracking-widest text-slate-400">Spectrum Analyzer</CardTitle>
            <span className="text-[10px] font-mono text-purple-400">FFT Enabled</span>
          </CardHeader>
          <CardContent className="p-0 h-32">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={streamData.slice(-20)}>
                <Area type="step" dataKey="x" stroke="#c084fc" fill="#c084fc33" strokeWidth={1} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Button variant="outline" className="h-12 border-white/10 rounded-xl text-xs gap-2">
          <Usb className="w-4 h-4" /> Serial (USB)
        </Button>
        <Button variant="outline" className="h-12 border-white/10 rounded-xl text-xs gap-2">
          <Bluetooth className="w-4 h-4" /> Bluetooth
        </Button>
      </div>
    </div>
  );
};

export default Sensors;