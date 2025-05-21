import React, { useRef, useState } from "react";
import { UploadCloud, Loader2 } from "lucide-react";
import { Form } from "../../../domain/models/types/EvaluationFormTypes";
import { GRADIENTS, DARK_GRADIENTS } from "../../../shared/constants"; // Asegúrate de ajustar la ruta

interface FileUploadProps {
  onJsonExtracted: (data: Form) => void;
  onError: (message: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onJsonExtracted,
  onError,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    try {
      if (file.type === "application/json") {
        const text = await file.text();
        const json = JSON.parse(text);
        onJsonExtracted(json);
      } else {
        onError("Solo se permite subir archivos .json");
      }
    } catch {
      onError("El archivo no tiene un formato JSON válido.");
    } finally {
      setIsUploading(false);
      e.target.value = ""; // ✅ Permite volver a subir el mismo archivo
    }
  };

  const triggerFileInput = () => {
    if (!isUploading) {
      fileInputRef.current?.click();
    }
  };

  const gradientClasses = `${GRADIENTS.BUTTON_BG_SECONDARY} ${DARK_GRADIENTS.BUTTON_BG_SECONDARY}`;

  return (
    <div className="mb-6">
      <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
        Subir archivo JSON
      </label>

      <input
        type="file"
        accept=".json,application/json"
        onChange={handleFileChange}
        ref={fileInputRef}
        className="hidden"
      />

      <button
        type="button"
        onClick={triggerFileInput}
        disabled={isUploading}
        className={`flex items-center gap-2 px-5 py-3 rounded-xl shadow-lg font-medium text-white transition-transform duration-300 ${
          isUploading
            ? "bg-gray-400 cursor-not-allowed"
            : `${gradientClasses} hover:scale-105`
        }`}
      >
        {isUploading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Procesando...
          </>
        ) : (
          <>
            <UploadCloud className="w-5 h-5" />
            Seleccionar archivo .json
          </>
        )}
      </button>
    </div>
  );
};

export default FileUpload;
