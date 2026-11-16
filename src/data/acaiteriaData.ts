import heroAcaiBowlImg from '../assets/images/hero_acai_bowl_1794762423447.jpg';
import heroAcaiBackdropImg from '../assets/images/hero_acai_backdrop_1794768058724.jpg';
import cupNinhoImg from '../assets/images/gallery_acai_cup_ninho_1794762426211.jpg';
import freshToppingsImg from '../assets/images/gallery_fresh_toppings_1794762424323.jpg';
import cupuacuMixImg from '../assets/images/gallery_cupuacu_mix_1794762425933.jpg';
import acaiCounterImg from '../assets/images/gallery_acai_counter_1794762439053.jpg';

export const BUSINESS_INFO = {
  name: 'Açaíteria',
  address: 'R. Floriano Peixoto, 332 - Araguatins, TO, 77950-000',
  shortAddress: 'R. Floriano Peixoto, 332 · Centro, Araguatins - TO',
  cep: '77950-000',
  phoneDisplay: '(63) 99264-6776',
  whatsappNumber: '5563992646776',
  hours: 'Todos os dias, das 14h às 22h30',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=R.+Floriano+Peixoto,+332+-+Araguatins,+TO,+77950-000',
};

export const HERO_BOWL_IMAGE = heroAcaiBowlImg;
export const HERO_BACKDROP_IMAGE = heroAcaiBackdropImg;

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function formatBRL(value: number): string {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export interface CartItem {
  cartItemId: string;
  name: string;
  size: string;
  base?: string;
  toppings?: string[];
  notes?: string;
  unitPrice: number;
  quantity: number;
  image?: string;
}

export interface SignatureItem {
  id: string;
  name: string;
  category: string;
  description: string;
  size: string;
  price: number;
  image: string;
  imageAlt: string;
}

export const SIGNATURE_ITEMS: SignatureItem[] = [
  {
    id: 'tigela-classica',
    name: 'Tigela Clássica',
    category: 'Tradicional',
    description:
      'Polpa pura batida na hora, banana em rodelas, morangos frescos, mirtilos e granola artesanal crocante.',
    size: '400 ml',
    price: 22,
    image: heroAcaiBowlImg,
    imageAlt: 'Tigela de açaí artesanal com banana, morangos frescos, mirtilos e granola crocante',
  },
  {
    id: 'copo-ninho-morango',
    name: 'Copo Camadas de Ninho',
    category: 'Especial da Casa',
    description:
      'Camadas generosas de açaí cremoso intercaladas com creme de leite em pó artesanal, morangos selecionados e castanhas.',
    size: '500 ml',
    price: 26,
    image: cupNinhoImg,
    imageAlt: 'Copo transparente com camadas de açaí, creme de leite Ninho, morango e granola',
  },
  {
    id: 'casadinho-cupuacu',
    name: 'Casadinho Açaí & Cupuaçu',
    category: 'Amazônico',
    description:
      'Metade açaí puro de textura aveludada, metade creme natural de cupuaçu, finalizado com castanha-do-pará e banana.',
    size: '400 ml',
    price: 24,
    image: cupuacuMixImg,
    imageAlt: 'Tigela com açaí mesclado ao creme de cupuaçu, castanhas picadas e rodelas de banana',
  },
];

export interface SizeOption {
  id: string;
  label: string;
  volume: string;
  price: number;
  maxIncludedToppings: number;
}

export const SIZE_OPTIONS: SizeOption[] = [
  { id: '300ml', label: 'Pequeno', volume: '300 ml', price: 16, maxIncludedToppings: 3 },
  { id: '400ml', label: 'Médio', volume: '400 ml', price: 20, maxIncludedToppings: 4 },
  { id: '500ml', label: 'Grande', volume: '500 ml', price: 24, maxIncludedToppings: 4 },
  { id: '700ml', label: 'Supremo', volume: '700 ml', price: 32, maxIncludedToppings: 5 },
  { id: '1000ml', label: 'Barca / Pote', volume: '1 Litro', price: 44, maxIncludedToppings: 6 },
];

export const BASE_OPTIONS = [
  { id: 'tradicional', label: 'Açaí Tradicional', note: 'Receita cremosa com xarope natural de guaraná' },
  { id: 'zero', label: 'Açaí Zero Açúcar', note: 'Polpa pura sem adição de açúcar' },
  { id: 'casadinho', label: 'Casadinho com Cupuaçu', note: 'Equilíbrio entre o açaí e o azedinho do cupuaçu' },
];

export interface ToppingOption {
  id: string;
  name: string;
  group: 'Frutas' | 'Crocantes' | 'Cremes';
}

export const TOPPING_OPTIONS: ToppingOption[] = [
  { id: 'morango', name: 'Morango fresco', group: 'Frutas' },
  { id: 'banana', name: 'Banana prata', group: 'Frutas' },
  { id: 'kiwi', name: 'Kiwi fatiado', group: 'Frutas' },
  { id: 'uva', name: 'Uva sem semente', group: 'Frutas' },
  { id: 'granola', name: 'Granola artesanal', group: 'Crocantes' },
  { id: 'castanha', name: 'Castanha-do-pará', group: 'Crocantes' },
  { id: 'pacoca', name: 'Paçoca triturada', group: 'Crocantes' },
  { id: 'chia', name: 'Semente de chia', group: 'Crocantes' },
  { id: 'creme-ninho', name: 'Creme de Ninho', group: 'Cremes' },
  { id: 'leite-po', name: 'Leite em pó', group: 'Cremes' },
  { id: 'leite-condensado', name: 'Leite condensado', group: 'Cremes' },
  { id: 'creme-avela', name: 'Creme de avelã', group: 'Cremes' },
];

export interface GalleryPhoto {
  id: string;
  title: string;
  caption: string;
  category: 'Tigelas & Copos' | 'Ingredientes' | 'Ambiente';
  src: string;
  alt: string;
  aspect: 'landscape' | 'standard';
}

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'photo-counter',
    title: 'Nosso Espaço na Floriano Peixoto',
    caption: 'Ambiente climatizado, luz natural e atendimento acolhedor no centro de Araguatins.',
    category: 'Ambiente',
    src: acaiCounterImg,
    alt: 'Interior minimalista da Açaíteria com balcão em madeira clara e plantas tropicais',
    aspect: 'landscape',
  },
  {
    id: 'photo-bowl',
    title: 'Textura Cremosa sem Cristais de Gelo',
    caption: 'Preparo diário com polpa selecionada e frutas fatiadas na hora do pedido.',
    category: 'Tigelas & Copos',
    src: heroAcaiBowlImg,
    alt: 'Tigela de açaí servida com frutas frescas e granola crocante em pedra clara',
    aspect: 'standard',
  },
  {
    id: 'photo-cup',
    title: 'Camadas Equilibradas no Copo',
    caption: 'Combinação clássica com creme de Ninho artesanal e morangos selecionados.',
    category: 'Tigelas & Copos',
    src: cupNinhoImg,
    alt: 'Copo de açaí gourmet com creme branco de leite em pó e morangos frescos',
    aspect: 'standard',
  },
  {
    id: 'photo-toppings',
    title: 'Acompanhamentos Frescos Todos os Dias',
    caption: 'Frutas higienizadas, castanhas torradas, granola crocante e sementes naturais.',
    category: 'Ingredientes',
    src: freshToppingsImg,
    alt: 'Tigelinhas brancas com morangos, bananas, granola, castanhas, chia e hortelã fresca',
    aspect: 'standard',
  },
  {
    id: 'photo-cupuacu',
    title: 'Encontro com o Cupuaçu',
    caption: 'O contraste suave do creme de cupuaçu com a intensidade do açaí amazônico.',
    category: 'Tigelas & Copos',
    src: cupuacuMixImg,
    alt: 'Tigela de açaí mesclada com creme de cupuaçu, castanhas e banana',
    aspect: 'standard',
  },
];

export interface TestimonialItem {
  id: string;
  name: string;
  context: string;
  favorite: string;
  quote: string;
}

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't1',
    name: 'Mariana Alencar',
    context: 'Moradora do Centro · Araguatins',
    favorite: 'Casadinho Açaí & Cupuaçu',
    quote:
      'Antes eu sempre ficava em dúvida se o açaí chegaria derretido ou cheio de gelo. Na Açaíteria a textura vem firme e cremosa até na entrega, e as frutas chegam sempre fresquinhas.',
  },
  {
    id: 't2',
    name: 'Rafael Costa Brito',
    context: 'Educador Físico · Nova Araguatins',
    favorite: 'Açaí Zero Açúcar 500 ml',
    quote:
      'Para quem treina todo dia, encontrar um açaí zero açúcar realmente saboroso faz diferença. Peço pelo WhatsApp saindo da academia e em poucos minutos já retiro no balcão sem fila.',
  },
  {
    id: 't3',
    name: 'Camila Ferreira Mendes',
    context: 'Arquiteta · Araguatins, TO',
    favorite: 'Copo Camadas de Ninho',
    quote:
      'O cuidado com o espaço na Floriano Peixoto chama atenção logo na entrada. É o lugar que escolho para conversar com amigas no fim da tarde ou pedir o pote de 1 litro para o fim de semana em família.',
  },
];

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'Como funciona o pedido e a entrega pelo WhatsApp?',
    answer:
      'Você pode montar seu copo ou tigela aqui no site ou clicar em qualquer botão de pedido. Ao abrir o WhatsApp (63) 99264-6776, nossa equipe confirma o endereço em Araguatins, informa o prazo estimado e envia na embalagem térmica ideal para manter a cremosidade.',
  },
  {
    id: 'faq-2',
    question: 'Quais são as formas de pagamento aceitas?',
    answer:
      'Aceitamos Pix, cartões de débito, crédito e dinheiro tanto para retirada no balcão quanto na entrega em domicílio.',
  },
  {
    id: 'faq-3',
    question: 'Vocês têm opções sem açúcar ou com menor teor calórico?',
    answer:
      'Sim. Trabalhamos diariamente com a base Açaí Zero Açúcar, preparada apenas com polpa selecionada, que combina perfeitamente com frutas frescas, semente de chia, castanhas e granola sem açúcar.',
  },
  {
    id: 'faq-4',
    question: 'Onde fica a loja física e qual é o horário de funcionamento?',
    answer:
      'Estamos na R. Floriano Peixoto, 332, em Araguatins, TO (CEP 77950-000). Funcionamos todos os dias, de segunda a domingo, das 14h às 22h30, com salão climatizado e retirada rápida no balcão.',
  },
  {
    id: 'faq-5',
    question: 'Posso encomendar potes maiores para reuniões ou eventos?',
    answer:
      'Sim! Além dos potes de 1 litro disponíveis no cardápio diário, preparamos encomendas sob medida para confraternizações e eventos em Araguatins. Basta enviar uma mensagem pelo WhatsApp com antecedência.',
  },
];
