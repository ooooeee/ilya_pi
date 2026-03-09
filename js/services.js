/**
 * Services / Directions Module
 * Handles accordion, timer-based switching, and 3D parallax effects
 */

const Services = {
  accordion: null,
  viewer: null,
  cursorContainer: null,
  cursor: null,
  progressBar: null,
  items: [],
  scenes: [],
  currentIndex: 0,
  timer: null,
  timeElapsed: 0,
  intervalTime: 50, // update every 50ms
  switchInterval: 5000, // switch every 5 seconds
  isPaused: false,
  isCursorInServices: false,

  /**
   * Initialize the services module
   */
  init() {
    // Get DOM elements
    this.accordion = document.getElementById('servicesAccordion');
    this.viewer = document.getElementById('servicesViewer');
    this.cursorContainer = document.getElementById('servicesCursorContainer');
    this.cursor = document.getElementById('servicesCursor');
    this.progressBar = document.getElementById('servicesProgressBar');

    // Exit if elements don't exist
    if (!this.accordion || !this.viewer || !this.progressBar) {
      return;
    }

    // Get items and scenes
    this.items = Array.from(this.accordion.querySelectorAll('.services__item'));
    this.scenes = Array.from(this.viewer.querySelectorAll('.services__3d'));

    if (this.items.length === 0 || this.scenes.length === 0) {
      return;
    }

    // Bind click events to accordion items
    this.items.forEach((item, index) => {
      const header = item.querySelector('.services__item-header');
      if (header) {
        header.addEventListener('click', () => this.onItemClick(index));
      }

      // Pause on hover over accordion
      item.addEventListener('mouseenter', () => this.pauseTimer());
      item.addEventListener('mouseleave', () => this.resumeTimer());
    });

    // Initialize cursor follower
    this.initCursorFollower();

    // Initialize 3D parallax
    this.initParallax();

    // Start timer
    this.startTimer();

    // Activate first item
    this.activateItem(0);
  },

  /**
   * Handle accordion item click
   */
  onItemClick(index) {
    if (index === this.currentIndex) {
      return;
    }
    this.currentIndex = index;
    this.activateItem(index);
    this.resetTimer();
  },

  /**
   * Activate an accordion item and corresponding scene
   */
  activateItem(index) {
    // Deactivate all items
    this.items.forEach(item => {
      item.classList.remove('services__item--active');
    });

    // Deactivate all scenes
    this.scenes.forEach(scene => {
      scene.classList.remove('services__3d--active');
    });

    // Activate current item
    if (this.items[index]) {
      this.items[index].classList.add('services__item--active');
    }

    // Activate corresponding scene
    if (this.scenes[index]) {
      this.scenes[index].classList.add('services__3d--active');
    }

    // Trigger cursor pulse effect
    this.triggerCursorPulse();

    this.currentIndex = index;
  },

  /**
   * Initialize cursor follower with GSAP and liquid effect
   */
  initCursorFollower() {
    if (!this.cursorContainer || !this.cursor) return;

    const servicesSection = document.getElementById('services');
    
    // Mouse and cursor positions
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    // Velocity for stretch effect
    let velocityX = 0;
    let velocityY = 0;
    let lastMouseX = 0;
    let lastMouseY = 0;
    
    // Show cursor on enter
    servicesSection.addEventListener('mouseenter', () => {
      this.isCursorInServices = true;
      this.cursorContainer.classList.add('services__cursor-container--visible');
    });

    // Hide cursor on leave
    servicesSection.addEventListener('mouseleave', () => {
      this.isCursorInServices = false;
      this.cursorContainer.classList.remove('services__cursor-container--visible');
    });

    // Track mouse position
    servicesSection.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Calculate velocity
      velocityX = mouseX - lastMouseX;
      velocityY = mouseY - lastMouseY;
      lastMouseX = mouseX;
      lastMouseY = mouseY;
    });
    
    // GSAP ticker for smooth animation
    const followCursor = () => {
      if (this.isCursorInServices) {
        // Lerp for smooth following (0.1 = 10% per frame)
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        
        // Move container with center offset
        gsap.set(this.cursorContainer, {
          x: cursorX,
          y: cursorY,
          xPercent: -50,
          yPercent: -50
        });
        
        // Calculate speed for stretch effect
        const speed = Math.sqrt(velocityX * velocityX + velocityY * velocityY);
        const maxStretch = 0.5; // Max 50% stretch
        const stretch = Math.min(speed / 50, maxStretch);
        
        // Calculate angle for direction
        const angle = Math.atan2(velocityY, velocityX);
        
        // Stretch in movement direction
        if (speed > 1) {
          gsap.to(this.cursor, {
            scaleX: 1 + stretch,
            scaleY: 1 - stretch * 0.5,
            rotation: angle * (180 / Math.PI),
            duration: 0.15,
            ease: 'power2.out'
          });
        } else {
          // Return to normal circle
          gsap.to(this.cursor, {
            scaleX: 1,
            scaleY: 1,
            rotation: 0,
            duration: 0.3,
            ease: 'elastic.out(1, 0.5)'
          });
        }
      }
      
      // Dampen velocity
      velocityX *= 0.9;
      velocityY *= 0.9;
    };
    
    gsap.ticker.add(followCursor);
  },

  /**
   * Trigger cursor pulse animation
   */
  triggerCursorPulse() {
    if (!this.cursor) return;
    
    // Remove and re-add class to restart animation
    this.cursor.classList.remove('services__cursor--pulse');
    void this.cursor.offsetWidth; // Force reflow
    this.cursor.classList.add('services__cursor--pulse');
  },

  /**
   * Start the auto-switch timer
   */
  startTimer() {
    this.timeElapsed = 0;
    this.timer = setInterval(() => {
      if (!this.isPaused) {
        this.timeElapsed += this.intervalTime;
        this.updateProgressBar();

        if (this.timeElapsed >= this.switchInterval) {
          this.switchToNext();
        }
      }
    }, this.intervalTime);
  },

  /**
   * Reset the timer
   */
  resetTimer() {
    this.timeElapsed = 0;
    this.updateProgressBar();
  },

  /**
   * Pause the timer
   */
  pauseTimer() {
    this.isPaused = true;
  },

  /**
   * Resume the timer
   */
  resumeTimer() {
    this.isPaused = false;
  },

  /**
   * Update the progress bar width
   */
  updateProgressBar() {
    const progress = (this.timeElapsed / this.switchInterval) * 100;
    this.progressBar.style.width = `${progress}%`;
  },

  /**
   * Switch to the next item
   */
  switchToNext() {
    let nextIndex = this.currentIndex + 1;
    if (nextIndex >= this.items.length) {
      nextIndex = 0;
    }
    this.currentIndex = nextIndex;
    this.activateItem(nextIndex);
    this.resetTimer();
  },

  /**
   * Initialize 3D parallax effect
   */
  initParallax() {
    const activeScene = this.viewer.querySelector('.services__3d--active');
    if (!activeScene) return;

    this.viewer.addEventListener('mousemove', (e) => this.handleParallax(e));
    this.viewer.addEventListener('mouseleave', () => this.resetParallax());
  },

  /**
   * Handle parallax effect on mouse move
   */
  handleParallax(e) {
    const rect = this.viewer.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate offset from center (-1 to 1)
    const offsetX = (e.clientX - centerX) / (rect.width / 2);
    const offsetY = (e.clientY - centerY) / (rect.height / 2);

    // Get current active scene
    const activeScene = this.viewer.querySelector('.services__3d--active');
    if (!activeScene) return;

    // Apply parallax to all 3D objects in the scene
    const objects = activeScene.querySelectorAll('.services__obj');
    objects.forEach((obj, index) => {
      // Different objects move at different speeds for depth effect
      const speed = 10 + (index * 5);
      const rotateX = offsetY * speed;
      const rotateY = -offsetX * speed;

      // Preserve existing animation by adding to transform
      obj.style.transform = `translateX(${offsetX * speed}px) translateY(${offsetY * speed}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
  },

  /**
   * Reset parallax effect
   */
  resetParallax() {
    const activeScene = this.viewer.querySelector('.services__3d--active');
    if (!activeScene) return;

    const objects = activeScene.querySelectorAll('.services__obj');
    objects.forEach(obj => {
      obj.style.transform = '';
    });
  }
};
