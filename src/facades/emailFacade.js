/**
 * Email Facade
 * Simplifica la API de EmailJS para el componente
 * Siguiendo el patrón Facade
 */

import emailjs from "@emailjs/browser";

// Configuración centralizada
const EMAIL_CONFIG = {
  serviceId: "service_AleCam",
  templateId: "template_fh6pd98",
  publicKey: "yaZgarB70jJ448bk8",
};

/**
 * Envía un email usando EmailJS
 * @param {HTMLFormElement} formElement - Elemento del formulario
 * @returns {Promise<{success: boolean, message: string}>}
 */
export const sendEmail = async (formElement) => {
  try {
    const result = await emailjs.sendForm(
      EMAIL_CONFIG.serviceId,
      EMAIL_CONFIG.templateId,
      formElement,
      EMAIL_CONFIG.publicKey
    );

    console.log("Email enviado:", result.text);
    return { success: true, message: result.text };
  } catch (error) {
    console.error("Error al enviar:", error.text);
    return { success: false, message: error.text };
  }
};
