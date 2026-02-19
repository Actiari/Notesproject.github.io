
import React, { useState, useMemo } from 'react';
import { Page, JobSpecification } from './types';
import { COMPANY_PROFILE, TRAINEES, JOBS, COURSES } from './constants';
import Layout from './Layout';
import CareerAssistant from './CareerAssistant';

const ApplyForm: React.FC<{ onHome: () => void; initialJobId?: string }> = ({ onHome, initialJobId }) => {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="py-32 flex flex-col items-center justify-center text-center px-4 animate-in fade-in zoom-in duration-500">
        <div className="w-24 h-24 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-6 text-4xl shadow-inner">
          <i className="fas fa-paper-plane"></i>
        </div>
        <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Application Brewed!</h2>
        <p className="text-slate-600 max-w-md mx-auto mb-10 text-lg leading-relaxed">
          Your details are being reviewed by our lead engineers. We'll be in touch soon to discuss your journey with Hot Beans Web.
        </p>
        <button 
          onClick={onHome}
          className="px-10 py-4 bg-orange-600 text-white rounded-full font-bold hover:bg-orange-700 transition-all shadow-xl shadow-orange-200"
        >
          Return to Hub
        </button>
      </div>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="bg-orange-100 text-orange-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4 inline-block">Join the team</span>
          <h2 className="text-5xl font-black text-slate-900 tracking-tight">Launch Your Career</h2>
          <p className="text-slate-500 mt-4 text-lg">We value passion and potential over a list of certificates.</p>
        </div>
        <form 
          className="bg-slate-50 p-10 md:p-16 rounded-[2.5rem] border border-slate-200 space-y-8 shadow-2xl relative overflow-hidden"
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
        >
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 uppercase tracking-wider ml-1">Full Name</label>
              <input required type="text" className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 outline-none transition-all" placeholder="Alex Rivera" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 uppercase tracking-wider ml-1">Email Address</label>
              <input required type="email" className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 outline-none transition-all" placeholder="alex@example.com" />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 uppercase tracking-wider ml-1">Desired Path</label>
            <select defaultValue={initialJobId} className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 outline-none transition-all appearance-none">
              {JOBS.map(job => (
                <option key={job.id} value={job.id}>{job.title}</option>
              ))}
            </select>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 uppercase tracking-wider ml-1">Portfolio Link</label>
              <input required type="url" className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 outline-none transition-all" placeholder="https://github.com/yourhandle" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 uppercase tracking-wider ml-1">Resume Upload</label>
              <div className="relative group">
                <input required type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                <div className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl flex items-center justify-between text-slate-400 group-hover:border-orange-300 transition-colors">
                  <span>Upload PDF...</span>
                  <i className="fas fa-upload text-orange-500"></i>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 uppercase tracking-wider ml-1">The "Hot Beans" Pitch</label>
            <textarea required rows={4} className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 outline-none transition-all resize-none" placeholder="What drives you to build for the web?"></textarea>
          </div>

          <button 
            type="submit"
            className="w-full py-5 bg-orange-600 text-white rounded-2xl font-black text-xl hover:bg-orange-700 transition-all shadow-xl shadow-orange-200 active:scale-[0.98]"
          >
            Submit Application
          </button>
        </form>
      </div>
    </section>
  );
};

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Home);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [applyingForId, setApplyingForId] = useState<string | undefined>(undefined);

  const departments = useMemo(() => ['All', ...Array.from(new Set(JOBS.map(j => j.department)))], []);

  const filteredJobs = useMemo(() => {
    return JOBS.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            job.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDept = selectedDept === 'All' || job.department === selectedDept;
      return matchesSearch && matchesDept;
    });
  }, [searchQuery, selectedDept]);

  const renderHome = () => (
    <div className="animate-in fade-in duration-700">
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center bg-slate-900 overflow-hidden px-4">
        <div className="absolute inset-0">
            <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop" className="w-full h-full object-cover opacity-20 grayscale scale-110" alt="Office" />
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900/90 to-orange-900/20"></div>
        </div>
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="max-w-3xl">
            <span className="bg-orange-600/10 text-orange-500 border border-orange-600/30 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-8 inline-block">Join the brewing revolution</span>
            <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-none">
              Brewing <span className="text-orange-500">Future</span> <br/>
              Engineers.
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-12 font-medium leading-relaxed">
              Step into an environment where your curiosity is rewarded, your failures are lessons, and your code changes the world.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
              <button 
                onClick={() => setCurrentPage(Page.Apply)}
                className="px-10 py-5 bg-orange-600 text-white rounded-2xl font-black hover:bg-orange-700 transition-all shadow-2xl shadow-orange-600/20 text-lg group"
              >
                Start Applying <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
              </button>
              <button 
                onClick={() => setCurrentPage(Page.Careers)}
                className="px-10 py-5 bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-2xl font-black hover:bg-white/10 transition-all text-lg"
              >
                Explore Roles
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats/Social Proof */}
      <div className="bg-orange-600 py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-between items-center text-white/90 gap-8">
            <div className="flex items-center space-x-2"><i className="fas fa-star"></i> <span className="font-bold">4.9/5 Glassdoor Rating</span></div>
            <div className="flex items-center space-x-2"><i className="fas fa-award"></i> <span className="font-bold">Top 10 Tech Employer 2024</span></div>
            <div className="flex items-center space-x-2"><i className="fas fa-heart"></i> <span className="font-bold">100% Remote Friendly</span></div>
            <div className="flex items-center space-x-2"><i className="fas fa-coffee"></i> <span className="font-bold">Unlimited Craft Coffee</span></div>
        </div>
      </div>

      {/* Values Section */}
      <section className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="grid grid-cols-2 gap-4">
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&h=600&auto=format&fit=crop" className="rounded-3xl shadow-xl mt-12" alt="Team" />
                <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=600&h=800&auto=format&fit=crop" className="rounded-3xl shadow-xl" alt="Design" />
            </div>
            <div>
              <h2 className="text-5xl font-black text-slate-900 mb-8 tracking-tight">Built on shared <br/> excellence.</h2>
              <p className="text-xl text-slate-600 leading-relaxed mb-12">
                {COMPANY_PROFILE.about}
              </p>
              <div className="space-y-8">
                {COMPANY_PROFILE.values.map((v, i) => (
                  <div key={i} className="flex items-start group">
                    <div className="w-14 h-14 bg-white rounded-2xl shadow-md flex items-center justify-center text-orange-600 text-xl mr-6 group-hover:bg-orange-600 group-hover:text-white transition-all">
                      <i className={`fas ${v.icon}`}></i>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-slate-900 mb-2">{v.title}</h4>
                      <p className="text-slate-500">{v.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const renderTrainees = () => (
    <section className="py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl text-left">
            <h2 className="text-6xl font-black text-slate-900 tracking-tighter mb-6">Real stories from the <span className="text-orange-600">trench.</span></h2>
            <p className="text-xl text-slate-500 leading-relaxed">Our trainees don't just 'help out'. They own production code, lead features, and define our future culture.</p>
          </div>
          <button onClick={() => setCurrentPage(Page.Apply)} className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all flex items-center">
            Start Your Story <i className="fas fa-plus ml-3 text-orange-500"></i>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {TRAINEES.map(trainee => (
            <div key={trainee.id} className="group cursor-default">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] mb-8 shadow-2xl">
                <img src={trainee.image} alt={trainee.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                <div className="absolute bottom-6 left-6 right-6">
                    <p className="text-white font-bold text-2xl mb-1">{trainee.name}</p>
                    <p className="text-orange-400 font-medium text-sm uppercase tracking-widest">{trainee.role}</p>
                </div>
              </div>
              <div className="px-2">
                <div className="text-orange-500 text-4xl mb-4 font-serif">“</div>
                <p className="text-slate-600 text-lg leading-relaxed mb-6 italic">{trainee.quote}</p>
                <p className="text-slate-400 text-sm leading-relaxed">{trainee.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const renderCareers = () => (
    <section className="py-32 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-6xl font-black text-slate-900 tracking-tighter mb-8 italic">Find your <span className="text-orange-600">spark.</span></h2>
          
          {/* Controls */}
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-4 p-4 bg-white rounded-[2rem] shadow-xl border border-slate-100">
            <div className="flex-grow relative">
                <i className="fas fa-search absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"></i>
                <input 
                    type="text" 
                    placeholder="Search roles by skill or title..."
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all font-medium"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <div className="flex gap-2 flex-wrap items-center">
                {departments.map(dept => (
                    <button
                        key={dept}
                        onClick={() => setSelectedDept(dept)}
                        className={`px-6 py-4 rounded-2xl font-bold text-sm transition-all whitespace-nowrap ${
                            selectedDept === dept 
                            ? 'bg-orange-600 text-white shadow-lg shadow-orange-200' 
                            : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                        }`}
                    >
                        {dept}
                    </button>
                ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {filteredJobs.length > 0 ? (
            filteredJobs.map(job => (
              <div key={job.id} className="bg-white rounded-[2.5rem] p-10 shadow-sm hover:shadow-2xl hover:border-orange-500/20 border border-slate-100 transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 -mr-16 -mt-16 rounded-full group-hover:scale-[8] transition-transform duration-700 pointer-events-none"></div>
                
                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-12">
                  <div className="flex-grow">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="px-3 py-1 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-lg">{job.department}</span>
                      <span className="px-3 py-1 bg-orange-100 text-orange-700 text-[10px] font-black uppercase tracking-widest rounded-lg">{job.type}</span>
                    </div>
                    <h3 className="text-4xl font-black text-slate-900 mb-4 group-hover:text-orange-950 transition-colors">{job.title}</h3>
                    <p className="text-slate-500 text-lg mb-8 max-w-2xl">{job.description}</p>
                    
                    <div className="grid md:grid-cols-2 gap-10">
                      <div>
                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4">You'll bring:</h4>
                        <ul className="space-y-2">
                          {job.requirements.map((r, i) => (
                            <li key={i} className="flex items-center text-slate-700 font-medium text-sm">
                              <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span> {r}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Bonus points:</h4>
                        <ul className="space-y-2">
                          {job.qualifications.map((q, i) => (
                            <li key={i} className="flex items-center text-slate-700 font-medium text-sm">
                              <span className="w-2 h-2 bg-slate-300 rounded-full mr-3"></span> {q}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="lg:min-w-[240px]">
                    <button 
                      onClick={() => {
                          setApplyingForId(job.id);
                          setCurrentPage(Page.Apply);
                      }}
                      className="w-full bg-slate-900 text-white py-6 px-10 rounded-3xl font-black text-lg shadow-xl shadow-slate-200 group-hover:bg-orange-600 transition-all active:scale-95"
                    >
                      Brew My Future <i className="fas fa-coffee ml-3"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-32 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
                <i className="fas fa-search text-6xl text-slate-200 mb-6"></i>
                <h3 className="text-2xl font-bold text-slate-400 italic">No roles found matching "{searchQuery}"...</h3>
                <button onClick={() => {setSearchQuery(''); setSelectedDept('All');}} className="mt-4 text-orange-600 font-bold hover:underline">Clear all filters</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );

  const renderCourses = () => (
    <section className="py-32 bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-24">
            <span className="text-orange-500 font-black uppercase tracking-[0.3em] text-xs mb-4 inline-block">Sharpen your edge</span>
            <h2 className="text-6xl font-black tracking-tighter mb-6">Curated Fuel for <br/> <span className="text-orange-500">Fast Learners.</span></h2>
            <p className="text-slate-400 text-xl max-w-2xl mx-auto">The web moves fast. We trust these resources to keep our own engineers at the peak of their craft.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {COURSES.map((course, i) => (
            <a 
              key={i} 
              href={course.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group bg-slate-900 border border-slate-800 p-12 rounded-[3rem] hover:border-orange-500/50 transition-all hover:bg-slate-900/50 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 text-slate-800 text-8xl font-black opacity-10 group-hover:opacity-20 transition-opacity">0{i+1}</div>
              <div className="relative z-10">
                  <div className="inline-block p-4 bg-slate-800 rounded-2xl mb-8 group-hover:bg-orange-600 transition-colors">
                    <i className="fas fa-book-open text-2xl"></i>
                  </div>
                  <h3 className="text-3xl font-black mb-2">{course.title}</h3>
                  <p className="text-orange-500 font-bold uppercase tracking-widest text-xs mb-6">{course.provider}</p>
                  <p className="text-slate-400 text-lg leading-relaxed max-w-md">{course.description}</p>
                  <div className="mt-8 flex items-center font-black text-sm uppercase tracking-wider text-slate-500 group-hover:text-white transition-colors">
                    Access Portal <i className="fas fa-chevron-right ml-2 group-hover:translate-x-2 transition-transform"></i>
                  </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );

  const renderContent = () => {
    switch (currentPage) {
      case Page.Home: return renderHome();
      case Page.Trainees: return renderTrainees();
      case Page.Careers: return renderCareers();
      case Page.Apply: return <ApplyForm initialJobId={applyingForId} onHome={() => setCurrentPage(Page.Home)} />;
      case Page.Courses: return renderCourses();
      default: return renderHome();
    }
  };

  return (
    <Layout currentPage={currentPage} setPage={(p) => { 
        setCurrentPage(p); 
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }}>
      {renderContent()}
      <CareerAssistant />
    </Layout>
  );
};

export default App;
