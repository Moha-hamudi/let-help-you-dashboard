import React from 'react';
import { motion } from 'framer-motion';

const Splash = () => {
  return (
    <div className="fixed inset-0 bg-[#0a0a0c] flex flex-col items-center justify-center z-[100] overflow-hidden">
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{ 
          backgroundImage: 'url(https://storage.googleapis.com/dala-prod-public-storage/generated-images/3e7e9d57-bb5a-42e3-aadf-372a37ab8e69/splash-screen-background-f2a709d8-1777633628533.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      
      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-32 h-32 mb-8 relative"
        >
          <img 
            src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/3e7e9d57-bb5a-42e3-aadf-372a37ab8e69/app-logo-2be6acbf-1777633627746.webp" 
            alt="Mechatronix Logo" 
            className="w-full h-full object-contain rounded-2xl shadow-2xl shadow-cyan-500/20"
          />
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-4 border border-cyan-500/20 rounded-full border-dashed"
          />
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-8 border border-blue-500/10 rounded-full border-dashed"
          />
        </motion.div>

        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-3xl font-black tracking-tighter text-white"
        >
          MECHA<span className="text-cyan-400">TRONIX</span>
        </motion.h1>
        
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1, duration: 1.5 }}
          className="h-1 w-24 bg-gradient-to-r from-cyan-500 to-blue-600 mt-4 rounded-full"
        />
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-slate-500 text-xs mt-4 tracking-[0.2em] uppercase font-bold"
        >
          Engineering Excellence
        </motion.p>
      </div>

      <div className="absolute bottom-12 left-0 right-0 flex justify-center">
        <div className="flex gap-2">
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
              className="w-1.5 h-1.5 rounded-full bg-cyan-500"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Splash;