import { useState } from 'react';
import { Menu, ShoppingBag, X } from 'lucide-react';
import { BUSINESS_INFO } from '../data/acaiteriaData';

const NAV_LINKS = [
  { href: '#cardapio', label: 'Cardápio' },
  { href: '#galeria', label: 'Galeria' },
  { href: '#depoimentos', label: 'Depoimentos' },
  { href: '#duvidas', label: 'Dúvidas' },
  { href: '#localizacao', label: 'Contato' },
];

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
}

export function Navbar({ cartCount, onOpenCart }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[#4C2469] bg-[#1A0B24]/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single-element brand wordmark */}
        <a
          href="#inicio"
          className="font-display text-lg font-bold tracking-tight text-[#a3e635] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#84cc16]"
        >
          {BUSINESS_INFO.name}
        </a>

        {/* Zone 2: 5 concise single-line nav links */}
        <nav
          aria-label="Navegação principal"
          className="hidden md:flex items-center gap-6 text-sm font-medium text-[#bef264]"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-[#84cc16] hover:underline hover:decoration-[#d946ef] hover:underline-offset-8 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#84cc16]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action (Shopping Cart Drawer trigger) */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onOpenCart}
            aria-label={`Abrir carrinho com ${cartCount} ${
              cartCount === 1 ? 'item' : 'itens'
            }`}
            className="inline-flex min-h-[40px] items-center gap-2 rounded-lg bg-[#84cc16] px-4 py-2 text-xs sm:text-sm font-semibold text-[#1A0B24] whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-[#a3e635] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ecfccb]"
          >
            <ShoppingBag className="h-4 w-4 shrink-0" strokeWidth={2} />
            <span>
              Carrinho{' '}
              <span className="tabular-nums">({cartCount})</span>
            </span>
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-[#4C2469] bg-[#231032] text-[#bef264] md:hidden transition-colors hover:bg-[#2B143D] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#84cc16]"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileOpen && (
        <nav
          aria-label="Menu móvel"
          className="border-t border-[#4C2469] bg-[#231032] px-4 py-4 md:hidden"
        >
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex min-h-[44px] items-center rounded-lg px-3 text-sm font-medium text-[#bef264] transition-colors hover:bg-[#2B143D] hover:text-[#84cc16]"
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
