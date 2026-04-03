# 🎬 Animations with Framer Motion

Ветка `feature/framer-motion` — практическое освоение анимаций с библиотекой **Framer Motion** в React-приложении интернет-магазина.

## 🎯 Цель

Освоить анимации с Framer Motion: анимации появления/исчезновения элементов списка, stagger-эффекты и интерактивные анимации при наведении и нажатии.

---

## ✨ Реализованные анимации

### 1. 🃏 Последовательная анимация карточек — `Home.jsx`

При загрузке главной страницы hero-секция плавно появляется сверху, затем три карточки преимуществ появляются одна за другой снизу с задержкой (`stagger`) через систему `variants`.

```js
// Контейнер управляет stagger-задержкой дочерних элементов
const listContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

// Каждая карточка появляется снизу вверх с fade
const listItem = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};
```

Карточки также реагируют на наведение — плавно поднимаются вверх:

```js
<motion.div
  variants={listItem}
  whileHover={{ y: -6, boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }}
  transition={{ type: 'spring', stiffness: 250, damping: 20 }}
>
```

---

### 2. 🔍 Анимация появления/исчезновения при фильтрации — `Products.jsx`

Карточки товаров анимируются при каждом изменении поискового запроса: найденные карточки появляются с `stagger`-эффектом, а скрытые плавно исчезают. Используется `AnimatePresence` для корректной анимации выхода (`exit`).

```js
const cardVariant = {
  hidden:  { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.35, ease: 'easeOut' } },
  exit:    { opacity: 0, y: -20, scale: 0.9, transition: { duration: 0.25 } },
};

// stagger через delay на основе индекса
<motion.div
  variants={cardVariant}
  initial="hidden"
  animate="visible"
  exit="exit"
  layout
  transition={{ delay: i * 0.07 }}
>
```

> `AnimatePresence mode="popLayout"` позволяет корректно анимировать исчезновение карточек при фильтрации, не блокируя появление новых.

---

### 3. 🎮 Интерактивная анимация кнопок — все страницы

Кнопки реагируют на наведение (`whileHover`) и нажатие (`whileTap`) с упругим spring-эффектом. Реализовано через `motion(Button)` — обёртку над MUI-компонентом.

```js
const MotionButton = motion(Button);

<MotionButton
  whileHover={{ scale: 1.06 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: 'spring', stiffness: 300, damping: 18 }}
>
  Отправить сообщение
</MotionButton>
```

---

### 4. 🔄 Анимация переключения режимов — `Profile.jsx`

Форма редактирования профиля плавно сменяет режим просмотра через `AnimatePresence mode="wait"` — старый контент уходит вниз, новый въезжает снизу.

```js
<AnimatePresence mode="wait">
  {editing ? (
    <motion.div
      key="edit"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
    >
      {/* форма редактирования */}
    </motion.div>
  ) : (
    <motion.div key="view" ...>
      {/* режим просмотра */}
    </motion.div>
  )}
</AnimatePresence>
```

---

### 5. 📋 Stagger-анимация списка заказов — `Profile.jsx`

Строки истории заказов появляются одна за другой справа налево при загрузке страницы.

```js
const orderContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.2 } },
};

const orderItem = {
  hidden:  { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.38, ease: 'easeOut' } },
};
```

---

## 📁 Структура проекта

```
src/
├── pages/
│   ├── Home.jsx        # Hero + stagger-карточки + hover-подъём
│   ├── About.jsx       # Stagger команды + статистика слева
│   ├── Products.jsx    # AnimatePresence при фильтрации + hover/tap кнопок
│   ├── Contacts.jsx    # Stagger полей формы + анимированный Alert
│   └── Profile.jsx     # Режим edit/view + stagger заказов + hover аватара
```

---

## 🛠️ Технологии

| Технология | Назначение |
|------------|------------|
| React | UI-фреймворк |
| Framer Motion | Анимации (`motion`, `variants`, `AnimatePresence`) |
| Material UI | Компоненты интерфейса |
| TanStack Router | Клиентская маршрутизация |
| Vite | Сборщик |

---

## 📦 Установка и запуск

```bash
npm install
npm run dev
```

---

## 🔗 Полезные ссылки

- [Документация Framer Motion](https://www.framer.com/motion/)
- [motion()](https://www.framer.com/motion/component/)
- [Variants](https://www.framer.com/motion/animation/#variants)
- [AnimatePresence](https://www.framer.com/motion/animate-presence/)
- [Gestures (hover, tap)](https://www.framer.com/motion/gestures/)
