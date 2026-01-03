
import React, { useState, useEffect } from 'react';
import { LiveChat } from './components/LiveChat';
import { SaathiLogo } from './components/SaathiLogo';
import { Presentation } from './components/Presentation';

const App: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isPptOpen, setIsPptOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('hindi');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
             (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.pageYOffset;
      setScrollProgress((currentScroll / totalScroll) * 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const featureCards = [
    {
      icon: "🎤",
      title: "Voice-Enabled Support",
      description: "Speak naturally in Hindi, English, Tamil, or Hinglish. No typing needed when you're stressed.",
      color: "bg-blue-50 dark:bg-blue-900/20 text-primary border-blue-100 dark:border-blue-900/30"
    },
    {
      icon: "🧠",
      title: "Panic-to-Calm Intelligence",
      description: "Smart stress detection triggers grounding exercises for high-anxiety moments.",
      color: "bg-orange-50 dark:bg-orange-900/20 text-secondary border-orange-100 dark:border-orange-900/30"
    },
    {
      icon: "💭",
      title: "Free-Thought Input",
      description: "Rambling? Crying? That's okay. Share your messy thoughts exactly as they come.",
      color: "bg-purple-50 dark:bg-purple-900/20 text-accent border-purple-100 dark:border-purple-900/30"
    },
    {
      icon: "🇮🇳",
      title: "Culturally Intelligent",
      description: "Understands Board exams, JEE/NEET, 'Sharma ji ka beta', and parental pressure.",
      color: "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-100 dark:border-green-900/30"
    },
    {
      icon: "🎯",
      title: "True Emotional IQ",
      description: "Validates your feelings first. Not a robotic script, but a wise, supportive friend.",
      color: "bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400 border-red-100 dark:border-red-900/30"
    }
  ];

  return (
    <div className="min-h-screen transition-colors duration-300 dark:bg-slate-950">
      {/* Scroll Progress */}
      <div className="fixed top-0 left-0 h-1 bg-primary z-[100] transition-all" style={{ width: `${scrollProgress}%` }}></div>

      {/* Navigation */}
      <nav className="fixed top-0 z-40 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b dark:border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
            <SaathiLogo className="h-10 w-10 transition-transform group-hover:scale-110" />
            <span className="text-xl font-bold tracking-tight text-primary">ExamSaathi</span>
          </div>
          <div className="hidden space-x-8 md:flex font-medium text-gray-600 dark:text-slate-300">
            <a href="#problem" className="hover:text-primary transition-colors">The Crisis</a>
            <a href="#solution" className="hover:text-primary transition-colors">How it Helps</a>
            <a href="#demo" className="hover:text-primary transition-colors">Live Demo</a>
            <a href="#about" className="hover:text-primary transition-colors">About</a>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsPptOpen(true)}
              className="hidden lg:flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-xs font-bold text-primary hover:bg-primary/10 transition-all"
            >
              📄 View Project PPT
            </button>
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Toggle Light/Dark Mode"
            >
              {darkMode ? (
                <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"/></svg>
              ) : (
                <svg className="w-6 h-6 text-slate-700" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/></svg>
              )}
            </button>
            <button 
              onClick={() => setIsChatOpen(true)}
              className="rounded-full bg-primary px-6 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-200 dark:shadow-none transition-transform active:scale-95 hover:bg-blue-600"
            >
              Talk to AI Now
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="space-y-8 text-center lg:text-left">
              <div className="inline-block rounded-full bg-blue-100 dark:bg-blue-900/30 px-4 py-1.5 text-sm font-semibold text-primary">
                ✨ 24/7 AI-Powered Support for Indian Students
              </div>
              <h1 className="text-5xl font-extrabold leading-tight text-gray-900 dark:text-white md:text-7xl">
                Your 24/7 Exam <span className="text-primary">Stress Relief</span> Companion
              </h1>
              <p className="text-xl leading-relaxed text-gray-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0">
                AI-powered emotional support in <span className="font-semibold text-gray-900 dark:text-white border-b-2 border-primary">YOUR language</span> - Hindi, English, Tamil, Telugu & 10+ Indian languages.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row justify-center lg:justify-start">
                <button 
                  onClick={() => setIsChatOpen(true)}
                  className="rounded-2xl bg-primary px-8 py-4 text-lg font-bold text-white shadow-xl shadow-blue-200 dark:shadow-blue-900/20 transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2"
                >
                  🎤 Talk to AI Now
                </button>
                <a 
                  href="#solution"
                  className="rounded-2xl border-2 border-primary px-8 py-4 text-lg font-bold text-primary transition-all hover:bg-primary/5 flex items-center justify-center gap-2"
                >
                  📱 See How It Works
                </a>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-slate-400 justify-center lg:justify-start">
                <span className="flex items-center gap-1"><span className="text-green-500">✓</span> Gemini 3 Flash</span>
                <span className="flex items-center gap-1"><span className="text-green-500">✓</span> 100% Free</span>
                <span className="flex items-center gap-1"><span className="text-green-500">✓</span> Anonymous</span>
              </div>
            </div>
            <div className="relative">
              <div className="animate-float absolute -top-10 -left-10 h-32 w-32 rounded-full bg-orange-100 dark:bg-orange-900/20 opacity-50 blur-3xl"></div>
              <div className="animate-float delay-1000 absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-purple-100 dark:bg-purple-900/20 opacity-50 blur-3xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=1000" 
                alt="Student feeling calm" 
                className="relative z-10 w-full rounded-[2rem] shadow-2xl border-4 border-white dark:border-slate-800 object-cover h-[400px]"
              />
              <div className="absolute -bottom-6 -left-6 z-20 rounded-2xl bg-white dark:bg-slate-800 p-4 shadow-xl flex items-center gap-3 border dark:border-white/5">
                <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-xl">🧘</div>
                <div>
                  <p className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wider">Current Status</p>
                  <p className="text-sm font-bold text-green-600 dark:text-green-400">Panic Cleared ✅</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Saathi Intro */}
      <section className="py-12 bg-white dark:bg-slate-900 border-y dark:border-white/5">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-center gap-8 text-center md:text-left">
           <SaathiLogo className="h-32 w-32 md:h-40 md:w-40" />
           <div className="max-w-xl">
             <h2 className="text-3xl font-bold dark:text-white mb-4">Your New Study Companion</h2>
             <p className="text-lg text-gray-600 dark:text-slate-300">
               ExamSaathi isn't just an app; it's a friend who wears a graduation cap and understands the late-night organic chemistry panic. 
             </p>
           </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section id="problem" className="bg-slate-50 dark:bg-slate-900/50 py-24 transition-colors">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center space-y-4">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">The Silent Crisis: Exam Stress in India</h2>
            <p className="mx-auto max-w-3xl text-lg text-gray-600 dark:text-slate-400 italic">
              "Sharma ji's son is doing better... your parents' expectations feel like mountains."
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { stat: "70% of Indian students", desc: "Experience severe exam anxiety every year", icon: "📊" },
              { stat: "2 AM to 5 AM", desc: "Peak panic hours with zero counseling available", icon: "🌙" },
              { stat: "Language Barrier", desc: "Hard to express stress in formal English", icon: "🗣️" }
            ].map((p, i) => (
              <div key={i} className="rounded-3xl bg-white dark:bg-slate-800 p-8 text-center shadow-sm border border-slate-100 dark:border-white/5 transition-transform hover:-translate-y-2">
                <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-3xl">
                  {p.icon}
                </div>
                <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">{p.stat}</h3>
                <p className="text-gray-600 dark:text-slate-400">{p.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-16 text-center max-w-3xl mx-auto">
            <p className="text-xl text-gray-600 dark:text-slate-300 leading-relaxed">
              Imagine studying hard for months, but on exam day, panic takes over. Your mind goes blank. Counselors are closed at 3 AM. This is the reality for millions of Indian students. <span className="font-bold text-primary">You need help NOW.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Solution Features */}
      <section id="solution" className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Meet Your AI Support Buddy 🤖💙</h2>
            <p className="mt-4 text-xl text-gray-600 dark:text-slate-400">An AI counselor that understands YOU - your language, your culture, your pressure.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featureCards.map((f, i) => (
              <div key={i} className={`rounded-[2rem] border p-8 transition-all hover:shadow-xl dark:shadow-none ${f.color}`}>
                <div className="mb-6 text-4xl">{f.icon}</div>
                <h3 className="mb-4 text-2xl font-bold dark:text-white">{f.title}</h3>
                <p className="text-gray-700 dark:text-slate-300 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Demo Tabs */}
      <section id="demo" className="bg-slate-900 dark:bg-black py-24 text-white transition-colors">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-bold">See It In Action 🎬</h2>
            <p className="mt-4 text-blue-200">Interactive examples of how we handle real stress situations.</p>
          </div>
          <div className="mx-auto max-w-4xl overflow-hidden rounded-[2.5rem] bg-white/5 backdrop-blur-lg border border-white/10">
            <div className="flex border-b border-white/10">
              {[
                { id: 'hindi', label: 'Hindi Panic 🔴' },
                { id: 'english', label: 'English Anxiety 🟡' },
                { id: 'hinglish', label: 'Hinglish Mix 🟢' }
              ].map(t => (
                <button 
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`flex-1 py-6 text-sm font-bold tracking-widest uppercase transition-colors ${activeTab === t.id ? 'bg-primary text-white' : 'text-blue-300 hover:text-white'}`}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <div className="p-8 md:p-12">
              {activeTab === 'hindi' && (
                <div className="space-y-6">
                  <div className="flex justify-end">
                    <div className="max-w-md rounded-2xl rounded-tr-none bg-blue-600 px-6 py-4">
                      "Kal mera maths ka paper hai aur mujhe kuch yaad nahi ho raha, main bahut ghabra gaya hoon."
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="max-w-md rounded-2xl rounded-tl-none bg-white/10 px-6 py-4 border border-white/5">
                      "Arre, main samajh sakta hoon yeh feeling. Pehle ek kaam karo - 5 baar lambi saans lo mere saath. Ab batao, kitne chapters hain total? Hum ek chhota sa plan banaate hain sirf important topics ka..."
                    </div>
                  </div>
                </div>
              )}
              {activeTab === 'english' && (
                <div className="space-y-6">
                  <div className="flex justify-end">
                    <div className="max-w-md rounded-2xl rounded-tr-none bg-blue-600 px-6 py-4">
                      "I have so much syllabus left and exam is tomorrow, I'm completely overwhelmed."
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="max-w-md rounded-2xl rounded-tl-none bg-white/10 px-6 py-4 border border-white/5">
                      "I hear you, and that feeling is completely valid. Let's break this down together. First, take 3 deep breaths. In... hold... out. Now, let's make a smart priority plan based on what you already know."
                    </div>
                  </div>
                </div>
              )}
              {activeTab === 'hinglish' && (
                <div className="space-y-6">
                  <div className="flex justify-end">
                    <div className="max-w-md rounded-2xl rounded-tr-none bg-blue-600 px-6 py-4">
                      "Yaar chemistry reactions yaad nahi ho rahe, what to do?"
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="max-w-md rounded-2xl rounded-tl-none bg-white/10 px-6 py-4 border border-white/5">
                      "Yaar chemistry sabko daraati hai but reactions ka ek trick hai. Pehle thoda chill kar... organic mein pattern samjho, ratta mat maaro. Let's start with naming reactions first, wo easy hain."
                    </div>
                  </div>
                </div>
              )}
              <div className="mt-12 text-center">
                <button 
                  onClick={() => setIsChatOpen(true)}
                  className="rounded-full bg-white px-8 py-3 font-bold text-slate-900 shadow-xl transition-all hover:scale-105 active:scale-95"
                >
                  🔊 Try it yourself
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-bold dark:text-white">Why This Matters 💙</h2>
          </div>
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="rounded-[2.5rem] bg-blue-50 dark:bg-blue-900/10 p-12 space-y-6 border dark:border-blue-900/20">
              <h3 className="text-2xl font-bold text-primary flex items-center gap-2">📚 For Students</h3>
              <ul className="space-y-4">
                {[
                  "Immediate Stress Relief available 24/7",
                  "Speak Your Language naturally",
                  "Completely Free - No counselor fees",
                  "3 AM Support when panic strikes",
                  "Exam Success through a calm mind"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-lg text-gray-700 dark:text-slate-300">
                    <span className="text-primary mt-1">✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[2.5rem] bg-orange-50 dark:bg-orange-900/10 p-12 space-y-6 border dark:border-orange-900/20">
              <h3 className="text-2xl font-bold text-secondary flex items-center gap-2">🏥 For Society</h3>
              <ul className="space-y-4">
                {[
                  "Millions Impacted (25 Crore Students)",
                  "Reduces anxiety and depression rates",
                  "Better educational outcomes nationally",
                  "Scalable solution for remote areas",
                  "Bridges the EdTech-Mental Health gap"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-lg text-gray-700 dark:text-slate-300">
                    <span className="text-secondary mt-1">✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* About the Creator Section */}
      <section id="about" className="py-24 bg-slate-50 dark:bg-slate-900/30 transition-colors">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Meet the Creator 🎓</h2>
          </div>
          <div className="mx-auto max-w-3xl rounded-[3rem] bg-white dark:bg-slate-800 p-8 md:p-12 shadow-xl border dark:border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 h-32 w-32 bg-primary/10 rounded-bl-full"></div>
            <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="flex-shrink-0">
                <div className="h-40 w-40 rounded-full bg-gradient-to-br from-primary to-accent p-1">
                  <div className="h-full w-full rounded-full bg-white dark:bg-slate-800 flex items-center justify-center text-6xl shadow-inner overflow-hidden">
                    <SaathiLogo className="h-28 w-28" />
                  </div>
                </div>
              </div>
              <div className="space-y-4 text-center md:text-left">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white">Shudhanshu Kumar Yadav</h3>
                  <p className="text-lg font-medium text-primary">Developer / Creator</p>
                </div>
                <div className="space-y-2 text-gray-600 dark:text-slate-300">
                  <p className="flex items-center justify-center md:justify-start gap-2">
                    <span className="text-primary font-bold">Education:</span> First-year B.Tech Student
                  </p>
                  <p className="flex items-center justify-center md:justify-start gap-2">
                    <span className="text-primary font-bold">College:</span> Academy of Technology
                  </p>
                </div>
                <p className="text-gray-500 dark:text-slate-400 italic">
                  "Driven by a passion to bridge the gap between technology and mental health for students across India."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-primary py-24 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-4xl font-bold md:text-5xl">Ready to Feel Calmer? 🌈</h2>
          <p className="mt-6 text-xl text-blue-100">
            Your next exam doesn't have to be a panic attack. Talk to our AI counselor right now - it's free, instant, and in YOUR language.
          </p>
          <div className="mt-12 flex flex-col gap-4 sm:flex-row justify-center">
            <button 
              onClick={() => setIsChatOpen(true)}
              className="rounded-full bg-white px-10 py-5 text-xl font-bold text-primary shadow-2xl transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2"
            >
              🎤 Start Conversation Now
            </button>
          </div>
          <p className="mt-8 text-sm text-blue-200">
            No signup • No payment • No judgment • 100% anonymous
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 dark:bg-slate-900 border-t dark:border-white/10 py-16 transition-colors">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 md:grid-cols-3">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <SaathiLogo className="h-10 w-10" />
                <span className="text-xl font-bold text-primary">ExamSaathi</span>
              </div>
              <p className="text-gray-500 dark:text-slate-400">Your saathi in exam stress. Addressing the silent mental health crisis in Indian education.</p>
              <p className="text-sm font-medium dark:text-slate-500">© 2026 Shudhanshu Kumar Yadav</p>
            </div>
            <div>
              <h4 className="mb-6 font-bold uppercase tracking-wider text-gray-400 dark:text-slate-500">Quick Links</h4>
              <ul className="space-y-3 text-gray-600 dark:text-slate-400">
                <li><a href="#" className="hover:text-primary transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#about" className="hover:text-primary transition-colors">Creator Info</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-6 font-bold uppercase tracking-wider text-gray-400 dark:text-slate-500">Powered By</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3 grayscale opacity-60">
                  <span className="text-2xl">🤖</span>
                  <span className="font-semibold dark:text-slate-300">Google Gemini 3</span>
                </div>
                <div className="flex items-center gap-3 grayscale opacity-60">
                  <span className="text-2xl">🇮🇳</span>
                  <span className="font-semibold dark:text-slate-300">Digital India Initiative</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-16 border-t dark:border-white/10 pt-8 text-center text-sm text-gray-500">
            <p className="font-bold text-red-400 dark:text-red-500 mb-2 uppercase tracking-tight">Need Urgent Help?</p>
            <p className="dark:text-slate-400">AASRA: 91-22-27546669 | iCall: 022-25521111 | Vandrevala: 1860-2662-345</p>
          </div>
        </div>
      </footer>

      {/* Chat Modal */}
      {isChatOpen && <LiveChat onClose={() => setIsChatOpen(false)} />}

      {/* PPT Viewer */}
      {isPptOpen && <Presentation onClose={() => setIsPptOpen(false)} />}
    </div>
  );
};

export default App;
