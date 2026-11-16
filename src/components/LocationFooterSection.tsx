import { useState } from 'react';
import { Check, Copy, ExternalLink, MapPin, MessageCircle } from 'lucide-react';
import { BUSINESS_INFO, buildWhatsAppUrl } from '../data/acaiteriaData';
import { FadeInSection } from './FadeInSection';

export function LocationFooterSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(BUSINESS_INFO.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <>
      <section id="localizacao" className="py-16 sm:py-24 bg-[#210E2E]">
        <FadeInSection className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 rounded-2xl border border-[#4C2469] bg-[#2B143D] p-6 sm:p-10 lg:grid-cols-12 lg:items-center lg:gap-12">
            <div className="lg:col-span-7">
              <p className="text-xs font-semibold tracking-wide text-[#84cc16]">
                Onde Estamos & Pedidos
              </p>
              <h2
                className="mt-2 font-display text-2xl sm:text-4xl font-bold tracking-tight text-[#a3e635]"
                style={{ textWrap: 'balance' }}
              >
                Visite a Açaíteria ou peça agora pelo WhatsApp.
              </h2>

              <dl className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <dt className="text-xs font-medium text-[#bef264]">Endereço</dt>
                  <dd className="mt-1 text-sm sm:text-base font-medium text-[#d9f99d]">
                    {BUSINESS_INFO.address}
                  </dd>
                </div>

                <div>
                  <dt className="text-xs font-medium text-[#bef264]">
                    Telefone / WhatsApp
                  </dt>
                  <dd className="mt-1 text-sm sm:text-base font-semibold text-[#84cc16] tabular-nums">
                    {BUSINESS_INFO.phoneDisplay}
                  </dd>
                </div>

                <div className="sm:col-span-2">
                  <dt className="text-xs font-medium text-[#bef264]">
                    Horário de funcionamento
                  </dt>
                  <dd className="mt-1 text-sm sm:text-base font-medium text-[#d9f99d]">
                    {BUSINESS_INFO.hours}
                  </dd>
                </div>
              </dl>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleCopyAddress}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-[#4C2469] bg-[#1A0B24] px-4 py-2.5 text-sm font-medium text-[#bef264] whitespace-nowrap shrink-0 transition-colors hover:border-[#84cc16] hover:text-[#84cc16]"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 text-[#84cc16]" />
                      <span>Endereço copiado</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 text-[#84cc16]" />
                      <span>Copiar endereço</span>
                    </>
                  )}
                </button>

                <a
                  href={BUSINESS_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-[#4C2469] bg-[#1A0B24] px-4 py-2.5 text-sm font-medium text-[#bef264] whitespace-nowrap shrink-0 transition-colors hover:border-[#84cc16] hover:text-[#84cc16]"
                >
                  <MapPin className="h-4 w-4 text-[#84cc16]" />
                  <span>Abrir no mapa</span>
                  <ExternalLink className="h-3.5 w-3.5 text-[#bef264]/70" />
                </a>
              </div>
            </div>

            {/* Conversion card */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-[#4C2469] bg-[#1A0B24] p-6 sm:p-8">
                <p className="text-xs font-semibold text-[#84cc16]">
                  Atendimento imediato
                </p>
                <h3 className="mt-2 font-display text-xl sm:text-2xl font-bold text-[#a3e635]">
                  Pronto para o seu açaí hoje?
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#d9f99d]">
                  Fale diretamente com nossa equipe no WhatsApp{' '}
                  <span className="font-semibold text-[#84cc16] tabular-nums">
                    {BUSINESS_INFO.phoneDisplay}
                  </span>{' '}
                  para delivery em Araguatins ou retirada rápida na loja.
                </p>

                <a
                  href={buildWhatsAppUrl(
                    'Olá, Açaíteria! Quero fazer meu pedido agora.'
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 flex min-h-[48px] w-full items-center justify-center gap-2.5 rounded-xl bg-[#84cc16] px-6 py-3 text-sm sm:text-base font-semibold text-[#1A0B24] transition-colors hover:bg-[#a3e635] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ecfccb]"
                >
                  <MessageCircle className="h-5 w-5 shrink-0" />
                  <span>Chamar no WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </FadeInSection>
      </section>

      <footer className="border-t border-[#4C2469] bg-[#16081F] py-10">
        <FadeInSection className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div>
            <p className="font-display text-base font-bold text-[#a3e635]">
              {BUSINESS_INFO.name}
            </p>
            <p className="mt-1 text-xs text-[#bef264]">
              {BUSINESS_INFO.address} · {BUSINESS_INFO.phoneDisplay}
            </p>
          </div>

          <nav
            aria-label="Links do rodapé"
            className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-[#bef264]"
          >
            <a href="#cardapio" className="hover:text-[#84cc16]">
              Cardápio
            </a>
            <a href="#galeria" className="hover:text-[#84cc16]">
              Galeria
            </a>
            <a href="#depoimentos" className="hover:text-[#84cc16]">
              Depoimentos
            </a>
            <a href="#duvidas" className="hover:text-[#84cc16]">
              Dúvidas
            </a>
            <a href="#localizacao" className="hover:text-[#84cc16]">
              Contato
            </a>
          </nav>

          <p className="text-xs text-[#bef264]/80">
            © 2026 {BUSINESS_INFO.name}. Todos os direitos reservados.
          </p>
        </FadeInSection>
      </footer>
    </>
  );
}
