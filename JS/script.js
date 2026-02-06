// Contact form behavior - runs immediately, no DOMContentLoaded wait
(function() {
  const formLink = 'https://forms.office.com/Pages/ResponsePage.aspx?id=CxNTmwNrWUOGNvGgyJxBG7tcelmx7LZLuZNvKVqwH9JUQUpaS1hKU0pYMFE5SjlCU1ZQVUo3OUpQUS4u';
  const contactBtn = document.getElementById('contactBtn');
  const formContainer = document.getElementById('formContainer');
  const closeFormBtn = document.getElementById('closeFormBtn');

  if (contactBtn) {
    contactBtn.addEventListener('click', function(e) {
      e.preventDefault();
      const width = window.innerWidth;
      if (width < 768) {
        // Small screen: redirect to form
        window.location.href = formLink;
      } else {
        // Large screen: show embedded form
        if (formContainer) {
          formContainer.classList.remove('d-none');
          contactBtn.classList.add('d-none');
          window.scrollTo({ top: formContainer.offsetTop - 20, behavior: 'smooth' });
        }
      }
    });
  }

  if (closeFormBtn) {
    closeFormBtn.addEventListener('click', function(e) {
      e.preventDefault();
      if (formContainer) {
        formContainer.classList.add('d-none');
      }
      if (contactBtn) {
        contactBtn.classList.remove('d-none');
        window.scrollTo({ top: contactBtn.offsetTop - 20, behavior: 'smooth' });
      }
    });
  }
})();

// Canonical job dataset (merged from jobs.js)
const jobData = [
  { id: 1, title: "Senior Frontend Developer", type: "Remote", cat: "Frontend", salary: "£55k-£75k", desc: "Lead our UI team in React development. 5+ years experience required.", full: "<h4>The Role</h4><p>We are looking for a React expert to build high-performance web applications.</p><ul><li>React/Next.js</li><li>TypeScript</li><li>Tailwind CSS</li></ul>" },
  { id: 2, title: "Full Stack Engineer", type: "Hybrid", cat: "Fullstack", salary: "£50k-£70k", desc: "Bridge the gap between Node.js APIs and modern frontends.", full: "<h4>The Role</h4><p>Work across the entire stack from database architecture to UI deployment.</p>" },
  { id: 3, title: "UI/UX Designer", type: "Remote", cat: "Design", salary: "£45k-£60k", desc: "Design intuitive user flows and beautiful interfaces.", full: "<h4>The Role</h4><p>Master Figma and user research to create award-winning designs.</p>" },
  { id: 4, title: "Junior Dev", type: "Office", cat: "Frontend", salary: "£25k-£30k", desc: "Start your tech career with HotBeans.", full: "<h4>The Role</h4><p>Learn HTML, CSS and JS while working on real-world client projects.</p>" },
  { id: 5, title: "Backend Specialist", type: "Remote", cat: "Backend", salary: "£65k-£85k", desc: "Architecture focused Node.js role.", full: "<h4>The Role</h4><p>Build robust, scalable APIs and manage microservices.</p>" },
  { id: 6, title: "Data Scientist", type: "Hybrid", cat: "Backend", salary: "£60k-£90k", desc: "Analyze big data for client insights.", full: "<h4>The Role</h4><p>Python and ML focus to drive business decisions through data.</p>" },
  { id: 7, title: "Marketing Designer", type: "Remote", cat: "Design", salary: "£35k-£45k", desc: "Create visual assets for social media.", full: "<h4>The Role</h4><p>Brand identity focus for digital marketing campaigns.</p>" },
  { id: 8, title: "QA Engineer", type: "Hybrid", cat: "Testing", salary: "£40k-£55k", desc: "Automated testing expert.", full: "<h4>The Role</h4><p>Use Selenium and Cypress to ensure code quality across the platform.</p>" },
  { id: 9, title: "Product Manager", type: "Office", cat: "Product", salary: "£70k-£90k", desc: "Define the product roadmap.", full: "<h4>The Role</h4><p>Lead agile squads and bridge the gap between business and tech.</p>" },
  { id: 10, title: "Cyber Analyst", type: "Remote", cat: "Backend", salary: "£50k-£80k", desc: "Protect our infrastructure.", full: "<h4>The Role</h4><p>Implement security-first mindsets and defend against threats.</p>" },
  { id: 11, title: "Laravel Developer", type: "Remote", cat: "Backend", salary: "£45k-£60k", desc: "Maintain our PHP heritage apps.", full: "<h4>The Role</h4><p>PHP and SQL expert to optimize and refactor existing systems.</p>" },
  { id: 12, title: "App Developer", type: "Hybrid", cat: "Frontend", salary: "£55k-£75k", desc: "Flutter or React Native expert.", full: "<h4>The Role</h4><p>Build cross-platform mobile apps for iOS and Android.</p>" },
  { id: 13, title: "SEO Specialist", type: "Remote", cat: "Marketing", salary: "£30k-£45k", desc: "Optimize content for Google.", full: "<h4>The Role</h4><p>Perform keyword research and technical SEO audits.</p>" },
  { id: 14, title: "Cloud Architect", type: "Hybrid", cat: "Backend", salary: "£90k-£120k", desc: "AWS and Azure infrastructure.", full: "<h4>The Role</h4><p>Design high-scale cloud architecture for global traffic.</p>" },
  { id: 15, title: "Python Dev", type: "Remote", cat: "Backend", salary: "£50k-£70k", desc: "Django and Flask specialist.", full: "<h4>The Role</h4><p>Scripting, API development, and tool automation.</p>" },
  { id: 16, title: "Graphic Designer", type: "Office", cat: "Design", salary: "£28k-£38k", desc: "Print and digital design.", full: "<h4>The Role</h4><p>Expertise in Adobe Creative Suite for various marketing materials.</p>" },
  { id: 17, title: "Support Engineer", type: "Hybrid", cat: "Support", salary: "£25k-£35k", desc: "Help our clients with tech issues.", full: "<h4>The Role</h4><p>Provide top-tier problem solving and customer support.</p>" },
  { id: 18, title: "Sales Executive", type: "Remote", cat: "Sales", salary: "£30k + Commission", desc: "Grow our client base.", full: "<h4>The Role</h4><p>Identify and secure new B2B sales opportunities.</p>" },
  { id: 19, title: "Project Lead", type: "Office", cat: "Management", salary: "£55k-£70k", desc: "Manage dev timelines.", full: "<h4>The Role</h4><p>Certified Scrum Master to manage complex project lifecycles.</p>" },
  { id: 20, title: "Social Media Lead", type: "Remote", cat: "Design", salary: "£35k-£50k", desc: "Manage our brand online.", full: "<h4>The Role</h4><p>Execute content strategy and community management.</p>" }
];

// Job-spec page logic (merged from jobs.js)
document.addEventListener("DOMContentLoaded", () => {
  let favorites = JSON.parse(localStorage.getItem('hotbeans_favs')) || [];
  const jobList = document.getElementById('jobList');
  const jobDetails = document.getElementById('jobDetails');
  const mainSearch = document.getElementById('mainSearchInput');
  const favCountSpan = document.getElementById('favCount');

  // Handle Home Page Search Query
  const params = new URLSearchParams(window.location.search);
  const initialQuery = params.get('search') || "";
  if (mainSearch) mainSearch.value = initialQuery;

  function updateFavCount() { if (favCountSpan) favCountSpan.innerText = favorites.length; }

  // Run search when Enter key is pressed
  if (mainSearch) {
    mainSearch.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        renderList(mainSearch.value);
      }
    });
  }

  function renderList(filterStr = "", category = "all") {
    if (!jobList) return;
    jobList.innerHTML = "";
    const filtered = jobData.filter(j => {
      const matchesSearch = j.title.toLowerCase().includes(filterStr.toLowerCase());
      const matchesCat = category === "all" || j.type === category || j.cat === category;
      return matchesSearch && matchesCat;
    });

    filtered.forEach((job, index) => {
      const isFav = favorites.includes(job.id);
      const card = document.createElement('div');
      card.className = 'job-item-card';
      if(index === 0 && window.innerWidth > 768) card.classList.add('active');

      card.innerHTML = `
        <div class="d-flex justify-content-between">
          <span class="badge bg-secondary mb-2">${job.type}</span>
          <button class="fav-btn-sm" onclick="toggleFav(event, ${job.id})">
            <i class="bi ${isFav ? 'bi-bookmark-heart-fill text-info' : 'bi-bookmark text-secondary'}"></i>
          </button>
        </div>
        <h5 class="text-white mb-1">${job.title}</h5>
        <p class="text-secondary small mb-0">${job.salary}</p>
      `;
            
      card.onclick = (e) => {
        document.querySelectorAll('.job-item-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        showDetails(job);
      };
      jobList.appendChild(card);
    });

    if(filtered.length > 0 && window.innerWidth > 768) showDetails(filtered[0]);
  }

  // Show details and set Apply link
  window.showDetails = (job) => {
    if (!jobDetails) return;
    jobDetails.innerHTML = `
      <div class="p-5 animate-fade-in">
        <div class="d-flex justify-content-between align-items-start mb-4">
          <div>
            <h2 class="text-white display-5 fw-bold">${job.title}</h2>
            <p class="text-info fs-5">${job.type} • ${job.salary}</p>
          </div>
          <a href="form.html?job=${encodeURIComponent(job.title)}" class="btn hb-btn btn-lg">Apply Now</a>
        </div>
        <hr class="border-secondary">
        <div class="text-light mt-4">
          <h4 class="text-white mb-4">Job Description</h4>
          <p class="lead text-secondary">${job.desc}</p>
          <div class="mt-4">${job.full}</div>
        </div>
      </div>
    `;
  };

  window.toggleFav = (e, id) => {
    e.stopPropagation();
    if (favorites.includes(id)) {
      favorites = favorites.filter(f => f !== id);
    } else {
      favorites.push(id);
    }
    localStorage.setItem('hotbeans_favs', JSON.stringify(favorites));
    updateFavCount();
    renderList(mainSearch ? mainSearch.value : "");
  };

  // Filter Button Click
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      renderList(mainSearch ? mainSearch.value : "", e.target.dataset.filter);
    });
  });

  // Search Button Click
  document.getElementById('searchBtn')?.addEventListener('click', () => renderList(mainSearch ? mainSearch.value : ""));

  // Saved Jobs Toggle
  document.getElementById('showFavs')?.addEventListener('click', () => {
    if (!jobList) return;
    const favJobs = jobData.filter(j => favorites.includes(j.id));
    jobList.innerHTML = "";
    favJobs.forEach(j => {
      const card = document.createElement('div');
      card.className = 'job-item-card';
      card.innerHTML = `<h5 class="text-white">${j.title}</h5><p class="text-secondary small">Saved Job</p>`;
      card.onclick = () => showDetails(j);
      jobList.appendChild(card);
    });
  });

  renderList(initialQuery);
  updateFavCount();
});

// Search & back-to-top behavior
document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById('jobSearchInput');
    const searchForm = document.getElementById('jobSearchForm');

    if (searchInput) {
        searchInput.value = localStorage.getItem('searchText') || '';
        searchInput.addEventListener('input', () => {
            localStorage.setItem('searchText', searchInput.value);
        });
    }

    if (searchForm) {
        searchForm.addEventListener('submit', () => {
            localStorage.removeItem('searchText');
        });
    }   
    
const backToTop = document.getElementById('backToTop');
    if (backToTop) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
          // Add the class to fade it in
          backToTop.classList.add('show');
        } else {
          // Remove the class to fade it out
          backToTop.classList.remove('show');
        }
      });

      backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
})



document.addEventListener("DOMContentLoaded", () => {
    const jobGrid = document.getElementById('jobGrid');
    const mainSearchInput = document.getElementById('mainSearchInput');
    const favCountSpan = document.getElementById('favCount');
    let favorites = JSON.parse(localStorage.getItem('hotbeans_favs')) || [];

    // Initialize Page
    updateFavCount();
    
    // Check for URL Parameters (From Home Page)
    const params = new URLSearchParams(window.location.search);
    const searchQuery = params.get('search');
    if (searchQuery) {
        mainSearchInput.value = searchQuery;
        renderJobs(searchQuery);
    } else {
        renderJobs();
    }

    // Search Logic
    document.getElementById('searchBtn')?.addEventListener('click', () => {
        renderJobs(mainSearchInput.value);
    });

    // Filter Logic
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            renderJobs(e.target.dataset.filter === 'all' ? '' : e.target.dataset.filter);
        });
    });

    // Show Favorites
    document.getElementById('showFavs')?.addEventListener('click', () => {
        const favJobs = jobData.filter(j => favorites.includes(j.id));
        displayJobs(favJobs);
    });

    function renderJobs(query = "") {
        const filtered = jobData.filter(job => {
            const matchQuery = job.title.toLowerCase().includes(query.toLowerCase()) || 
                               job.cat.toLowerCase().includes(query.toLowerCase()) ||
                               job.type.toLowerCase().includes(query.toLowerCase());
            return matchQuery;
        });
        displayJobs(filtered);
    }

    function displayJobs(jobs) {
        if (!jobGrid) return;
        jobGrid.innerHTML = "";
        document.getElementById('noResults').classList.toggle('d-none', jobs.length > 0);

        jobs.forEach(job => {
            const isFav = favorites.includes(job.id);
            jobGrid.innerHTML += `
                <div class="col-md-4">
                    <div class="job-card h-100 position-relative">
                        <button class="btn position-absolute top-0 end-0 m-3 text-danger fs-4 fav-btn" data-id="${job.id}">
                            <i class="bi ${isFav ? 'bi-bookmark-heart-fill' : 'bi-bookmark-heart'}"></i>
                        </button>
                        <div class="job-badge">${job.type}</div>
                        <h3 class="job-title h5">${job.title}</h3>
                        <p class="job-desc small">${job.desc}</p>
                        <div class="job-salary mt-auto">${job.salary}</div>
                        <button class="btn hb-btn w-100 mt-3">Apply Details</button>
                    </div>
                </div>
            `;
        });

        // Attach Bookmark Events
        document.querySelectorAll('.fav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.currentTarget.dataset.id);
                toggleFavorite(id);
            });
        });
    }

    function toggleFavorite(id) {
        if (favorites.includes(id)) {
            favorites = favorites.filter(favId => favId !== id);
        } else {
            favorites.push(id);
        }
        localStorage.setItem('hotbeans_favs', JSON.stringify(favorites));
        updateFavCount();
        renderJobs(mainSearchInput.value); // Refresh UI
    }

    function updateFavCount() {
        if (favCountSpan) favCountSpan.innerText = favorites.length;
    }
});

function closeDetails() {
  document.body.classList.remove('mobile-view-active');
}

document.addEventListener('click', function(e) {
  const card = e.target.closest && e.target.closest('.job-item-card');
  if (card && window.innerWidth < 768) {
    document.body.classList.add('mobile-view-active');
    const detailPane = document.getElementById('jobDetailsWrapper');
    if (detailPane) detailPane.scrollTop = 0;
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const applyForm = document.getElementById('applyForm');
  if (!applyForm) return;
  const params = new URLSearchParams(window.location.search);
  const jobTitle = params.get('job');
  if (jobTitle) {
    const display = document.getElementById('jobDisplay');
    if (display) display.innerText = 'Position: ' + decodeURIComponent(jobTitle);
  }

  applyForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    if (btn) {
      btn.innerHTML = '<span class="spinner-border spinner-border-sm"></span> SENDING...';
      btn.disabled = true;
    }

    setTimeout(() => {
      const formContent = document.getElementById('formContent');
      const successContent = document.getElementById('successContent');
      if (formContent) formContent.classList.add('d-none');
      if (successContent) successContent.classList.remove('d-none');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
  });
});