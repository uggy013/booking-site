import { Route, Switch } from 'wouter';
import { BookingPage } from './pages/BookingPage';
import { CartPage } from './pages/CartPage';
import { CarPage } from './pages/CarPage';
import { CarsPage } from './pages/CarsPage';
import { HotelPage } from './pages/HotelPage';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/booking" component={BookingPage} />
      <Route path="/cart" component={CartPage} />
      <Route path="/cars/:id" component={CarPage} />
      <Route path="/cars" component={CarsPage} />
      <Route path="/hotel/:id" component={HotelPage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
}
