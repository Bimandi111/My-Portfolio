 

    document.addEventListener('DOMContentLoaded', () => {
      const techIcons = { Java: 'coffee', PHP: 'code-2', JavaScript: 'braces', TypeScript: 'braces', HTML5: 'code', CSS3: 'palette', SQL: 'database', 'Spring Boot': 'leaf', Laravel: 'feather', React: 'atom', 'Next.js': 'triangle', 'Tailwind CSS': 'wind', Bootstrap: 'layout-grid', MySQL: 'database', Git: 'git-branch', GitHub: 'github', Postman: 'send', Vercel: 'triangle', 'VS Code': 'code-2', 'Apache NetBeans': 'app-window', 'IntelliJ IDEA': 'lamp-desk', 'REST APIs': 'plug', 'MVC Architecture': 'layers-3', 'CRUD Operations': 'list-checks', 'Database Design': 'table-2', 'OOP': 'boxes', 'Responsive Web Development': 'monitor-smartphone', 'Client-Server Architecture': 'network', 'Clean Code': 'sparkles', 'Full-Stack Development': 'layers-2' };
      document.querySelectorAll('.chip').forEach(chip => { const icon = techIcons[chip.textContent.trim()] || 'code-2'; chip.insertAdjacentHTML('afterbegin', `<i data-lucide="${icon}" aria-hidden="true"></i>`); });
      lucide.createIcons();
      const menuButton = document.getElementById('menu-button'), navLinks = document.getElementById('nav-links');
      menuButton.addEventListener('click', () => { const open = navLinks.classList.toggle('open'); menuButton.setAttribute('aria-expanded', String(open)); });
      navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { navLinks.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); }));
      document.getElementById('resume-download').addEventListener('click', () => {
        const resumeUrl = 'assets/Bimandi_Nesanga_Resume.pdf';
        const link = document.createElement('a');
        link.href = resumeUrl;
        link.download = 'Bimandi_Nesanga_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        link.remove();
      });
      const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); }), { threshold: .12 });
      document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

      const particles = [];
      const maxParticles = 16;

      const createParticle = (x, y) => {
        const particle = document.createElement('span');
        particle.className = 'spark-particle';
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        document.body.appendChild(particle);

        const life = 18 + Math.random() * 22;
        const velocity = {
          x: (Math.random() - 0.5) * 3.2,
          y: (Math.random() - 0.5) * 3.2
        };

        particles.push({ el: particle, x, y, vx: velocity.x, vy: velocity.y, life, maxLife: life });

        if (particles.length > maxParticles) {
          const old = particles.shift();
          old.el.remove();
        }
      };

      const animateParticles = () => {
        particles.forEach(p => {
          p.x += p.vx;
          p.y += p.vy;
          p.life -= 1;
          const alpha = Math.max(0, p.life / p.maxLife);
          p.el.style.left = `${p.x}px`;
          p.el.style.top = `${p.y}px`;
          p.el.style.opacity = String(alpha);
          p.el.style.transform = `translate(-50%, -50%) scale(${0.6 + alpha})`;
          if (p.life <= 0) p.el.remove();
        });

        for (let i = particles.length - 1; i >= 0; i--) {
          if (particles[i].life <= 0) particles.splice(i, 1);
        }

        requestAnimationFrame(animateParticles);
      };

      document.addEventListener('pointermove', e => {
        createParticle(e.clientX, e.clientY);
      });

      requestAnimationFrame(animateParticles);
      const contactPanel = document.querySelector('.contact-box');
      if (window.matchMedia('(pointer: fine)').matches) {
        const cards = document.querySelectorAll('.glass, .contact-card, .stat');
        cards.forEach(card => {
          if (card === contactPanel) return;
          card.addEventListener('pointermove', e => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            card.style.transform = `perspective(900px) rotateX(${(-y * 7).toFixed(2)}deg) rotateY(${(x * 9).toFixed(2)}deg) translateZ(10px)`;
          });
          card.addEventListener('pointerleave', () => { card.style.transform = ''; });
        });
        if (contactPanel) {
          contactPanel.addEventListener('pointermove', e => {
            const rect = contactPanel.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            contactPanel.style.transform = `perspective(1200px) rotateX(${(-y * 5).toFixed(2)}deg) rotateY(${(x * 7).toFixed(2)}deg) translateZ(9px)`;
          });
          contactPanel.addEventListener('pointerleave', () => {
            contactPanel.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0)';
          });
        }
      }
    });
  
