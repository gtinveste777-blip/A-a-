import { useEffect, useRef, useState } from 'react';
import {
  MessageCircle,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from 'lucide-react';
import {
  BUSINESS_INFO,
  buildWhatsAppUrl,
  formatBRL,
  type CartItem,
} from '../data/acaiteriaData';
import { ResilientImage } from './ResilientImage';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  focusNoteForId?: string | null;
  onUpdateQuantity: (cartItemId: string, delta: number) => void;
  onUpdateItemNotes: (cartItemId: string, notes: string) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
}

const PAYMENT_OPTIONS = ['Pix', 'Cartão na entrega', 'Dinheiro'] as const;

export function CartDrawer({
  isOpen,
  onClose,
  items,
  focusNoteForId,
  onUpdateQuantity,
  onUpdateItemNotes,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [deliveryMode, setDeliveryMode] = useState<'entrega' | 'retirada'>('entrega');
  const [addressInfo, setAddressInfo] = useState('');
  const [paymentMethod, setPaymentMethod] =
    useState<(typeof PAYMENT_OPTIONS)[number]>('Pix');
  const [generalNotes, setGeneralNotes] = useState('');

  const noteInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen || !focusNoteForId) return;
    const inputEl = noteInputRefs.current[focusNoteForId];
    if (inputEl) {
      setTimeout(() => {
        inputEl.focus();
        inputEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }, 60);
    }
  }, [isOpen, focusNoteForId]);

  if (!isOpen) return null;

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );

  const whatsappOrderText = [
    `Olá, ${BUSINESS_INFO.name}! Gostaria de fazer um pedido com ${totalCount} ${
      totalCount === 1 ? 'item' : 'itens'
    }:`,
    '',
    ...items.flatMap((item, index) => {
      const lines = [
        `${index + 1}. ${item.quantity}x ${item.name} (${item.size}) — ${formatBRL(
          item.unitPrice * item.quantity
        )}`,
      ];
      if (item.base) lines.push(`   • Base: ${item.base}`);
      if (item.toppings && item.toppings.length > 0) {
        lines.push(`   • Acompanhamentos: ${item.toppings.join(', ')}`);
      }
      if (item.notes && item.notes.trim()) {
        lines.push(`   • Observação: ${item.notes.trim()}`);
      }
      return lines;
    }),
    '',
    `Subtotal estimado: ${formatBRL(subtotal)}`,
    `Recebimento: ${
      deliveryMode === 'entrega'
        ? `Entrega em Araguatins${
            addressInfo.trim() ? ` (${addressInfo.trim()})` : ''
          }`
        : `Retirada na loja (${BUSINESS_INFO.address})`
    }`,
    `Pagamento: ${paymentMethod}`,
    generalNotes.trim() ? `Observações gerais: ${generalNotes.trim()}` : '',
  ]
    .filter((line) => line !== undefined)
    .join('\n');

  const handleGoToMenu = () => {
    onClose();
    const el = document.getElementById('cardapio');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Carrinho de compras"
      className="fixed inset-0 z-50 flex justify-end bg-[#0D0514]/80 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="flex h-full w-full max-w-md flex-col border-l border-[#4C2469] bg-[#1A0B24] text-[#bef264] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-4 border-b border-[#4C2469] bg-[#210E2E] px-5 py-4">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="h-5 w-5 text-[#84cc16]" strokeWidth={2} />
            <h2 className="font-display text-lg font-bold text-[#a3e635]">
              Seu Carrinho{' '}
              <span className="text-sm font-medium text-[#84cc16] tabular-nums">
                ({totalCount})
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {items.length > 0 && (
              <button
                type="button"
                onClick={onClearCart}
                className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-[#bef264]/80 transition-colors hover:bg-[#2B143D] hover:text-[#84cc16]"
              >
                Limpar
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar carrinho"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#4C2469] bg-[#231032] text-[#bef264] transition-colors hover:border-[#84cc16] hover:text-[#84cc16]"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#4C2469] bg-[#231032]">
              <ShoppingBag className="h-6 w-6 text-[#84cc16]" />
            </div>
            <h3 className="mt-4 font-display text-lg font-semibold text-[#a3e635]">
              Seu carrinho está vazio
            </h3>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-[#d9f99d]">
              Adicione tigelas, copos ou monte quantos açaís personalizados
              quiser para enviar tudo em um único pedido.
            </p>
            <button
              type="button"
              onClick={handleGoToMenu}
              className="mt-6 inline-flex min-h-[44px] items-center justify-center rounded-xl bg-[#84cc16] px-5 py-2.5 text-sm font-semibold text-[#1A0B24] transition-colors hover:bg-[#a3e635]"
            >
              Ver cardápio
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-5 overflow-y-auto px-5 py-5">
              {/* Items list */}
              <ul className="space-y-3">
                {items.map((item) => (
                  <li
                    key={item.cartItemId}
                    className="rounded-xl border border-[#4C2469] bg-[#231032] p-4"
                  >
                    <div className="flex gap-3">
                      {item.image && (
                        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-[#4C2469] bg-[#1A0B24]">
                          <ResilientImage
                            src={item.image}
                            alt={item.name}
                            fallbackTitle={item.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      )}

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-display text-sm font-semibold text-[#a3e635]">
                              {item.name}
                            </h3>
                            <p className="text-xs text-[#bef264] tabular-nums">
                              {item.size}
                              {item.base ? ` · ${item.base}` : ''}
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() => onRemoveItem(item.cartItemId)}
                            aria-label={`Remover ${item.name}`}
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[#bef264]/70 transition-colors hover:bg-[#2B143D] hover:text-[#84cc16]"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>

                        {item.toppings && item.toppings.length > 0 && (
                          <p className="mt-1.5 text-xs leading-relaxed text-[#d9f99d]">
                            {item.toppings.join(', ')}
                          </p>
                        )}

                        {/* Per-item observation input */}
                        <div className="mt-2.5">
                          <label
                            htmlFor={`obs-${item.cartItemId}`}
                            className="mb-1 block text-[11px] font-medium text-[#bef264]"
                          >
                            Observação deste item
                          </label>
                          <input
                            id={`obs-${item.cartItemId}`}
                            ref={(el) => {
                              noteInputRefs.current[item.cartItemId] = el;
                            }}
                            type="text"
                            value={item.notes || ''}
                            onChange={(e) =>
                              onUpdateItemNotes(item.cartItemId, e.target.value)
                            }
                            placeholder="Ex: sem granola, sem banana, mandar colher..."
                            className="w-full min-h-[36px] rounded-lg border border-[#4C2469] bg-[#1A0B24] px-3 py-1.5 text-xs text-[#d9f99d] placeholder:text-[#bef264]/45 focus:border-[#84cc16] focus:outline-none"
                          />
                        </div>

                        <div className="mt-3 flex items-center justify-between gap-3 border-t border-[#4C2469] pt-3">
                          <div className="inline-flex items-center rounded-lg border border-[#4C2469] bg-[#1A0B24]">
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.cartItemId, -1)}
                              aria-label={`Diminuir quantidade de ${item.name}`}
                              className="flex h-9 w-9 items-center justify-center text-[#bef264] transition-colors hover:text-[#84cc16]"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="min-w-[28px] text-center text-sm font-semibold text-[#a3e635] tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.cartItemId, 1)}
                              aria-label={`Aumentar quantidade de ${item.name}`}
                              className="flex h-9 w-9 items-center justify-center text-[#bef264] transition-colors hover:text-[#84cc16]"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>

                          <span className="font-display text-base font-bold text-[#84cc16] tabular-nums">
                            {formatBRL(item.unitPrice * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Delivery & Payment details */}
              <div className="space-y-4 border-t border-[#4C2469] pt-4">
                <div>
                  <p className="mb-2 text-xs font-medium text-[#bef264]">
                    Como deseja receber?
                  </p>
                  <div className="flex rounded-xl border border-[#4C2469] bg-[#231032] p-1">
                    <button
                      type="button"
                      onClick={() => setDeliveryMode('entrega')}
                      className={`flex-1 min-h-[38px] rounded-lg px-3 py-1.5 text-xs sm:text-sm font-medium transition-colors ${
                        deliveryMode === 'entrega'
                          ? 'bg-[#84cc16] text-[#1A0B24] font-semibold'
                          : 'text-[#bef264] hover:text-[#84cc16]'
                      }`}
                    >
                      Entrega em Araguatins
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeliveryMode('retirada')}
                      className={`flex-1 min-h-[38px] rounded-lg px-3 py-1.5 text-xs sm:text-sm font-medium transition-colors ${
                        deliveryMode === 'retirada'
                          ? 'bg-[#84cc16] text-[#1A0B24] font-semibold'
                          : 'text-[#bef264] hover:text-[#84cc16]'
                      }`}
                    >
                      Retirar na loja
                    </button>
                  </div>

                  {deliveryMode === 'entrega' ? (
                    <input
                      type="text"
                      value={addressInfo}
                      onChange={(e) => setAddressInfo(e.target.value)}
                      placeholder="Rua, número e bairro em Araguatins"
                      aria-label="Endereço para entrega"
                      className="mt-2.5 w-full min-h-[42px] rounded-xl border border-[#4C2469] bg-[#231032] px-3.5 text-sm text-[#d9f99d] placeholder:text-[#bef264]/50 focus:border-[#84cc16] focus:outline-none"
                    />
                  ) : (
                    <p className="mt-2 text-xs text-[#d9f99d]">
                      Retirada em: {BUSINESS_INFO.address}
                    </p>
                  )}
                </div>

                <div>
                  <p className="mb-2 text-xs font-medium text-[#bef264]">
                    Forma de pagamento
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {PAYMENT_OPTIONS.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setPaymentMethod(option)}
                        className={`min-h-[38px] rounded-lg border px-2 py-1.5 text-xs font-medium transition-colors ${
                          paymentMethod === option
                            ? 'border-[#84cc16] bg-[#84cc16]/20 text-[#a3e635]'
                            : 'border-[#4C2469] bg-[#231032] text-[#bef264] hover:border-[#84cc16]/60'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <input
                  type="text"
                  value={generalNotes}
                  onChange={(e) => setGeneralNotes(e.target.value)}
                  placeholder="Observações gerais do pedido (ex: troco, campainha...)"
                  aria-label="Observações gerais do pedido"
                  className="w-full min-h-[42px] rounded-xl border border-[#4C2469] bg-[#231032] px-3.5 text-sm text-[#d9f99d] placeholder:text-[#bef264]/50 focus:border-[#84cc16] focus:outline-none"
                />
              </div>
            </div>

            {/* Footer checkout */}
            <div className="border-t border-[#4C2469] bg-[#210E2E] p-5">
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-[#bef264]">Subtotal estimado</span>
                <span className="font-display text-2xl font-bold text-[#84cc16] tabular-nums">
                  {formatBRL(subtotal)}
                </span>
              </div>

              <a
                href={buildWhatsAppUrl(whatsappOrderText)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex min-h-[48px] w-full items-center justify-center gap-2.5 rounded-xl bg-[#84cc16] px-5 py-3 text-sm sm:text-base font-semibold text-[#1A0B24] transition-colors hover:bg-[#a3e635] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ecfccb]"
              >
                <MessageCircle className="h-5 w-5 shrink-0" />
                <span>Finalizar pedido no WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={onClose}
                className="mt-2.5 flex min-h-[40px] w-full items-center justify-center rounded-xl text-xs font-medium text-[#bef264] transition-colors hover:text-[#84cc16]"
              >
                Continuar adicionando itens
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
