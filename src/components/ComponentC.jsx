// =============================================================
// КОМПОНЕНТ C — «Глупый» компонент (Presentational / Dumb)
// =============================================================
// Отображает преобразованное значение и историю кликов.
// Не содержит логики — только рендер данных из пропсов.
// =============================================================

import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'

/**
 * ComponentC — блок вывода результата.
 *
 * @param {number}   original    — исходное введённое число
 * @param {number}   transformed — результат преобразования (×2)
 * @param {number[]} history     — последние 5 значений transformed
 */
function ComponentC({ original, transformed, history }) {
  return (
    <div>
      <Typography variant="caption" sx={{ color: '#888', fontFamily: 'JetBrains Mono' }}>
        Компонент C · вывод результата
      </Typography>

      <Paper
        variant="outlined"
        sx={{
          mt: 0.5,
          p: 1.5,
          borderRadius: 2,
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          borderColor: '#334155',
        }}
      >
        {/* Основной результат */}
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 1 }}>
          <Typography
            sx={{
              fontFamily: 'JetBrains Mono',
              fontSize: 28,
              fontWeight: 700,
              color: '#38bdf8',
              lineHeight: 1,
            }}
          >
            {transformed}
          </Typography>
          <Typography sx={{ fontFamily: 'JetBrains Mono', fontSize: 12, color: '#64748b' }}>
            = {original} × 2
          </Typography>
        </Box>

        {/* Дополнительные преобразования */}
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1.5 }}>
          <Chip
            label={`²  = ${original ** 2}`}
            size="small"
            sx={{ fontFamily: 'JetBrains Mono', fontSize: 11, bgcolor: '#1e3a5f', color: '#93c5fd' }}
          />
          <Chip
            label={`√  ≈ ${Math.sqrt(Math.abs(original)).toFixed(2)}`}
            size="small"
            sx={{ fontFamily: 'JetBrains Mono', fontSize: 11, bgcolor: '#14532d', color: '#86efac' }}
          />
          <Chip
            label={`%2 = ${original % 2 === 0 ? 'чётное' : 'нечётное'}`}
            size="small"
            sx={{ fontFamily: 'JetBrains Mono', fontSize: 11, bgcolor: '#4a1942', color: '#f0abfc' }}
          />
        </Box>

        {/* История последних значений */}
        {history.length > 0 && (
          <>
            <Typography sx={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: '#475569', mb: 0.5 }}>
              история (последние {history.length}):
            </Typography>
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              {history.map((v, i) => (
                <Typography
                  key={i}
                  sx={{
                    fontFamily: 'JetBrains Mono',
                    fontSize: 11,
                    color: i === history.length - 1 ? '#38bdf8' : '#475569',
                    fontWeight: i === history.length - 1 ? 700 : 400,
                  }}
                >
                  {v}{i < history.length - 1 ? ' →' : ''}
                </Typography>
              ))}
            </Box>
          </>
        )}
      </Paper>
    </div>
  )
}

export default ComponentC
