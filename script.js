// Simple animated particles background
const canvas = document.createElement('canvas');
canvas.style.position = 'absolute';
canvas.style.top = 0;
canvas.style.left = 0;
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.style.zIndex = 0;
canvas.style.pointerEvents = 'none';
document.querySelector('.background-particles').appendChild(canvas);

const ctx = canvas.getContext('2d');
let particles = [];
const PARTICLE_COUNT = 60;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function createParticles() {
  particles = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 1,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5,
      alpha: Math.random() * 0.5 + 0.3
    });
  }
}
createParticles();

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let p of particles) {
    ctx.save();
    ctx.globalAlpha = p.alpha;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
    ctx.fillStyle = '#8ab4f8';
    ctx.shadowColor = '#8ab4f8';
    ctx.shadowBlur = 8;
    ctx.fill();
    ctx.restore();
    p.x += p.dx;
    p.y += p.dy;
    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  }
  requestAnimationFrame(animateParticles);
}
animateParticles();

// Portfolio Modal Logic
const portfolioProjects = [
  {
    title: 'Self Service Identity Portal',
    img: 'images/fingerprint.jpg',
    long: 'A web portal that allows users to manage their own digital identities, including password resets, profile updates, and access requests, integrated with enterprise IAM systems.',
    skills: 'C#, ASP.NET Razor, Blazor, Docker, OKta, Saviynt, Postman, Bootstrap, HTML/CSS, IAM'
  },
  {
    title: 'Wikipedia Search Engine',
    img: 'images/search_engine.jpg',
    long: 'A custom search engine built for Wikipedia articles, featuring fast indexing, relevance ranking, and a user-friendly interface for exploring large datasets.',
    skills: 'Python, Flask, React, Javascript, Hadoop, HTML/CSS, Search Algorithms, Web Scraping'
  },
  {
    title: 'Full-Stack Social Media Platform',
    img: 'images/social_media.jpg',
    long: 'A scalable social media platform with real-time messaging, user profiles, and media sharing, built using modern web technologies and cloud infrastructure.',
    skills: 'Python, Flask, React, Javascript, SQLite, HTML/CSS, AWS'
  },
  {
    title: 'Piazza Post Identification',
    img: 'images/Piazza-Icon.png',
    long: 'A tool for automatically identifying and categorizing posts on Piazza, helping instructors and students quickly find relevant discussions and resources.',
    skills: 'C++, OOP, NLP, Data Analysis'
  },
  {
    title: 'Remote Underwater Vehicle',
    img: 'images/ROV.jpg',
    long: 'A remotely operated underwater vehicle (ROV) designed for exploration and data collection, featuring live video streaming and sensor integration.',
    skills: 'Python, CAD, Hardware Diagnostics, 3D Printing, Public Speaking, Project Management'
  }
];

const portfolioCards = document.querySelectorAll('.portfolio-card');
const modalOverlay = document.getElementById('portfolioModalOverlay');
const modal = document.getElementById('portfolioModal');
const modalTitle = document.getElementById('portfolioModalTitle');
const modalDesc = document.getElementById('portfolioModalDesc');
const modalClose = document.getElementById('portfolioModalClose');
const modalImg = document.getElementById('portfolioModalImg');

portfolioCards.forEach(card => {
  card.addEventListener('click', () => {
    const idx = parseInt(card.getAttribute('data-project'), 10) - 1;
    const project = portfolioProjects[idx];
    modalTitle.textContent = project.title;
    modalDesc.innerHTML = project.long + '<br><br><strong>Skills:</strong> ' + (project.skills || '');
    // Copy image from card or use from project data
    const cardImg = card.querySelector('img');
    if (cardImg) {
      modalImg.src = cardImg.src;
      modalImg.alt = cardImg.alt;
      modalImg.style.display = 'block';
    } else if (project.img) {
      modalImg.src = project.img;
      modalImg.alt = project.title;
      modalImg.style.display = 'block';
    } else {
      modalImg.style.display = 'none';
    }
    modalOverlay.style.display = 'flex';
  });
});

modalClose.addEventListener('click', () => {
  modalOverlay.style.display = 'none';
});
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) {
    modalOverlay.style.display = 'none';
  }
});

// EmailJS Contact Form Logic
const contactForm = document.getElementById('contactForm');
const contactFormStatus = document.getElementById('contactFormStatus');

if (contactForm) {
  emailjs.init('nDOeQ__A5VZ0p8-9e'); // public key
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    contactFormStatus.textContent = 'Sending...';
    const formData = {
      from_name: contactForm.fullName.value,
      reply_to: contactForm.email.value,
      message: contactForm.message.value
    };
    emailjs.send('service_dfnaucr', 'template_j8p8qkk', formData)
      .then(function() {
        contactFormStatus.textContent = 'Message sent successfully!';
        contactForm.reset();
      }, function(error) {
        contactFormStatus.textContent = 'Failed to send message. Please try again later.';
      });
  });
}

document.addEventListener("DOMContentLoaded", function() {
  const tabs = document.querySelectorAll('.tab');
  const tabContents = document.querySelectorAll('.tab-content');

  // Restore last selected tab from localStorage
  const savedTab = localStorage.getItem('selectedTab');
  let activeTab = savedTab || 'about';

  function activateTab(tabName) {
    tabs.forEach(tab => {
      if (tab.dataset.tab === tabName) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });
    tabContents.forEach(content => {
      if (content.id === tabName) {
        content.classList.add('active');
        content.style.display = '';
      } else {
        content.classList.remove('active');
        content.style.display = 'none';
      }
    });
    localStorage.setItem('selectedTab', tabName);
  }

  // Initial activation
  activateTab(activeTab);

  // Tab click event
  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      activateTab(this.dataset.tab);
    });
  });
}); 