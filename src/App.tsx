import { Route, Switch } from 'wouter';
import { BookingPage } from './pages/BookingPage';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/booking" component={BookingPage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
}
