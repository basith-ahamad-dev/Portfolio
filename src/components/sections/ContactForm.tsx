"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CircleAlert, CircleCheck, Loader, Send } from "lucide-react";
import { useEffect, useId, useState, type ChangeEvent, type FormEvent } from "react";
import { CONTACT } from "@/data/content";
import { cn } from "@/lib/utils";

type Field = "name" | "email" | "message";
type Errors = Partial<Record<Field, string>>;
type Status = "idle" | "sending" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: Record<Field, string>): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!values.email.trim() || !EMAIL_RE.test(values.email.trim())) errors.email = "Please enter a valid email address.";
  if (!values.message.trim()) errors.message = "Please write a message.";
  return errors;
}

const fieldBase =
  "w-full border-0 border-b bg-transparent px-0 py-3 text-base text-fg outline-none transition-colors duration-300 placeholder:text-muted/60 focus:bg-fg/[0.03]";
const labelBase = "mb-1 block font-mono text-[11px] uppercase tracking-[0.2em] text-muted transition-colors group-focus-within/field:text-brand-fg";

export function ContactForm() {
  const uid = useId();
  const [values, setValues] = useState<Record<Field, string>>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [honeypot, setHoneypot] = useState("");

  // Auto-dismiss the toast after a few seconds.
  useEffect(() => {
    if (status !== "success" && status !== "error") return;
    const t = setTimeout(() => setStatus("idle"), 5000);
    return () => clearTimeout(t);
  }, [status]);

  const onChange = (field: Field) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = (["name", "email", "message"] as const).find((f) => found[f]);
      if (first) document.getElementById(`${uid}-${first}`)?.focus();
      return;
    }

    // Spam bots fill the hidden field; pretend success without sending.
    if (honeypot) {
      setStatus("success");
      return;
    }

    setStatus("sending");
    try {
      const { send } = await import("@emailjs/browser");
      await send(
        CONTACT.emailjs.serviceId,
        CONTACT.emailjs.templateId,
        {
          from_name: values.name.trim(),
          from_email: values.email.trim(),
          message: values.message.trim(),
        },
        { publicKey: CONTACT.emailjs.publicKey },
      );
      setValues({ name: "", email: "", message: "" });
      setStatus("success");
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
    }
  }

  const sending = status === "sending";

  return (
    <>
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-8 border border-dashed border-line-strong p-6 sm:p-10" aria-label="Contact form">
        {/* Honeypot: hidden from people, visible to bots */}
        <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
          <label>
            Company
            <input type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
          </label>
        </div>

        {(
          [
            { field: "name", label: "First Name", type: "text", autoComplete: "given-name", placeholder: "Your name" },
            { field: "email", label: "Email Address", type: "email", autoComplete: "email", placeholder: "you@example.com" },
          ] as const
        ).map(({ field, label, type, autoComplete, placeholder }) => (
          <div key={field} className="group/field">
            <label htmlFor={`${uid}-${field}`} className={labelBase}>
              {label} <span className="text-brand-fg">*</span>
            </label>
            <input
              id={`${uid}-${field}`}
              name={field}
              type={type}
              autoComplete={autoComplete}
              placeholder={placeholder}
              value={values[field]}
              onChange={onChange(field)}
              aria-invalid={!!errors[field]}
              aria-describedby={errors[field] ? `${uid}-${field}-err` : undefined}
              className={cn(fieldBase, errors[field] ? "border-red-500/70" : "border-line-strong focus:border-brand")}
            />
            {errors[field] && (
              <p id={`${uid}-${field}-err`} role="alert" className="mt-2 flex items-center gap-1.5 pl-1 text-sm text-red-400">
                <CircleAlert size={14} aria-hidden="true" /> {errors[field]}
              </p>
            )}
          </div>
        ))}

        <div className="group/field">
          <label htmlFor={`${uid}-message`} className={labelBase}>
            Message <span className="text-brand-fg">*</span>
          </label>
          <textarea
            id={`${uid}-message`}
            name="message"
            rows={5}
            placeholder="Tell me about your project"
            value={values.message}
            onChange={onChange("message")}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? `${uid}-message-err` : undefined}
            className={cn(fieldBase, "min-h-[9rem] resize-y", errors.message ? "border-red-500/70" : "border-line-strong focus:border-brand")}
          />
          {errors.message && (
            <p id={`${uid}-message-err`} role="alert" className="mt-2 flex items-center gap-1.5 pl-1 text-sm text-red-400">
              <CircleAlert size={14} aria-hidden="true" /> {errors.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={sending}
          className="group inline-flex h-16 w-full items-center justify-center gap-3 rounded-[3px] bg-brand font-display text-xl tracking-wider text-black transition-all duration-300 hover:bg-fg hover:text-ink disabled:cursor-not-allowed disabled:opacity-70"
        >
          {sending ? (
            <>
              <Loader size={20} className="animate-spin" aria-hidden="true" /> Sending...
            </>
          ) : (
            <>
              Send message
              <Send size={18} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-1" aria-hidden="true" />
            </>
          )}
        </button>
      </form>

      {/* Toast */}
      <div aria-live="polite" className="pointer-events-none fixed inset-x-4 bottom-6 z-[85] flex justify-center">
        <AnimatePresence>
          {(status === "success" || status === "error") && (
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.95 }}
              role="status"
              className={cn(
                "pointer-events-auto flex max-w-md items-start gap-3 rounded-2xl border px-5 py-4 shadow-2xl backdrop-blur-xl",
                status === "success"
                  ? "border-emerald-400/40 bg-emerald-950/80 text-emerald-300"
                  : "border-red-400/40 bg-red-950/80 text-red-300",
              )}
            >
              {status === "success" ? <CircleCheck size={22} className="mt-0.5 shrink-0" aria-hidden="true" /> : <CircleAlert size={22} className="mt-0.5 shrink-0" aria-hidden="true" />}
              <div>
                <p className="font-semibold">
                  {status === "success" ? "Message sent successfully" : "Failed to send message."}
                </p>
                <p className="mt-0.5 text-sm opacity-90">
                  {status === "success"
                    ? "Thank you for contacting me. I'll reply as soon as possible."
                    : "Please try again later."}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
