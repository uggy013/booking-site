import type { RentalCar } from '../data/cars';
import type { Hotel } from '../data/hotels';
import { getCarPrice } from './carExtras';

export type CartItemType = 'hotel' | 'car';

export type CartItem = {
  id: string;
  type: CartItemType;
  title: string;
  subtitle: string;
  priceLabel: string;
  price: number;
  image: string;
  quantity: number;
};

const cartKey = 'easybookCart';

function readCart(): CartItem[] {
  const saved = window.localStorage.getItem(cartKey);

  if (!saved) {
    return [];
  }

  try {
    return JSON.parse(saved) as CartItem[];
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]) {
  window.localStorage.setItem(cartKey, JSON.stringify(items));
  window.dispatchEvent(new Event('cart-updated'));
}

function getHotelPrice(hotel: Hotel) {
  return Number(hotel.price.replace(/\D/g, '')) || 0;
}

export function getCartItems() {
  return readCart();
}

export function getCartCount() {
  return readCart().reduce((total, item) => total + item.quantity, 0);
}

export function addHotelToCart(hotel: Hotel) {
  addCartItem({
    id: `hotel-${hotel.id}`,
    type: 'hotel',
    title: hotel.name,
    subtitle: hotel.location,
    priceLabel: hotel.price,
    price: getHotelPrice(hotel),
    image: hotel.image,
    quantity: 1,
  });
}

export function addCarToCart(car: RentalCar) {
  addCartItem({
    id: `car-${car.id}`,
    type: 'car',
    title: car.model,
    subtitle: car.city,
    priceLabel: car.price,
    price: getCarPrice(car),
    image: car.image,
    quantity: 1,
  });
}

export function removeCartItem(itemId: string) {
  saveCart(readCart().filter((item) => item.id !== itemId));
}

export function updateCartItemQuantity(itemId: string, quantity: number) {
  const nextQuantity = Math.max(1, quantity);
  saveCart(readCart().map((item) => (item.id === itemId ? { ...item, quantity: nextQuantity } : item)));
}

export function clearCart() {
  saveCart([]);
}

function addCartItem(newItem: CartItem) {
  const current = readCart();
  const exists = current.some((item) => item.id === newItem.id);
  const next = exists
    ? current.map((item) => (item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item))
    : [newItem, ...current];

  saveCart(next);
}
