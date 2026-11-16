import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Expand, MessageCircle, X } from 'lucide-react';
import {
  GALLERY_PHOTOS,
  buildWhatsAppUrl,
  type GalleryPhoto,
} from '../data/acaiteriaData';
import { ResilientImage } from './ResilientImage';
import { FadeInSection } from './FadeInSection';

type FilterCategory = 'Todas' | GalleryPhoto['category'];

const FILTER_OPTIONS: FilterCategory[] = [
  'Todas',
  'Tigelas & Copos',
  'Ingredientes',
  'Ambiente',
];

export function GallerySection() {
  const [filter, setFilter] = useState<FilterCategory>('Todas');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const visiblePhotos =
    filter === 'Todas'
      ? GALLERY_PHOTOS
      : GALLERY_PHOTOS.filter((photo) => photo.category === filter);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxIndex(null);
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev + 1) % visiblePhotos.length
        );
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev === null
            ? null
            : (prev - 1 + visiblePhotos.length) % visiblePhotos.length
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, visiblePhotos.length]);

  const activePhoto =
    lightboxIndex !== null ? visiblePhotos[lightboxIndex] : null;

  return (
    <section
      id="galeria"
      className="py-16 sm:py-24 bg-[#1A0B24] border-b border-[#4C2469]"
    >
      <FadeInSection className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold tracking-wide text-[#84cc16]">
              Galeria de Fotos
            </p>
            <h2
              className="mt-2 font-display text-2xl sm:text-4xl font-bold tracking-tight text-[#a3e635]"
              style={{ textWrap: 'balance' }}
            >
              Sabor, frescor e um espaço pensado para acolher.
            </h2>
          </div>

          <div
            role="group"
            aria-label="Filtrar galeria por categoria"
            className="flex flex-wrap items-center gap-1 rounded-xl border border-[#4C2469] bg-[#231032] p-1 self-start"
          >
            {FILTER_OPTIONS.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => {
                  setFilter(category);
                  setLightboxIndex(null);
                }}
                className={`min-h-[38px] rounded-lg px-3.5 py-1.5 text-xs sm:text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-150 ${
                  filter === category
                    ? 'bg-[#84cc16] text-[#1A0B24] font-semibold'
                    : 'text-[#bef264] hover:text-[#84cc16]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Editorial gallery grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visiblePhotos.map((photo, index) => {
            const isFeaturedWide =
              filter === 'Todas' && photo.aspect === 'landscape';
            return (
              <button
                key={photo.id}
                type="button"
                onClick={() => setLightboxIndex(index)}
                className={`group relative overflow-hidden rounded-2xl border border-[#4C2469] bg-[#231032] text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#84cc16] ${
                  isFeaturedWide ? 'sm:col-span-2' : ''
                }`}
              >
                <div
                  className={`overflow-hidden bg-[#1A0B24] ${
                    isFeaturedWide ? 'aspect-[16/9]' : 'aspect-[4/3]'
                  }`}
                >
                  <ResilientImage
                    src={photo.src}
                    alt={photo.alt}
                    fallbackTitle={photo.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </div>

                <div className="flex items-start justify-between gap-4 p-5">
                  <div>
                    <p className="text-xs font-medium text-[#84cc16]">
                      {photo.category}
                    </p>
                    <h3 className="mt-1 font-display text-base sm:text-lg font-semibold text-[#a3e635]">
                      {photo.title}
                    </h3>
                    <p className="mt-1 text-sm text-[#d9f99d] line-clamp-2">
                      {photo.caption}
                    </p>
                  </div>
                  <span
                    aria-hidden="true"
                    className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#4C2469] text-[#bef264] transition-colors group-hover:border-[#84cc16] group-hover:text-[#84cc16]"
                  >
                    <Expand className="h-4 w-4" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </FadeInSection>

      {/* Lightbox modal */}
      {activePhoto && lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activePhoto.title}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0D0514]/90 p-4 backdrop-blur-xs"
          onClick={() => setLightboxIndex(null)}
        >
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-[#4C2469] bg-[#231032] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative bg-[#1A0B24]">
              <ResilientImage
                src={activePhoto.src}
                alt={activePhoto.alt}
                fallbackTitle={activePhoto.title}
                className="max-h-[68vh] w-full object-cover"
              />

              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                aria-label="Fechar visualização"
                className="absolute top-3 right-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#1A0B24]/85 text-[#a3e635] transition-colors hover:bg-[#1A0B24]"
              >
                <X className="h-5 w-5" />
              </button>

              {visiblePhotos.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setLightboxIndex(
                        (lightboxIndex - 1 + visiblePhotos.length) %
                          visiblePhotos.length
                      )
                    }
                    aria-label="Foto anterior"
                    className="absolute top-1/2 left-3 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-[#1A0B24]/85 text-[#a3e635] transition-colors hover:bg-[#1A0B24]"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setLightboxIndex((lightboxIndex + 1) % visiblePhotos.length)
                    }
                    aria-label="Próxima foto"
                    className="absolute top-1/2 right-3 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-[#1A0B24]/85 text-[#a3e635] transition-colors hover:bg-[#1A0B24]"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>

            <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-medium text-[#84cc16]">
                  {activePhoto.category} ·{' '}
                  <span className="tabular-nums">
                    {lightboxIndex + 1}/{visiblePhotos.length}
                  </span>
                </p>
                <h3 className="mt-1 font-display text-lg font-semibold text-[#a3e635]">
                  {activePhoto.title}
                </h3>
                <p className="mt-1 text-sm text-[#d9f99d]">{activePhoto.caption}</p>
              </div>

              <a
                href={buildWhatsAppUrl(
                  `Olá! Vi a foto "${activePhoto.title}" na galeria da Açaíteria e quero fazer um pedido.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#84cc16] px-5 py-2.5 text-sm font-semibold text-[#1A0B24] whitespace-nowrap shrink-0 transition-colors hover:bg-[#a3e635]"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Pedir pelo WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
