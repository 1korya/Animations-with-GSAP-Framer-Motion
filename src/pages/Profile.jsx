import {
  Typography, Box, Grid, Card, CardContent,
  Avatar, Button, TextField, Chip, Divider,
  List, ListItem, ListItemText, ListItemIcon, Stack
} from '@mui/material';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';

const orders = [
  { id: '#00142', date: '01.04.2026', status: 'Доставлен',    amount: 7990,  color: 'success' },
  { id: '#00138', date: '25.03.2026', status: 'В пути',       amount: 15990, color: 'info'    },
  { id: '#00130', date: '10.03.2026', status: 'Доставлен',    amount: 2490,  color: 'success' },
  { id: '#00121', date: '28.02.2026', status: 'Отменён',      amount: 59990, color: 'error'   },
];

export default function Profile() {
  const [editing, setEditing] = useState(false);
  const [user, setUser] = useState({
    name: 'Иван Смирнов',
    email: 'ivan@example.com',
    phone: '+7 (916) 555-00-11',
    city: 'Москва',
  });
  const [draft, setDraft] = useState(user);

  const handleSave = () => { setUser(draft); setEditing(false); };
  const handleChange = e => setDraft(p => ({ ...p, [e.target.name]: e.target.value }));

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Личный кабинет
      </Typography>

      <Grid container spacing={4}>
        {/* Левая колонка — профиль */}
        <Grid item xs={12} md={5}>
          <Card elevation={2}>
            <CardContent sx={{ textAlign: 'center', pb: 0 }}>
              <Avatar
                sx={{ bgcolor: 'secondary.main', width: 88, height: 88, fontSize: 32, mx: 'auto', mb: 2 }}
              >
                ИС
              </Avatar>
              <Typography variant="h6" fontWeight="bold">{user.name}</Typography>
              <Typography color="text.secondary" gutterBottom>{user.email}</Typography>
              <Chip label="Постоянный клиент" color="primary" size="small" sx={{ mb: 2 }} />
            </CardContent>

            <Divider />

            <CardContent>
              {editing ? (
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
                    <Button variant="contained" fullWidth onClick={handleSave}>Сохранить</Button>
                    <Button variant="outlined" fullWidth onClick={() => { setDraft(user); setEditing(false); }}>
                      Отмена
                    </Button>
                  </Stack>
                </Stack>
              ) : (
                <>
                  {[
                    ['Телефон', user.phone],
                    ['Город',  user.city],
                  ].map(([label, value]) => (
                    <Box key={label} sx={{ mb: 1 }}>
                      <Typography variant="caption" color="text.secondary">{label}</Typography>
                      <Typography>{value}</Typography>
                    </Box>
                  ))}
                  <Button
                    startIcon={<EditIcon />}
                    variant="outlined"
                    fullWidth
                    sx={{ mt: 1 }}
                    onClick={() => setEditing(true)}
                  >
                    Редактировать
                  </Button>
                </>
              )}
            </CardContent>

            {/* Статистика */}
            <Divider />
            <CardContent>
              <Grid container spacing={1} textAlign="center">
                {[
                  { icon: <ShoppingBagIcon color="primary" />, label: 'Заказов',     value: 14 },
                  { icon: <FavoriteIcon color="error" />,      label: 'Избранное',   value: 7  },
                  { icon: <LocalShippingIcon color="success" />, label: 'В пути',    value: 1  },
                ].map(({ icon, label, value }) => (
                  <Grid item xs={4} key={label}>
                    {icon}
                    <Typography fontWeight="bold">{value}</Typography>
                    <Typography variant="caption" color="text.secondary">{label}</Typography>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Правая колонка — история заказов */}
        <Grid item xs={12} md={7}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            История заказов
          </Typography>
          <Card elevation={1}>
            <List disablePadding>
              {orders.map((order, i) => (
                <Box key={order.id}>
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
                    <ListItemText
                      primary={order.id}
                      secondary={order.date}
                    />
                    <Chip
                      label={order.status}
                      color={order.color}
                      size="small"
                      variant="outlined"
                      sx={{ mr: 2 }}
                    />
                  </ListItem>
                  {i < orders.length - 1 && <Divider />}
                </Box>
              ))}
            </List>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}