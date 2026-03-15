/**
 * WhatsAppButton — widget flotante con popup
 * Mismo estilo visual que el menú hamburguesa del Navbar:
 * bg-background/95 · backdrop-blur-xl · border · rounded-2xl · shadow-2xl
 * Soporta modo claro y oscuro automáticamente.
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/lib/config";
import avatar from "@/assets/avatar.png";

const DEFAULT_MSG = "Hola, me gustaría contarte sobre mi proyecto.";

const WhatsAppButton = () => {
  const [open, setOpen]       = useState(false);
  const [message, setMessage] = useState("");

  return (
    <>
      {/* ── Backdrop para cerrar al click fuera ─────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="wa-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* ── Contenedor fixed ────────────────────────────────────────── */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

        {/* ── Popup card ──────────────────────────────────────────── */}
        <AnimatePresence>
          {open && (
            <motion.div
              key="wa-popup"
              role="dialog"
              aria-label="Chat por WhatsApp"
              initial={{ opacity: 0, y: 8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.97 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="w-72 bg-background/95 backdrop-blur-xl
                         border border-border
                         rounded-2xl shadow-2xl shadow-black/20
                         overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between
                              px-4 py-3 bg-[#25D366]">
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <img
                    src={avatar}
                    alt="Cristian Suarez"
                    className="w-9 h-9 rounded-full object-cover shrink-0
                               ring-2 ring-white/30"
                  />
                  <div>
                    <p className="text-white text-sm font-semibold leading-tight">
                      Cristian Suarez
                    </p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
                      <p className="text-white/80 text-xs leading-none">
                        Responde en minutos
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Cerrar chat"
                  className="p-1 rounded-md text-white/70 hover:text-white
                             hover:bg-white/10 transition-colors duration-150"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Burbuja de mensaje */}
              <div className="px-4 pt-4 pb-3">
                <div className="bg-secondary rounded-2xl rounded-tl-sm
                                px-4 py-3 max-w-[90%]">
                  <p className="text-sm text-foreground leading-relaxed">
                    ¡Hola! 👋 ¿Tienes un proyecto en mente? Me encantaría escucharte. 🦊
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-1.5 text-right">
                    Ahora
                  </p>
                </div>
              </div>

              {/* Input de mensaje */}
              <div className="px-4 pb-3">
                <div className="flex items-end gap-2 bg-secondary
                                rounded-xl px-3 py-2">
                  <textarea
                    rows={2}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        const text = message.trim() || DEFAULT_MSG;
                        window.open(
                          `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,
                          "_blank"
                        );
                        setMessage("");
                        setOpen(false);
                      }
                    }}
                    placeholder="Escribe tu mensaje…"
                    aria-label="Mensaje para WhatsApp"
                    className="flex-1 bg-transparent text-sm text-foreground
                               placeholder:text-muted-foreground/50
                               resize-none focus:outline-none leading-relaxed"
                  />
                </div>
                <p className="text-[10px] text-muted-foreground mt-1.5 px-1">
                  Enter para enviar · Shift+Enter para nueva línea
                </p>
              </div>

              {/* CTA */}
              <div className="px-4 pb-4">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message.trim() || DEFAULT_MSG)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => { setMessage(""); setOpen(false); }}
                  className="flex items-center justify-center gap-2
                             w-full h-10 rounded-xl
                             bg-[#25D366] hover:bg-[#20bc5a]
                             text-white text-sm font-semibold
                             transition-colors duration-200"
                >
                  {/* Mini icono WhatsApp */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4 shrink-0"
                    aria-hidden="true"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Iniciar conversación
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Botón flotante ───────────────────────────────────────── */}
        <motion.button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Cerrar chat de WhatsApp" : "Abrir chat de WhatsApp"}
          aria-expanded={open}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 rounded-full
                     bg-[#25D366] text-white
                     flex items-center justify-center
                     shadow-lg shadow-black/20
                     hover:shadow-xl hover:shadow-black/25
                     transition-shadow duration-200"
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <X size={22} />
              </motion.span>
            ) : (
              <motion.span
                key="wa"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-7 h-7"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

      </div>
    </>
  );
};

export default WhatsAppButton;
