import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { getCartCount } from '../lib/cart';

export function CartLink() {
  const [count, setCount] = useState(() => getCartCount());

  useEffect(() => {
    function refreshCount() {
      setCount(getCartCount());
    }

    window.addEventListener('cart-updated', refreshCount);
    window.addEventListener('storage', refreshCount);

    return () => {
      window.removeEventListener('cart-updated', refreshCount);
      window.removeEventListener('storage', refreshCount);
    };
  }, []);

  return (
    <Link className="button button--light cart-link" href="/cart">
      Корзина
      {count > 0 && <span>{count}</span>}
    </Link>
  );
}
