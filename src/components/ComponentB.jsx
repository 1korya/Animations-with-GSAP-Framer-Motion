// =============================================================
// КОМПОНЕНТ B — «Глупый» компонент (Presentational / Dumb)
// =============================================================
// Отображает кнопку, цвет которой зависит от переданного числа.
// Логика цвета: число < 0 → красный, 0–49 → синий, ≥ 50 → зелёный.
// Кнопка не знает о состоянии — только принимает пропсы.
// =============================================================

import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

/**
 * Возвращает цвет и метку в зависимости от числа.
 * Это «чистая функция» — при одних и тех же аргументах
 * всегда возвращает одинаковый результат.
 */
function getStyle(value) {
  if (value < 0)  return { color: '#ef4444', label: 'Отрицательное', bg: '#fef2f2' }
  if (value < 50) return { color: '#3b82f6', label: 'Малое',         bg: '#eff6ff' }
  if (value < 100) return { color: '#f59e0b', label: 'Среднее',      bg: '#fffbeb' }
  return               { color: '#22c55e', label: 'Большое',          bg: '#f0fdf4' }
}

/**
 * ComponentB — кнопка с динамическим цветом.
 *
 * @param {number}   value    — число, по которому определяется цвет
 * @param {function} onClick  — обработчик нажатия
 */
function ComponentB({ value, onClick }) {
  const { color, label, bg } = getStyle(value)

  return (
    <div style={{ marginBottom: 12 }}>
      <Typography variant="caption" sx={{ color: '#888', fontFamily: 'JetBrains Mono' }}>
        Компонент B · кнопка (цвет меняется динамически)
      </Typography>

      <Button
        variant="contained"
        fullWidth
        onClick={onClick}
        sx={{
          mt: 0.5,
          backgroundColor: color,
          color: '#fff',
          fontFamily: 'JetBrains Mono',
          fontWeight: 600,
          letterSpacing: 1,
          transition: 'background-color 0.4s ease',
          '&:hover': { backgroundColor: color, opacity: 0.88 },
        }}
      >
        {label} · применить ×2
      </Button>

      {/* Подсказка: в каком диапазоне сейчас значение */}
      <Typography
        variant="caption"
        sx={{ mt: 0.5, display: 'block', color, fontFamily: 'JetBrains Mono', fontSize: 11 }}
      >
        {value} → зона: {label}
      </Typography>
    </div>
  )
}

export default ComponentB
