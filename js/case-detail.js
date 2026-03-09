/**
 * Case Detail Page
 * Reads case ID from URL params and renders full case info
 */

const CaseDetail = (() => {
  const CATEGORY_LABELS = {
    design: 'Дизайн',
    marketing: 'Маркетинг',
    web: 'Сайты',
    digital: 'Digital',
    layout: 'Верстка',
    cms: 'CMS системы'
  };

  let currentSlide = 0;
  let allSlides = [];

  function init() {
    const container = document.getElementById('caseDetail');
    if (!container) return;

    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'), 10);

    if (!id) {
      renderNotFound(container);
      return;
    }

    const caseItem = CASES_DATA.find(c => c.id === id);

    if (!caseItem) {
      renderNotFound(container);
      return;
    }

    // Update page title
    document.title = `${caseItem.title} — Илья Пи`;

    renderCase(caseItem, container);
  }

  function renderCase(caseItem, container) {
    const categoryLabel = CATEGORY_LABELS[caseItem.category] || caseItem.category;

    const tagsHTML = caseItem.tags
      .map(tag => `<span class="tag">${tag}</span>`)
      .join('');

    // Build slider HTML if images exist
    let sliderHTML = '';
    if (caseItem.images && caseItem.images.length > 0) {
      allSlides = [caseItem.image, ...caseItem.images].filter(Boolean);
      currentSlide = 0;

      const slidesHTML = allSlides
        .map((img, index) => `
          <div class="case-detail__slider-slide" data-index="${index}">
            <img src="${img}" alt="${caseItem.title}">
          </div>
        `)
        .join('');

      const dotsHTML = allSlides
        .map((_, index) => `<div class="case-detail__slider-dot${index === 0 ? ' case-detail__slider-dot--active' : ''}" data-index="${index}"></div>`)
        .join('');

      sliderHTML = `
        <div class="case-detail__slider">
          <div class="case-detail__slider-track">
            ${slidesHTML}
          </div>
          <button class="case-detail__slider-btn case-detail__slider-btn--prev" aria-label="Предыдущее фото">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>
          <button class="case-detail__slider-btn case-detail__slider-btn--next" aria-label="Следующее фото">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
          <div class="case-detail__slider-dots">
            ${dotsHTML}
          </div>
        </div>
      `;
    } else if (caseItem.image) {
      allSlides = [caseItem.image];
      sliderHTML = `<img src="${caseItem.image}" alt="${caseItem.title}">`;
    } else {
      allSlides = [];
      sliderHTML = `<span class="case-detail__hero-placeholder">${caseItem.title}</span>`;
    }

    container.innerHTML = `
      <div class="container">
        <a href="cases.html" class="case-detail__back">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Назад к кейсам
        </a>

        <div class="case-detail__header">
          <p class="case-detail__category">${categoryLabel}</p>
          <h1 class="case-detail__title">${caseItem.title}</h1>
          <div class="case-detail__tags">${tagsHTML}</div>
        </div>

        <div class="case-detail__hero-image">
          ${sliderHTML}
        </div>

        <div class="case-detail__content">
          <div class="case-detail__block">
            <h3 class="case-detail__block-title">Задача</h3>
            <p class="case-detail__block-text">${caseItem.fullDescription.task}</p>
          </div>
          <div class="case-detail__block">
            <h3 class="case-detail__block-title">Решение</h3>
            <p class="case-detail__block-text">${caseItem.fullDescription.solution}</p>
          </div>
          <div class="case-detail__block">
            <h3 class="case-detail__block-title">Результат</h3>
            <p class="case-detail__block-text">${caseItem.fullDescription.result}</p>
          </div>
        </div>

        <div class="case-detail__nav">
          <a href="cases.html" class="btn btn--outline">Все кейсы</a>
        </div>
      </div>
    `;

    // Initialize slider interactions
    if (allSlides.length > 1) {
      initSlider();
    }
  }

  function initSlider() {
    const track = document.querySelector('.case-detail__slider-track');
    const prevBtn = document.querySelector('.case-detail__slider-btn--prev');
    const nextBtn = document.querySelector('.case-detail__slider-btn--next');
    const dots = document.querySelectorAll('.case-detail__slider-dot');

    if (!track) return;

    // Previous button
    prevBtn.addEventListener('click', () => {
      goToSlide(currentSlide - 1);
    });

    // Next button
    nextBtn.addEventListener('click', () => {
      goToSlide(currentSlide + 1);
    });

    // Dots
    dots.forEach(dot => {
      dot.addEventListener('click', (e) => {
        const index = parseInt(e.target.dataset.index, 10);
        goToSlide(index);
      });
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        goToSlide(currentSlide - 1);
      } else if (e.key === 'ArrowRight') {
        goToSlide(currentSlide + 1);
      }
    });
  }

  function goToSlide(index) {
    if (index < 0 || index >= allSlides.length) return;

    const track = document.querySelector('.case-detail__slider-track');
    const dots = document.querySelectorAll('.case-detail__slider-dot');

    // GSAP animation for smooth slide transition
    gsap.to(track, {
      xPercent: -index * 100,
      duration: 0.5,
      ease: 'power2.inOut'
    });

    // Update active dot
    dots.forEach((dot, i) => {
      if (i === index) {
        dot.classList.add('case-detail__slider-dot--active');
      } else {
        dot.classList.remove('case-detail__slider-dot--active');
      }
    });

    currentSlide = index;
  }

  function renderNotFound(container) {
    container.innerHTML = `
      <div class="container">
        <div class="case-detail__not-found">
          <h2>Кейс не найден</h2>
          <p>К сожалению, запрашиваемый кейс не существует.</p>
          <a href="cases.html" class="btn btn--primary">Перейти к кейсам</a>
        </div>
      </div>
    `;
  }

  return { init };
})();
