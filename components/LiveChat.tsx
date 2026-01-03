
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Modality, LiveServerMessage } from '@google/genai';
import { gemini } from '../services/geminiService';
import { ChatMessage } from '../types';
import { decodeBase64, decodeAudioData, createPcmBlob } from '../utils/audio';

interface LiveChatProps {
  onClose: () => void;
}

export const LiveChat: React.FC<LiveChatProps> = ({ onClose }) => {
  // Common state
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Voice mode state
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isVoiceConnected, setIsVoiceConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  // Refs for audio processing
  const audioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const activeSourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const sessionPromiseRef = useRef<any>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, isVoiceMode]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopVoiceSession();
    };
  }, []);

  const handleSendText = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));
    history.push({ role: 'user', parts: [{ text: input }] });

    const aiResponse = await gemini.getCounselingResponse(input, history);
    
    setIsTyping(false);
    setMessages(prev => [...prev, { role: 'model', text: aiResponse, timestamp: new Date() }]);
  };

  const startVoiceSession = async () => {
    try {
      setIsVoiceMode(true);
      setIsVoiceConnected(false);

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      outputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      
      streamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });

      sessionPromiseRef.current = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
          },
          systemInstruction: 'You are ExamSaathi, a culturally intelligent AI counselor for Indian students. Speak in their language (Hindi/English/Hinglish). If panic is high, guide them through breathing. Use a gentle, supportive tone.',
        },
        callbacks: {
          onopen: () => {
            setIsVoiceConnected(true);
            const source = audioContextRef.current!.createMediaStreamSource(streamRef.current!);
            const scriptProcessor = audioContextRef.current!.createScriptProcessor(4096, 1, 1);
            
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const pcmBlob = createPcmBlob(inputData);
              sessionPromiseRef.current.then((session: any) => {
                session.sendRealtimeInput({ media: pcmBlob });
              });
            };

            source.connect(scriptProcessor);
            scriptProcessor.connect(audioContextRef.current!.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64Audio) {
              setIsSpeaking(true);
              const ctx = outputAudioContextRef.current!;
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
              
              const audioBuffer = await decodeAudioData(decodeBase64(base64Audio), ctx, 24000, 1);
              const source = ctx.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(ctx.destination);
              
              source.addEventListener('ended', () => {
                activeSourcesRef.current.delete(source);
                if (activeSourcesRef.current.size === 0) setIsSpeaking(false);
              });

              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              activeSourcesRef.current.add(source);
            }

            if (message.serverContent?.interrupted) {
              activeSourcesRef.current.forEach(s => s.stop());
              activeSourcesRef.current.clear();
              nextStartTimeRef.current = 0;
              setIsSpeaking(false);
            }
          },
          onclose: () => setIsVoiceConnected(false),
          onerror: (e) => console.error('Live API Error:', e),
        },
      });
    } catch (err) {
      console.error('Failed to start voice:', err);
      setIsVoiceMode(false);
    }
  };

  const stopVoiceSession = () => {
    setIsVoiceMode(false);
    setIsVoiceConnected(false);
    setIsSpeaking(false);
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    if (outputAudioContextRef.current) {
      outputAudioContextRef.current.close();
      outputAudioContextRef.current = null;
    }

    if (sessionPromiseRef.current) {
      sessionPromiseRef.current.then((session: any) => session.close());
      sessionPromiseRef.current = null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="flex h-full max-h-[800px] w-full max-w-2xl flex-col overflow-hidden rounded-[2.5rem] bg-white dark:bg-slate-900 shadow-2xl transition-all border border-white/10">
        {/* Header */}
        <div className="flex items-center justify-between border-b dark:border-white/10 bg-primary p-6 text-white">
          <div className="flex items-center gap-4">
            <div className={`flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-2xl transition-all ${isSpeaking ? 'scale-110 ring-4 ring-white/30' : ''}`}>
              {isVoiceMode ? '🎙️' : '🤖'}
            </div>
            <div>
              <h3 className="text-xl font-bold">{isVoiceMode ? 'Voice Buddy' : 'ExamSaathi Buddy'}</h3>
              <p className="text-sm text-blue-100 italic">
                {isVoiceMode ? (isVoiceConnected ? (isSpeaking ? 'ExamSaathi is speaking...' : 'Listening to you...') : 'Connecting...') : 'Chatting with you...'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="rounded-full p-2 hover:bg-white/10 transition-colors">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Interaction Area */}
        {isVoiceMode ? (
          <div className="flex flex-1 flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 p-12 text-center space-y-8">
            <div className="relative">
              {/* Voice Waves Animation */}
              {isVoiceConnected && (
                <div className="absolute inset-0 -m-8 flex items-center justify-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-2 rounded-full bg-primary transition-all duration-300 ${isSpeaking || isVoiceConnected ? 'animate-pulse' : 'h-8'}`}
                      style={{ 
                        height: isSpeaking ? `${Math.random() * 80 + 20}%` : '20%',
                        animationDelay: `${i * 100}ms`
                      }}
                    />
                  ))}
                </div>
              )}
              <div className={`relative z-10 flex h-32 w-32 items-center justify-center rounded-full bg-white dark:bg-slate-800 shadow-xl transition-all ${isSpeaking ? 'ring-8 ring-primary/20 scale-105' : 'ring-4 ring-slate-100 dark:ring-slate-700'}`}>
                <span className="text-5xl">{isSpeaking ? '👂' : '🗣️'}</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-2xl font-bold text-gray-800 dark:text-white">
                {isSpeaking ? 'Listen closely...' : 'Just speak naturally'}
              </h4>
              <p className="max-w-xs text-gray-500 dark:text-slate-400">
                Hindi, English, or mixed - I understand everything you're feeling.
              </p>
            </div>

            <button 
              onClick={stopVoiceSession}
              className="mt-8 rounded-full bg-red-50 dark:bg-red-900/20 px-8 py-3 font-bold text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
            >
              Switch back to Text
            </button>
          </div>
        ) : (
          /* Text Chat Area */
          <>
            <div ref={scrollRef} className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950 p-6 space-y-4">
              {messages.length === 0 && (
                <div className="flex h-full flex-col items-center justify-center text-center opacity-60">
                  <div className="mb-4 rounded-full bg-blue-100 dark:bg-blue-900/30 p-6 text-4xl">👋</div>
                  <p className="max-w-xs text-lg font-medium italic dark:text-slate-300">
                    "Arre, main samajh sakta hoon. Kya hua? Mujhe sab batao."
                  </p>
                  <p className="text-sm mt-2 dark:text-slate-400">Try typing in Hindi, English, or Hinglish.</p>
                </div>
              )}
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl px-5 py-4 shadow-sm ${
                    m.role === 'user' 
                      ? 'bg-primary text-white rounded-tr-none' 
                      : 'bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-100 rounded-tl-none border border-slate-100 dark:border-white/5'
                  }`}>
                    <p className="whitespace-pre-wrap leading-relaxed">{m.text}</p>
                    <p className={`mt-2 text-[10px] uppercase font-bold tracking-wider ${m.role === 'user' ? 'text-blue-100' : 'text-gray-400 dark:text-slate-500'}`}>
                      {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-slate-800 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 dark:border-white/5 flex gap-1">
                    <span className="h-2 w-2 animate-bounce bg-primary rounded-full"></span>
                    <span className="h-2 w-2 animate-bounce bg-primary rounded-full delay-100"></span>
                    <span className="h-2 w-2 animate-bounce bg-primary rounded-full delay-200"></span>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area - Colored Background & Border */}
            <div className="border-t dark:border-white/10 p-6 bg-white dark:bg-slate-900">
              <div className="flex gap-3">
                <button 
                  onClick={startVoiceSession}
                  className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-secondary text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
                  title="Switch to Voice Mode"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </button>
                {/* Enhanced Input Area Styling */}
                <div className="relative flex-1 group">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendText()}
                    placeholder="Type your stress away..."
                    className="w-full rounded-full border border-blue-100 dark:border-blue-900/50 bg-blue-50/50 dark:bg-blue-900/10 px-6 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-gray-700 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500"
                  />
                </div>
                <button 
                  onClick={handleSendText}
                  className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100"
                  disabled={!input.trim()}
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </button>
              </div>
              <p className="mt-4 text-center text-xs font-medium text-gray-400 dark:text-slate-500">
                🔒 Private • Anonymous • Powered by Gemini 3
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
