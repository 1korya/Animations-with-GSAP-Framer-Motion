import {
  Typography, Box, Grid, Card, CardContent,
  CardActions, Button, Chip, TextField, InputAdornment, Rating
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

const PRODUCTS = [
  { id: 1, name: 'Ноутбук Pro X',        category: 'Электроника',     price: 89990,  rating: 4.5, inStock: true  },
  { id: 2, name: 'Беспроводные наушники', category: 'Электроника',     price: 7990,   rating: 4.8, inStock: true  },
  { id: 3, name: 'Офисное кресло',        category: 'Мебель',          price: 15990,  rating: 4.2, inStock: false },
  { id: 4, name: 'Настольная лампа',      category: 'Мебель',          price: 2490,   rating: 4.0, inStock: true  },
  { id: 5, name: 'Смартфон Ultra',        category: 'Электроника',     price: 59990,  rating: 4.7, inStock: true  },
  { id: 6, name: 'Кофемашина Deluxe',     category: 'Бытовая техника', price: 24990,  rating: 4.6, inStock: true  },
];

export default function Products() {
  const [search, setSearch] = useState('');
  const cardRefs = useRef([]);  // массив рефов на карточки

  const filtered = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean); // убираем null
    if (!cards.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { autoAlpha: 0, x: -50 },
        {
          autoAlpha: 1,
          x: 0,
          stagger: 0.15,
          duration: 0.6,
          ease: 'power2.out',
        }
      );
    });

    return () => ctx.revert();
  }, [filtered.length]); 


  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Каталог товаров
      </Typography>

      <TextField
        fullWidth
        placeholder="Поиск по товарам..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        sx={{ mb: 4 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <Typography color="text.secondary" sx={{ mb: 2 }}>
        Найдено товаров: {filtered.length}
      </Typography>

      <Grid container spacing={3}>
        {filtered.map((product, i) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card
              ref={el => cardRefs.current[i] = el}  // колбэк-реф в массив
              elevation={2}
              sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
              <Card
  ref={el => cardRefs.current[i] = el}
  elevation={2}
  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
>
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
    <Typography variant="h6" fontWeight="bold" gutterBottom>
      {product.name}
    </Typography>
    <Rating value={product.rating} precision={0.5} readOnly size="small" />
    <Typography variant="h5" color="primary" fontWeight="bold" sx={{ mt: 1 }}>
      {product.price.toLocaleString('ru-RU')} ₽
    </Typography>
  </CardContent>
  <CardActions sx={{ px: 2, pb: 2 }}>
    <Button
      variant="contained"
      fullWidth
      disabled={!product.inStock}
      startIcon={<ShoppingCartIcon />}
    >
      В корзину
    </Button>
  </CardActions>
</Card>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}