"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Star, GraduationCap, Video, Quote, ArrowUpRight, Award } from "lucide-react";
import { publishedStudentTestimonials, publishedGoogleReviews } from "@/data/testimonials";
import { publishedGraduates } from "@/data/graduates";
import { findSuvogaCourseByIdentifier } from "@/data/courses";

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.08
    }
  }
};

function graduateCourseHref(courseId?: string) {
  if (!courseId) return null;

  const course = findSuvogaCourseByIdentifier(courseId);
  if (!course) return null;

  return `/curso/${course.slug || course.idServicio}`;
}

export function SocialProofSection() {
  const shouldReduceMotion = useReducedMotion();
  const hasPublishedSocialProof =
    publishedStudentTestimonials.length > 0 ||
    publishedGoogleReviews.length > 0 ||
    publishedGraduates.length > 0;
  const activeFadeInUp = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const }
    }
  };
  if (!hasPublishedSocialProof) {
    return (
      <section className="bg-[#FDFBF7] px-4 py-16 text-center text-[#4E6658] sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8D7530]">
          Testimonios verificados
        </p>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-6">
          Este espacio se habilitará cuando la academia apruebe testimonios,
          reseñas y perfiles reales para publicación.
        </p>
      </section>
    );
  }

  return (
    <div id="historias" className="space-y-20 py-16 bg-[#FDFBF7] overflow-hidden">
      {/* 1. Student Testimonials Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full max-w-full overflow-hidden">
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A028] bg-[#D4AF37]/10 px-3 py-1.5 rounded-full border border-[#D4AF37]/20">
            Historias de éxito
          </span>
          <h2 className="suvoga-serif mt-4 text-3xl sm:text-4xl font-semibold leading-tight text-[#0D3B22]">
            Alumnas que ya iniciaron su camino profesional
          </h2>
          <p className="mt-3 text-sm text-[#6B6048] max-w-xl mx-auto leading-relaxed">
            Conoce la experiencia de egresadas que transformaron su pasión por el bienestar en una carrera técnica e independiente.
          </p>
        </div>

        <motion.div
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-6 pb-4 -mx-4 px-4 md:grid md:grid-cols-3 md:mx-0 md:px-0 md:pb-0 md:overflow-visible"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {publishedStudentTestimonials.map((testimonial) => (
            <motion.article
              key={testimonial.id}
              variants={activeFadeInUp}
              whileHover={shouldReduceMotion ? {} : { y: -5, transition: { duration: 0.25 } }}
              whileTap={shouldReduceMotion ? { scale: 0.99 } : { scale: 0.97 }}
              className="snap-start shrink-0 w-[82vw] max-w-[320px] sm:w-[48%] md:w-auto relative flex flex-col justify-between rounded-3xl border border-[#D4AF37]/25 bg-white p-6 shadow-sm shadow-[#0D3B22]/5 transition-shadow hover:shadow-xl hover:shadow-[#D4AF37]/10"
            >
              {/* Badge indicating demo context */}
              {testimonial.esDemo && (
                <div className="absolute top-4 right-4">
                  <span className="text-[9px] font-semibold uppercase tracking-wider text-[#C5A028] bg-[#FDFBF7] border border-[#D4AF37]/30 px-2 py-0.5 rounded-full">
                    Estructura preparada para testimonios reales
                  </span>
                </div>
              )}

              <div>
                {/* Rating */}
                <div className="flex gap-1 text-[#D4AF37] mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-current transition-transform duration-300 hover:scale-110 drop-shadow-[0_0_2px_rgba(212,175,55,0.4)]"
                    />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-sm italic leading-relaxed text-[#4E6658] relative z-10 pl-4 border-l border-[#D4AF37]/40">
                  <Quote className="absolute -top-3 -left-1.5 h-6 w-6 text-[#D4AF37]/15 pointer-events-none" />
                  &ldquo;{testimonial.comentario}&rdquo;
                </p>
              </div>

              {/* User Bio */}
              <div className="mt-6 flex items-center gap-3 border-t border-[#0D3B22]/10 pt-4">
                <img
                  src={testimonial.imagen_url}
                  alt={testimonial.nombre}
                  className="h-11 w-11 rounded-full object-cover border border-[#D4AF37]/40"
                />
                <div>
                  <h4 className="suvoga-serif text-sm font-semibold text-[#0D3B22]">
                    {testimonial.nombre}
                  </h4>
                  <p className="text-[10px] text-[#8D7530] font-medium tracking-wide">
                    {testimonial.curso}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </section>

      {/* 2. Google Business Profile reviews */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full max-w-full overflow-hidden">
        <div className="rounded-3xl border border-[#D4AF37]/20 bg-[#FDFBF7] p-8 shadow-sm relative overflow-hidden">
          {/* Subtle gold grid background */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.05),transparent_60%)] pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 border-b border-[#D4AF37]/20 pb-6 mb-8">
            <div>
              <h3 className="suvoga-serif text-2xl font-semibold text-[#0D3B22]">
                Lo que dicen nuestras alumnas en Google
              </h3>
              <p className="text-xs text-[#8D7530] font-medium mt-1 uppercase tracking-wider">
                Reseñas de Google Business Profile
              </p>
            </div>
            
            <div className="flex items-center gap-3 bg-white border border-[#D4AF37]/30 rounded-2xl px-5 py-3 shadow-sm">
              <div className="flex gap-1 text-[#D4AF37]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current drop-shadow-[0_0_3px_rgba(212,175,55,0.5)]" />
                ))}
              </div>
              <span className="text-sm font-bold text-[#0D3B22]">5.0 / 5.0</span>
            </div>
          </div>

          <div className="relative z-10 flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-6 pb-4 -mx-4 px-4 md:grid md:grid-cols-3 md:mx-0 md:px-0 md:pb-0 md:overflow-visible">
            {publishedGoogleReviews.map((review) => (
              <div
                key={review.id}
                className="snap-start shrink-0 w-[82vw] max-w-[320px] sm:w-[48%] md:w-auto flex flex-col justify-between bg-white border border-[#D4AF37]/15 rounded-2xl p-5 shadow-sm hover:border-[#D4AF37]/45 transition-colors duration-300"
              >
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-semibold text-[#8D7530] uppercase tracking-wide">
                      {review.fuente}
                    </span>
                    <div className="flex gap-0.5 text-[#D4AF37]">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-[#4E6658] leading-relaxed italic">
                    &ldquo;{review.comentario}&rdquo;
                  </p>
                </div>

                <div className="mt-4 flex items-center gap-2 pt-3 border-t border-[#0D3B22]/5">
                  <div className="h-8 w-8 rounded-full bg-[#0D3B22]/5 border border-[#D4AF37]/20 flex items-center justify-center text-xs font-bold text-[#0D3B22]">
                    {review.nombre.charAt(0)}
                  </div>
                  <div>
                    <h5 className="text-xs font-semibold text-[#0D3B22]">{review.nombre}</h5>
                    <p className="text-[9px] text-[#6B6048]">{review.fecha}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Explicitly labeled demo placeholder */}
          <div className="relative z-10 mt-6 flex items-center justify-center text-center">
            <span className="text-[10px] font-medium text-[#8D7530] bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-md px-3 py-1">
              Estructura preparada para reseñas reales de Google Business Profile
            </span>
          </div>
        </div>
      </section>

      {/* 3. Graduates Library (Biblioteca de Graduadas) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full max-w-full overflow-hidden">
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A028] bg-[#D4AF37]/10 px-3 py-1.5 rounded-full border border-[#D4AF37]/20">
            Comunidad académica
          </span>
          <h2 className="suvoga-serif mt-4 text-3xl sm:text-4xl font-semibold leading-tight text-[#0D3B22]">
            Biblioteca de alumnas graduadas
          </h2>
          <p className="mt-3 text-sm text-[#6B6048] max-w-xl mx-auto leading-relaxed">
            Nuestra mayor satisfacción es ver el crecimiento y éxito de nuestras egresadas. Explora las cohortes que han pasado por SuVoGa.
          </p>
        </div>

        <motion.div
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-6 pb-4 -mx-4 px-4 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:mx-0 sm:px-0 sm:pb-0 sm:overflow-visible"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {publishedGraduates.map((graduate) => {
            const courseHref = graduateCourseHref(graduate.curso_id);

            return (
            <motion.article
              key={graduate.id}
              variants={activeFadeInUp}
              whileHover={shouldReduceMotion ? {} : { y: -4, transition: { duration: 0.2 } }}
              whileTap={shouldReduceMotion ? { scale: 0.99 } : { scale: 0.97 }}
              className="snap-start shrink-0 w-[82vw] max-w-[320px] sm:w-auto group overflow-hidden rounded-3xl border border-[#D4AF37]/25 bg-white shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* Image Frame with hover-zoom */}
              <div className="relative aspect-[4/5] overflow-hidden bg-[#0D3B22]/5">
                <img
                  src={graduate.imagen_url}
                  alt={graduate.nombre}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm shadow-sm ${
                    graduate.estado === "Graduada" ? "bg-[#0D3B22]/85 border border-[#D4AF37]/40" :
                    graduate.estado === "Práctica completada" ? "bg-[#C5A028]/85 border border-[#D4AF37]/40" :
                    "bg-[#6B6048]/85 border border-white/20"
                  }`}>
                    <GraduationCap className="h-3 w-3 text-[#D4AF37]" />
                    {graduate.estado}
                  </span>
                </div>

                {/* Cohort overlay text */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-[10px] font-medium uppercase tracking-widest text-[#EAE2D0]">
                    {graduate.cohorte}
                  </p>
                  <h4 className="suvoga-serif text-lg font-bold mt-1 text-white">
                    {graduate.nombre}
                  </h4>
                </div>
              </div>

              {/* Card Footer details */}
              <div className="p-4 flex flex-col justify-between gap-3 bg-white">
                <p className="text-xs text-[#4E6658] font-medium line-clamp-1">
                  {graduate.cursoCompletado}
                </p>
                {courseHref && (
                  <motion.a
                    href={courseHref}
                    whileHover={{ x: 3 }}
                    className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#0D3B22] hover:text-[#C5A028]"
                  >
                    Ver programa
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </motion.a>
                )}
              </div>
            </motion.article>
            );
          })}
        </motion.div>
        
        {/* Gallery reference warning label */}
        <div className="mt-8 text-center">
          <p className="text-[10px] text-[#8D7530] font-medium italic">
            * Galería preparada para alumnas graduadas
          </p>
        </div>
      </section>

      {/* 4. Experience & Video References */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full max-w-full overflow-hidden">
        <div className="mb-12 max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A028] bg-[#D4AF37]/10 px-3 py-1.5 rounded-full border border-[#D4AF37]/20">
            Ambiente práctico
          </span>
          <h2 className="suvoga-serif mt-4 text-3xl sm:text-4xl font-semibold leading-tight text-[#0D3B22]">
            Así se vive una formación práctica en spa
          </h2>
          <p className="mt-3 text-sm text-[#6B6048] max-w-xl leading-relaxed">
            Mira de cerca los rituales, técnicas y el nivel de exigencia que caracteriza a nuestra escuela de masajes.
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid gap-6 lg:grid-cols-12 w-full max-w-full min-w-0 overflow-hidden">
          {/* Main Video Embed */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-3xl border border-[#D4AF37]/25 bg-white p-5 sm:p-6 shadow-sm w-full max-w-full min-w-0 overflow-hidden">
            <div className="mb-4">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8D7530] uppercase tracking-wider">
                <Video className="h-4 w-4 text-[#C5A028]" />
                Video de referencia
              </span>
              <h3 className="suvoga-serif text-lg sm:text-xl font-semibold text-[#0D3B22] mt-2 max-w-full break-words text-balance">
                Clase Práctica: Biomecánica y Ritmo en Camilla
              </h3>
            </div>
            
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-dashed border-[#D4AF37]/30 bg-[#FDFBF7]/50 flex flex-col items-center justify-center text-center p-4 sm:p-6 min-h-[240px] max-w-full min-w-0">
              <Video className="h-8 w-8 text-[#C5A028]/40 mb-3 animate-pulse" />
              <h3 className="suvoga-serif text-base sm:text-lg font-semibold text-[#0D3B22]/80 max-w-full break-words text-balance">
                Video de presentación próximamente
              </h3>
              <p className="text-xs text-[#6B6048] mt-2 max-w-xs sm:max-w-sm leading-relaxed break-words text-balance">
                Aquí se colocará una explicación de 3–5 minutos sobre el curso, requisitos e inscripción.
              </p>
            </div>
          </div>

          {/* Right Column: Reference context */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-3xl border border-[#D4AF37]/25 bg-[#0D3B22] text-[#FDFBF7] p-5 sm:p-6 shadow-md min-h-[300px] w-full max-w-full min-w-0 overflow-hidden">
            <div className="space-y-4">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/20 bg-white/5 text-[#FDFBF7]">
                <Award className="h-4 w-4 text-[#D4AF37]" />
              </div>
              <h3 className="suvoga-serif text-xl sm:text-2xl font-semibold text-white max-w-full break-words text-balance">
                Biblioteca de Video Académica
              </h3>
              <p className="text-xs text-[#EAE2D0] leading-relaxed break-words text-balance">
                Este espacio está configurado para almacenar registros reales de clases prácticas, rituales de inicio, técnicas de masaje y testimonios directos grabados por nuestras alumnas.
              </p>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3 w-full max-w-full min-w-0 overflow-hidden">
                <h4 className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
                  Video de referencia
                </h4>
                <p className="text-[11px] text-[#EAE2D0]/90 leading-relaxed break-words text-balance">
                  Para fines ilustrativos de producción, los videos mostrados demuestran el estándar del nicho (biomecánica, ambientación de spa y técnicas profesionales de cabina).
                </p>
              </div>
            </div>
            
            <div className="mt-6 border-t border-white/10 pt-4 flex items-center justify-center text-center">
              <span className="inline-block whitespace-normal text-center text-[10px] font-semibold uppercase tracking-wider text-[#D4AF37] bg-white/10 px-3 py-1.5 rounded-md max-w-full leading-tight">
                Contenido visual de muestra
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA after Social Proof */}
      <section className="mx-auto max-w-7xl px-4 pt-4 pb-12 text-center sm:px-6 lg:px-8">
        <div className="inline-flex flex-col items-center gap-4">
          <p className="text-xs text-[#6B6048] max-w-md leading-relaxed">
            Nuestros cupos son estrictamente limitados a 12 participantes por cohorte para garantizar la excelencia académica.
          </p>
          <a
            href="#cursos-disponibles"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById("cursos-disponibles") || document.querySelector("section h2")?.parentElement;
              if (el) {
                el.scrollIntoView({ behavior: "smooth" });
              } else {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="inline-flex h-12 items-center justify-center rounded-2xl bg-[#0D3B22] px-8 text-sm font-semibold text-[#FDFBF7] shadow-sm shadow-[#0D3B22]/10 transition-colors hover:bg-[#145332]"
          >
            Explorar cursos disponibles
          </a>
        </div>
      </section>
    </div>
  );
}
