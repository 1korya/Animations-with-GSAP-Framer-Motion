import {
  Typography, Box, Grid, Card, CardContent,
  Avatar, Divider, LinearProgress, Stack
} from '@mui/material';
import { motion } from 'framer-motion';

const team = [
  { name: 'Алексей Петров',  role: 'CEO / Основатель',     initials: 'АП' },
  { name: 'Мария Иванова',   role: 'Директор по продукту',  initials: 'МИ' },
  { name: 'Дмитрий Козлов',  role: 'Технический директор',  initials: 'ДК' },
];

const stats = [
  { label: 'Лет на рынке',       value: 8,  max: 20,  display: '8 лет' },
  { label: 'Довольных клиентов',  value: 95, max: 100, display: '95%'   },
  { label: 'Товаров в каталоге',  value: 70, max: 100, display: '1 400+' },
  { label: 'Городов доставки',    value: 60, max: 100, display: '300+'  },
];

const cardContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
};

const cardVariant = {
  hidden:  { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
};

const statVariant = {
  hidden:  { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

export default function About() {
  return (
    <Box>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>О компании</Typography>
        <Typography color="text.secondary" sx={{ mb: 4, maxWidth: 700 }}>
          МойМагазин — это современная e-commerce платформа, основанная в 2017 году.
          Мы верим, что каждый покупатель заслуживает лучшего сервиса и честных цен.
        </Typography>
      </motion.div>

      {/* Статистика — появляется слева */}
      <Typography variant="h5" fontWeight="bold" gutterBottom>Наши достижения</Typography>
      <motion.div variants={cardContainer} initial="hidden" animate="visible">
        <Grid container spacing={3} sx={{ mb: 5 }}>
          {stats.map(({ label, value, max, display }) => (
            <Grid item xs={12} sm={6} key={label}>
              <motion.div variants={statVariant}>
                <Card elevation={1}>
                  <CardContent>
                    <Stack direction="row" justifyContent="space-between" mb={1}>
                      <Typography variant="body1">{label}</Typography>
                      <Typography variant="body1" fontWeight="bold" color="primary">{display}</Typography>
                    </Stack>
                    <LinearProgress
                      variant="determinate"
                      value={(value / max) * 100}
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>

      <Divider sx={{ mb: 4 }} />

      {/* Команда — stagger + hover */}
      <Typography variant="h5" fontWeight="bold" gutterBottom>Наша команда</Typography>
      <motion.div variants={cardContainer} initial="hidden" animate="visible">
        <Grid container spacing={3}>
          {team.map(({ name, role, initials }) => (
            <Grid item xs={12} sm={4} key={name}>
              <motion.div
                variants={cardVariant}
                whileHover={{ y: -8, transition: { type: 'spring', stiffness: 260, damping: 18 } }}
              >
                <Card elevation={2} sx={{ textAlign: 'center', p: 2 }}>
                  <CardContent>
                    <Avatar
                      sx={{ bgcolor: 'primary.main', width: 72, height: 72, fontSize: 24, mx: 'auto', mb: 2 }}
                    >
                      {initials}
                    </Avatar>
                    <Typography variant="h6" fontWeight="bold">{name}</Typography>
                    <Typography color="text.secondary">{role}</Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>
    </Box>
  );
}