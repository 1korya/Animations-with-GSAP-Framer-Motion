// =============================================================
// LibraryShowcase — Задача 1: витрина готовых компонентов MUI
// =============================================================
// Отображает 6 компонентов из Material UI:
//   DataGrid, BarChart, TextField, Button, Select (Dropdown), Chip
// Позволяет изучить пропсы и поведение каждого компонента.
// =============================================================

import { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Chip from '@mui/material/Chip'
import Paper from '@mui/material/Paper'
import { DataGrid } from '@mui/x-data-grid'
import { BarChart } from '@mui/x-charts/BarChart'

// ── Данные для DataGrid ──────────────────────────────────────
const columns = [
  { field: 'id',      headerName: 'ID',     width: 70 },
  { field: 'name',    headerName: 'Имя',    width: 120 },
  { field: 'score',   headerName: 'Балл',   width: 100, type: 'number' },
  { field: 'status',  headerName: 'Статус', width: 110 },
]

const rows = [
  { id: 1, name: 'Иван',    score: 87, status: 'Сдал' },
  { id: 2, name: 'Мария',   score: 95, status: 'Сдал' },
  { id: 3, name: 'Алексей', score: 54, status: 'Пересдача' },
  { id: 4, name: 'Ольга',   score: 73, status: 'Сдал' },
  { id: 5, name: 'Пётр',    score: 41, status: 'Не сдал' },
]

// ── Данные для BarChart ──────────────────────────────────────
const chartData = {
  xAxis: [{ data: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн'], scaleType: 'band' }],
  series: [{ data: [40, 65, 55, 90, 72, 88], label: 'Активность' }],
}

function ComponentCard({ title, description, children }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        border: '1px solid #e2e8f0',
        borderRadius: 2,
        background: '#fafafa',
      }}
    >
      <Typography sx={{ fontFamily: 'JetBrains Mono', fontSize: 12, color: '#6366f1', mb: 0.5 }}>
        {title}
      </Typography>
      <Typography sx={{ fontFamily: 'Manrope', fontSize: 12, color: '#64748b', mb: 1.5 }}>
        {description}
      </Typography>
      {children}
    </Paper>
  )
}

function LibraryShowcase() {
  // Локальные состояния для демонстрации интерактивности
  const [textValue, setTextValue] = useState('')
  const [dropValue, setDropValue] = useState('react')
  const [btnClicks, setBtnClicks] = useState(0)

  return (
    <Box>
      <Typography
        sx={{
          fontFamily: 'Manrope',
          fontWeight: 700,
          fontSize: 16,
          color: '#0f172a',
          mb: 0.5,
        }}
      >
        Задача 1 · Исследование компонентов MUI
      </Typography>
      <Typography sx={{ fontFamily: 'Manrope', fontSize: 13, color: '#64748b', mb: 3 }}>
        6 готовых компонентов из библиотеки Material UI — изучите пропсы и поведение каждого.
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
          gap: 2,
        }}
      >
        {/* 1. TextField */}
        <ComponentCard
          title="TextField"
          description="Пропсы: label, value, onChange, size, variant, type, fullWidth"
        >
          <TextField
            label="Ваше имя"
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            size="small"
            fullWidth
            variant="outlined"
            helperText={textValue ? `Введено: ${textValue.length} симв.` : 'Начните вводить…'}
          />
        </ComponentCard>

        {/* 2. Button */}
        <ComponentCard
          title="Button"
          description="Пропсы: variant, color, size, disabled, onClick, startIcon"
        >
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {['contained', 'outlined', 'text'].map((v) => (
              <Button
                key={v}
                variant={v}
                size="small"
                onClick={() => setBtnClicks((c) => c + 1)}
              >
                {v}
              </Button>
            ))}
          </Box>
          <Typography sx={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: '#64748b', mt: 1 }}>
            Кликов: {btnClicks}
          </Typography>
        </ComponentCard>

        {/* 3. Select (Dropdown) */}
        <ComponentCard
          title="Select (Dropdown)"
          description="Пропсы: value, onChange, label, size, fullWidth, multiple"
        >
          <FormControl size="small" fullWidth>
            <InputLabel>Фреймворк</InputLabel>
            <Select
              value={dropValue}
              label="Фреймворк"
              onChange={(e) => setDropValue(e.target.value)}
            >
              <MenuItem value="react">React</MenuItem>
              <MenuItem value="vue">Vue</MenuItem>
              <MenuItem value="angular">Angular</MenuItem>
              <MenuItem value="svelte">Svelte</MenuItem>
            </Select>
          </FormControl>
          <Typography sx={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: '#64748b', mt: 1 }}>
            Выбрано: {dropValue}
          </Typography>
        </ComponentCard>

        {/* 4. Chip */}
        <ComponentCard
          title="Chip"
          description="Пропсы: label, color, variant, onDelete, clickable, size"
        >
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {['default', 'primary', 'success', 'warning', 'error'].map((color) => (
              <Chip key={color} label={color} color={color} size="small" />
            ))}
          </Box>
        </ComponentCard>

        {/* 5. DataGrid */}
        <ComponentCard
          title="DataGrid"
          description="Пропсы: rows, columns, pageSize, checkboxSelection, sortingOrder"
        >
          <Box sx={{ height: 200 }}>
            <DataGrid
              rows={rows}
              columns={columns}
              density="compact"
              hideFooter
              disableColumnMenu
              sx={{ fontSize: 12, fontFamily: 'JetBrains Mono' }}
            />
          </Box>
        </ComponentCard>

        {/* 6. BarChart */}
        <ComponentCard
          title="BarChart (MUI X Charts)"
          description="Пропсы: xAxis, series, width, height, colors"
        >
          <BarChart
            xAxis={chartData.xAxis}
            series={chartData.series}
            height={180}
            colors={['#6366f1']}
            margin={{ top: 10, bottom: 24, left: 30, right: 10 }}
          />
        </ComponentCard>
      </Box>
    </Box>
  )
}

export default LibraryShowcase
