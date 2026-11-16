import { ArrowRight, MessageCircle } from 'lucide-react';
import {
  BUSINESS_INFO,
  HERO_BACKDROP_IMAGE,
  buildWhatsAppUrl,
} from '../data/acaiteriaData';
import { ResilientImage } from './ResilientImage';
import { FadeInSection } from './FadeInSection';

interface HeroSectionProps {
  onOpenBuilder: () => void;
}

const HIGHLIGHTS = [
  { value: '100%', label: 'Polpa amazônica selecionada' },
  { value: '300 ml a 1 L', label: 'Tamanhos sob medida' },
  { value: '12 opções', label: 'Frutas, crocantes e cremes' },
  { value: '14h às 22h30', label: 'Atendimento todos os dias' },
];

export function HeroSection({ onOpenBuilder }: HeroSectionProps) {
  const heroWhatsAppUrl = buildWhatsAppUrl(
    'Olá! Vi o site da Açaíteria e gostaria de fazer um pedido.'
  );

  return (
    <section id="inicio" className="bg-[#1A0B24]">
      {/* Full-bleed background cover */}
      <div className="relative overflow-hidden border-b border-[#4C2469]">
        <div className="absolute inset-0">
          <ResilientImage
            src={HERO_BACKDROP_IMAGE}
            alt="Tigela artesanal de açaí cremoso com morangos frescos, mirtilos, banana, granola e folhas de hortelã"
            fallbackTitle="Açaíteria"
            priority
            className="h-full w-full object-cover object-[70%_center] sm:object-center"
          />
          {/* Measured deep-purple scrims for strong contrast on green typography */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-[#1A0B24]/95 via-[#1A0B24]/80 to-[#1A0B24]/30"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#1A0B24] via-transparent to-[#1A0B24]/45"
          />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
          <FadeInSection immediate className="max-w-2xl">
            <p className="text-xs sm:text-sm font-semibold text-[#84cc16]">
              <span>Araguatins, TO</span>
              <span aria-hidden="true" className="mx-2 text-[#d946ef]">
                ·
              </span>
              <span>R. Floriano Peixoto, 332</span>
            </p>

            <h1
              className="mt-4 font-display font-bold tracking-tight text-[#a3e635] leading-[1.06] drop-shadow-sm"
              style={{
                fontSize: 'clamp(2.35rem, 4.4vw, 3.85rem)',
                textWrap: 'balance',
              }}
            >
              Açaí cremoso de verdade, preparado na hora para você.
            </h1>

            <p className="mt-5 max-w-xl text-base sm:text-lg leading-relaxed text-[#d9f99d]">
              Na {BUSINESS_INFO.name}, cada tigela combina polpa pura de textura
              aveludada, frutas frescas cortadas no dia e acompanhamentos
              selecionados. Peça pelo WhatsApp para receber em casa ou retirar
              sem espera.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={heroWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] items-center gap-2.5 rounded-xl bg-[#84cc16] px-6 py-3 text-sm sm:text-base font-semibold text-[#1A0B24] whitespace-nowrap shrink-0 shadow-lg transition-colors duration-150 hover:bg-[#a3e635] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ecfccb]"
              >
                <MessageCircle className="h-5 w-5 shrink-0" strokeWidth={2} />
                <span>Pedir pelo WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={onOpenBuilder}
                className="inline-flex min-h-[48px] items-center gap-2 rounded-xl border border-[#84cc16]/50 bg-[#1A0B24]/80 px-5 py-3 text-sm sm:text-base font-medium text-[#bef264] whitespace-nowrap shrink-0 backdrop-blur-xs transition-colors duration-150 hover:border-[#84cc16] hover:bg-[#231032] hover:text-[#a3e635] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d946ef]"
              >
                <span>Montar meu pedido</span>
                <ArrowRight className="h-4 w-4 text-[#84cc16]" />
              </button>
            </div>
          </FadeInSection>
        </div>
      </div>

      {/* Full-width 4-column institutional proof strip */}
      <FadeInSection delay={0.1} className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-6 border-b border-[#4C2469] py-7 sm:grid-cols-4 sm:gap-8">
          {HIGHLIGHTS.map((item) => (
            <div key={item.label} className="space-y-1">
              <p className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#84cc16] tabular-nums">
                {item.value}
              </p>
              <p className="text-xs sm:text-sm text-[#d9f99d]">{item.label}</p>
            </div>
          ))}
        </div>
      </FadeInSection>
    </section>
  );
}
