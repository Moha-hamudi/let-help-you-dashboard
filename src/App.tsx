import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from 'sonner';
import Splash from './components/Splash';
import Dashboard from './components/Dashboard';
import Robotics from './components/modules/Robotics';
import Controls from './components/modules/Controls';
import Sensors from './components/modules/Sensors';
import Actuators from './components/modules/Actuators';
import Circuits from './components/modules/Circuits';
import { ChevronLeft, Settings, Home } from 'lucide-react';

export type Module = 'dashboard' | 'robotics' | 'controls' | 'sensors' | 'actuators' | 'circuits';

function App() {
  const [loading, setLoading] = useState(true);
  const [activeModule, setActiveModule] = useState<Module>('dashboard');
  const [unitSystem, setUnitSystem] = useState<'SI' | 'Imperial'>('SI');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const renderModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <Dashboard onSelectModule={setActiveModule} />;
      case 'robotics':
        return <Robotics />;
      case 'controls':
        return <Controls />;
      case 'sensors':
        return <Sensors />;
      case 'actuators':
        return <Actuators unitSystem={unitSystem} />;
      case 'circuits':
        return <Circuits />;
      default:
        return <Dashboard onSelectModule={setActiveModule} />;
    }
  };

  if (loading) return <Splash />;

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-slate-100 font-sans selection:bg-cyan-500/30">
      <Toaster position="top-center" theme="dark" />
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0a0a0c]/80 backdrop-blur-md border-b border-white/5 px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {activeModule !== 'dashboard' && (
            <button 
              onClick={() => setActiveModule('dashboard')}
              className="p-2 -ml-2 hover:bg-white/5 rounded-full transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-cyan-400" />
            </button>
          )}
          <h1 className="text-lg font-bold tracking-tight bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            {activeModule === 'dashboard' ? 'MECHATRONIX' : activeModule.toUpperCase()}
          </h1>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setUnitSystem(prev => prev === 'SI' ? 'Imperial' : 'SI')}
            className="px-2 py-1 text-[10px] font-bold border border-cyan-500/30 rounded bg-cyan-500/10 text-cyan-400"
          >
            {unitSystem}
          </button>
          <button className="p-2 hover:bg-white/5 rounded-full transition-colors text-slate-400">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeModule}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="p-4"
          >
            {renderModule()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Navigation Bar (Mobile) */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#0a0a0c]/90 backdrop-blur-xl border-t border-white/5 px-6 h-16 flex items-center justify-around">
        <button 
          onClick={() => setActiveModule('dashboard')}
          className={`flex flex-col items-center gap-1 transition-colors ${activeModule === 'dashboard' ? 'text-cyan-400' : 'text-slate-500'}`}
        >
          <Home className="w-6 h-6" />
          <span className="text-[10px] font-medium uppercase tracking-widest">Home</span>
        </button>
        <button 
          onClick={() => setActiveModule('sensors')}
          className={`flex flex-col items-center gap-1 transition-colors ${activeModule === 'sensors' ? 'text-cyan-400' : 'text-slate-500'}`}
        >
          <div className="w-6 h-6 border-2 border-current rounded-sm flex items-center justify-center">
            <div className="w-3 h-0.5 bg-current" />
          </div>
          <span className="text-[10px] font-medium uppercase tracking-widest">Visual</span>
        </button>
      </nav>
    </div>
  );
}

export default App;