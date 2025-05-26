import React from "react";
import { Mail, Phone, MapPin, Facebook, Linkedin, Github } from "lucide-react";

const ContactInfo = () => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-8 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
        Información de contacto
      </h2>

      <div className="space-y-4 text-gray-700 dark:text-gray-200">
        <div className="flex items-center gap-3">
          <Mail className="w-5 h-5" />
          <span>contacto@byteforge.dev</span>
        </div>
        <div className="flex items-center gap-3">
          <Phone className="w-5 h-5" />
          <span>+57 123 456 7890</span>
        </div>
        <div className="flex items-center gap-3">
          <MapPin className="w-5 h-5" />
          <span>Cali, Valle del Cauca, Colombia</span>
        </div>
      </div>

      <div className="pt-6 border-t border-gray-300 dark:border-gray-700">
        <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-100">
          Síguenos
        </h3>
        <div className="flex gap-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Facebook className="w-6 h-6 hover:text-blue-600" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin className="w-6 h-6 hover:text-blue-500" />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="w-6 h-6 hover:text-gray-900 dark:hover:text-white" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
