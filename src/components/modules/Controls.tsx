import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Slider } from '../ui/slider';
import { Button } from '../ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Play, Pause, RotateCcw, Download } from 'lucide-react';
import { toast } from 'sonner';

const Controls = () => {
  const [params, setParams] = useState({ kp: 1.5, ki: 0.8, kd: 0.1 });
  const [data, setData] = useState<{t: number, setpoint: number, output: number}[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  // Simplified PID simulation
  useEffect(() => {
    let timer: any;
    if (isRunning) {
      let t = 0;
      let integral = 0;
      let lastError = 0;
      let currentOutput = 0;
      const dt = 0.1;
      
      timer = setInterval(() => {
        const setpoint = 1.0;
        const error = setpoint - currentOutput;
        integral += error * dt;
        const derivative = (error - lastError) / dt;
        
        const controlSignal = (params.kp * error) + (params.ki * integral) + (params.kd * derivative);
        
        // Simplified system dynamics (second order-ish)
        currentOutput += controlSignal * 0.1;
        
        setData(prev => {
          const newData = [...prev, { t, setpoint, output: currentOutput }];
          return newData.slice(-50);
        });
        
        lastError = error;
        t += dt;
        if (t > 10) setIsRunning(false);
      }, 50);
    }
    return () => clearInterval(timer);
  }, [isRunning, params]);

  const handleRun = () => {
    setData([]);
    setIsRunning(true);
  };

  const handleExport = () => {
    const coefficients = `Kp: ${params.kp}, Ki: ${params.ki}, Kd: ${params.kd}`;
    toast.success("Coefficients exported to clipboard");
    navigator.clipboard.writeText(coefficients);
  };

  return (
    <div className="space-y-4">
      <Card className="bg-slate-900/50 border-white/5">
        <CardHeader className="p-4 flex flex-row items-center justify-between">
          <CardTitle className="text-sm text-blue-400">Step Response</CardTitle>
          <div className="flex gap-2">
            <button 
              onClick={handleRun}
              className="p-2 bg-blue-500/10 text-blue-400 rounded-lg border border-blue-500/20"
            >
              {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button 
              onClick={() => setData([])}
              className="p-2 bg-white/5 text-slate-400 rounded-lg border border-white/10"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </CardHeader>
        <CardContent className="p-0 h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorOutput" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" />
              <XAxis dataKey="t" hide />
              <YAxis domain={[0, 1.5]} hide />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '8px', fontSize: '10px' }}
              />
              <Line type="stepAfter" dataKey="setpoint" stroke="#94a3b8" strokeWidth={1} strokeDasharray="5 5" dot={false} />
              <Area type="monotone" dataKey="output" stroke="#3b82f6" fillOpacity={1} fill="url(#colorOutput)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4">
        <Card className="bg-white/5 border-white/5">
          <CardHeader className="p-4">
            <CardTitle className="text-xs uppercase tracking-widest text-slate-400">PID Tuning</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4 space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Proportional (Kp)</span>
                <span className="text-blue-400 font-mono">{params.kp.toFixed(2)}</span>
              </div>
              <Slider 
                value={[params.kp]} 
                min={0} max={5} step={0.01} 
                onValueChange={([v]) => setParams(prev => ({ ...prev, kp: v }))}
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Integral (Ki)</span>
                <span className="text-blue-400 font-mono">{params.ki.toFixed(2)}</span>
              </div>
              <Slider 
                value={[params.ki]} 
                min={0} max={2} step={0.01} 
                onValueChange={([v]) => setParams(prev => ({ ...prev, ki: v }))}
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Derivative (Kd)</span>
                <span className="text-blue-400 font-mono">{params.kd.toFixed(2)}</span>
              </div>
              <Slider 
                value={[params.kd]} 
                min={0} max={1} step={0.01} 
                onValueChange={([v]) => setParams(prev => ({ ...prev, kd: v }))}
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-white/5 border-white/5">
            <CardHeader className="p-3">
              <CardTitle className="text-[10px] uppercase tracking-widest text-slate-500">Stability</CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0">
              <div className="text-xl font-bold text-emerald-400">MARGINAL</div>
              <div className="text-[10px] text-slate-500 mt-1">Phase: 42.1°</div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/5">
            <CardHeader className="p-3">
              <CardTitle className="text-[10px] uppercase tracking-widest text-slate-500">Settling Time</CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0">
              <div className="text-xl font-bold text-blue-400">1.84s</div>
              <div className="text-[10px] text-slate-500 mt-1">OS: 14.2%</div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Button 
        onClick={handleExport}
        className="w-full bg-blue-600 hover:bg-blue-500 text-white border-none h-12 rounded-xl flex gap-2"
      >
        <Download className="w-4 h-4" />
        Export Coefficients
      </Button>
    </div>
  );
};

export default Controls;