// =============================================================
// КОМПОНЕНТ A — «Глупый» компонент (Presentational / Dumb)
// =============================================================
// Отвечает ТОЛЬКО за отображение поля ввода.
// Не хранит состояние — получает данные и колбэк через пропсы.
// =============================================================

import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

/**
 * ComponentA — поле ввода числа.
 *
 * @param {number}   value     — текущее значение (управляется снаружи)
 * @param {function} onChange  — вызывается при каждом изменении ввода
 */
function ComponentA({ value, onChange }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <Typography variant="caption" sx={{ color: '#888', fontFamily: 'JetBrains Mono' }}>
        Компонент A · поле ввода
      </Typography>

      <TextField
        label="Введите число"
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        size="small"
        fullWidth
        variant="outlined"
        sx={{ mt: 0.5, fontFamily: 'JetBrains Mono' }}
        inputProps={{ style: { fontFamily: 'JetBrains Mono' } }}
      />
    </div>
  )
}

export default ComponentA
