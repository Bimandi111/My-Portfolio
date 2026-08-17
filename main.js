 

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
      const cursorDot = document.querySelector('.cursor-dot');
      const cursorRing = document.querySelector('.cursor-ring');
      const cursorTrail = document.querySelector('.cursor-trail');
      const cursorLabel = document.querySelector('.cursor-label');
      let cursorX = window.innerWidth / 2;
      let cursorY = window.innerHeight / 2;
      let ringX = cursorX;
      let ringY = cursorY;
      let trailX = cursorX;
      let trailY = cursorY;
      let lastX = cursorX;
      let lastY = cursorY;
      let activeTarget = null;

      const setCursorLabel = (text) => {
        if (!text) {
          cursorLabel.classList.remove('is-visible');
          return;
        }
        cursorLabel.textContent = text;
        cursorLabel.classList.add('is-visible');
      };

      const resetCursorState = () => {
        cursorRing.classList.remove('is-hovering', 'is-link', 'is-project', 'is-3d', 'is-pressed');
        cursorLabel.classList.remove('is-visible');
        activeTarget = null;
      };

      const moveCursor = e => {
        const x = e.clientX;
        const y = e.clientY;
        const speed = Math.hypot(x - lastX, y - lastY);

        cursorX = x;
        cursorY = y;

        if (activeTarget) {
          const rect = activeTarget.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const pull = 0.12;
          cursorX = x + (cx - x) * pull;
          cursorY = y + (cy - y) * pull;
        }

        cursorDot.style.opacity = '1';
        cursorRing.style.opacity = '1';
        cursorTrail.style.opacity = String(Math.min(0.7, speed * 0.035));
        cursorTrail.style.width = `${10 + Math.min(speed * 0.8, 10)}px`;
        cursorTrail.style.height = cursorTrail.style.width;
        document.documentElement.style.setProperty('--x', `${cursorX}px`);
        document.documentElement.style.setProperty('--y', `${cursorY}px`);
        lastX = x;
        lastY = y;
      };

      document.addEventListener('pointermove', moveCursor);
      document.addEventListener('pointerdown', () => cursorRing.classList.add('is-pressed'));
      document.addEventListener('pointerup', () => cursorRing.classList.remove('is-pressed'));

      const animateCursor = () => {
        const easing = 0.18;
        ringX += (cursorX - ringX) * easing;
        ringY += (cursorY - ringY) * easing;
        trailX += (cursorX - trailX) * 0.22;
        trailY += (cursorY - trailY) * 0.22;

        cursorDot.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
        cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
        cursorTrail.style.transform = `translate(${trailX}px, ${trailY}px) translate(-50%, -50%)`;

        const speed = Math.hypot(cursorX - trailX, cursorY - trailY);
        cursorTrail.style.opacity = String(Math.max(0, Math.min(0.7, speed * 0.04)));
        requestAnimationFrame(animateCursor);
      };

      requestAnimationFrame(animateCursor);

      const hoverables = document.querySelectorAll('a, button, .chip, .glass, .project-card, .stat, .orb, .contact-card');
      hoverables.forEach(el => {
        el.addEventListener('pointerenter', () => {
          if (!window.matchMedia('(pointer: fine)').matches) return;

          activeTarget = el;

          if (el.closest('.project-card')) {
            cursorRing.classList.add('is-project');
            setCursorLabel('VIEW CASE STUDY →');
          } else if (el.closest('.orb') || el.closest('.hero-visual')) {
            cursorRing.classList.add('is-3d');
            setCursorLabel('EXPLORE ↗');
          } else if (el.tagName === 'A' || el.tagName === 'BUTTON') {
            cursorRing.classList.add('is-hovering');
            setCursorLabel(el.textContent.trim().slice(0, 4).toUpperCase() || 'OPEN');
          } else {
            cursorRing.classList.add('is-link');
            setCursorLabel('OPEN');
          }
        });

        el.addEventListener('pointerleave', () => {
          resetCursorState();
        });
      });

      document.addEventListener('pointerleave', () => {
        cursorDot.style.opacity = '0';
        cursorRing.style.opacity = '0';
        cursorTrail.style.opacity = '0';
        cursorLabel.classList.remove('is-visible');
      });
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
  
