"use client";

import { motion, AnimatePresence, LayoutGroup } from "motion/react";
import React, { useState, useId, useRef, useEffect } from "react";
import { useOutsideClick } from "@/hooks/use-outside-click";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// 6 Foto Utama Milestones dengan Judul Resmi
const DEFAULT_MAIN_PHOTOS = [
  {
    id: 1,
    src: "/image-gallerysection/1.jpg",
    title: "Eid al-Fitr",
    alt: "Eid al-Fitr",
  },
  {
    id: 2,
    src: "/image-gallerysection/2.jpg",
    title: "Holiday On the Beach",
    alt: "Holiday On the Beach",
  },
  {
    id: 3,
    src: "/image-gallerysection/3.jpg",
    title: "Eksad",
    alt: "Eksad",
  },
  {
    id: 4,
    src: "/image-gallerysection/4.jpg",
    title: "English One",
    alt: "English One",
  },
  {
    id: 5,
    src: "/image-gallerysection/5.jpg",
    title: "Edelweiss on Mt. Gede",
    alt: "Edelweiss on Mt. Gede",
  },
  {
    id: 6,
    src: "/image-gallerysection/6.jpg",
    title: "Your Graduation Day",
    alt: "Your Graduation Day",
  },
];

// 7 Foto Tambahan Baru (Tanpa Judul)
const DEFAULT_EXTRA_PHOTOS = [
  { id: 7, src: "/image-gallerysection/7.jpg", title: "" },
  { id: 8, src: "/image-gallerysection/8.jpg", title: "" },
  { id: 9, src: "/image-gallerysection/9.jpg", title: "" },
  { id: 10, src: "/image-gallerysection/10.jpg", title: "" },
  { id: 11, src: "/image-gallerysection/11.jpg", title: "" },
  { id: 12, src: "/image-gallerysection/12jpg.jpg", title: "" },
  { id: 13, src: "/image-gallerysection/13jpg.jpg", title: "" },
];

// Konfigurasi posisi kipas / tumpukan awal desktop
const STACK_CONFIG_DESKTOP = [
  { rotation: -14, x: -120, y: 12 },
  { rotation: -2, x: 0, y: -22 },
  { rotation: 12, x: 115, y: 10 },
];

// Konfigurasi posisi kipas mobile
const STACK_CONFIG_MOBILE = [
  { rotation: -12, x: -68, y: 8 },
  { rotation: -2, x: 0, y: -16 },
  { rotation: 10, x: 68, y: 6 },
];

// Spring physics halus ala iOS
const cardSpring = {
  type: "spring",
  stiffness: 210,
  damping: 24,
  mass: 0.8,
};

const expandTransition = {
  type: "spring",
  stiffness: 160,
  damping: 18,
  mass: 1,
};

function ArrowLeftIcon(props) {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}

function ArrowRightIcon(props) {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

export function ExpandableGallery({
  photos = DEFAULT_MAIN_PHOTOS,
  extraPhotos = DEFAULT_EXTRA_PHOTOS,
  quote,
  ctaText = "Open Photo Gallery",
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activePhoto, setActivePhoto] = useState(null);

  // Kartu aktif di tumpukan awal: index 1 (Foto 6 di tengah) sebagai prioritas utama paling depan
  const [activeCardIndex, setActiveCardIndex] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  const layoutGroupId = useId();
  const containerRef = useRef(null);

  // Deteksi ukuran layar responsif untuk offset kipas
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useOutsideClick(containerRef, () => {
    if (isExpanded && !activePhoto) {
      setIsExpanded(false);
    }
  });

  // Normalisasi 6 foto utama
  const normalizedMain = (photos && photos.length > 0 ? photos : DEFAULT_MAIN_PHOTOS)
    .slice(0, 6)
    .map((p, idx) => ({
      ...p,
      id: p.id !== undefined ? p.id : `photo-${idx + 1}`,
      src: p.src || p.image,
      title: p.title || "",
      alt: p.alt || p.title || `Memory photo ${idx + 1}`,
    }));

  // Normalisasi 7 foto tambahan (tidak ada judul)
  const normalizedExtraSource =
    extraPhotos && extraPhotos.length > 0
      ? extraPhotos
      : photos && photos.length > 6
        ? photos.slice(6)
        : DEFAULT_EXTRA_PHOTOS;

  const normalizedExtra = normalizedExtraSource.map((p, idx) => ({
    ...p,
    id: p.id !== undefined ? p.id : `extra-${idx + 7}`,
    src: p.src || p.image,
    title: "", // 7 foto baru dipastikan tanpa judul sesuai permintaan
    alt: p.alt || `Memory photo ${idx + 7}`,
  }));

  // Gabungan semua foto untuk navigasi modal (13 foto)
  const allPhotos = [...normalizedMain, ...normalizedExtra];

  // 3 FOTO DITAMPILKAN DI TUMPUKAN AWAL: FOTO 6 (PRIORITAS DEPAN / TENGAH), FOTO 3 (KIRI), FOTO 4 (KANAN)
  const stackPhoto3 =
    normalizedMain.find((p) => String(p.id) === "3" || String(p.id) === "photo-3") ||
    normalizedMain[2] ||
    DEFAULT_MAIN_PHOTOS[2];

  const stackPhoto4 =
    normalizedMain.find((p) => String(p.id) === "4" || String(p.id) === "photo-4") ||
    normalizedMain[3] ||
    DEFAULT_MAIN_PHOTOS[3];

  const stackPhoto6 =
    normalizedMain.find((p) => String(p.id) === "6" || String(p.id) === "photo-6") ||
    normalizedMain[5] ||
    DEFAULT_MAIN_PHOTOS[5];

  const stackConfigs = isMobile ? STACK_CONFIG_MOBILE : STACK_CONFIG_DESKTOP;

  const stackPhotos = [
    {
      ...stackPhoto3,
      stackIndex: 0,
      rotation: stackConfigs[0].rotation,
      x: stackConfigs[0].x,
      y: stackConfigs[0].y,
    },
    {
      ...stackPhoto6,
      stackIndex: 1,
      rotation: stackConfigs[1].rotation,
      x: stackConfigs[1].x,
      y: stackConfigs[1].y,
    },
    {
      ...stackPhoto4,
      stackIndex: 2,
      rotation: stackConfigs[2].rotation,
      x: stackConfigs[2].x,
      y: stackConfigs[2].y,
    },
  ];

  // Z-Index dinamis untuk 3 kartu tumpukan
  const getCardZIndex = (idx) => {
    if (isExpanded) return 10;
    if (activeCardIndex === idx) return 50;
    if (activeCardIndex === 1) return 20;
    if (activeCardIndex === 2) return idx === 1 ? 30 : 10;
    if (activeCardIndex === 0) return idx === 1 ? 30 : 10;
    return 10;
  };

  // Navigasi modal foto (Prev / Next di seluruh 13 foto)
  const handlePrevPhoto = () => {
    if (!activePhoto) return;
    const currentIndex = allPhotos.findIndex((p) => String(p.id) === String(activePhoto.id));
    const prevIndex = (currentIndex - 1 + allPhotos.length) % allPhotos.length;
    setActivePhoto(allPhotos[prevIndex]);
  };

  const handleNextPhoto = () => {
    if (!activePhoto) return;
    const currentIndex = allPhotos.findIndex((p) => String(p.id) === String(activePhoto.id));
    const nextIndex = (currentIndex + 1) % allPhotos.length;
    setActivePhoto(allPhotos[nextIndex]);
  };

  // Keyboard navigation: Escape, ArrowLeft, ArrowRight
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        if (activePhoto) {
          setActivePhoto(null);
        } else if (isExpanded) {
          setIsExpanded(false);
        }
      } else if (e.key === "ArrowLeft") {
        if (activePhoto) {
          handlePrevPhoto();
        } else if (!isExpanded) {
          setActiveCardIndex((prev) => (prev > 0 ? prev - 1 : 0));
        }
      } else if (e.key === "ArrowRight") {
        if (activePhoto) {
          handleNextPhoto();
        } else if (!isExpanded) {
          setActiveCardIndex((prev) => (prev < 2 ? prev + 1 : 2));
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePhoto, isExpanded, allPhotos]);

  const stackContainerRef = useRef(null);
  const cardRefs = useRef({});
  const isPointerDown = useRef(false);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const lastDragEndTime = useRef(0);
  const pointerTargetEl = useRef(null);
  const [isDraggingStack, setIsDraggingStack] = useState(false);

  // Cari kartu (0: Foto 3, 1: Foto 4, 2: Foto 6) berdasarkan posisi horizontal kursor
  const getCardIndexAtX = (clientX) => {
    let closestIndex = null;
    let minDistance = Infinity;

    for (let i = 0; i < 3; i++) {
      const el = cardRefs.current[i];
      if (el) {
        const rect = el.getBoundingClientRect();
        const centerX = (rect.left + rect.right) / 2;
        const dist = Math.abs(clientX - centerX);
        if (dist < minDistance) {
          minDistance = dist;
          closestIndex = i;
        }
      }
    }
    if (closestIndex !== null) return closestIndex;

    if (stackContainerRef.current) {
      const rect = stackContainerRef.current.getBoundingClientRect();
      const relX = (clientX - rect.left) / rect.width;
      if (relX < 0.38) return 0;
      if (relX > 0.62) return 2;
      return 1;
    }
    return 1;
  };

  const handleStackPointerDown = (e) => {
    if (isExpanded) return;
    isPointerDown.current = true;
    isDragging.current = false;
    startX.current = e.clientX;
    startY.current = e.clientY;
    pointerTargetEl.current = e.currentTarget;
  };

  const handleStackPointerMove = (e) => {
    if (!isPointerDown.current || isExpanded) return;

    const diffX = Math.abs(e.clientX - startX.current);
    const diffY = Math.abs(e.clientY - startY.current);

    if (!isDragging.current) {
      if (diffY > diffX && diffY > 8) {
        isPointerDown.current = false;
        return;
      }
      if (diffX > 6 && diffX > diffY) {
        isDragging.current = true;
        setIsDraggingStack(true);
        try {
          if (pointerTargetEl.current) {
            pointerTargetEl.current.setPointerCapture(e.pointerId);
          }
        } catch (err) { }
      }
    }

    if (isDragging.current) {
      const hoveredIndex = getCardIndexAtX(e.clientX);
      if (hoveredIndex !== null && hoveredIndex !== activeCardIndex) {
        setActiveCardIndex(hoveredIndex);
      }
    }
  };

  const handleStackPointerUp = (e) => {
    if (!isPointerDown.current || isExpanded) return;

    try {
      if (pointerTargetEl.current && isDragging.current) {
        pointerTargetEl.current.releasePointerCapture(e.pointerId);
      }
    } catch (err) { }

    const wasDragging = isDragging.current;
    if (wasDragging) {
      lastDragEndTime.current = Date.now();
      const finalIndex = getCardIndexAtX(e.clientX);
      if (finalIndex !== null) {
        setActiveCardIndex(finalIndex);
      }
    }

    isPointerDown.current = false;
    isDragging.current = false;
    setIsDraggingStack(false);
  };

  const handleStackCardClick = (photo, index) => {
    if (Date.now() - lastDragEndTime.current < 150) return;

    if (!isExpanded) {
      if (activeCardIndex !== index) {
        setActiveCardIndex(index);
      } else {
        setIsExpanded(true);
      }
    } else {
      setActivePhoto(photo);
    }
  };

  return (
    <section className="relative w-full px-2 sm:px-4 md:px-8 bg-transparent flex flex-col items-center justify-start min-h-0 pb-16 sm:pb-20 md:pb-24 overflow-hidden">
      <LayoutGroup id={layoutGroupId}>
        <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
          {/* Top Control Bar (Hanya saat galeri mekar) */}
          <AnimatePresence>
            {isExpanded && (
              <div className="w-full h-10 flex items-center justify-between px-2 sm:px-4 mb-3">
                <motion.button
                  key="back-button"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  onClick={() => setIsExpanded(false)}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-all group z-50 cursor-pointer"
                >
                  <div className="p-1.5 rounded-full bg-muted group-hover:bg-accent transition-colors text-foreground">
                    <ArrowLeftIcon />
                  </div>
                  <span className="font-medium text-sm">Back</span>
                </motion.button>
              </div>
            )}
          </AnimatePresence>

          {/* Main Animated Gallery Container */}
          <motion.div
            ref={containerRef}
            layout
            className={cn(
              "relative w-full",
              isExpanded
                ? "flex flex-col gap-6 sm:gap-8 px-2 sm:px-4"
                : "flex flex-col items-center justify-start pt-1 sm:pt-2"
            )}
            transition={expandTransition}
          >
            {/* ========================================================================= */}
            {/* TAMPILAN AWAL (SEBELUM KLIK): 3 FOTO DITAMPILKAN (FOTO 3, 4, DAN 6)      */}
            {/* ========================================================================= */}
            {!isExpanded && (
              <>
                <motion.div
                  ref={stackContainerRef}
                  onPointerDown={handleStackPointerDown}
                  onPointerMove={handleStackPointerMove}
                  onPointerUp={handleStackPointerUp}
                  onPointerCancel={handleStackPointerUp}
                  style={{
                    touchAction: "pan-y",
                    cursor: isDraggingStack ? "grabbing" : "grab",
                  }}
                  className="h-[320px] sm:h-[360px] md:h-[390px] w-full flex items-center justify-center mb-3 sm:mb-5 select-none relative"
                >
                  {stackPhotos.map((photo, index) => {
                    const isActive = activeCardIndex === index;

                    return (
                      <motion.div
                        key={`stack-${photo.id}`}
                        ref={(el) => {
                          cardRefs.current[index] = el;
                        }}
                        layoutId={`card-container-${photo.id}`}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{
                          opacity: 1,
                          scale: isActive ? 1.05 : 0.97,
                          rotate: isActive
                            ? (photo.rotation || 0) * 0.65
                            : photo.rotation || 0,
                          x: photo.x || 0,
                          y: isActive ? (photo.y || 0) - 24 : photo.y || 0,
                        }}
                        style={{
                          zIndex: getCardZIndex(index),
                          transition: "box-shadow 0.35s ease, border-color 0.35s ease",
                        }}
                        transition={cardSpring}
                        onPointerEnter={() => setActiveCardIndex(index)}
                        onMouseEnter={() => setActiveCardIndex(index)}
                        className={cn(
                          "cursor-pointer overflow-hidden bg-muted select-none",
                          "absolute w-56 h-56 sm:w-64 sm:h-64 md:w-76 md:h-76 lg:w-80 lg:h-80 rounded-[2.6rem] sm:rounded-[3rem] md:rounded-[3.5rem] border-[6px] md:border-[8px] border-white",
                          isActive
                            ? "shadow-[0_28px_65px_rgba(0,0,0,0.26)] ring-2 ring-black/5"
                            : "shadow-[0_16px_40px_rgba(0,0,0,0.13)]"
                        )}
                        onClick={() => handleStackCardClick(photo, index)}
                      >
                        <motion.div
                          layoutId={`image-inner-${photo.id}`}
                          layout="position"
                          className="w-full h-full relative"
                          transition={expandTransition}
                        >
                          <Image
                            src={photo.src}
                            alt={photo.alt || photo.title || "Memory Photo"}
                            fill
                            className="object-cover select-none pointer-events-none transition-transform duration-700 hover:scale-105"
                            sizes="320px"
                            priority
                          />
                        </motion.div>
                      </motion.div>
                    );
                  })}
                </motion.div>

                {/* Mobile Pagination Indicator Dots (3 Titik) */}
                <div className="flex items-center justify-center gap-2 mb-4 sm:mb-5 md:hidden">
                  {[0, 1, 2].map((idx) => (
                    <button
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveCardIndex(idx);
                      }}
                      className={cn(
                        "h-2 rounded-full transition-all duration-300 cursor-pointer",
                        activeCardIndex === idx
                          ? "w-6 bg-[#D97706]"
                          : "w-2 bg-neutral-300 hover:bg-neutral-400"
                      )}
                      aria-label={`Select photo ${idx + 1}`}
                    />
                  ))}
                </div>

                {/* Collapsed Stack Headline & Button */}
                <motion.div
                  key="stack-content"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center max-w-xl space-y-4 px-4 pb-2"
                >
                  <h2 className="text-lg sm:text-xl md:text-2xl font-normal tracking-tight text-foreground/90 leading-snug">
                    {quote ? (
                      quote
                    ) : (
                      <>
                        Every moment with you brings pure warmth.{" "}
                        <br className="hidden md:block" />
                        Like a sunflower that never tires of blooming.
                      </>
                    )}
                  </h2>

                  <div className="flex justify-center">
                    <Button
                      variant="default"
                      onClick={() => setIsExpanded(true)}
                      className="rounded-full cursor-pointer py-2.5 px-6 sm:px-7 border border-border/40 text-sm font-medium bg-[#1C1917] text-white hover:bg-[#D97706] transition-colors group shadow-sm flex items-center gap-2"
                    >
                      <span>{ctaText}</span>
                      <ArrowRightIcon className="transition-transform group-hover:translate-x-1 w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              </>
            )}

            {/* ========================================================================= */}
            {/* TAMPILAN MEKAR (EXPANDED): TERPISAH ANTARA 6 FOTO PERTAMA & 7 FOTO BARU   */}
            {/* ========================================================================= */}
            {isExpanded && (
              <div className="w-full flex flex-col items-center">
                {/* ------------------------------------------------------------- */}
                {/* PEMISAH ATAS (DI ATAS 6 FOTO): "Personal Memories"            */}
                {/* ------------------------------------------------------------- */}
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.05 }}
                  className="w-full max-w-5xl flex items-center justify-center mb-6 sm:mb-8 md:mb-10 px-2 sm:px-4"
                >
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#D97706]/35 to-transparent" />
                  <div className="mx-3 sm:mx-6 px-5 sm:px-7 py-2 sm:py-2.5 rounded-full bg-[#FEF3C7]/90 border border-[#F59E0B]/30 text-[#92400E] text-xs sm:text-sm md:text-base font-medium flex items-center gap-2 shadow-xs backdrop-blur-xs">
                    <span className="text-base sm:text-lg">🌻</span>
                    <span className="tracking-wide font-serif italic text-[0.88rem] sm:text-[1rem]">Personal Memories</span>
                  </div>
                  <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#D97706]/35 to-transparent" />
                </motion.div>

                {/* ------------------------------------------------------------- */}
                {/* BAGIAN 1: 6 FOTO PERTAMA (DENGAN JUDUL)                       */}
                {/* ------------------------------------------------------------- */}
                <div className="w-full max-w-5xl">
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 justify-items-center">
                    {normalizedMain.map((photo, index) => (
                      <motion.div
                        key={`grid-main-${photo.id}`}
                        layoutId={`card-container-${photo.id}`}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0, x: 0, y: 0 }}
                        transition={cardSpring}
                        className="relative aspect-square w-full rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.5rem] border-4 md:border-[6px] border-white shadow-md hover:shadow-xl group cursor-pointer overflow-hidden bg-muted select-none"
                        onClick={() => setActivePhoto(photo)}
                      >
                        <motion.div
                          layoutId={`image-inner-${photo.id}`}
                          layout="position"
                          className="w-full h-full relative"
                          transition={expandTransition}
                        >
                          <Image
                            src={photo.src}
                            alt={photo.alt || photo.title || "Memory Photo"}
                            fill
                            className="object-cover select-none pointer-events-none transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 1024px) 50vw, 33vw"
                          />
                        </motion.div>

                        {/* Tag Judul pada Foto 1 - 6 saat Hover */}
                        {photo.title && (
                          <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 bg-gradient-to-t from-black/75 via-black/35 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end text-center pointer-events-none">
                            <span className="text-white font-medium text-xs sm:text-sm drop-shadow-sm">
                              {photo.title}
                            </span>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* ------------------------------------------------------------- */}
                {/* PEMISAH ELEGAN DENGAN JARAK LEGA & MEWAH                      */}
                {/* ------------------------------------------------------------- */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.1 }}
                  className="w-full max-w-5xl flex items-center justify-center my-20 sm:my-28 md:my-32 px-2 sm:px-4"
                >
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#D97706]/35 to-transparent" />
                  <div className="mx-3 sm:mx-6 px-5 sm:px-7 py-2 sm:py-2.5 rounded-full bg-[#FEF3C7]/90 border border-[#F59E0B]/30 text-[#92400E] text-xs sm:text-sm md:text-base font-medium flex items-center gap-2 shadow-xs backdrop-blur-xs">
                    <span className="text-base sm:text-lg">🌻</span>
                    <span className="tracking-wide font-serif italic text-[0.88rem] sm:text-[1rem]">More Memories with Me :D</span>
                  </div>
                  <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#D97706]/35 to-transparent" />
                </motion.div>

                {/* ------------------------------------------------------------- */}
                {/* BAGIAN 2: 7 FOTO BARU (TIDAK DIBERI JUDUL, ALIGN CENTER)      */}
                {/* ------------------------------------------------------------- */}
                <div className="w-full max-w-5xl">
                  <div className="w-full flex flex-wrap justify-center gap-3.5 sm:gap-5 md:gap-6">
                    {normalizedExtra.map((photo, index) => (
                      <motion.div
                        key={`grid-extra-${photo.id}`}
                        layoutId={`card-container-${photo.id}`}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0, x: 0, y: 0 }}
                        transition={{ ...cardSpring, delay: index * 0.04 }}
                        className="relative aspect-square w-[calc((100%-0.875rem)/2)] sm:w-[calc((100%-2.5rem)/3)] lg:w-[calc((100%-4.5rem)/4)] rounded-[1.3rem] sm:rounded-[1.8rem] md:rounded-[2.2rem] border-4 md:border-[5px] border-white shadow-md hover:shadow-xl group cursor-pointer overflow-hidden bg-muted select-none flex-shrink-0"
                        onClick={() => setActivePhoto(photo)}
                      >
                        <motion.div
                          layoutId={`image-inner-${photo.id}`}
                          layout="position"
                          className="w-full h-full relative"
                          transition={expandTransition}
                        >
                          <Image
                            src={photo.src}
                            alt={`Additional memory photo ${index + 1}`}
                            fill
                            className="object-cover select-none pointer-events-none transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          />
                        </motion.div>
                        {/* 7 Foto baru tidak diberi title sesuai permintaan */}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </LayoutGroup>

      {/* ========================================================================= */}
      {/* AUTHENTIC POLAROID STYLE MODAL (Ketika memilih foto di grid)              */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePhoto(null)}
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            {/* Tombol Foto Sebelumnya (Kiri) */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrevPhoto();
              }}
              className="hidden sm:flex absolute left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-sm items-center justify-center transition-all active:scale-90 cursor-pointer z-[110]"
              aria-label="Previous Photo"
              title="Previous Photo (←)"
            >
              <ArrowLeftIcon />
            </button>

            {/* Tombol Foto Berikutnya (Kanan) */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNextPhoto();
              }}
              className="hidden sm:flex absolute right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-sm items-center justify-center transition-all active:scale-90 cursor-pointer z-[110]"
              aria-label="Next Photo"
              title="Next Photo (→)"
            >
              <ArrowRightIcon />
            </button>

            {/* Frame Polaroid Klasik */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 30, rotate: -2 }}
              animate={{ scale: 1, opacity: 1, y: 0, rotate: -0.5 }}
              exit={{ scale: 0.85, opacity: 0, y: 25, rotate: 1.5 }}
              transition={{ type: "spring", stiffness: 320, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white rounded-[6px] sm:rounded-[8px] p-3.5 sm:p-5 pb-4 sm:pb-5 max-w-[360px] sm:max-w-[420px] w-full border border-[#E8E5E0] shadow-2xl"
              style={{
                boxShadow: "0 25px 60px -15px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,0,0,0.06)",
              }}
            >
              {/* Strip Selotip Dekoratif di Tengah Atas */}
              <div
                style={{
                  position: "absolute",
                  top: "-12px",
                  left: "50%",
                  transform: "translateX(-50%) rotate(-1deg)",
                  width: "90px",
                  height: "24px",
                  backgroundColor: "rgba(254, 243, 199, 0.92)",
                  backdropFilter: "blur(3px)",
                  border: "1px dashed rgba(217, 119, 6, 0.35)",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.08)",
                  zIndex: 20,
                }}
              />

              {/* Tombol Tutup Frame */}
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[#1C1917] text-white hover:bg-[#D97706] flex items-center justify-center shadow-lg transition-transform active:scale-90 cursor-pointer z-30"
                aria-label="Close Polaroid"
                title="Close (Esc)"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              {/* Area Foto Polaroid */}
              <div className="relative aspect-square w-full overflow-hidden rounded-[3px] bg-[#F5F4F0] border border-black/5 shadow-inner">
                <img
                  src={activePhoto.src || activePhoto.image}
                  alt={activePhoto.title || "Memory Photo"}
                  className="w-full h-full object-cover select-none pointer-events-none"
                  style={{
                    filter: "contrast(1.02) saturate(0.98)",
                  }}
                />
              </div>

              {/* Dagu Polaroid: Judul hanya jika ada (Foto 1 - 6), untuk 7 foto baru tidak ada judul */}
              {activePhoto.title ? (
                <div className="pt-3.5 sm:pt-4 px-2 text-center">
                  <h3
                    className="font-birthstone text-2xl sm:text-[2.2rem] text-[#1C1917]"
                    style={{ letterSpacing: "0.01em", fontWeight: 400, lineHeight: 1.2 }}
                  >
                    {activePhoto.title}
                  </h3>
                </div>
              ) : (
                <div className="pt-3 pb-1 text-center flex items-center justify-center">
                  <span className="text-xs text-amber-500/40 select-none">🌻</span>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default ExpandableGallery;
