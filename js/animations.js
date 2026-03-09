/**
 * Background animations:
 * 1. Hero particle network (canvas)
 * 2. Scroll reveal (IntersectionObserver)
 * 3. Hero title mouse tilt
 */

const Animations = (() => {

  /* ==========================================
     1. HERO PARTICLE NETWORK
     ========================================== */
  function initParticles() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    let mouse = { x: -1000, y: -1000 };
    let animationId;

    const CONFIG = {
      particleCount: 80,
      maxDistance: 150,
      particleRadius: 1.5,
      speed: 0.3,
      mouseRadius: 200,
      lineColor: 'rgba(175, 47, 47,',
      dotColor: 'rgba(255, 255, 255,',
    };

    function resize() {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;

      // Adjust particle count for smaller screens
      const count = width < 768 ? 40 : CONFIG.particleCount;
      if (particles.length !== count) {
        createParticles(count);
      }
    }

    function createParticles(count) {
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * CONFIG.speed,
          vy: (Math.random() - 0.5) * CONFIG.speed,
          r: Math.random() * CONFIG.particleRadius + 0.5,
        });
      }
    }

    function drawParticle(p) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = CONFIG.dotColor + '0.5)';
      ctx.fill();
    }

    function drawLine(p1, p2, dist) {
      const opacity = 1 - dist / CONFIG.maxDistance;
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.strokeStyle = CONFIG.lineColor + (opacity * 0.25) + ')';
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }

    function drawMouseLine(p, dist) {
      const opacity = 1 - dist / CONFIG.mouseRadius;
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(mouse.x, mouse.y);
      ctx.strokeStyle = CONFIG.lineColor + (opacity * 0.5) + ')';
      ctx.lineWidth = 0.8;
      ctx.stroke();
    }

    function update() {
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse repulsion
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONFIG.mouseRadius) {
          const force = (CONFIG.mouseRadius - dist) / CONFIG.mouseRadius * 0.02;
          p.vx += dx * force;
          p.vy += dy * force;
        }

        // Dampen velocity
        p.vx *= 0.999;
        p.vy *= 0.999;
      }
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        // Mouse connections
        const mdx = p1.x - mouse.x;
        const mdy = p1.y - mouse.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < CONFIG.mouseRadius) {
          drawMouseLine(p1, mdist);
        }

        // Particle-to-particle connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONFIG.maxDistance) {
            drawLine(p1, p2, dist);
          }
        }

        drawParticle(p1);
      }
    }

    function animate() {
      update();
      draw();
      animationId = requestAnimationFrame(animate);
    }

    // Events
    window.addEventListener('resize', resize);

    const hero = document.getElementById('hero');
    if (hero) {
      hero.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
      });

      hero.addEventListener('mouseleave', () => {
        mouse.x = -1000;
        mouse.y = -1000;
      });
    }

    // Pause when not visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (!animationId) animate();
        } else {
          cancelAnimationFrame(animationId);
          animationId = null;
        }
      });
    }, { threshold: 0.1 });

    if (hero) observer.observe(hero);

    resize();
    animate();
  }

  /* ==========================================
     2. SCROLL REVEAL
     ========================================== */
  function initScrollReveal() {
    // Mark elements for reveal
    const revealSelectors = [
      '.about .section__title',
      '.about__text',
      '.about__stats',
      '.services .section__title',
      '.services .section__subtitle',
      '.cases .section__title',
      '.cases .section__subtitle',
      '.cases__more',
      '.contact .section__title',
      '.contact .section__subtitle',
      '.contact__actions',
      '.contact__info',
    ];

    revealSelectors.forEach(sel => {
      const el = document.querySelector(sel);
      if (el) el.classList.add('reveal');
    });

    // Stagger grids
    const staggerSelectors = [
      '.services__grid',
      '.cases__grid',
    ];

    staggerSelectors.forEach(sel => {
      const el = document.querySelector(sel);
      if (el) el.classList.add('reveal-stagger');
    });

    // Observe
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains('reveal')) {
            entry.target.classList.add('reveal--visible');
          }
          if (entry.target.classList.contains('reveal-stagger')) {
            entry.target.classList.add('reveal-stagger--visible');
          }
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => {
      revealObserver.observe(el);
    });
  }

  /* ==========================================
     3. HERO TITLE ROTATION (DRUM EFFECT)
     ========================================== */
  function initTitleRotation() {
    const title = document.querySelector('.hero__title');
    if (!title) return;

    const texts = Array.from(title.querySelectorAll('.hero__title-text'));
    if (texts.length === 0) return;

    let currentIndex = 0;
    const intervalTime = 3000; // 3 seconds per text
    let intervalId;

    function rotateTitle() {
      const currentText = texts[currentIndex];
      let nextIndex = (currentIndex + 1) % texts.length;
      const nextText = texts[nextIndex];

      // Exit animation for current text
      currentText.classList.remove('hero__title-text--active');
      currentText.classList.add('hero__title-text--exit');

      // Enter animation for next text
      nextText.classList.remove('hero__title-text--exit');
      nextText.classList.add('hero__title-text--active');

      currentIndex = nextIndex;
    }

    // Start rotation after initial delay
    intervalId = setInterval(rotateTitle, intervalTime);

    // Pause rotation on hover
    title.addEventListener('mouseenter', () => {
      clearInterval(intervalId);
    });

    // Resume rotation on mouse leave
    title.addEventListener('mouseleave', () => {
      intervalId = setInterval(rotateTitle, intervalTime);
    });
  }

  /* ==========================================
     4. HERO TITLE MOUSE TILT
     ========================================== */
  function initTitleTilt() {
    const hero = document.getElementById('hero');
    const titleWrapper = hero ? hero.querySelector('.hero__title-wrapper') : null;
    const title = hero ? hero.querySelector('.hero__title') : null;
    if (!hero || !title || !titleWrapper) return;

    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      const tiltX = y * -4;  // degrees
      const tiltY = x * 4;

      titleWrapper.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    });

    hero.addEventListener('mouseleave', () => {
      titleWrapper.style.transform = '';
      titleWrapper.style.transition = 'transform 0.6s ease';
      setTimeout(() => { titleWrapper.style.transition = ''; }, 600);
    });
  }

  /* ==========================================
     PUBLIC INIT
     ========================================== */
  function init() {
    // Check reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    initParticles();
    initScrollReveal();
    initTitleRotation();
    initTitleTilt();
  }

  return { init };
})();
