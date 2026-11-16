import { useState } from 'react';
import { Check, MessageSquarePlus, Plus, ShoppingBag } from 'lucide-react';
import {
  BASE_OPTIONS,
  SIGNATURE_ITEMS,
  SIZE_OPTIONS,
  TOPPING_OPTIONS,
  formatBRL,
  type CartItem,
  type SignatureItem,
} from '../data/acaiteriaData';
import { ResilientImage } from './ResilientImage';
import { FadeInSection } from './FadeInSection';

export type MenuTab = 'destaques' | 'montar';

interface MenuOrderSectionProps {
  activeTab: MenuTab;
  onTabChange: (tab: MenuTab) => void;
  cartItems: CartItem[];
  onAddToCart: (item: Omit<CartItem, 'quantity'>) => void;
  onOpenCart: (focusCartItemId?: string) => void;
}

export function MenuOrderSection({
  activeTab,
  onTabChange,
  cartItems,
  onAddToCart,
  onOpenCart,
}: MenuOrderSectionProps) {
  const [selectedSizeId, setSelectedSizeId] = useState(SIZE_OPTIONS[1].id);
  const [selectedBaseId, setSelectedBaseId] = useState(BASE_OPTIONS[0].id);
  const [selectedToppings, setSelectedToppings] = useState<string[]>([
    'Morango fresco',
    'Banana prata',
    'Granola artesanal',
  ]);
  const [notes, setNotes] = useState('');
  const [signatureNotes, setSignatureNotes] = useState<Record<string, string>>({});
  const [openSigNoteId, setOpenSigNoteId] = useState<string | null>(null);
  const [justAddedKey, setJustAddedKey] = useState<string | null>(null);
  const [lastAddedCartItemId, setLastAddedCartItemId] = useState<string | null>(
    null
  );

  const currentSize =
    SIZE_OPTIONS.find((s) => s.id === selectedSizeId) || SIZE_OPTIONS[1];
  const currentBase =
    BASE_OPTIONS.find((b) => b.id === selectedBaseId) || BASE_OPTIONS[0];

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalCartSubtotal = cartItems.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );

  const flashAdded = (buttonKey: string, cartItemId: string) => {
    setJustAddedKey(buttonKey);
    setLastAddedCartItemId(cartItemId);
    setTimeout(() => {
      setJustAddedKey((prev) => (prev === buttonKey ? null : prev));
    }, 1800);
  };

  const toggleTopping = (name: string) => {
    setSelectedToppings((prev) => {
      if (prev.includes(name)) {
        return prev.filter((item) => item !== name);
      }
      if (prev.length >= currentSize.maxIncludedToppings) {
        return prev;
      }
      return [...prev, name];
    });
  };

  const handleSizeChange = (sizeId: string) => {
    setSelectedSizeId(sizeId);
    const nextSize = SIZE_OPTIONS.find((s) => s.id === sizeId);
    if (nextSize && selectedToppings.length > nextSize.maxIncludedToppings) {
      setSelectedToppings((prev) => prev.slice(0, nextSize.maxIncludedToppings));
    }
  };

  const handleAddSignature = (item: SignatureItem) => {
    const trimmedNote = (signatureNotes[item.id] || '').trim();
    const cartItemId = trimmedNote
      ? `sig:${item.id}:${trimmedNote.toLowerCase()}`
      : `sig:${item.id}`;

    onAddToCart({
      cartItemId,
      name: item.name,
      size: item.size,
      notes: trimmedNote || undefined,
      unitPrice: item.price,
      image: item.image,
    });

    if (trimmedNote) {
      setSignatureNotes((prev) => ({ ...prev, [item.id]: '' }));
      setOpenSigNoteId(null);
    }
    flashAdded(item.id, cartItemId);
  };

  const handleAddCustom = () => {
    const sortedToppings = [...selectedToppings].sort();
    const trimmedNotes = notes.trim();
    const customKey = `custom:${currentSize.id}:${currentBase.id}:${sortedToppings.join(
      '|'
    )}:${trimmedNotes}`;

    onAddToCart({
      cartItemId: customKey,
      name: 'Açaí Montado',
      size: `${currentSize.label} (${currentSize.volume})`,
      base: currentBase.label,
      toppings: sortedToppings,
      notes: trimmedNotes || undefined,
      unitPrice: currentSize.price,
    });
    setNotes('');
    flashAdded('custom', customKey);
  };

  const toppingGroups: Array<'Frutas' | 'Crocantes' | 'Cremes'> = [
    'Frutas',
    'Crocantes',
    'Cremes',
  ];

  return (
    <section
      id="cardapio"
      className="py-16 sm:py-24 bg-[#210E2E] border-b border-[#4C2469]"
    >
      <FadeInSection className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-wide text-[#84cc16]">
              Cardápio & Carrinho de Compras
            </p>
            <h2
              className="mt-2 font-display text-2xl sm:text-4xl font-bold tracking-tight text-[#a3e635]"
              style={{ textWrap: 'balance' }}
            >
              Escolha uma receita da casa ou monte vários pedidos de uma vez.
            </h2>
          </div>

          {/* Interactive segmented tab switcher */}
          <div
            role="tablist"
            aria-label="Opções do cardápio"
            className="inline-flex self-start rounded-xl border border-[#4C2469] bg-[#1A0B24] p-1"
          >
            <button
              role="tab"
              type="button"
              aria-selected={activeTab === 'destaques'}
              onClick={() => onTabChange('destaques')}
              className={`min-h-[40px] rounded-lg px-4 py-2 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-150 ${
                activeTab === 'destaques'
                  ? 'bg-[#84cc16] text-[#1A0B24] font-semibold'
                  : 'text-[#bef264] hover:text-[#84cc16]'
              }`}
            >
              Destaques da Casa
            </button>
            <button
              role="tab"
              type="button"
              aria-selected={activeTab === 'montar'}
              onClick={() => onTabChange('montar')}
              className={`min-h-[40px] rounded-lg px-4 py-2 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-150 ${
                activeTab === 'montar'
                  ? 'bg-[#84cc16] text-[#1A0B24] font-semibold'
                  : 'text-[#bef264] hover:text-[#84cc16]'
              }`}
            >
              Monte seu Açaí
            </button>
          </div>
        </div>

        {/* Active cart banner inside menu when user has items */}
        {totalCartCount > 0 && (
          <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-[#84cc16]/40 bg-[#1A0B24] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3 text-sm text-[#d9f99d]">
              <ShoppingBag className="h-5 w-5 shrink-0 text-[#84cc16]" />
              <span>
                <strong className="font-semibold text-[#a3e635] tabular-nums">
                  {totalCartCount} {totalCartCount === 1 ? 'item' : 'itens'}
                </strong>{' '}
                no seu carrinho · Subtotal{' '}
                <strong className="font-semibold text-[#84cc16] tabular-nums">
                  {formatBRL(totalCartSubtotal)}
                </strong>
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {lastAddedCartItemId && (
                <button
                  type="button"
                  onClick={() => onOpenCart(lastAddedCartItemId)}
                  className="inline-flex min-h-[40px] items-center justify-center gap-2 rounded-lg border border-[#4C2469] bg-[#231032] px-3.5 py-2 text-xs sm:text-sm font-medium text-[#bef264] whitespace-nowrap shrink-0 transition-colors hover:border-[#84cc16] hover:text-[#84cc16]"
                >
                  <MessageSquarePlus className="h-4 w-4 shrink-0 text-[#84cc16]" />
                  <span>Adicionar observação</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => onOpenCart()}
                className="inline-flex min-h-[40px] items-center justify-center gap-2 rounded-lg bg-[#84cc16] px-4 py-2 text-xs sm:text-sm font-semibold text-[#1A0B24] whitespace-nowrap shrink-0 transition-colors hover:bg-[#a3e635]"
              >
                <span>Ver carrinho e finalizar</span>
              </button>
            </div>
          </div>
        )}

        {/* Tab 1: Signature Bowls & Cups */}
        {activeTab === 'destaques' && (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {SIGNATURE_ITEMS.map((item) => {
              const inCartQty = cartItems
                .filter(
                  (c) =>
                    c.cartItemId === `sig:${item.id}` ||
                    c.cartItemId.startsWith(`sig:${item.id}:`)
                )
                .reduce((sum, c) => sum + c.quantity, 0);
              const isAdded = justAddedKey === item.id;
              const isNoteOpen = openSigNoteId === item.id;

              return (
                <article
                  key={item.id}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-[#4C2469] bg-[#2B143D] transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-[#1A0B24]">
                    <ResilientImage
                      src={item.image}
                      alt={item.imageAlt}
                      fallbackTitle={item.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-xs font-medium text-[#bef264]">
                      <span>{item.category}</span>
                      <span aria-hidden="true" className="mx-1.5 text-[#d946ef]">
                        ·
                      </span>
                      <span className="tabular-nums">{item.size}</span>
                      {inCartQty > 0 && (
                        <>
                          <span aria-hidden="true" className="mx-1.5 text-[#d946ef]">
                            ·
                          </span>
                          <span className="font-semibold text-[#84cc16] tabular-nums">
                            {inCartQty} no carrinho
                          </span>
                        </>
                      )}
                    </p>

                    <h3 className="mt-2 font-display text-xl font-semibold text-[#a3e635]">
                      {item.name}
                    </h3>

                    <p className="mt-2 flex-1 text-sm leading-relaxed text-[#d9f99d]">
                      {item.description}
                    </p>

                    {/* Optional per-item observation toggle before adding */}
                    <div className="mt-4">
                      {!isNoteOpen ? (
                        <button
                          type="button"
                          onClick={() => setOpenSigNoteId(item.id)}
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#bef264]/90 transition-colors hover:text-[#84cc16]"
                        >
                          <MessageSquarePlus className="h-3.5 w-3.5 text-[#84cc16]" />
                          <span>Adicionar observação</span>
                        </button>
                      ) : (
                        <input
                          type="text"
                          value={signatureNotes[item.id] || ''}
                          onChange={(e) =>
                            setSignatureNotes((prev) => ({
                              ...prev,
                              [item.id]: e.target.value,
                            }))
                          }
                          placeholder="Ex: sem granola, mandar colher..."
                          aria-label={`Observação para ${item.name}`}
                          className="w-full min-h-[38px] rounded-lg border border-[#4C2469] bg-[#1A0B24] px-3 text-xs text-[#d9f99d] placeholder:text-[#bef264]/45 focus:border-[#84cc16] focus:outline-none"
                        />
                      )}
                    </div>

                    <div className="mt-4 flex items-center justify-between gap-4 border-t border-[#4C2469] pt-4">
                      <div>
                        <span className="block text-[11px] text-[#bef264]">
                          A partir de
                        </span>
                        <span className="font-display text-xl font-bold text-[#84cc16] tabular-nums">
                          {formatBRL(item.price)}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleAddSignature(item)}
                        className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg bg-[#84cc16] px-4 py-2 text-sm font-semibold text-[#1A0B24] whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-[#a3e635] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ecfccb]"
                      >
                        {isAdded ? (
                          <>
                            <Check className="h-4 w-4 shrink-0" />
                            <span>Adicionado</span>
                          </>
                        ) : (
                          <>
                            <Plus className="h-4 w-4 shrink-0" />
                            <span>Adicionar</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Tab 2: Interactive Multi-Item Cart Builder */}
        {activeTab === 'montar' && (
          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Left steps */}
            <div className="space-y-8 lg:col-span-8">
              {/* Step 1: Size */}
              <div>
                <h3 className="font-display text-lg font-semibold text-[#a3e635]">
                  01. Escolha o tamanho
                </h3>
                <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-5">
                  {SIZE_OPTIONS.map((size) => {
                    const isSelected = size.id === selectedSizeId;
                    return (
                      <button
                        key={size.id}
                        type="button"
                        onClick={() => handleSizeChange(size.id)}
                        className={`flex flex-col items-start rounded-xl border p-3.5 text-left transition-colors duration-150 ${
                          isSelected
                            ? 'border-[#84cc16] bg-[#84cc16]/15 text-[#ecfccb]'
                            : 'border-[#4C2469] bg-[#2B143D] text-[#bef264] hover:border-[#84cc16]/60'
                        }`}
                      >
                        <span className="text-xs text-[#bef264]">{size.label}</span>
                        <span className="mt-0.5 font-display text-base font-bold text-[#a3e635] tabular-nums">
                          {size.volume}
                        </span>
                        <span className="mt-2 text-sm font-bold text-[#84cc16] tabular-nums">
                          {formatBRL(size.price)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Base */}
              <div>
                <h3 className="font-display text-lg font-semibold text-[#a3e635]">
                  02. Selecione a base
                </h3>
                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {BASE_OPTIONS.map((base) => {
                    const isSelected = base.id === selectedBaseId;
                    return (
                      <button
                        key={base.id}
                        type="button"
                        onClick={() => setSelectedBaseId(base.id)}
                        className={`flex flex-col items-start rounded-xl border p-4 text-left transition-colors duration-150 ${
                          isSelected
                            ? 'border-[#84cc16] bg-[#84cc16]/15'
                            : 'border-[#4C2469] bg-[#2B143D] hover:border-[#84cc16]/60'
                        }`}
                      >
                        <span className="font-display text-sm font-semibold text-[#a3e635]">
                          {base.label}
                        </span>
                        <span className="mt-1 text-xs leading-relaxed text-[#d9f99d]">
                          {base.note}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Toppings */}
              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-lg font-semibold text-[#a3e635]">
                    03. Acompanhamentos incluídos
                  </h3>
                  <span className="text-xs font-medium text-[#84cc16] tabular-nums">
                    {selectedToppings.length} de {currentSize.maxIncludedToppings}{' '}
                    selecionados
                  </span>
                </div>

                <div className="mt-4 space-y-5">
                  {toppingGroups.map((group) => {
                    const items = TOPPING_OPTIONS.filter((t) => t.group === group);
                    return (
                      <div key={group}>
                        <p className="text-xs font-medium text-[#bef264] mb-2">
                          {group}
                        </p>
                        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                          {items.map((topping) => {
                            const active = selectedToppings.includes(topping.name);
                            const atLimit =
                              !active &&
                              selectedToppings.length >=
                                currentSize.maxIncludedToppings;
                            return (
                              <button
                                key={topping.id}
                                type="button"
                                disabled={atLimit}
                                onClick={() => toggleTopping(topping.name)}
                                className={`flex min-h-[42px] items-center justify-between gap-2 rounded-lg border px-3 py-2 text-left text-xs sm:text-sm font-medium transition-colors duration-150 ${
                                  active
                                    ? 'border-[#84cc16] bg-[#84cc16]/20 text-[#ecfccb]'
                                    : atLimit
                                    ? 'cursor-not-allowed border-[#4C2469]/60 bg-[#1A0B24] text-[#bef264]/40'
                                    : 'border-[#4C2469] bg-[#2B143D] text-[#bef264] hover:border-[#84cc16]/60'
                                }`}
                              >
                                <span className="truncate">{topping.name}</span>
                                {active && (
                                  <Check className="h-3.5 w-3.5 shrink-0 text-[#84cc16]" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 4: Item note */}
              <div>
                <h3 className="font-display text-lg font-semibold text-[#a3e635]">
                  04. Observação para este copo ou tigela (opcional)
                </h3>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ex: Nome de quem vai comer, sem granola, leite condensado à parte..."
                  aria-label="Observação deste item"
                  className="mt-3 w-full min-h-[44px] rounded-xl border border-[#4C2469] bg-[#1A0B24] px-4 text-sm text-[#d9f99d] placeholder:text-[#bef264]/50 focus:border-[#84cc16] focus:outline-none"
                />
              </div>
            </div>

            {/* Right summary panel */}
            <aside className="lg:col-span-4">
              <div className="sticky top-24 rounded-2xl border border-[#4C2469] bg-[#2B143D] p-6">
                <div className="flex items-center gap-2 text-[#a3e635]">
                  <ShoppingBag className="h-5 w-5 text-[#84cc16]" strokeWidth={1.75} />
                  <h3 className="font-display text-lg font-semibold">
                    Resumo deste item
                  </h3>
                </div>

                <dl className="mt-5 space-y-3 border-t border-[#4C2469] pt-5 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="text-[#bef264]">Tamanho</dt>
                    <dd className="font-medium text-[#a3e635] tabular-nums">
                      {currentSize.label} ({currentSize.volume})
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-[#bef264]">Base</dt>
                    <dd className="text-right font-medium text-[#a3e635]">
                      {currentBase.label}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[#bef264]">Acompanhamentos</dt>
                    <dd className="mt-1 text-[#d9f99d]">
                      {selectedToppings.length > 0
                        ? selectedToppings.join(', ')
                        : 'Nenhum selecionado'}
                    </dd>
                  </div>
                </dl>

                <div className="mt-6 flex items-baseline justify-between border-t border-[#4C2469] pt-4">
                  <span className="text-sm text-[#bef264]">Valor deste item</span>
                  <span className="font-display text-2xl font-bold text-[#84cc16] tabular-nums">
                    {formatBRL(currentSize.price)}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleAddCustom}
                  className="mt-6 flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-[#84cc16] px-5 py-3 text-sm font-semibold text-[#1A0B24] transition-colors duration-150 hover:bg-[#a3e635] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ecfccb]"
                >
                  {justAddedKey === 'custom' ? (
                    <>
                      <Check className="h-5 w-5 shrink-0" />
                      <span>Adicionado ao carrinho</span>
                    </>
                  ) : (
                    <>
                      <Plus className="h-5 w-5 shrink-0" />
                      <span>Adicionar ao carrinho</span>
                    </>
                  )}
                </button>

                {totalCartCount > 0 && (
                  <button
                    type="button"
                    onClick={() => onOpenCart()}
                    className="mt-3 flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl border border-[#84cc16]/50 bg-[#1A0B24] px-4 py-2.5 text-sm font-medium text-[#a3e635] transition-colors hover:border-[#84cc16]"
                  >
                    <span>
                      Ver carrinho ({totalCartCount}) ·{' '}
                      <span className="tabular-nums">
                        {formatBRL(totalCartSubtotal)}
                      </span>
                    </span>
                  </button>
                )}

                <p className="mt-3 text-center text-xs text-[#bef264]">
                  Você pode montar vários copos e editar observações direto no
                  carrinho.
                </p>
              </div>
            </aside>
          </div>
        )}
      </FadeInSection>
    </section>
  );
}
