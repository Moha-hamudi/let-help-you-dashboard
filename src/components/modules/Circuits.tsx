import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { CircuitBoard, Cpu, HelpCircle } from 'lucide-react';

const Circuits = () => {
  const [gain, setGain] = useState(10);
  const [rf, setRf] = useState(10000);
  const [rin, setRin] = useState(1000);

  const mcus = [
    { name: 'Arduino Uno', pins: '14 Digital, 6 Analog', voltage: '5V', processor: 'ATMega328P' },
    { name: 'STM32 BluePill', pins: '37 GPIO, 10 ADC', voltage: '3.3V', processor: 'Cortex-M3' },
    { name: 'ESP32-WROOM', pins: '25 GPIO, Wi-Fi/BT', voltage: '3.3V', processor: 'Xtensa Dual-Core' },
  ];

  return (
    <div className="space-y-4">
      <Tabs defaultValue="calculators" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-white/5 p-1 h-12 rounded-xl mb-4">
          <TabsTrigger value="calculators" className="rounded-lg data-[state=active]:bg-orange-500/10 data-[state=active]:text-orange-400">Calculators</TabsTrigger>
          <TabsTrigger value="pinouts" className="rounded-lg data-[state=active]:bg-orange-500/10 data-[state=active]:text-orange-400">Pinouts</TabsTrigger>
        </TabsList>

        <TabsContent value="calculators" className="space-y-4 m-0">
          <Card className="bg-white/5 border-white/5">
            <CardHeader className="p-4">
              <CardTitle className="text-sm text-orange-400">Non-Inverting Op-Amp</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 space-y-4">
              <div className="p-4 bg-black/40 rounded-xl border border-white/5 flex flex-col items-center justify-center">
                <div className="text-2xl font-mono text-slate-100 mb-1">Gain = 1 + (Rf / Rin)</div>
                <div className="text-sm text-orange-400 font-bold">Result: {(1 + rf/rin).toFixed(2)}x</div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase text-slate-500">Rf (Ω)</Label>
                  <Input 
                    type="number" 
                    value={rf} 
                    onChange={e => setRf(Number(e.target.value))}
                    className="bg-black/50 border-white/10 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase text-slate-500">Rin (Ω)</Label>
                  <Input 
                    type="number" 
                    value={rin} 
                    onChange={e => setRin(Number(e.target.value))}
                    className="bg-black/50 border-white/10 text-white"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/5">
            <CardHeader className="p-4">
              <CardTitle className="text-sm text-orange-400">RC Low-Pass Filter</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 flex justify-between items-center">
              <div>
                <div className="text-[10px] uppercase text-slate-500">Cutoff Frequency</div>
                <div className="text-xl font-bold text-white">1.59 <span className="text-xs text-slate-500">kHz</span></div>
              </div>
              <div className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-slate-600" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pinouts" className="space-y-3 m-0">
          {mcus.map((mcu, i) => (
            <Card key={i} className="bg-white/5 border-white/5">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-black/40 border border-white/5 flex items-center justify-center">
                    <Cpu className="w-6 h-6 text-orange-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-100">{mcu.name}</h3>
                    <p className="text-[10px] text-slate-500">{mcu.processor}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-bold text-orange-500 uppercase">{mcu.voltage}</div>
                  <div className="text-[9px] text-slate-500">{mcu.pins}</div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          <div className="p-6 border-2 border-dashed border-white/5 rounded-2xl flex flex-col items-center justify-center text-slate-600 gap-2">
            <CircuitBoard className="w-8 h-8 opacity-20" />
            <p className="text-[10px] uppercase font-bold tracking-widest">More schematics coming soon</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Circuits;