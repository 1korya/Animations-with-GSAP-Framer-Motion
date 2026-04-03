import {
  Typography, Box, Button, Grid, Card,
  CardContent, Chip, Stack
} from '@mui/material';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import StarIcon from '@mui/icons-material/Star';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { motion } from 'framer-motion';

const features = [
  { icon: <RocketLaunchIcon color="primary" />, title: 'Быстрая доставка',    text: 'Доставляем за 1–2 дня по всей стране' },
  { icon: <StarIcon color="warning" />,         title: 'Высокое качество',    text: 'Все товары проходят строгий контроль' },
  { icon: <LocalShippingIcon color="success" />, title: 'Бесплатный возврат', text: '30 дней на возврат без вопросов' },
];

// Контейнер — управляет stagger-задержкой дочерних элементов
const listContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

// Каждый элемент списка появляется снизу вверх с fade
const listItem = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};

// Hover + tap для кнопок
const buttonMotion = {
  whileHover: { scale: 1.06 },
  whileTap:   { scale: 0.95 },
  transition: { type: 'spring', stiffness: 300, damping: 18 },
};

const MotionButton = motion(Button);

export default function Home() {
  return (
    <Box>
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <Box
          sx={{
            background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
            borderRadius: 3,
            color: 'white',
            p: { xs: 4, md: 8 },
            textAlign: 'center',
            mb: 5,
          }}
        >
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Добро пожаловать в МойМагазин 🎉
          </Typography>
          <Typography variant="h6" sx={{ mb: 3, opacity: 0.9 }}>
            Лучшие товары по лучшим ценам — всё в одном месте
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap">
            <MotionButton
              variant="contained"
              color="secondary"
              size="large"
              href="/products"
              {...buttonMotion}
            >
              Смотреть товары
            </MotionButton>
            <MotionButton
              variant="outlined"
              color="inherit"
              size="large"
              href="/about"
              {...buttonMotion}
            >
              О нас
            </MotionButton>
          </Stack>
        </Box>
      </motion.div>

      {/* Теги */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 4 }}>
          {['Скидки до 50%', 'Более 1000 товаров', 'Гарантия качества', 'Служба поддержки 24/7'].map(tag => (
            <Chip key={tag} label={tag} color="primary" variant="outlined" />
          ))}
        </Stack>
      </motion.div>

      {/* Карточки с stagger-анимацией появления */}
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Почему выбирают нас?
      </Typography>
      <motion.div
        variants={listContainer}
        initial="hidden"
        animate="visible"
      >
        <Grid container spacing={3}>
          {features.map(({ icon, title, text }) => (
            <Grid item xs={12} md={4} key={title}>
              <motion.div variants={listItem}>
                <motion.div
                  whileHover={{ y: -6, boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }}
                  transition={{ type: 'spring', stiffness: 250, damping: 20 }}
                  style={{ height: '100%' }}
                >
                  <Card elevation={2} sx={{ height: '100%' }}>
                    <CardContent>
                      <Box sx={{ mb: 1 }}>{icon}</Box>
                      <Typography variant="h6" fontWeight="bold" gutterBottom>{title}</Typography>
                      <Typography color="text.secondary">{text}</Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>
    </Box>
  );
}