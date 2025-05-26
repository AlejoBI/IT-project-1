import React, { useState } from "react";
import Button from "../UI/Button";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { name, email, subject, message } = formData;

    if (!name || !email || !subject || !message) {
      setError("Por favor completa todos los campos.");
      return;
    }

    setError(null);

    const mailtoLink = `mailto:alejandro.bravo_isa@uao.edu.co?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(message)}`;

    window.location.href = mailtoLink;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-8 space-y-6 max-w-lg mx-auto"
    >
      <div>
        <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">
          Nombre
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Tu nombre completo"
          required
        />
      </div>

      <div>
        <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">
          Correo electrónico
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="tucorreo@ejemplo.com"
          required
        />
      </div>

      <div>
        <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">
          Asunto
        </label>
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Motivo del mensaje"
          required
        />
      </div>

      <div>
        <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">
          Mensaje
        </label>
        <textarea
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Escribe tu mensaje aquí..."
          required
        ></textarea>
      </div>

      {error && <p className="text-red-600 font-semibold text-sm">{error}</p>}

      <div className="flex justify-center">
        <Button type="submit" children="Enviar" />
      </div>

      <p className="text-sm text-gray-500 mt-2 dark:text-gray-400">
        Al enviar, se abrirá tu cliente de correo para completar el envío.
      </p>
    </form>
  );
};

export default ContactForm;
