import { useState } from 'react';
import { ChevronDown, MessageCircle } from 'lucide-react';
import { FAQ_ITEMS, buildWhatsAppUrl } from '../data/acaiteriaData';
import { FadeInSection } from './FadeInSection';

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="duvidas"
      className="py-16 sm:py-24 bg-[#1A0B24] border-b border-[#4C2469]"
    >
      <FadeInSection className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold tracking-wide text-[#84cc16]">
              Perguntas Frequentes
            </p>
            <h2
              className="mt-2 font-display text-2xl sm:text-4xl font-bold tracking-tight text-[#a3e635]"
              style={{ textWrap: 'balance' }}
            >
              Tudo o que você precisa saber antes de pedir.
            </h2>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#d9f99d]">
              Se tiver alguma dúvida específica sobre ingredientes, restrições
              alimentares ou entrega no seu bairro em Araguatins, fale direto
              com nossa equipe.
            </p>

            <a
              href={buildWhatsAppUrl(
                'Olá! Tenho uma dúvida sobre os produtos da Açaíteria.'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-[#4C2469] bg-[#231032] px-5 py-2.5 text-sm font-semibold text-[#bef264] whitespace-nowrap shrink-0 transition-colors hover:border-[#84cc16] hover:text-[#84cc16] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#84cc16]"
            >
              <MessageCircle className="h-4 w-4 text-[#84cc16]" />
              <span>Tirar dúvida no WhatsApp</span>
            </a>
          </div>

          <div className="lg:col-span-7">
            <div className="divide-y divide-[#4C2469] rounded-2xl border border-[#4C2469] bg-[#231032]">
              {FAQ_ITEMS.map((item) => {
                const isOpen = openId === item.id;
                return (
                  <div key={item.id} className="px-6">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => toggleItem(item.id)}
                      className="flex min-h-[60px] w-full items-center justify-between gap-4 py-5 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#84cc16]"
                    >
                      <span className="font-display text-base font-semibold text-[#a3e635]">
                        {item.question}
                      </span>
                      <ChevronDown
                        className={`h-5 w-5 shrink-0 text-[#84cc16] transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="pb-5 pr-8 text-sm leading-relaxed text-[#d9f99d]">
                        {item.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </FadeInSection>
    </section>
  );
}
