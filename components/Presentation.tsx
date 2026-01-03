
import React, { useState } from 'react';
import { SaathiLogo } from './SaathiLogo';

interface PresentationProps {
  onClose: () => void;
}

export const Presentation: React.FC<PresentationProps> = ({ onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    // Slide 1: Team Details (Title Slide - Based on PDF Page 2)
    <div className="relative flex h-full flex-col bg-[#B2EBF2] p-12 text-[#2C3E50]">
      <div className="flex items-center gap-4">
        <img src="https://www.gstatic.com/images/branding/googlelogo/svg/google_logo_clr_24px.svg" alt="Google" className="h-6" />
        <div className="h-6 w-px bg-gray-400"></div>
        <p className="font-semibold text-gray-600 text-sm">Google Developer Group On Campus • Academy of Technology</p>
      </div>
      
      <div className="mt-16">
        <h1 className="text-8xl font-black tracking-tighter text-[#2C3E50]">TechSprint</h1>
        <div className="mt-4 flex items-center gap-4">
          <div className="flex gap-2">
            <div className="h-6 w-6 rounded-full bg-[#4285F4]"></div>
            <div className="h-6 w-6 rounded-full bg-[#EA4335]"></div>
            <div className="h-6 w-6 rounded-full bg-[#FBBC05]"></div>
          </div>
          <p className="text-3xl font-medium italic text-gray-600">Leveraging the power of AI</p>
        </div>
        
        {/* Decorative squiggle from PDF */}
        <div className="mt-8">
           <svg width="400" height="40" viewBox="0 0 400 40" fill="none">
             <path d="M0 20C20 20 20 35 40 35C60 35 60 20 80 20C100 20 100 35 120 35C140 35 140 20 160 20" stroke="#2C3E50" strokeWidth="2" strokeLinecap="round"/>
             <path d="M160 20 L380 20" stroke="#2C3E50" strokeWidth="2" />
             <path d="M370 15 L380 20 L370 25" stroke="#2C3E50" strokeWidth="2" />
           </svg>
        </div>
      </div>

      <div className="mt-auto">
        <h2 className="text-2xl font-bold mb-6">Team Details</h2>
        <div className="space-y-3 text-2xl">
          <p><strong>a. Team name:</strong> ExamSaathi</p>
          <p><strong>b. Team leader name:</strong> Shudhanshu Kumar Yadav</p>
          <p><strong>c. Problem Statement:</strong> Open Innovation</p>
        </div>
      </div>

      <div className="absolute right-0 top-[10%] w-[45%] h-[55%] overflow-hidden">
        <div className="relative h-full w-full">
          <img src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800" alt="AI Robot" className="rounded-l-[80px] object-cover h-full w-full shadow-2xl" />
          <div className="absolute inset-0 bg-[#4285F4]/10 rounded-l-[80px]"></div>
        </div>
      </div>
    </div>,

    // Slide 2: Brief (PDF Page 3)
    <div className="h-full bg-white p-16 flex flex-col">
      <div className="flex items-center gap-2 mb-12">
        <div className="h-8 w-1 bg-[#4285F4]"></div>
        <h2 className="text-4xl font-bold text-[#2C3E50]">Brief about your solution and problem statement addressing</h2>
      </div>
      <div className="grid grid-cols-2 gap-12 flex-1">
        <div className="space-y-8">
          <div className="p-8 rounded-3xl bg-blue-50 border border-blue-100 shadow-sm">
            <h3 className="text-2xl font-bold text-primary mb-4">Problem Statement</h3>
            <p className="text-xl text-gray-700 leading-relaxed italic">
              "70% of Indian students experience severe exam anxiety, often hitting peak panic at 3 AM when professional help is unavailable."
            </p>
          </div>
          <div className="p-8 rounded-3xl bg-indigo-50 border border-indigo-100 shadow-sm">
            <h3 className="text-2xl font-bold text-accent mb-4">Solution</h3>
            <p className="text-xl text-gray-700 leading-relaxed">
              ExamSaathi is an AI voice-counselor providing instant, culturally sensitive support in Indian languages (Hindi, Hinglish, etc.) specifically for academic stress.
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <SaathiLogo className="h-80 w-80 animate-float" />
        </div>
      </div>
    </div>,

    // Slide 3: Opportunities (PDF Page 4)
    <div className="h-full bg-white p-16 flex flex-col">
      <div className="flex items-center gap-2 mb-12">
        <div className="h-8 w-1 bg-[#EA4335]"></div>
        <h2 className="text-4xl font-bold text-[#2C3E50]">Opportunities</h2>
      </div>
      <div className="space-y-12">
        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
          <h3 className="text-2xl font-bold text-primary mb-6 italic underline decoration-secondary">a. How different is it from any of the other existing ideas?</h3>
          <ul className="grid grid-cols-2 gap-8 text-xl text-gray-700">
            <li className="flex gap-3"><span className="text-primary font-bold">●</span> Multilingual & Cultural IQ (Hinglish/Regional)</li>
            <li className="flex gap-3"><span className="text-primary font-bold">●</span> 24/7 Availability (Zero latency voice)</li>
            <li className="flex gap-3"><span className="text-primary font-bold">●</span> Panic-Specific Interventions (Breathing)</li>
            <li className="flex gap-3"><span className="text-primary font-bold">●</span> Focus on Student-Context (Board/Entrance)</li>
          </ul>
        </div>
        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
          <h3 className="text-2xl font-bold text-primary mb-6 italic underline decoration-secondary">b. How will it be able to solve the problem?</h3>
          <p className="text-2xl text-gray-700 leading-relaxed">
            By reducing the barrier to entry (Anonymous & Voice-based), ExamSaathi provides immediate grounding techniques and strategic study advice, preventing minor anxiety from spiraling into a crisis.
          </p>
        </div>
      </div>
    </div>,

    // Slide 4: Features (PDF Page 5)
    <div className="h-full bg-white p-16 flex flex-col">
      <div className="flex items-center gap-2 mb-12">
        <div className="h-8 w-1 bg-[#FBBC05]"></div>
        <h2 className="text-4xl font-bold text-[#2C3E50]">List of features offered by the solution</h2>
      </div>
      <div className="grid grid-cols-3 gap-8 flex-1">
        {[
          { t: "Voice-Enabled Support", i: "🎙️", d: "Hands-free interaction for panic moments." },
          { t: "Panic Detection", i: "🚨", d: "Auto-detects high stress for grounding." },
          { t: "10+ Indian Languages", i: "🇮🇳", d: "Hindi, Tamil, Hinglish, and more." },
          { t: "Study Prioritization", i: "🎯", d: "Turns anxiety into a practical 3-step plan." },
          { t: "24/7 Availability", i: "🌙", d: "Reliable support at 3 AM peak hours." },
          { t: "Anonymous & Free", i: "🔒", d: "Zero data storage for maximum privacy." }
        ].map((f, i) => (
          <div key={i} className="flex flex-col items-center text-center p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 shadow-sm transition-transform hover:-translate-y-2">
            <div className="text-5xl mb-6">{f.i}</div>
            <h4 className="font-bold text-xl mb-3">{f.t}</h4>
            <p className="text-gray-600">{f.d}</p>
          </div>
        ))}
      </div>
    </div>,

    // Slide 5: Google Technologies (PDF Page 6)
    <div className="h-full bg-white p-16 flex flex-col">
      <div className="flex items-center gap-2 mb-12">
        <div className="h-8 w-1 bg-[#34A853]"></div>
        <h2 className="text-4xl font-bold text-[#2C3E50]">Google Technologies used in the solution</h2>
      </div>
      <div className="grid grid-cols-2 gap-16 flex-1 items-center">
        <div className="space-y-12">
          <div className="flex items-center gap-6 group">
            <div className="h-20 w-20 bg-[#4285F4]/10 rounded-2xl flex items-center justify-center text-3xl font-bold text-[#4285F4]">G</div>
            <div>
              <h4 className="text-2xl font-bold">Gemini 3 Flash</h4>
              <p className="text-xl text-gray-600">Core intelligence for counseling and cultural context.</p>
            </div>
          </div>
          <div className="flex items-center gap-6 group">
            <div className="h-20 w-20 bg-[#FBBC05]/10 rounded-2xl flex items-center justify-center text-3xl font-bold text-[#FBBC05]">L</div>
            <div>
              <h4 className="text-2xl font-bold">Gemini Live API</h4>
              <p className="text-xl text-gray-600">Low-latency native audio streaming for voice conversations.</p>
            </div>
          </div>
          <div className="flex items-center gap-6 group">
            <div className="h-20 w-20 bg-[#EA4335]/10 rounded-2xl flex items-center justify-center text-3xl font-bold text-[#EA4335]">S</div>
            <div>
              <h4 className="text-2xl font-bold">Google AI Studio</h4>
              <p className="text-xl text-gray-600">Rapid prototyping and system instruction fine-tuning.</p>
            </div>
          </div>
        </div>
        <div className="p-12 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200 text-center">
           <img src="https://www.gstatic.com/lamda/images/gemini_wordmark_604x164.png" alt="Gemini" className="h-20 mx-auto mb-8" />
           <p className="text-2xl font-medium text-slate-500 italic">"The state-of-the-art foundation for empathetic AI"</p>
        </div>
      </div>
    </div>,

    // Slide 6: Process Flow (PDF Page 7)
    <div className="h-full bg-white p-16 flex flex-col">
      <div className="flex items-center gap-2 mb-12">
        <div className="h-8 w-1 bg-[#4285F4]"></div>
        <h2 className="text-4xl font-bold text-[#2C3E50]">Process flow diagram or Use-case diagram</h2>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center">
         <div className="grid grid-cols-5 gap-4 items-center w-full max-w-5xl">
            <div className="p-8 bg-blue-500 text-white rounded-3xl text-center shadow-lg font-bold">
               User Speech <br/><span className="text-xs font-normal">Input</span>
            </div>
            <div className="text-center text-3xl text-slate-300">→</div>
            <div className="p-8 bg-[#2C3E50] text-white rounded-3xl text-center shadow-lg font-bold">
               Live API Session <br/><span className="text-xs font-normal">Native Audio Stream</span>
            </div>
            <div className="text-center text-3xl text-slate-300">→</div>
            <div className="p-8 bg-green-500 text-white rounded-3xl text-center shadow-lg font-bold">
               Counseling Output <br/><span className="text-xs font-normal">Multilingual Voice</span>
            </div>
         </div>
         <div className="mt-16 p-8 bg-slate-50 rounded-3xl border border-slate-100 max-w-2xl text-center">
            <h4 className="font-bold text-primary mb-2">Panic Loop Check</h4>
            <p className="text-gray-600 italic">If high-stress detected → Intercept with grounding audio buffer immediately.</p>
         </div>
      </div>
    </div>,

    // Slide 7: Wireframes/Mock (PDF Page 8)
    <div className="h-full bg-white p-16 flex flex-col">
      <div className="flex items-center gap-2 mb-12">
        <div className="h-8 w-1 bg-[#EA4335]"></div>
        <h2 className="text-4xl font-bold text-[#2C3E50]">Wireframes/Mock diagrams (optional)</h2>
      </div>
      <div className="grid grid-cols-2 gap-12 flex-1 items-center">
        <div className="rounded-3xl border-4 border-slate-100 p-4 shadow-2xl">
           <img src="https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800" alt="UI Design" className="rounded-xl w-full" />
        </div>
        <div className="space-y-6">
           <h3 className="text-3xl font-bold text-primary">Minimalist & Calming</h3>
           <p className="text-xl text-gray-600 leading-relaxed">
             Our interface focuses on the "Breath" button and "Voice Mode". We used soft teals and purples to reduce ocular stress during late-night usage.
           </p>
           <ul className="space-y-4 text-lg">
             <li className="flex items-center gap-3"><span className="text-green-500 font-bold">✔</span> Dark-mode optimized</li>
             <li className="flex items-center gap-3"><span className="text-green-500 font-bold">✔</span> Mobile-first responsive layout</li>
             <li className="flex items-center gap-3"><span className="text-green-500 font-bold">✔</span> Accessibility focused text contrast</li>
           </ul>
        </div>
      </div>
    </div>,

    // Slide 8: Architecture (PDF Page 9)
    <div className="h-full bg-white p-16 flex flex-col">
      <div className="flex items-center gap-2 mb-12">
        <div className="h-8 w-1 bg-[#FBBC05]"></div>
        <h2 className="text-4xl font-bold text-[#2C3E50]">Architecture diagram (optional)</h2>
      </div>
      <div className="flex-1 bg-slate-900 rounded-[3rem] p-12 relative overflow-hidden">
         <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500 to-transparent"></div>
         <div className="relative z-10 grid grid-cols-3 h-full items-center text-white text-center">
            <div className="space-y-2">
               <div className="h-32 w-32 mx-auto bg-white/10 rounded-full flex items-center justify-center text-3xl">💻</div>
               <p className="font-bold">Frontend (React/Vite)</p>
            </div>
            <div className="space-y-2">
               <div className="h-32 w-32 mx-auto bg-primary rounded-full flex items-center justify-center text-3xl">📡</div>
               <p className="font-bold">Google GenAI SDK (WebSockets)</p>
            </div>
            <div className="space-y-2">
               <div className="h-32 w-32 mx-auto bg-white/10 rounded-full flex items-center justify-center text-3xl">☁️</div>
               <p className="font-bold">Gemini Cloud Infrastructure</p>
            </div>
         </div>
      </div>
    </div>,

    // Slide 9: Snapshots (PDF Page 10)
    <div className="h-full bg-white p-16 flex flex-col">
      <div className="flex items-center gap-2 mb-12">
        <div className="h-8 w-1 bg-[#34A853]"></div>
        <h2 className="text-4xl font-bold text-[#2C3E50]">Snapshots of the MVP (optional)</h2>
      </div>
      <div className="grid grid-cols-2 gap-8 flex-1">
        <div className="relative rounded-3xl overflow-hidden border-8 border-slate-100 shadow-xl group">
           <img src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=800" alt="App Usage" className="w-full h-full object-cover" />
           <div className="absolute bottom-6 left-6 right-6 bg-white/90 p-4 rounded-2xl font-bold text-center">Main Dashboard</div>
        </div>
        <div className="relative rounded-3xl overflow-hidden border-8 border-slate-100 shadow-xl">
           <img src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=800" alt="App Usage" className="w-full h-full object-cover" />
           <div className="absolute bottom-6 left-6 right-6 bg-white/90 p-4 rounded-2xl font-bold text-center">Live Counseling Interface</div>
        </div>
      </div>
    </div>,

    // Slide 10: Additional Details (PDF Page 11)
    <div className="h-full bg-white p-16 flex flex-col">
      <div className="flex items-center gap-2 mb-12">
        <div className="h-8 w-1 bg-[#4285F4]"></div>
        <h2 className="text-4xl font-bold text-[#2C3E50]">Additional Details/Future Development (if any)</h2>
      </div>
      <div className="grid grid-cols-3 gap-8 flex-1">
        <div className="p-8 bg-blue-50 rounded-3xl border border-blue-100">
           <h4 className="text-2xl font-bold text-primary mb-4">Mobile App</h4>
           <p className="text-lg text-gray-600">Developing a Flutter-based native app for offline panic grounding and push-notification reminders.</p>
        </div>
        <div className="p-8 bg-red-50 rounded-3xl border border-red-100">
           <h4 className="text-2xl font-bold text-red-600 mb-4">Expert Escalation</h4>
           <p className="text-lg text-gray-600">Integrating a "Live SOS" button that connects students to human volunteers if AI detects critical risk levels.</p>
        </div>
        <div className="p-8 bg-green-50 rounded-3xl border border-green-100">
           <h4 className="text-2xl font-bold text-green-600 mb-4">Peer Support</h4>
           <p className="text-lg text-gray-600">Creating anonymous group meditation rooms where students can feel "alone together" during board exams.</p>
        </div>
      </div>
    </div>,

    // Slide 11: Links (PDF Page 12)
    <div className="h-full bg-white p-16 flex flex-col">
      <div className="flex items-center gap-2 mb-12">
        <div className="h-8 w-1 bg-[#2C3E50]"></div>
        <h2 className="text-4xl font-bold text-[#2C3E50]">Provide links to your:</h2>
      </div>
      <div className="space-y-10 max-w-4xl mx-auto w-full">
         <div className="flex items-center gap-8 p-6 bg-slate-50 rounded-3xl border border-slate-100 transition-all hover:bg-slate-100">
            <div className="h-16 w-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center text-2xl font-bold">1</div>
            <div className="flex-1">
               <h4 className="text-2xl font-bold">GitHub Public Repository</h4>
               <p className="text-primary text-xl font-mono">github.com/shudhanshuyadav/ExamSaathi</p>
            </div>
         </div>
         <div className="flex items-center gap-8 p-6 bg-slate-50 rounded-3xl border border-slate-100 transition-all hover:bg-slate-100">
            <div className="h-16 w-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center text-2xl font-bold">2</div>
            <div className="flex-1">
               <h4 className="text-2xl font-bold">Demo Video Link (3 Minutes)</h4>
               <p className="text-primary text-xl font-mono">youtube.com/watch?v=saathi-demo</p>
            </div>
         </div>
         <div className="flex items-center gap-8 p-6 bg-slate-50 rounded-3xl border border-slate-100 transition-all hover:bg-slate-100">
            <div className="h-16 w-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center text-2xl font-bold">3</div>
            <div className="flex-1">
               <h4 className="text-2xl font-bold">MVP Link</h4>
               <p className="text-primary text-xl font-mono">examsaathi-ai.web.app</p>
            </div>
         </div>
      </div>
    </div>,

    // Slide 12: Thank You (PDF Page 13)
    <div className="relative h-full bg-[#B2EBF2] flex flex-col items-center justify-center text-center p-12">
      <div className="absolute top-12 left-12 flex items-center gap-4">
        <img src="https://www.gstatic.com/images/branding/googlelogo/svg/google_logo_clr_24px.svg" alt="Google" className="h-6" />
        <div className="h-6 w-px bg-gray-400"></div>
        <p className="font-semibold text-gray-600">TechSprint</p>
      </div>

      <SaathiLogo className="h-56 w-56 mb-12 drop-shadow-2xl" />
      <h1 className="text-9xl font-black text-[#2C3E50] tracking-tighter">Thank you!</h1>
      
      {/* Signature squiggle from PDF Page 13 */}
      <div className="mt-8 flex items-center gap-4 w-full max-w-lg">
         <div className="h-px flex-1 bg-slate-900/20"></div>
         <svg width="60" height="40" viewBox="0 0 60 40" fill="none">
            <path d="M5 20 L50 20 L40 10 M50 20 L40 30" stroke="#2C3E50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
         </svg>
      </div>

      <div className="mt-12 space-y-2">
         <p className="text-3xl font-bold text-[#2C3E50]">ExamSaathi Project Team</p>
         <p className="text-xl text-gray-500 italic">Academy of Technology • TechSprint 2026</p>
      </div>
      
      <div className="absolute bottom-12 right-12 flex gap-4">
        <div className="h-5 w-5 rounded-full bg-[#4285F4]"></div>
        <div className="h-5 w-5 rounded-full bg-[#EA4335]"></div>
        <div className="h-5 w-5 rounded-full bg-[#FBBC05]"></div>
        <div className="h-5 w-5 rounded-full bg-[#34A853]"></div>
      </div>
    </div>
  ];

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-slate-950/95 backdrop-blur-xl transition-all duration-300">
      {/* PPT Viewer Toolbar */}
      <div className="flex items-center justify-between px-12 py-6 bg-slate-900/50 text-white border-b border-white/5">
        <div className="flex items-center gap-6">
          <SaathiLogo className="h-10 w-10" />
          <div className="h-8 w-px bg-white/10"></div>
          <span className="font-bold text-xl tracking-tight">ExamSaathi Project Presentation</span>
        </div>
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-6 bg-white/5 px-6 py-3 rounded-2xl border border-white/5 shadow-inner">
            <button 
              onClick={() => setCurrentSlide(prev => Math.max(0, prev - 1))}
              disabled={currentSlide === 0}
              className="p-2 hover:bg-white/10 rounded-full disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              title="Previous Slide"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <span className="font-mono text-lg font-bold min-w-[80px] text-center">{currentSlide + 1} / {slides.length}</span>
            <button 
              onClick={() => setCurrentSlide(prev => Math.min(slides.length - 1, prev + 1))}
              disabled={currentSlide === slides.length - 1}
              className="p-2 hover:bg-white/10 rounded-full disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              title="Next Slide"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
          <button 
            onClick={onClose}
            className="group flex items-center gap-3 rounded-2xl bg-red-500/10 px-6 py-3 text-sm font-bold text-red-400 hover:bg-red-500/20 transition-all border border-red-500/20"
          >
            <span>Exit Show</span>
            <kbd className="hidden sm:inline-block px-2 py-0.5 rounded bg-red-500/20 text-[10px] group-hover:bg-red-500/30">ESC</kbd>
          </button>
        </div>
      </div>

      {/* Slide Container */}
      <div className="flex-1 flex items-center justify-center p-12 bg-black/20 overflow-hidden">
        <div className="aspect-[16/9] w-full max-w-[1400px] bg-white shadow-[0_35px_60px_-15px_rgba(0,0,0,0.6)] rounded-sm overflow-hidden transform transition-all duration-700 ease-out animate-in zoom-in-95 fade-in">
          {slides[currentSlide]}
        </div>
      </div>

      {/* Progress Line */}
      <div className="h-1.5 w-full bg-white/5 relative">
        <div 
          className="absolute inset-y-0 left-0 bg-primary shadow-[0_0_15px_rgba(74,144,226,0.6)] transition-all duration-300 ease-out"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>

      {/* Keyboard Controls Listener */}
      <div onKeyDown={(e) => {
        if (e.key === 'ArrowRight' || e.key === ' ') setCurrentSlide(prev => Math.min(slides.length - 1, prev + 1));
        if (e.key === 'ArrowLeft') setCurrentSlide(prev => Math.max(0, prev - 1));
        if (e.key === 'Escape') onClose();
      }} tabIndex={0} autoFocus className="fixed inset-0 pointer-events-none focus:outline-none" />
    </div>
  );
};
