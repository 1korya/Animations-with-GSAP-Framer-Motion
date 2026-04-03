import {
  Typography, Box, Grid, Card, CardContent,
  TextField, Button, Alert, Stack, Divider
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useState, useRef } from 'react';
import gsap from 'gsap';

const contactInfo = [
  { icon: <PhoneIcon color="primary" />, label: 'Телефон',  value: '+7 (800) 123-45-67' },
  { icon: <EmailIcon color="primary" />, label: 'Email',    value: 'support@moymagazin.ru' },
  { icon: <LocationOnIcon color="primary" />, label: 'Адрес', value: 'г. Москва, ул. Примерная, д. 1' },
  { icon: <AccessTimeIcon color="primary" />, label: 'Режим работы', value: 'Пн–Пт: 9:00–18:00' },
];

export default function Contacts() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const btnRef = useRef(null);

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = () => {
    if (form.name && form.email && form.message) {
      setSent(true);
      setForm({ name: '', email: '', message: '' });
    }
  };

  const handleMouseEnter = () => {
    gsap.to(btnRef.current, { scale: 1.07, duration: 0.25, ease: 'back.out(2)' });
  };

  const handleMouseLeave = () => {
    gsap.to(btnRef.current, { scale: 1, duration: 0.25 });
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Контакты
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>
        Свяжитесь с нами любым удобным способом или заполните форму ниже
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={5}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Наши контакты
          </Typography>
          <Stack spacing={2}>
            {contactInfo.map(({ icon, label, value }) => (
              <Card key={label} elevation={1}>
                <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, py: '12px !important' }}>
                  {icon}
                  <Box>
                    <Typography variant="caption" color="text.secondary">{label}</Typography>
                    <Typography variant="body1" fontWeight="medium">{value}</Typography>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Grid>

        <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', md: 'block' } }} />

        <Grid item xs={12} md={6}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Написать нам
          </Typography>

          {sent && (
            <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSent(false)}>
              Сообщение отправлено! Мы ответим вам в течение 24 часов.
            </Alert>
          )}

          <Stack spacing={2}>
            <TextField label="Ваше имя" name="name" fullWidth value={form.name} onChange={handleChange} />
            <TextField label="Email" name="email" type="email" fullWidth value={form.email} onChange={handleChange} />
            <TextField label="Сообщение" name="message" multiline rows={4} fullWidth value={form.message} onChange={handleChange} />
            <Button
              ref={btnRef}
              variant="contained"
              size="large"
              onClick={handleSubmit}
              disabled={!form.name || !form.email || !form.message}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Отправить сообщение
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}