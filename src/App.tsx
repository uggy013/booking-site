import { Route, Switch } from 'wouter';
import { BookingPage } from './pages/BookingPage';
import { CarsPage } from './pages/CarsPage';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/booking" component={BookingPage} />
      <Route path="/cars" component={CarsPage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
}
