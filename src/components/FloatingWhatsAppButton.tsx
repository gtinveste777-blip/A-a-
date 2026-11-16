import { MessageCircle } from 'lucide-react';
import { buildWhatsAppUrl } from '../data/acaiteriaData';

export function FloatingWhatsAppButton() {
  return (
    <a
      href={buildWhatsAppUrl(
        'Olá, Açaíteria! Gostaria de fazer um pedido pelo WhatsApp.'
      )}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fazer pedido pelo WhatsApp"
      className="fixed right-4 bottom-4 z-40 inline-flex h-12 items-center gap-2 rounded-full bg-[#84cc16] px-4 text-sm font-semibold text-[#1A0B24] shadow-lg ring-1 ring-[#1A0B24]/20 transition-transform duration-150 hover:scale-[1.03] hover:bg-[#a3e635] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ecfccb] sm:right-6 sm:bottom-6"
    >
      <MessageCircle className="h-5 w-5 shrink-0" strokeWidth={2} />
      <span className="whitespace-nowrap">WhatsApp</span>
    </a>
  );
}
