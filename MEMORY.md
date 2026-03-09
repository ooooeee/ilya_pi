# Проект: Сайт-портфолио ilya_pi

## Обзор
Сайт-портфолио для специалиста в дизайне, маркетинге, создании сайтов и digital-технологиях.
Чистый HTML/CSS/JS, без фреймворков. Расположение: `c:\Users\User\Desktop\ilya_pi\`

## Версия
**v.1 current** — зафиксирована в GitHub как "first commit" (март 2026)
**GitHub**: `688fe23` (main branch)

---

## Структура проекта

```
ilya_pi/
├── index.html              — Главная (hero, обо мне, услуги, 8 кейсов, контакт)
├── cases.html              — Все кейсы с фильтром по категориям
├── case-detail.html        — Детальная страница кейса (?id=N)
├── css/
│   ├── variables.css       — CSS-переменные (цвета, шрифты, отступы, z-index)
│   ├── reset.css           — Сброс браузерных стилей
│   ├── base.css            — Базовые стили, кнопки (.btn), теги (.tag)
│   ├── header.css          — Шапка + бургер-кнопка + выезжающая панель меню
│   ├── hero.css            — Hero-секция (большой заголовок, теги, CTA)
│   ├── about.css           — Секция "Обо мне" + статистика
│   ├── services.css        — Секция "Направления" (аккордеон + 3D viewer)
│   ├── cases.css           — Карточки кейсов + фильтр по категориям
│   ├── case-detail.css     — Детальная страница кейса
│   ├── contact.css         — Секция контактов / CTA
│   ├── footer.css          — Подвал
│   ├── animations.css      — Анимации фона, scroll-reveal, hero entrance
│   └── media.css           — Адаптив (1200/992/768/576px)
├── js/
│   ├── app.js              — Инициализация всех модулей
│   ├── header.js           — Скрытие шапки после hero, бургер-меню
│   ├── services.js         — Аккордеон направлений, таймер, 3D паралакс
│   ├── cases.js            — Рендер кейсов, фильтрация, "показать все"
│   ├── case-detail.js      — Детальная страница кейса (по ?id=)
│   └── animations.js       — Particle canvas, scroll-reveal, title tilt
├── data/
│   └── cases-data.js       — Массив из 8 кейсов (web, design, marketing, digital)
├── img/                    — Папка для изображений
└── Frame 9.svg             — SVG-макет героя (из Figma)
```

---

## Цветовая схема

Смешанная: чередование тёмных и светлых секций.

| Переменная             | Значение         | Где используется              |
|------------------------|------------------|-------------------------------|
| `--color-dark`         | `#141414`        | Hero, services, contact, footer |
| `--color-dark-secondary` | `#1a1a1a`     | Градиенты                     |
| `--color-dark-card`    | `#1e1e1e`        | Карточки услуг                |
| `--color-light`        | `#ffffff`        | Светлые секции                |
| `--color-light-secondary` | `#f5f5f7`    | About, cases фон              |
| `--color-light-gray`   | `#e0e0e0`        | Границы, разделители          |
| `--color-accent`       | `#AF2F2F`        | Кнопки, ссылки, hover, CTA   |
| `--color-accent-hover` | `#c73a3a`        | Hover-состояния               |
| `--color-accent-light` | `rgba(175, 47, 47, 0.1)` | Фоны, подложки |
| `--color-text-dark`    | `#1a1a1a`        | Заголовки на светлом          |
| `--color-text-gray`    | `#6b7280`        | Вторичный текст               |
| `--color-text-light`   | `#f0f0f0`        | Текст на тёмном               |
| `--color-text-white`   | `#ffffff`        | Белый текст                   |

---

## Типографика

| Переменная | Значение | Описание |
|------------|----------|----------|
| `--font-primary` | `'Inter', sans-serif` | Основной шрифт |
| `--font-heading` | `'Inter', sans-serif` | Заголовки |
| `--font-hero` | `'Oswald', 'Inter', sans-serif` | Hero-заголовок |
| `--fs-h1` | `clamp(2.5rem, 5vw, 4.5rem)` | Главный заголовок |
| `--fs-h2` | `clamp(2rem, 3.5vw, 3rem)` | Заголовок секции |
| `--fs-h3` | `clamp(1.25rem, 2vw, 1.5rem)` | Подзаголовок |
| `--fs-body` | `clamp(1rem, 1.2vw, 1.125rem)` | Основной текст |
| `--fs-small` | `clamp(0.8rem, 1vw, 0.875rem)` | Мелкий текст |
| `--fs-tag` | `0.75rem` | Теги |

---

## Отступы и размеры

| Переменная | Значение |
|------------|----------|
| `--section-padding` | `clamp(60px, 8vw, 120px) 0` |
| `--container-max` | `1200px` |
| `--container-padding` | `0 clamp(16px, 4vw, 40px)` |
| `--gap-sm` | `8px` |
| `--gap-md` | `16px` |
| `--gap-lg` | `24px` |
| `--gap-xl` | `40px` |
| `--gap-xxl` | `60px` |
| `--radius-sm` | `6px` |
| `--radius-md` | `12px` |
| `--radius-lg` | `20px` |
| `--radius-full` | `50px` |
| `--header-height` | `80px` |

---

## Анимации и переходы

| Переменная | Значение |
|------------|----------|
| `--transition-fast` | `0.2s ease` |
| `--transition-base` | `0.3s ease` |
| `--transition-slow` | `0.5s ease` |

---

## Z-index

| Переменная | Значение |
|------------|----------|
| `--z-header` | `100` |
| `--z-burger` | `150` |
| `--z-menu-overlay` | `200` |
| `--z-menu-panel` | `250` |

---

## Шрифты

- **Основной**: Inter (400, 500, 600, 700, 800)
- **Hero заголовок**: Oswald (700) + italic + `scaleY(1.3)` для condensed-эффекта
- Google Fonts CDN подключается в `<head>`: `Inter:wght@400;500;600;700;800&family=Oswald:wght@700`

---

## Инициализация приложения (app.js)

```
DOMContentLoaded →
  1. Header.init()
  2. Animations.init() (если существует)
  3. Services.init() (если существует)
  4. Определение страницы по URL:
     - case-detail → CaseDetail.init()
     - cases → Cases.initCasesPage()
     - иначе (index) → Cases.initHomepage()
```

---

## Модуль Header (header.js)

**Логика:**
- На hero: полная шапка (лого + навигация + CTA)
- После скролла ниже hero: шапка скрывается (`.header--hidden`), бургер появляется (`.burger--visible`)
- На pages без hero (cases.html, case-detail.html): бургер видим сразу
- Бургер: выезд панели справа (`.menu-panel--active`), overlay
- Закрытие: крестик, overlay, Escape, клик по ссылке/CTA

**Конфигурация:**
- `heroBottom - 100` — порог скрытия шапки
- `passive: true` для scroll listener

---

## Модуль Services (services.js)

**Функционал:**
- Аккордеон: 4 направления (Дизайн, Маркетинг, Создание сайтов, Digital)
- Автопереключение каждые 5 секунд с прогресс-баром
- Пауза таймера при hover на элемент аккордеона
- 3D viewer с уникальной сценой для каждого направления
- Курсор-фолловер с liquid-эффектом (GSAP ticker)
- Паралакс 3D объектов при движении мыши

**Конфигурация:**
- `switchInterval: 5000` — интервал переключения
- `intervalTime: 50` — шаг обновления таймера
- `lerp: 0.1` — плавность курсора (10% за кадр)
- `maxStretch: 0.5` — макс. растяжение курсора

**3D сцены:**
- Дизайн: куб + кольцо + точка
- Маркетинг: пирамида + кольцо + точка
- Сайты: сфера (пульсация) + орбита + точка
- Digital: октаэдр + кольцо + точка

**Курсор:**
- Появляется при `mouseenter` на секцию services
- Растягивается в направлении движения (расчёт через velocity)
- Пульсация при переключении элемента (`.services__cursor--pulse`)

---

## Модуль Animations (animations.js)

### 1. Particle Network (heroCanvas)
- 80 частиц (40 на мобильных < 768px)
- Линии между частицами < 150px
- Линии к мыши < 200px
- Отталкивание от курсора
- Пауза когда hero не виден (IntersectionObserver, threshold 0.1)

**CONFIG:**
```js
particleCount: 80
maxDistance: 150
particleRadius: 1.5
speed: 0.3
mouseRadius: 200
```

### 2. Scroll Reveal
- Селекторы для reveal: `.about .section__title`, `.about__text`, `.services__grid`, `.cases__grid`, и др.
- `.reveal` → fade-in + translateY(40px)
- `.reveal-stagger` → дети появляются по очереди (+0.05s каждый)
- IntersectionObserver, threshold 0.15

### 3. Hero Title Tilt
- Наклон заголовка при движении мыши
- `rotateX` от -2° до 2° (зависит от Y)
- `rotateY` от -2° до 2° (зависит от X)
- perspective: 800px
- Возврат в исходное при `mouseleave` (0.6s)

---

## Модуль Cases (cases.js)

**Конфигурация:**
- `CASES_LIMIT: 6` — количество кейсов на главной

**Категории:**
- `all`, `design`, `marketing`, `web`, `digital`
- Ярлыки: "Все", "Дизайн", "Маркетинг", "Сайты", "Digital"

**Структура данных кейса:**
```js
{
  id: number,
  title: string,
  category: string,
  tags: string[],
  image: string (главное фото),
  images: string[] (доп. фото),
  description: string (краткое),
  fullDescription: { task, solution, result }
}
```

---

## Модуль Case Detail (case-detail.js)

**Логика:**
- Чтение `?id=` из URL params
- Поиск кейса в `CASES_DATA`
- Рендер: заголовок, категория, теги, hero image, 3 блока (задача/решение/результат), галерея
- Если images.length > 0 → рендер галереи внизу страницы
- Если кейс не найден → "Кейс не найден"

---

## Ключевые механики

### 1. Кнопка "обсудить проект" (header)
- Белый бордер (`header__cta-text`)
- Красный псевдоэлемент (`header__cta-bg`) смещён top:-10px, left:-18px, width:70%
- На hover за **1s** `header__cta-bg` плавно входит внутрь кнопки (top:0, left:0, width:100%)

### 2. Hero Entrance (animations.css)
- Заголовок влетает снизу с blur (1.2s)
- Нижняя панель появляется (задержка 1s)
- Теги появляются по очереди

### 3. Grid Shift (services.css)
- `.services__bg-grid` — сетка линий 60x60px медленно ползёт по диагонали (20s linear infinite)

### 4. Aurora Pulse (contact.css)
- `.contact__aurora` — два радиальных градиента красного плавно меняют позицию/размер (10s)

### 5. Floating Glow Orbs (hero.css)
- 3 div'а `.hero__glow--1/2/3` — красные/белые размытые сферы, парят по разным траекториям

---

## Адаптивность (breakpoints)

| Breakpoint | Что меняется |
|-----------|-------------|
| **1200px** | Карточки услуг: 4 → 2 колонки |
| **992px** | Навигация/CTA скрыты, бургер всегда видим. About: 1 колонка. Кейсы: 2 колонки. Footer: вертикальный. Услуги: 1 колонка, 3D viewer 350px |
| **768px** | Hero title уменьшается, bottom-секция вертикальная. Теги мельче. Галерея: 1 колонка |
| **576px** | Hero 100svh. Кейсы: 1 колонка. Кнопки: меньше padding. Menu panel: 100% ширины |

---

## Как расширять кейсы

1. Открыть `data/cases-data.js`
2. Скопировать любой объект в массиве
3. Изменить `id` (уникальный), `title`, `category`, `tags`, `description`, `fullDescription`
4. Новые категории подхватываются фильтром автоматически
5. Для изображений: положить файлы в `img/`, указать путь в `image` и `images[]`

**Текущие кейсы (8):**
| ID | Название | Категория | Теги |
|----|----------|-----------|------|
| 1 | Сайт для украинского барбершопа 'mr.Solomon' | web | Брендинг, Верстка, CMS системы |
| 2 | Лендинг штурмового отряда 'Рыкарь' | web | Лендинг, UI/UX, Адаптив |
| 3 | Дизайн приложения поиска кофейнь 'Coffe Hunter' | design | UI/UX, Приложения, Дизайн |
| 4 | 'СК Империя' - брендинг с нуля | web | E-commerce, UI/UX, Разработка |
| 5 | Таргетированная реклама для EdTech | marketing | Таргет, Аналитика, Воронка |
| 6 | UI/UX дизайн мобильного приложения | design | UI/UX, Mobile, Figma |
| 7 | Комплексная digital-стратегия для клиники | digital | Стратегия, Digital, Аналитика |
| 8 | Корпоративный сайт архитектурного бюро | web | Корпоративный сайт, Анимации, CMS |

---

## Дизайн-решения

- Макет hero из `Frame 9.svg` (Figma export)
- Логотип: SVG домик (`#AF2F2F` + белое окно)
- Hero заголовок: гигантский condensed italic Oswald (scaleY для вытянутости)
- Теги в hero: outlined pills (белый бордер, прозрачный фон)
- CTA "Хочу тоже": красная скруглённая кнопка, внизу справа hero
- "Обсудить проект": анимированный псевдоэлемент (красный → входит в белую рамку за 1s)

---

## Reduced Motion

`@media (prefers-reduced-motion: reduce)`:
- Все анимации отключаются
- Canvas скрывается
- Transition заменяются на мгновенные изменения
