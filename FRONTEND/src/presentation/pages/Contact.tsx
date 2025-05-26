import React from "react";
import ContactForm from "../components/contact/ContactForm";
import ContactInfo from "../components/contact/ContactInfo";

const Contact = () => {
  return (
    <div className="min-h-screen py-12 px-6 md:px-20">
      {/* Encabezado */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
          Contáctanos
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          ¿Tienes dudas, sugerencias o deseas trabajar con nosotros? Llena el
          formulario o contáctanos directamente por nuestros canales oficiales.
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
