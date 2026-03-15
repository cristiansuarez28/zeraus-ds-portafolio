/**
 * ContactSection — estilo Lokal
 * ─────────────────────────────
 * Left  : fondo claro + frase grande
 * Right : bloques de color de fondo + tarjeta de formulario flotante
 */

import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { FORMSPREE_ENDPOINT } from "@/lib/config";

const schema = z.object({
  name: z
    .string()
    .min(2, "El nombre es requerido"),
  email: z
    .string()
    .min(1, "El email es requerido")
    .email("Introduce un email válido"),
  message: z
    .string()
    .min(10, "El mensaje debe tener al menos 10 caracteres"),
});

type FormData = z.infer<typeof schema>;

const ContactSection = () => {
  const [isSending, setIsSending] = useState(false);
  const [searchParams] = useSearchParams();
  const serviceParam = searchParams.get("servicio");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      message: serviceParam
        ? `Hola, me interesa cotizar el servicio de ${serviceParam}. `
        : "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSending(true);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name: data.name, email: data.email, message: data.message }),
      });

      if (!res.ok) throw new Error("Error al enviar");

      reset();
      toast.success("¡Mensaje enviado!", {
        description: "Gracias por escribirme. Te respondo pronto.",
      });
    } catch {
      toast.error("No se pudo enviar el mensaje", {
        description: "Intenta de nuevo o escríbeme directamente por email.",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section
      role="region"
      aria-labelledby="contact-title"
      className="section-spacing bg-background"
    >
      <div className="container-portfolio">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 sm:mb-14"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/70 mb-2">
            Contacto
          </p>
          <h2
            id="contact-title"
            className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground"
          >
            Hablemos
          </h2>
        </motion.div>

        {/* ── Card principal ─────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-3xl overflow-hidden border border-border
                     flex flex-col lg:flex-row
                     min-h-[420px] lg:min-h-[480px]"
        >

          {/* ── LEFT: texto ─────────────────────────────────────────────── */}
          <div className="flex items-center bg-secondary
                          w-full lg:w-[45%] shrink-0
                          px-10 py-14 sm:px-14">
            <div>
              <h3
                className="text-3xl sm:text-4xl lg:text-5xl font-black leading-[1.08] max-w-xs"
                style={{
                  background: "linear-gradient(90deg, #F75010, #DB1E3F, #D00952, #920087, #6E00A3)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Todo lo hacemos con amor
              </h3>
              <p className="mt-4 text-base text-muted-foreground leading-relaxed max-w-[260px]">
                ¿Tienes un proyecto en mente? Me encantaría escucharte.
              </p>
            </div>
          </div>

          {/* ── RIGHT: bloques de color + formulario ────────────────────── */}
          <div className="relative flex-1 overflow-hidden">

            {/* Bloques decorativos de color — mismos colores del acordeón */}
            {/* Bloque amber — esquina inferior izquierda */}
            <div
              className="absolute bottom-0 left-0 w-[38%] h-[45%]"
              style={{ background: "#FDB100" }}
              aria-hidden="true"
            />
            {/* Bloque rose — centro */}
            <div
              className="absolute inset-0 left-[30%] right-[22%]"
              style={{ background: "#CB005B" }}
              aria-hidden="true"
            />
            {/* Bloque indigo — derecha */}
            <div
              className="absolute top-0 right-0 bottom-0 w-[26%]"
              style={{ background: "#6500AA" }}
              aria-hidden="true"
            />
            {/* Bloque emerald — esquina superior izquierda */}
            <div
              className="absolute top-0 left-0 w-[32%] h-[55%]"
              style={{ background: "#FD5C05" }}
              aria-hidden="true"
            />

            {/* Tarjeta de formulario flotante */}
            <div className="relative z-10 flex items-center justify-center
                            h-full p-8 sm:p-10">
              <div className="w-full max-w-sm bg-background rounded-2xl
                              shadow-2xl shadow-black/20 p-7 sm:p-8">
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>

                  {/* Pill de servicio seleccionado */}
                  {serviceParam && (
                    <div className="flex items-center gap-2 px-3 py-2 rounded-xl
                                    border border-primary/20 bg-primary/5">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.14em]
                                       text-primary/60">
                        Servicio
                      </span>
                      <span className="text-xs font-bold text-primary">
                        {serviceParam}
                      </span>
                    </div>
                  )}

                  {/* Nombre */}
                  <div className="space-y-1">
                    <label
                      htmlFor="contact-name"
                      className="text-xs font-semibold uppercase tracking-[0.14em]
                                 text-muted-foreground"
                    >
                      Tu nombre
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      placeholder="¿Cómo te llamas?"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "contact-name-error" : undefined}
                      className="w-full border-0 border-b border-border bg-transparent
                                 pb-2 text-sm text-foreground placeholder:text-muted-foreground/50
                                 focus:outline-none focus:border-foreground transition-colors"
                      {...register("name")}
                    />
                    {errors.name && (
                      <p id="contact-name-error" role="alert" className="text-xs text-red-500 pt-0.5">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label
                      htmlFor="contact-email"
                      className="text-xs font-semibold uppercase tracking-[0.14em]
                                 text-muted-foreground"
                    >
                      Tu email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="hola@ejemplo.com"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "contact-email-error" : undefined}
                      className="w-full border-0 border-b border-border bg-transparent
                                 pb-2 text-sm text-foreground placeholder:text-muted-foreground/50
                                 focus:outline-none focus:border-foreground transition-colors"
                      {...register("email")}
                    />
                    {errors.email && (
                      <p
                        id="contact-email-error"
                        role="alert"
                        className="text-xs text-red-500 pt-0.5"
                      >
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Mensaje */}
                  <div className="space-y-1 pt-2">
                    <label
                      htmlFor="contact-message"
                      className="text-xs font-semibold uppercase tracking-[0.14em]
                                 text-muted-foreground"
                    >
                      Tu mensaje
                    </label>
                    <textarea
                      id="contact-message"
                      placeholder="Cuéntame sobre tu proyecto..."
                      rows={4}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? "contact-message-error" : undefined}
                      className="w-full border-0 border-b border-border bg-transparent
                                 pb-2 text-sm text-foreground placeholder:text-muted-foreground/50
                                 focus:outline-none focus:border-foreground transition-colors
                                 resize-none"
                      {...register("message")}
                    />
                    {errors.message && (
                      <p
                        id="contact-message-error"
                        role="alert"
                        className="text-xs text-red-500 pt-0.5"
                      >
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  {/* Botón */}
                  <div className="pt-3">
                    <button
                      type="submit"
                      disabled={isSending}
                      className="w-full sm:w-auto px-8 h-11 rounded-full
                                 bg-foreground text-background text-xs font-bold
                                 uppercase tracking-[0.14em]
                                 hover:bg-foreground/80 transition-colors duration-200
                                 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isSending ? "Enviando…" : "Enviar"}
                    </button>
                  </div>

                </form>
              </div>
            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
};

export default ContactSection;
