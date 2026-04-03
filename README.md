# 🎬 Animations with GSAP

Ветка `feature/gsap` — практическое освоение анимаций с библиотекой **GSAP (GreenSock Animation Platform)** в React-приложении интернет-магазина.

## 🎯 Цель

Освоить сложные анимации с GSAP: scroll-triggered анимации, последовательные анимации и интерактивные эффекты при взаимодействии с пользователем.

---

## ✨ Реализованные анимации

### 1. 🔗 Последовательная анимация элементов — `Home.jsx`

При загрузке главной страницы hero-секция плавно въезжает сверху, затем три карточки появляются одна за другой снизу с задержкой (`stagger`).

```js
// Hero появляется сверху
gsap.fromTo(
  heroRef.current,
  { autoAlpha: 0, y: -60 },
  { autoAlpha: 1, y: 0, duration: 1, ease: 'power3.out' }
);

// Карточки появляются последовательно снизу
gsap.fromTo(
  [card1Ref.current, card2Ref.current, card3Ref.current],
  { autoAlpha: 0, y: 50 },
  {
    autoAlpha: 1,
    y: 0,
    stagger: 0.2,
    duration: 0.7,
    delay: 0.5,
    ease: 'power2.out',
  }
);
```

---

### 2. 🔍 Анимация при фильтрации — `Products.jsx`

Карточки товаров анимируются при каждом изменении поиска: все найденные карточки влетают слева с `stagger`-эффектом. Используется `gsap.context()` для корректной очистки анимаций при обновлении.

```js
const ctx = gsap.context(() => {
  gsap.fromTo(
    cards,
    { autoAlpha: 0, x: -50 },
    {
      autoAlpha: 1,
      x: 0,
      stagger: 0.15,
      duration: 0.6,
      ease: 'power2.out',
    }
  );
});

return () => ctx.revert(); // очистка при ре-рендере
```

> Анимация перезапускается при каждом изменении `filtered.length`, то есть при каждом поисковом запросе.

---

### 3. 🎮 Интерактивная анимация кнопки — `Contacts.jsx`

Кнопка «Отправить сообщение» реагирует на наведение мыши — увеличивается с эффектом упругости при `mouseenter` и возвращается в исходное состояние при `mouseleave`.

```js
const handleMouseEnter = () => {
  gsap.to(btnRef.current, { scale: 1.07, duration: 0.25, ease: 'back.out(2)' });
};

const handleMouseLeave = () => {
  gsap.to(btnRef.current, { scale: 1, duration: 0.25 });
};
```

---

## 📁 Структура проекта

```
src/
├── pages/
│   ├── Home.jsx        # Последовательная анимация (hero + stagger-карточки)
│   ├── Products.jsx    # Анимация при фильтрации товаров
│   └── Contacts.jsx    # Интерактивная анимация кнопки
```

---

## 🛠️ Технологии

| Технология | Назначение |
|------------|------------|
| React | UI-фреймворк |
| GSAP | Анимации (`fromTo`, `to`, `stagger`, `context`) |
| Material UI | Компоненты интерфейса |
| Vite | Сборщик |

---

## 📦 Установка и запуск

```bash
npm install
npm run dev
```

---

## 🔗 Полезные ссылки

- [Документация GSAP](https://gsap.com/docs/v3/)
- [gsap.fromTo()](https://gsap.com/docs/v3/GSAP/gsap.fromTo())
- [gsap.context()](https://gsap.com/docs/v3/GSAP/gsap.context())
- [Stagger](https://gsap.com/docs/v3/Staggers/)
