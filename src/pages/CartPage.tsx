import { useMemo, useState } from 'react';
import { Link } from 'wouter';
import {
  CartItem,
  clearCart,
  getCartItems,
  removeCartItem,
  updateCartItemQuantity,
} from '../lib/cart';

function formatPrice(price: number) {
  return `${price.toLocaleString('ru-RU')} KZT`;
}

function getTotal(items: CartItem[]) {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}

export function CartPage() {
  const [items, setItems] = useState<CartItem[]>(() => getCartItems());
  const total = useMemo(() => getTotal(items), [items]);

  function refreshCart() {
    setItems(getCartItems());
  }

  function handleQuantityChange(itemId: string, quantity: number) {
    updateCartItemQuantity(itemId, quantity);
    refreshCart();
  }

  function handleRemove(itemId: string) {
    removeCartItem(itemId);
    refreshCart();
  }

  function handleClear() {
    clearCart();
    refreshCart();
  }

  return (
    <main className="page">
      <header className="topbar">
        <Link href="/">easybook</Link>
        <Link className="topbar__link" href="/">
          На главную
        </Link>
      </header>

      <section className="cart-layout">
        <div className="cart-list">
          <div className="cart-title">
            <p className="eyebrow">Корзина</p>
            <h1>Выбранное для поездки</h1>
          </div>

          {items.length === 0 ? (
            <div className="cart-empty">
              <p>Корзина пока пустая.</p>
              <div className="cart-actions">
                <Link className="button" href="/">
                  Выбрать отели
                </Link>
                <Link className="button button--light" href="/cars">
                  Выбрать авто
                </Link>
              </div>
            </div>
          ) : (
            items.map((item) => (
              <article className="cart-item" key={item.id}>
                <img src={item.image} alt={item.title} />
                <div>
                  <span>{item.type === 'hotel' ? 'Отель' : 'Авто'}</span>
                  <h2>{item.title}</h2>
                  <p>{item.subtitle}</p>
                  <strong>{item.priceLabel}</strong>
                </div>
                <div className="cart-item__controls">
                  <button type="button" onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>
                    -
                  </button>
                  <b>{item.quantity}</b>
                  <button type="button" onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>
                    +
                  </button>
                  <button type="button" className="button--light" onClick={() => handleRemove(item.id)}>
                    Удалить
                  </button>
                </div>
              </article>
            ))
          )}
        </div>

        <aside className="cart-summary">
          <h2>Итог</h2>
          <span>{items.length} поз.</span>
          <strong>{formatPrice(total)}</strong>
          <Link className="button" href="/booking">
            Продолжить бронирование
          </Link>
          <button type="button" className="button--light" onClick={handleClear} disabled={items.length === 0}>
            Очистить корзину
          </button>
        </aside>
      </section>
    </main>
  );
}
