import {
  Typography, Box, Button, Grid, Card,
  CardContent, Chip, Stack
} from '@mui/material';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import StarIcon from '@mui/icons-material/Star';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const features = [
  { icon: <RocketLaunchIcon color="primary" />, title: 'Быстрая доставка',   text: 'Доставляем за 1–2 дня по всей стране' },
  { icon: <StarIcon color="warning" />,         title: 'Высокое качество',   text: 'Все товары проходят строгий контроль' },
  { icon: <LocalShippingIcon color="success" />, title: 'Бесплатный возврат', text: '30 дней на возврат без вопросов' },
];

export default function Home() {
  const heroRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);

 useEffect(() => {
  gsap.fromTo(
    heroRef.current,
    { autoAlpha: 0, y: -60 },
    { autoAlpha: 1, y: 0, duration: 1, ease: 'power3.out' }
  );

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
}, []);


  return (
    <Box>
      <Box
        ref={heroRef}
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
          <Button variant="contained" color="secondary" size="large" href="/products">
            Смотреть товары
          </Button>
          <Button variant="outlined" color="inherit" size="large" href="/about">
            О нас
          </Button>
        </Stack>
      </Box>

      <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 4 }}>
        {['Скидки до 50%', 'Более 1000 товаров', 'Гарантия качества', 'Служба поддержки 24/7'].map(tag => (
          <Chip key={tag} label={tag} color="primary" variant="outlined" />
        ))}
      </Stack>

      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Почему выбирают нас?
      </Typography>
      <Grid container spacing={3}>
        {[card1Ref, card2Ref, card3Ref].map((ref, i) => (
          <Grid item xs={12} md={4} key={features[i].title}>
            <Card ref={ref} elevation={2} sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ mb: 1 }}>{features[i].icon}</Box>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {features[i].title}
                </Typography>
                <Typography color="text.secondary">{features[i].text}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}