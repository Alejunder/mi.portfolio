import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useTranslation } from 'react-i18next';
import { useFadeOut } from "../context/FadeOutContext";
import emailjs from "@emailjs/browser";
import confetti from "canvas-confetti";
import "../styles/contact.css";

export default function Contact() {
  const { t } = useTranslation();
  const { controls } = useFadeOut();
  const formRef = useRef();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  // Toda la lógica original intacta
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 50, damping: 10 });
  const springY = useSpring(rotateY, { stiffness: 50, damping: 10 });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const playSuccessSound = () => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.type = "triangle";
    oscillator.frequency.setValueAtTime(880, audioCtx.currentTime);
    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.2);
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_Alejunder",
        "template_fh6pd98",
        formRef.current,
        "46M8-6KefWP8qmvWl"
      )
      .then(
        (result) => {
          console.log("Email enviado:", result.text);
          setSuccess(true);
          setError(false);
          setForm({ name: "", email: "", message: "" });
          playSuccessSound();
          triggerConfetti();
          setTimeout(() => setSuccess(false), 5000);
        },
        (error) => {
          console.error("Error al enviar:", error.text);
          setError(true);
          setSuccess(false);
          setTimeout(() => setError(false), 5000);
        }
      );
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width - 0.5) * 15;
    const y = -((e.clientY - top) / height - 0.5) * 15;
    rotateY.set(x);
    rotateX.set(y);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.section 
      className="contact-section"
      initial={{ opacity: 1 }}
      animate={controls}
    >
      <div style={{ perspective: "1000px" }}>
        <motion.div
          className="contact-card"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX: springX,
            rotateY: springY,
            transformStyle: "preserve-3d",
          }}
        >
          <h2 className="contact-title">{t('contact.title')}</h2>

          <form className="contact-form" ref={formRef} onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder={t('contact.form.name')}
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder={t('contact.form.email')}
              value={form.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder={t('contact.form.message')}
              rows="5"
              value={form.message}
              onChange={handleChange}
              required
            />
            <button type="submit">{t('contact.button')}</button>
          </form>

          <AnimatePresence>
            {success && (
              <motion.p
                key="success"
                className="success-message"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
              >
                {t('success')}
              </motion.p>
            )}

            {error && (
              <motion.p
                key="error"
                className="error-message"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
              >
                {t('error')}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.section>
  );
}