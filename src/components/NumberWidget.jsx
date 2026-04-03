// =============================================================
// NumberWidget — «Умный» составной компонент (Container / Smart)
// =============================================================
// Задача 3: объединяет A, B, C в один «чёрный ящик».
//
// Снаружи:  <NumberWidget initialValue={42} title="Пример" />
// Внутри:   хранит состояние, содержит логику, управляет дочерними.
//
// Принцип «чёрного ящика»:
//   - Пользователь компонента НЕ знает о существовании A, B, C.
//   - Интерфейс = один проп initialValue (и необязательный title).
//   - Вся логика инкапсулирована внутри NumberWidget.
// =============================================================

import { useState, useCallback } from 'react'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'

import ComponentA from './ComponentA'
import ComponentB from './ComponentB'
import ComponentC from './ComponentC'

// Максимальная длина сохраняемой истории
const MAX_HISTORY = 5

/**
 * NumberWidget — составной «умный» компонент.
 *
 * @param {number} initialValue  — начальное число (проп снаружи)
 * @param {string} title         — заголовок виджета (опционально)
 */
function NumberWidget({ initialValue = 0, title = 'NumberWidget' }) {
  // ── Состояние ──────────────────────────────────────────────
  // Единственный источник правды для всех дочерних компонентов.
  const [value, setValue] = useState(initialValue)
  const [transformed, setTransformed] = useState(initialValue * 2)
  const [history, setHistory] = useState([initialValue * 2])

  // ── Обработчики (логика преобразования) ───────────────────

  /**
   * Вызывается из ComponentA при вводе нового числа.
   * Только меняет поле ввода — результат ещё не обновляем.
   */
  const handleInputChange = useCallback((newValue) => {
    setValue(newValue)
  }, [])

  /**
   * Вызывается из ComponentB при нажатии кнопки.
   * Применяет преобразование ×2 и сохраняет в историю.
   */
  const handleApply = useCallback(() => {
    const result = value * 2
    setTransformed(result)
    setHistory((prev) => {
      const next = [...prev, result]
      return next.length > MAX_HISTORY ? next.slice(next.length - MAX_HISTORY) : next
    })
  }, [value])

  // ── Рендер ────────────────────────────────────────────────
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        borderRadius: 3,
        border: '1px solid',
        borderColor: '#e2e8f0',
        background: '#fff',
        fontFamily: 'Manrope, sans-serif',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: 3,
          background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899)',
        },
      }}
    >
      {/* Заголовок виджета */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography
          sx={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: 14, color: '#0f172a' }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            fontFamily: 'JetBrains Mono',
            fontSize: 10,
            color: '#94a3b8',
            background: '#f1f5f9',
            px: 1,
            py: 0.3,
            borderRadius: 1,
          }}
        >
          init: {initialValue}
        </Typography>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* ── Компонент A: поле ввода числа ── */}
      <ComponentA value={value} onChange={handleInputChange} />

      {/* ── Компонент B: кнопка с динамическим цветом ── */}
      <ComponentB value={value} onClick={handleApply} />

      {/* ── Компонент C: блок вывода результата ── */}
      <ComponentC
        original={value}
        transformed={transformed}
        history={history}
      />
    </Paper>
  )
}

export default NumberWidget
