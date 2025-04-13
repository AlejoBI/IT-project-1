import { useEffect } from "react";
import { toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface NotificationProps {
  message: string;
  type?: "success" | "error" | "info" | "warning";
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  autoClose?: number; // Duración en milisegundos (default: 5000ms)
  hideProgressBar?: boolean; // Mostrar barra de progreso
  closeOnClick?: boolean;
  pauseOnHover?: boolean; // Pausar el temporizador al pasar el ratón
  draggable?: boolean; // Permitir arrastrar las notificaciones
  theme?: "light" | "dark";
}

const Notification = ({
  message,
  type = "info",
  position = "top-right",
  autoClose = 3000,
  hideProgressBar = false,
  closeOnClick = true,
  pauseOnHover = true,
  draggable = false,
  theme = "light",
}: NotificationProps) => {
  useEffect(() => {
    const notify = () => {
      const options: ToastOptions = {
        position,
        autoClose,
        hideProgressBar,
        closeOnClick,
        pauseOnHover,
        draggable,
        theme,
        toastId: message,
        closeButton: false,
        style: { zIndex: 9999 },
      };

      switch (type) {
        case "success":
          toast.success(message, options);
          break;
        case "error":
          toast.error(message, options);
          break;
        case "warning":
          toast.warning(message, options);
          break;
        case "info":
        default:
          toast.info(message, options);
          break;
      }
    };

    notify();
  }, [
    message,
    type,
    position,
    autoClose,
    hideProgressBar,
    closeOnClick,
    pauseOnHover,
    draggable,
    theme,
  ]);

  return null;
};

export default Notification;
