import { Star } from 'lucide-react';
import { TESTIMONIALS } from '../data/acaiteriaData';
import { FadeInSection } from './FadeInSection';

export function TestimonialsSection() {
  return (
    <section
      id="depoimentos"
      className="py-16 sm:py-24 bg-[#210E2E] border-b border-[#4C2469]"
    >
      <FadeInSection className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-wide text-[#84cc16]">
              Depoimentos de Clientes
            </p>
            <h2
              className="mt-2 font-display text-2xl sm:text-4xl font-bold tracking-tight text-[#a3e635]"
              style={{ textWrap: 'balance' }}
            >
              Reconhecida em Araguatins pela textura, frescor e atendimento.
            </h2>
          </div>

          <div className="flex items-center gap-3 text-sm text-[#bef264]">
            <div className="flex items-center gap-0.5 text-[#84cc16]" aria-hidden="true">
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
            </div>
            <span className="font-semibold text-[#84cc16] tabular-nums">4,9/5</span>
            <span className="text-[#bef264]">· Avaliação de clientes locais</span>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
          {TESTIMONIALS.map((item) => (
            <figure
              key={item.id}
              className="flex flex-col justify-between rounded-2xl border border-[#4C2469] bg-[#2B143D] p-6 sm:p-8"
            >
              <div>
                <p className="text-xs font-medium text-[#84cc16]">
                  Pedido frequente: {item.favorite}
                </p>
                <blockquote className="mt-4 text-sm sm:text-base leading-relaxed text-[#d9f99d]">
                  “{item.quote}”
                </blockquote>
              </div>

              <figcaption className="mt-6 border-t border-[#4C2469] pt-4">
                <p className="font-display text-sm font-semibold text-[#a3e635]">
                  {item.name}
                </p>
                <p className="mt-0.5 text-xs text-[#bef264]">{item.context}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </FadeInSection>
    </section>
  );
}
