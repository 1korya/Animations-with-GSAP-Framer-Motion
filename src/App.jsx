import {
  createRouter,
  createRoute,
  createRootRoute,
  RouterProvider,
  Link,
  Outlet,
  useRouterState,
} from '@tanstack/react-router';
import {
  AppBar, Toolbar, Typography, Button, Box, Container
} from '@mui/material';

import Home     from './pages/Home';
import About    from './pages/About';
import Products from './pages/Products';
import Contacts from './pages/Contacts';
import Profile  from './pages/Profile';

// ─── Навигационная панель (общий layout) ───────────────────────────────────
const navLinks = [
  { label: 'Главная',    to: '/' },
  { label: 'О компании', to: '/about' },
  { label: 'Товары',     to: '/products' },
  { label: 'Контакты',   to: '/contacts' },
  { label: 'Кабинет',    to: '/profile' },
];

function NavBar() {
  const { location } = useRouterState();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ mr: 3, fontWeight: 'bold' }}>
          МойМагазин
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {navLinks.map(({ label, to }) => (
            <Button
              key={to}
              component={Link}
              to={to}
              color="inherit"
              variant={location.pathname === to ? 'outlined' : 'text'}
              sx={{ borderColor: 'rgba(255,255,255,0.7)' }}
            >
              {label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

// ─── Корневой маршрут (layout) ─────────────────────────────────────────────
const rootRoute = createRootRoute({
  component: () => (
    <>
      <NavBar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Outlet />
      </Container>
    </>
  ),
});

// ─── Дочерние маршруты ─────────────────────────────────────────────────────
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: About,
});

const productsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/products',
  component: Products,
});

const contactsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contacts',
  component: Contacts,
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/profile',
  component: Profile,
});

// ─── Сборка роутера ────────────────────────────────────────────────────────
const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  productsRoute,
  contactsRoute,
  profileRoute,
]);

const router = createRouter({ routeTree });

export default function App() {
  return <RouterProvider router={router} />;
}