import {
  Typography, Box, Grid, Card, CardContent,
  Avatar, Button, TextField, Chip, Divider,
  List, ListItem, ListItemText, ListItemIcon, Stack
} from '@mui/material';
import ShoppingBagIcon   from '@mui/icons-material/ShoppingBag';
import FavoriteIcon      from '@mui/icons-material/Favorite';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckCircleIcon   from '@mui/icons-material/CheckCircle';
import EditIcon          from '@mui/icons-material/Edit';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const orders = [
  { id: '#00142', date: '01.04.2026', status: 'Доставлен', amount: 7990,  color: 'success' },
  { id: '#00138', date: '25.03.2026', status: 'В пути',    amount: 15990, color: 'info'    },
  { id: '#00130', date: '10.03.2026', status: 'Доставлен', amount: 2490,  color: 'success' },
  { id: '#00121', date: '28.02.2026', status: 'Отменён',   amount: 59990, color: 'error'   },
];

const orderContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.2 } },
};

const orderItem = {
  hidden:  { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.38, ease: 'easeOut' } },
};

const MotionButton = motion(Button);

export default function Profile() {
  const [editing, setEditing] = useState(false);
  const [user, setUser] = useState({
    name: 'Иван Смирнов', email: 'ivan@example.com',
    phone: '+7 (916) 555-00-11', city: 'Москва',
  });
  const [draft, setDraft] = useState(user);

  const handleSave   = () => { setUser(draft); setEditing(false); };
  const handleChange = e  => setDraft(p => ({ ...p, [e.target.name]: e.target.value }));

  return (
    <Box>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>Личный кабинет</Typography>
      </motion.div>

      <Grid container spacing={4}>
        {/* Профиль */}
        <Grid item xs={12} md={5}>
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          >
            <Card elevation={2}>
              <CardContent sx={{ textAlign: 'center', pb: 0 }}>
                {/* Аватар с hover-вращением */}
                <motion.div whileHover={{ rotate: 8, scale: 1.08 }} transition={{ type: 'spring', stiffness: 250 }}>
                  <Avatar
                    sx={{ bgcolor: 'secondary.main', width: 88, height: 88, fontSize: 32, mx: 'auto', mb: 2 }}
                  >
                    ИС
                  </Avatar>
                </motion.div>
                <Typography variant="h6" fontWeight="bold">{user.name}</Typography>
                <Typography color="text.secondary" gutterBottom>{user.email}</Typography>
                <Chip label="Постоянный клиент" color="primary" size="small" sx={{ mb: 2 }} />
              </CardContent>

              <Divider />

              <CardContent>
                {/* Анимированное переключение режимов просмотр/редактирование */}
                <AnimatePresence mode="wait">
                  {editing ? (
                    <motion.div
                      key="edit"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                    >
                      <Stack spacing={2}>
                        {['name', 'email', 'phone', 'city'].map(field => (
                          <TextField
                            key={field}
                            name={field}
                            label={{ name: 'Имя', email: 'Email', phone: 'Телефон', city: 'Город' }[field]}
                            value={draft[field]}
                            onChange={handleChange}
                            size="small"
                            fullWidth
                          />
                        ))}
                        <Stack direction="row" spacing={1}>
                          <MotionButton
                            variant="contained" fullWidth onClick={handleSave}
                            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.95 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                          >
                            Сохранить
                          </MotionButton>
                          <MotionButton
                            variant="outlined" fullWidth
                            onClick={() => { setDraft(user); setEditing(false); }}
                            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.95 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                          >
                            Отмена
                          </MotionButton>
                        </Stack>
                      </Stack>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="view"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                    >
                      {[['Телефон', user.phone], ['Город', user.city]].map(([label, value]) => (
                        <Box key={label} sx={{ mb: 1 }}>
                          <Typography variant="caption" color="text.secondary">{label}</Typography>
                          <Typography>{value}</Typography>
                        </Box>
                      ))}
                      <MotionButton
                        startIcon={<EditIcon />}
                        variant="outlined" fullWidth sx={{ mt: 1 }}
                        onClick={() => setEditing(true)}
                        whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.95 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                      >
                        Редактировать
                      </MotionButton>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>

              <Divider />

              {/* Статистика */}
              <CardContent>
                <Grid container spacing={1} textAlign="center">
                  {[
                    { icon: <ShoppingBagIcon color="primary" />,  label: 'Заказов',   value: 14 },
                    { icon: <FavoriteIcon color="error" />,        label: 'Избранное', value: 7  },
                    { icon: <LocalShippingIcon color="success" />, label: 'В пути',    value: 1  },
                  ].map(({ icon, label, value }) => (
                    <Grid item xs={4} key={label}>
                      <motion.div whileHover={{ scale: 1.15 }} transition={{ type: 'spring', stiffness: 300 }}>
                        {icon}
                        <Typography fontWeight="bold">{value}</Typography>
                        <Typography variant="caption" color="text.secondary">{label}</Typography>
                      </motion.div>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* История заказов — stagger появление строк */}
        <Grid item xs={12} md={7}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>История заказов</Typography>
          <Card elevation={1}>
            <motion.div variants={orderContainer} initial="hidden" animate="visible">
              <List disablePadding>
                {orders.map((order, i) => (
                  <motion.div key={order.id} variants={orderItem}>
                    <ListItem
                      secondaryAction={
                        <Typography fontWeight="bold" color="primary">
                          {order.amount.toLocaleString('ru-RU')} ₽
                        </Typography>
                      }
                    >
                      <ListItemIcon>
                        <CheckCircleIcon color={order.color} />
                      </ListItemIcon>
                      <ListItemText primary={order.id} secondary={order.date} />
                      <Chip
                        label={order.status}
                        color={order.color}
                        size="small"
                        variant="outlined"
                        sx={{ mr: 2 }}
                      />
                    </ListItem>
                    {i < orders.length - 1 && <Divider />}
                  </motion.div>
                ))}
              </List>
            </motion.div>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}