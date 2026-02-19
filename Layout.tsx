
import React, { useState } from 'react';
import { Page } from './types';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: Page;
  setPage: (page: Page) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentPage, setPage }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navItems = [
    { label: 'Studio', id: Page.Home },
    { label: 'Success Stories', id: Page.Trainees },
    { label: 'Opportunities', id: Page.Careers },
    { label: 'Resources', id: Page.Courses },
  ];

  return (
    <div className="min-h-screen flex flex-col selection:bg-orange-600 selection:text-white">
      {/* Navigation */}
      <nav className="fixed w-full top-0 z-[100] bg-white/70 backdrop-blur-2xl border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div 
              className="flex items-center cursor-pointer group space-x-3"
              onClick={() => setPage(Page.Home)}
            >
              <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-tr from-orange-600 to-orange-400 rounded-xl blur opacity-25 group-hover:opacity-100 transition duration-500"></div>
                  <div className="relative bg-slate-900 text-white p-2.5 rounded-xl transition-transform group-hover:scale-110">
                    <i className="fas fa-mug-hot text-xl"></i>
                  </div>
              </div>
              <span className="font-black text-2xl tracking-tighter text-slate-900 flex items-center">
                HOTBEANS <span className="ml-1 px-1.5 py-0.5 bg-orange-600 text-white rounded-md text-[10px] uppercase align-middle">WEB</span>
              </span>
            </div>
            
            <div className="hidden md:flex space-x-10">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setPage(item.id)}
                  className={`text-xs font-black uppercase tracking-[0.2em] transition-all hover:text-orange-600 relative py-2 ${
                    currentPage === item.id ? 'text-orange-600' : 'text-slate-500'
                  }`}
                >
                  {item.label}
                  {currentPage === item.id && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-600 rounded-full animate-in slide-in-from-left-2"></span>}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-4">
                <button 
                  onClick={() => setPage(Page.Apply)}
                  className="hidden sm:block px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-orange-600 transition-all active:scale-95"
                >
                  Apply Now
                </button>
                <button 
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden text-slate-900 p-2"
                >
                    <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars-staggered'} text-xl`}></i>
                </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
            <div className="md:hidden bg-white border-b border-slate-100 p-6 animate-in slide-in-from-top duration-300">
                <div className="flex flex-col space-y-4">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => {setPage(item.id); setMobileMenuOpen(false);}}
                            className={`text-left text-lg font-black uppercase tracking-tighter ${currentPage === item.id ? 'text-orange-600' : 'text-slate-900'}`}
                        >
                            {item.label}
                        </button>
                    ))}
                    <button 
                        onClick={() => {setPage(Page.Apply); setMobileMenuOpen(false);}}
                        className="w-full py-4 bg-orange-600 text-white rounded-2xl font-black uppercase"
                    >
                        Apply Now
                    </button>
                </div>
            </div>
        )}
      </nav>

      {/* Main Content Spacer */}
      <div className="h-20"></div>

      <main className="flex-grow">
        {children}
      </main>

      {/* Modern Footer */}
      <footer className="bg-slate-950 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
            <div className="md:col-span-5">
              <div className="flex items-center mb-8 space-x-3">
                <div className="bg-orange-600 p-2 rounded-lg"><i className="fas fa-mug-hot text-white"></i></div>
                <span className="font-black text-3xl tracking-tighter">HOTBEANS <span className="text-orange-600">WEB</span></span>
              </div>
              <p className="text-slate-400 text-lg leading-relaxed max-w-sm mb-10">
                Building digital craftsmanship through inclusion, mentorship, and high-performance engineering.
              </p>
              <div className="flex space-x-4">
                {['linkedin', 'twitter', 'github', 'instagram'].map(s => (
                    <a key={s} href="#" className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-orange-600 hover:text-white transition-all">
                        <i className={`fab fa-${s} text-lg`}></i>
                    </a>
                ))}
              </div>
            </div>
            
            <div className="md:col-span-3">
              <h4 className="text-xs font-black uppercase tracking-[0.3em] text-orange-500 mb-8">Navigation</h4>
              <ul className="space-y-4">
                {navItems.map(item => (
                    <li key={item.id}>
                        <button onClick={() => setPage(item.id)} className="text-slate-300 hover:text-white font-bold transition-colors">{item.label}</button>
                    </li>
                ))}
                <li><button onClick={() => setPage(Page.Apply)} className="text-slate-300 hover:text-white font-bold transition-colors">Career Form</button></li>
              </ul>
            </div>

            <div className="md:col-span-4">
              <h4 className="text-xs font-black uppercase tracking-[0.3em] text-orange-500 mb-8">Contact Our Team</h4>
              <div className="space-y-6">
                  <div className="flex items-start">
                      <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center mr-4 shrink-0"><i className="fas fa-envelope text-orange-500"></i></div>
                      <div>
                          <p className="text-xs text-slate-500 uppercase tracking-widest font-black mb-1">Email Us</p>
                          <p className="text-white font-bold">careers@hotbeans.studio</p>
                      </div>
                  </div>
                  <div className="flex items-start">
                      <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center mr-4 shrink-0"><i className="fas fa-map-marker-alt text-orange-500"></i></div>
                      <div>
                          <p className="text-xs text-slate-500 uppercase tracking-widest font-black mb-1">Visit Us</p>
                          <p className="text-white font-bold">The Roastery, London E1 6QL</p>
                      </div>
                  </div>
              </div>
            </div>
          </div>
          
          <div className="mt-24 pt-12 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-slate-500 text-sm font-medium">&copy; {new Date().getFullYear()} Hot Beans Web Studio. Crafting excellence.</p>
            <div className="flex space-x-8 text-xs font-black uppercase tracking-widest text-slate-600">
                <a href="#" className="hover:text-white transition-colors">Privacy</a>
                <a href="#" className="hover:text-white transition-colors">Terms</a>
                <a href="#" className="hover:text-white transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
