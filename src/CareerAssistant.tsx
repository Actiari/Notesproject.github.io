
import React, { useState, useRef, useEffect } from 'react';
import { getCareerAdvice } from './geminiService';

const CareerAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: 'Welcome to the Studio. I\'m your Career Concierge. Curious about our engineering culture or how to start your application?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const advice = await getCareerAdvice(userMsg);
    setMessages(prev => [...prev, { role: 'bot', text: advice || "Let me re-brew that thought. One moment..." }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[1000] selection:bg-orange-500 selection:text-white">
      {isOpen ? (
        <div className="bg-white rounded-[2rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] w-80 md:w-[400px] flex flex-col border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-300 origin-bottom-right">
          <div className="bg-slate-900 p-6 text-white flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center">
                <i className="fas fa-sparkles text-sm"></i>
              </div>
              <div>
                <span className="font-black text-sm uppercase tracking-widest block">Concierge</span>
                <span className="text-[10px] text-orange-500 font-bold uppercase tracking-widest">Always Active</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors">
                <i className="fas fa-times text-xs"></i>
            </button>
          </div>
          
          <div ref={scrollRef} className="h-[400px] overflow-y-auto p-6 space-y-6 bg-slate-50/50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-500`}>
                <div className={`max-w-[85%] rounded-[1.25rem] p-4 text-sm font-medium leading-relaxed ${
                  m.role === 'user' 
                  ? 'bg-slate-900 text-white rounded-tr-none shadow-xl' 
                  : 'bg-white border border-slate-100 text-slate-700 rounded-tl-none shadow-sm'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-none p-4 flex space-x-1.5 shadow-sm">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce delay-100"></div>
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-white border-t border-slate-100">
            <div className="relative flex items-center">
              <input 
                type="text" 
                value={input}
                disabled={isLoading}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about our stack..."
                className="w-full pl-6 pr-14 py-4 bg-slate-100 border-none rounded-2xl focus:ring-4 focus:ring-orange-100 outline-none transition-all font-bold text-slate-700 placeholder:text-slate-400"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="absolute right-2 w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center hover:bg-orange-600 transition-all active:scale-90 disabled:opacity-50"
              >
                <i className="fas fa-paper-plane text-xs"></i>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="group relative"
        >
          <div className="absolute -inset-2 bg-orange-600 rounded-full blur opacity-40 group-hover:opacity-60 transition duration-500"></div>
          <div className="relative bg-slate-950 text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all group-hover:scale-110 group-active:scale-95 border border-white/10">
            <i className="fas fa-message text-xl"></i>
          </div>
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 border-4 border-slate-50 rounded-full animate-pulse"></div>
        </button>
      )}
    </div>
  );
};

export default CareerAssistant;
