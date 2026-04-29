import React, { useEffect, useRef, useState } from 'react';

const sequence = [
  { type: 'cmd', prompt: 'reyaash@dev:~$', text: 'npm run build:backend', cls: 'text-[#FFF0D8]' },
  { type: 'out', cls: 'text-[#C3B7A4]', text: 'Connecting to MongoDB...' },
  { type: 'out', cls: 'text-[#70CC7B]', text: 'MongoDB connected ✔' },
  { type: 'out', cls: 'text-[#E8DFD1]', text: '📦 Collections loaded: Users, Projects' },
  { type: 'out', cls: 'text-[#E8DFD1]', text: '🔐 JWT Authentication enabled' },
  { type: 'out', cls: 'text-[#F2C06D]', text: '🚀 Express server running on :5000' },
  { type: 'gap' },
  { type: 'cmd', prompt: 'reyaash@dev:~$', text: 'npm run dev:frontend', cls: 'text-[#FFF0D8]' },
  { type: 'loading' },
  { type: 'out', cls: 'text-[#70CC7B]', text: 'Ready on http://localhost:3000 ✔' },
  { type: 'gap' },
  { type: 'cmd', prompt: 'reyaash@dev:~$', text: 'curl http://localhost:5000/health', cls: 'text-[#FFF0D8]' },
  { type: 'out', cls: 'text-[#E8DFD1]', text: '{ "status": "healthy", "uptime": "0.1s", "db": "connected" }' },
  { type: 'out', cls: 'text-[#7EE3FF]', text: 'All systems running' },
  { type: 'status' },
  { type: 'idle' },
];

export default function Terminal({ isDark }) {
  const [lines, setLines] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [typingText, setTypingText] = useState('');
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [activeStepLogs, setActiveStepLogs] = useState([]);
  const tbodyRef = useRef(null);
  const isMounted = useRef(true);
  const processedSteps = useRef(new Set());
  const triggeredThresholds = useRef(new Set());

  const getLoadingLabel = (progress) => {
    if (progress < 20) return "Compiling React...";
    if (progress < 50) return "Bundling modules...";
    if (progress < 80) return "Optimizing build...";
    return "Finalizing...";
  };

  useEffect(() => {
    isMounted.current = true;
    return () => { isMounted.current = false; };
  }, []);

  useEffect(() => {
    if (currentStep >= sequence.length) {
      // Loop sequence after 5 seconds
      const loopTimeout = setTimeout(() => {
        if (isMounted.current) {
          setLines([]);
          setCurrentStep(0);
          setLoadingProgress(0);
          setTypingText('');
          setActiveStepLogs([]);
          processedSteps.current.clear();
          triggeredThresholds.current.clear();
        }
      }, 1000);
      return () => clearTimeout(loopTimeout);
    }

    if (processedSteps.current.has(currentStep) && !['loading', 'cmd', 'out'].includes(sequence[currentStep].type)) return;

    const step = sequence[currentStep];
    let intervalId;
    let timeoutId;

    if (step.type === 'gap') {
      if (!processedSteps.current.has(currentStep)) {
        processedSteps.current.add(currentStep);
        setLines((prev) => [...prev, { type: 'gap', id: currentStep }]);
      }
      timeoutId = setTimeout(() => {
        if (isMounted.current) setCurrentStep((s) => s + 1);
      }, 150);
    } 
    else if (step.type === 'idle') {
      if (!processedSteps.current.has(currentStep)) {
        processedSteps.current.add(currentStep);
        setLines((prev) => [...prev, { type: 'idle', id: currentStep }]);
        // Wait 4 seconds then finish to trigger loop
        timeoutId = setTimeout(() => {
          if (isMounted.current) setCurrentStep((s) => s + 1);
        }, 2000);
      }
    } 
    else if (step.type === 'status') {
      if (!processedSteps.current.has(currentStep)) {
        processedSteps.current.add(currentStep);
        setLines((prev) => [...prev, { type: 'status', id: currentStep }]);
      }
      timeoutId = setTimeout(() => {
        if (isMounted.current) setCurrentStep((s) => s + 1);
      }, 1000);
    }
    else if (step.type === 'loading') {
      intervalId = setInterval(() => {
        setLoadingProgress((prev) => {
          const next = prev + Math.max(1, Math.floor(Math.random() * 6));
          
          // Trigger threshold logs
          if (next >= 20 && !triggeredThresholds.current.has(20)) {
            triggeredThresholds.current.add(20);
            setActiveStepLogs(l => [...l, { text: '✔ Bundling modules...', cls: 'text-[#70CC7B]' }]);
          }
          if (next >= 50 && !triggeredThresholds.current.has(50)) {
            triggeredThresholds.current.add(50);
            setActiveStepLogs(l => [...l, { text: '✔ Optimizing build...', cls: 'text-[#70CC7B]' }]);
          }
          if (next >= 80 && !triggeredThresholds.current.has(80)) {
            triggeredThresholds.current.add(80);
            setActiveStepLogs(l => [...l, { text: '✔ Finalizing...', cls: 'text-[#70CC7B]' }]);
          }

          if (next >= 100) {
            clearInterval(intervalId);
            timeoutId = setTimeout(() => {
              if (isMounted.current && !processedSteps.current.has(currentStep)) {
                processedSteps.current.add(currentStep);
                setLines((prev) => [...prev, { 
                  type: 'loading', 
                  progress: 100, 
                  label: getLoadingLabel(100), 
                  id: currentStep,
                  logs: [...activeStepLogs]
                }]);
                setActiveStepLogs([]);
                setCurrentStep((s) => s + 1);
              }
            }, 400);
            return 100;
          }
          return next;
        });
      }, 180);
    } 
    else if (step.type === 'cmd' || step.type === 'out') {
      const speed = step.type === 'cmd' ? 75 : 35;
      const finishDelay = step.type === 'cmd' ? 500 : 250;
      let i = 0;
      
      intervalId = setInterval(() => {
        if (i <= step.text.length) {
          if (isMounted.current) setTypingText(step.text.slice(0, i));
          i++;
        } else {
          clearInterval(intervalId);
          if (isMounted.current && !processedSteps.current.has(currentStep)) {
            processedSteps.current.add(currentStep);
            setLines((prev) => [...prev, { ...step, text: step.text, id: currentStep }]);
            setTypingText('');
            timeoutId = setTimeout(() => {
              if (isMounted.current) setCurrentStep((s) => s + 1);
            }, finishDelay);
          }
        }
      }, speed);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [currentStep]);

  useEffect(() => {
    if (tbodyRef.current) {
      tbodyRef.current.scrollTop = tbodyRef.current.scrollHeight;
    }
  }, [lines, typingText, loadingProgress]);

  return (
    <div className={`terminal terminal-float w-full max-w-[460px] mx-auto lg:mx-0 shadow-2xl rounded-xl overflow-hidden border ${
      isDark ? 'bg-[#0F0E0C] border-white/10' : 'bg-[#0F0E0C] border-black/10'
    }`} style={{
      boxShadow: isDark ? '0 32px 80px rgba(0,0,0,0.45)' : '0 32px 80px rgba(0,0,0,0.25)'
    }}>
      <div className="titlebar bg-[#1C1A16] px-4 py-3 flex items-center gap-2 border-b border-white/5">
        <div className="flex gap-1.5">
          <div className="tb-dot w-3 h-3 rounded-full bg-[#FF5F57]"></div>
          <div className="tb-dot w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
          <div className="tb-dot w-3 h-3 rounded-full bg-[#28C840]"></div>
        </div>
        <div className="tb-title text-[11px] text-[#9B8F81] mx-auto tracking-wider font-mono">reyaash@portfolio ~ bash</div>
      </div>
      <div className="body p-5 h-[340px] overflow-hidden font-mono flex flex-col gap-0.5 scroll-smooth text-gray-200 terminal-glow" ref={tbodyRef}>
        {lines.map((line, idx) => {
          if (line.type === 'gap') return <div key={line.id || idx} className="h-1.5" />;
          if (line.type === 'loading') {
            return (
              <div key={line.id || idx} className="flex flex-col gap-1 my-1">
                <div className="flex items-center gap-3">
                  <span className="text-[12.5px] text-[#E8DFD1] min-w-[140px] terminal-text-glow">Compiling React...</span>
                  <div className="flex-1 h-5 bg-[#2A2620] rounded-sm relative overflow-hidden border border-white/5">
                    <div className="h-full bg-[#F9F3E8] w-full" />
                    <div className="absolute inset-0 pointer-events-none opacity-30" style={{
                      backgroundImage: 'linear-gradient(90deg, rgba(0,0,0,0.15) 1px, transparent 1px)',
                      backgroundSize: '8px 100%'
                    }} />
                  </div>
                  <span className="text-[11px] text-[#E8DFD1] font-bold min-w-[35px] terminal-text-glow">100%</span>
                </div>
                {line.logs && line.logs.map((log, lidx) => (
                  <div key={lidx} className={`text-[12.5px] leading-[1.75] ml-0 ${log.cls}`}>
                    {log.text}
                  </div>
                ))}
              </div>
            );
          }
          if (line.type === 'status') {
            return (
              <div key={line.id || idx} className="flex items-center gap-2 mt-2 pt-2 border-t border-white/5">
                <div className="w-2 h-2 rounded-full bg-[#4DB563] animate-pulse shadow-[0_0_8px_rgba(77,181,99,0.6)]" />
                <span className="text-[11px] text-[#4DB563] tracking-wide font-medium">Server Live: All systems operational</span>
              </div>
            );
          }
          if (line.type === 'idle') {
            return (
              <div key={line.id || idx} className="ln flex items-baseline text-[12.5px] leading-[1.75] white-space-pre">
                <span className="prompt text-[#FF9B2F] mr-1.5">reyaash@dev:~$</span>
                <span className="cursor inline-block w-2 h-3.5 bg-[#E8720C] align-middle ml-0.5 animate-pulse" />
              </div>
            );
          }
          return (
            <div key={line.id || idx} className="ln flex items-baseline text-[12.5px] leading-[1.75] white-space-pre">
              {line.prompt && <span className="prompt text-[#FF9B2F] mr-1.5">{line.prompt}</span>}
              <span className={line.cls || (line.type === 'cmd' ? 'text-[#FFF0D8]' : 'text-gray-200')}>{line.text}</span>
            </div>
          );
        })}
        
        {/* Dynamic Typing / Loading */}
        {currentStep < sequence.length && sequence[currentStep].type === 'loading' && (
          <div className="flex flex-col gap-1 my-1">
            <div className="flex items-center gap-3">
              <span className="text-[12.5px] text-[#E8DFD1] min-w-[140px] terminal-text-glow">Compiling React...</span>
              <div className="flex-1 h-5 bg-[#2A2620] rounded-sm relative overflow-hidden border border-white/5">
                <div 
                  className="h-full bg-[#F9F3E8] transition-all duration-200 ease-out"
                  style={{ width: `${loadingProgress}%` }}
                />
                <div className="absolute inset-0 pointer-events-none opacity-30" style={{
                  backgroundImage: 'linear-gradient(90deg, rgba(0,0,0,0.15) 1px, transparent 1px)',
                  backgroundSize: '8px 100%'
                }} />
              </div>
              <span className="text-[11px] text-[#E8DFD1] font-bold min-w-[35px] terminal-text-glow">{loadingProgress}%</span>
            </div>
            {activeStepLogs.map((log, lidx) => (
              <div key={lidx} className={`text-[12.5px] leading-[1.75] ml-0 ${log.cls}`}>
                {log.text}
              </div>
            ))}
          </div>
        )}
        
        {currentStep < sequence.length && sequence[currentStep].type !== 'loading' && sequence[currentStep].type !== 'gap' && sequence[currentStep].type !== 'idle' && sequence[currentStep].type !== 'status' && (
          <div className="ln flex items-baseline text-[12.5px] leading-[1.75] white-space-pre">
            {sequence[currentStep].prompt && <span className="prompt text-[#FF9B2F] mr-1.5">{sequence[currentStep].prompt}</span>}
            <span className={sequence[currentStep].cls || (sequence[currentStep].type === 'cmd' ? 'text-[#FFF0D8]' : 'text-gray-200')}>{typingText}</span>
            <span className="cursor inline-block w-2 h-3.5 bg-[#E8720C] align-middle ml-0.5 animate-pulse" />
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap');
        .terminal { font-family: 'JetBrains Mono', monospace; }
        .white-space-pre { white-space: pre; }
        .terminal-text-glow {
          text-shadow: 0 0 8px rgba(232, 114, 12, 0.2), 0.5px 0.5px 0px rgba(0, 255, 255, 0.3), -0.5px -0.5px 0px rgba(255, 0, 0, 0.3);
        }
        .terminal-glow .ln span {
           text-shadow: 0 0 5px rgba(255, 255, 255, 0.05);
        }
      ` }} />
    </div>
  );
}
