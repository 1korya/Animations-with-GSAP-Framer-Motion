import {
  Typography, Box, Grid, Card, CardContent,
  CardActions, Button, Chip, TextField,
  InputAdornment, Rating
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const PRODUCTS = [
  { id: 1, name: 'Ноутбук Pro X',        category: 'Электроника',    price: 89990, rating: 4.5, inStock: true  },
  { id: 2, name: 'Беспроводные наушники', category: 'Электроника',    price: 7990,  rating: 4.8, inStock: true  },
  { id: 3, name: 'Офисное кресло',        category: 'Мебель',         price: 15990, rating: 4.2, inStock: false },
  { id: 4, name: 'Настольная лампа',      category: 'Мебель',         price: 2490,  rating: 4.0, inStock: true  },
  { id: 5, name: 'Смартфон Ultra',        category: 'Электроника',    price: 59990, rating: 4.7, inStock: true  },
  { id: 6, name: 'Кофемашина Deluxe',     category: 'Бытовая техника',price: 24990, rating: 4.6, inStock: true  },
];

// Анимация появления/исчезновения отдельной карточки
const cardVariant = {
  hidden:  { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.35, ease: 'easeOut' } },
  exit:    { opacity: 0, y: -20, scale: 0.9, transition: { duration: 0.25 } },
};

const MotionButton = motion(Button);

export default function Products() {
  const [search, setSearch] = useState('');
  const [added, setAdded] = useState({});

  const filtered = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = (id) => {
    setAdded(prev => ({ ...prev, [id]: true }));
    setTimeout(() => setAdded(prev => ({ ...prev, [id]: false })), 1500);
  };

  return (
    <Box>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>Каталог товаров</Typography>
        <TextField
          fullWidth
          placeholder="Поиск по товарам..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          sx={{ mb: 4 }}
          InputProps={{
            startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
          }}
        />
        <Typography color="text.secondary" sx={{ mb: 2 }}>
          Найдено товаров: {filtered.length}
        </Typography>
      </motion.div>

      {/* AnimatePresence позволяет анимировать исчезновение (exit) */}
      <Grid container spacing={3}>
        <AnimatePresence mode="popLayout">
          {filtered.map((product, i) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <motion.div
                variants={cardVariant}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
                transition={{ delay: i * 0.07 }}  // stagger через delay
                whileHover={{ y: -6 }}
                style={{ height: '100%' }}
              >
                <Card elevation={2} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Chip label={product.category} size="small" />
                      <Chip
                        label={product.inStock ? 'В наличии' : 'Нет в наличии'}
                        color={product.inStock ? 'success' : 'error'}
                        size="small"
                        variant="outlined"
                      />
                    </Box>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>{product.name}</Typography>
                    <Rating value={product.rating} precision={0.5} readOnly size="small" />
                    <Typography variant="h5" color="primary" fontWeight="bold" sx={{ mt: 1 }}>
                      {product.price.toLocaleString('ru-RU')} ₽
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ px: 2, pb: 2 }}>
                    {/* Анимация hover + tap на кнопке */}
                    <MotionButton
                      variant="contained"
                      fullWidth
                      disabled={!product.inStock}
                      startIcon={<ShoppingCartIcon />}
                      color={added[product.id] ? 'success' : 'primary'}
                      onClick={() => handleAdd(product.id)}
                      whileHover={product.inStock ? { scale: 1.04 } : {}}
                      whileTap={product.inStock ? { scale: 0.94 } : {}}
                      transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                    >
                      {added[product.id] ? 'Добавлено ✓' : 'В корзину'}
                    </MotionButton>
                  </CardActions>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </AnimatePresence>
      </Grid>
    </Box>
  );
}