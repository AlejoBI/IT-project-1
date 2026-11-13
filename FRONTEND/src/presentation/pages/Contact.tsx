import React from "react";
import ContactForm from "../components/contact/ContactForm";
import ContactInfo from "../components/contact/ContactInfo";
import { DARK_MODE_COLORS, LIGHT_MODE_COLORS, UI_COLORS } from "../../shared/constants";

const Contact = () => {
  return (
    <div className="min-h-screen py-12 px-6 md:px-20">
      {/* Encabezado */}
      <section className="text-center mb-12">
        <h1 className={`mb-4 text-4xl font-bold ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}`}>Contáctanos</h1>
        <p className={`mx-auto max-w-2xl ${UI_COLORS.MUTED}`}>
          ¿Tienes dudas, sugerencias o deseas trabajar con nosotros? Llena el formulario o
          contáctanos directamente por nuestros canales oficiales.
        </p>
      </section>

      {/* Contenido principal */}
      <div className="grid md:grid-cols-2 gap-12">
        <ContactForm />
        <ContactInfo />
      </div>
    </div>
  );
};

export default Contact;
