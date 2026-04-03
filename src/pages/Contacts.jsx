import {
  Typography, Box, Grid, Card, CardContent,
  TextField, Button, Alert, Stack, Divider
} from '@mui/material';
import EmailIcon    from '@mui/icons-material/Email';
import PhoneIcon    from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const contactInfo = [
  { icon: <PhoneIcon color="primary" />,       label: 'Телефон',       value: '+7 (800) 123-45-67' },
  { icon: <EmailIcon color="primary" />,       label: 'Email',         value: 'support@moymagazin.ru' },
  { icon: <LocationOnIcon color="primary" />,  label: 'Адрес',         value: 'г. Москва, ул. Примерная, д. 1' },
  { icon: <AccessTimeIcon color="primary" />,  label: 'Режим работы',  value: 'Пн–Пт: 9:00–18:00' },
];

const infoContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const infoItem = {
  hidden:  { opacity: 0, x: -25 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.38, ease: 'easeOut' } },
};

const formContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const formField = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
};

const MotionButton = motion(Button);

export default function Contacts() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSubmit = () => {
    if (form.name && form.email && form.message) {
      setSent(true);
      setForm({ name: '', email: '', message: '' });
    }
  };

  const isValid = form.name && form.email && form.message;

  return (
    <Box>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>Контакты</Typography>
        <Typography color="text.secondary" sx={{ mb: 4 }}>
          Свяжитесь с нами любым удобным способом или заполните форму ниже
        </Typography>
      </motion.div>

      <Grid container spacing={4}>
        {/* Контактные карточки */}
        <Grid item xs={12} md={5}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>Наши контакты</Typography>
          <motion.div variants={infoContainer} initial="hidden" animate="visible">
            <Stack spacing={2}>
              {contactInfo.map(({ icon, label, value }) => (
                <motion.div key={label} variants={infoItem}>
                  <motion.div whileHover={{ x: 4 }} transition={{ type: 'spring', stiffness: 300 }}>
                    <Card elevation={1}>
                      <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, py: '12px !important' }}>
                        {icon}
                        <Box>
                          <Typography variant="caption" color="text.secondary">{label}</Typography>
                          <Typography variant="body1" fontWeight="medium">{value}</Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              ))}
            </Stack>
          </motion.div>
        </Grid>

        <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', md: 'block' } }} />

        {/* Форма */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>Написать нам</Typography>

          <AnimatePresence>
            {sent && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35 }}
              >
                <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSent(false)}>
                  Сообщение отправлено! Ответим в течение 24 часов.
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div variants={formContainer} initial="hidden" animate="visible">
            <Stack spacing={2}>
              {[
                { label: 'Ваше имя', name: 'name',    type: 'text',  multiline: false, rows: 1 },
                { label: 'Email',    name: 'email',   type: 'email', multiline: false, rows: 1 },
                { label: 'Сообщение',name: 'message', type: 'text',  multiline: true,  rows: 4 },
              ].map(({ label, name, type, multiline, rows }) => (
                <motion.div key={name} variants={formField}>
                  <TextField
                    label={label}
                    name={name}
                    type={type}
                    fullWidth
                    multiline={multiline}
                    rows={multiline ? rows : undefined}
                    value={form[name]}
                    onChange={handleChange}
                  />
                </motion.div>
              ))}

              <motion.div variants={formField}>
                <MotionButton
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={handleSubmit}
                  disabled={!isValid}
                  whileHover={isValid ? { scale: 1.03 } : {}}
                  whileTap={isValid ? { scale: 0.96 } : {}}
                  transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                >
                  Отправить сообщение
                </MotionButton>
              </motion.div>
            </Stack>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
}