import React from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  Activity, 
  Zap, 
  Settings2, 
  CircuitBoard, 
  Box, 
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import { Module } from '../App';

interface DashboardProps {
  onSelectModule: (module: Module) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onSelectModule }) => {
  const cards = [
    {
      id: 'robotics' as Module,
      title: 'Robotics Solver',
      desc: 'Forward & Inverse Kinematics (2-6 DOF)',
      icon: Box,
      color: 'bg-cyan-500/10',
      text: 'text-cyan-400',
      border: 'border-cyan-500/20'
    },
    {
      id: 'controls' as Module,
      title: 'Control Lab',
      desc: 'PID Tuning, Bode & Root Locus',
      icon: Activity,
      color: 'bg-blue-500/10',
      text: 'text-blue-400',
      border: 'border-blue-500/20'
    },
    {
      id: 'sensors' as Module,
      title: 'Signal Visualizer',
      desc: 'Oscilloscope & FFT Real-time Data',
      icon: Zap,
      color: 'bg-purple-500/10',
      text: 'text-purple-400',
      border: 'border-purple-500/20'
    },
    {
      id: 'actuators' as Module,
      title: 'Actuator Sizing',
      desc: 'Motor, Stepper & Servo selection',
      icon: Settings2,
      color: 'bg-emerald-500/10',
      text: 'text-emerald-400',
      border: 'border-emerald-500/20'
    },
    {
      id: 'circuits' as Module,
      title: 'Circuit Ref',
      desc: 'Pinouts, Op-Amps & Filters',
      icon: CircuitBoard,
      color: 'bg-orange-500/10',
      text: 'text-orange-400',
      border: 'border-orange-500/20'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-slate-900 to-[#0a0a0c] p-6 rounded-3xl border border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Cpu className="w-24 h-24 text-cyan-400" />
        </div>
        <div className="relative z-10">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Welcome, Engineer</p>
          <h2 className="text-2xl font-bold text-white mb-2">Systems Nominal</h2>
          <div className="flex gap-4 mt-4">
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-500 font-bold uppercase">Battery</span>
              <span className="text-cyan-400 font-mono">98.4%</span>
            </div>
            <div className="w-[1px] h-8 bg-white/10" />
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-500 font-bold uppercase">Uptime</span>
              <span className="text-cyan-400 font-mono">14d 2h</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {cards.map((card, idx) => (
          <motion.button
            key={card.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            onClick={() => onSelectModule(card.id)}
            className={`w-full text-left p-4 rounded-2xl border ${card.border} ${card.color} flex items-center justify-between group active:scale-[0.98] transition-all`}
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl bg-black/40 ${card.text}`}>
                <card.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-100">{card.title}</h3>
                <p className="text-xs text-slate-400">{card.desc}</p>
              </div>
            </div>
            <ChevronRight className={`w-5 h-5 ${card.text} opacity-50 group-hover:opacity-100 transition-opacity`} />
          </motion.button>
        ))}
      </div>

      <div className="pt-4">
        <div className="flex items-center justify-between px-2 mb-4">
          <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Recent Activity</h4>
          <button className="text-[10px] text-cyan-400 font-bold uppercase">Clear</button>
        </div>
        <div className="space-y-3">
          {[
            { label: 'PID Tuned: Servo-Alpha', time: '2h ago', tag: 'Controls' },
            { label: 'IK Solved: SCARA Arm', time: '5h ago', tag: 'Robotics' }
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-slate-200">{item.label}</span>
                <span className="text-[10px] text-slate-500">{item.time}</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 font-bold uppercase border border-cyan-500/20">
                {item.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;