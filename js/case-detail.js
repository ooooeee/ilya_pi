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

    const heroImageHTML = caseItem.image
      ? `<img src="${caseItem.image}" alt="${caseItem.title}">`
      : `<span class="case-detail__hero-placeholder">${caseItem.title}</span>`;

    // Gallery section (only if images exist)
    let galleryHTML = '';
    if (caseItem.images && caseItem.images.length > 0) {
      const galleryItems = caseItem.images
        .map(img => `
          <div class="case-detail__gallery-item">
            <img src="${img}" alt="${caseItem.title}" loading="lazy">
          </div>
        `)
        .join('');

      galleryHTML = `
        <div class="case-detail__gallery">
          <h3 class="case-detail__gallery-title">Галерея</h3>
          <div class="case-detail__gallery-grid">${galleryItems}</div>
        </div>
      `;
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
          ${heroImageHTML}
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

        ${galleryHTML}

        <div class="case-detail__nav">
          <a href="cases.html" class="btn btn--outline">Все кейсы</a>
        </div>
      </div>
    `;
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
