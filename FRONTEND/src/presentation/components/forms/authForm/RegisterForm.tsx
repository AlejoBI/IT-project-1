import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../../../domain/models/schemas/authSchema";
import { z } from "zod";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import {
  registerUser,
  logoutUser,
} from "../../../../application/store/auth/authActions";
import { sendEmailNotification } from "../../notification/sendEmailNotification";
import { EmailTemplateType } from "../../../../domain/models/types/notificationTypes";
import Button from "../../UI/Button";
import Label from "../../UI/Label";
import {
  LIGHT_MODE_COLORS,
  DARK_MODE_COLORS,
  ANIMATION_TIMINGS,
} from "../../../../shared/constants";
import { ArrowRight, ArrowLeft, UserPlus } from "lucide-react";

type RegisterFormValues = z.infer<typeof registerSchema>;

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

const RegisterForm = ({ onSwitchToLogin }: RegisterFormProps) => {
  const [step, setStep] = useState(1);
  const dispatch = useAppDispatch();
  const urlDeploy = import.meta.env.VITE_URL_DEPLOY || "http://localhost:5173";

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
  });

  const onFormSubmit: SubmitHandler<RegisterFormValues> = (data) => {
    dispatch(registerUser(data));
    dispatch(logoutUser());

    sendEmailNotification({
      to: data.email,
      subject: "Bienvenido a ISOlytics",
      currentName: data.name,
      appName: "ISOlytics",
      buttonText: "Explorar",
      buttonUrl: `${urlDeploy}/`,
      plainTextContent: `Bienvenido a ISOlytics, ${data.name}. Haz clic aquí para comenzar.`,
      type: EmailTemplateType.WELCOME,
      dispatch,
    });
  };

  const inputClass = `p-3 border rounded-lg outline-none focus:ring-2 transition-all ${ANIMATION_TIMINGS.TRANSITION_DURATION} ${LIGHT_MODE_COLORS.BACKGROUND} ${DARK_MODE_COLORS.BACKGROUND} ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY} focus:ring-indigo-400 dark:focus:ring-indigo-500`;

  const nextStep = async () => {
    const valid = await trigger(["username", "name", "email"]);
    if (valid) setStep(2);
  };

  const prevStep = () => setStep(1);

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className="bg-white dark:bg-gray-800 px-4 py-6 sm:p-6 rounded-2xl shadow-2xl space-y-6 w-full max-w-md mx-auto transition-colors"
      noValidate
    >
      {step === 1 && (
        <>
          <div className="flex flex-col">
            <Label htmlFor="username">Nombre de Usuario:</Label>
            <input
              id="username"
              {...register("username")}
              className={inputClass}
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
          </div>

          <div className="flex flex-col">
            <Label htmlFor="name">Nombre:</Label>
            <input id="name" {...register("name")} className={inputClass} />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div className="flex flex-col">
            <Label htmlFor="email">Correo Electrónico:</Label>
            <input
              id="email"
              type="email"
              {...register("email")}
              className={inputClass}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <Button type="button" onClick={onSwitchToLogin}>
              <span className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Iniciar sesión
              </span>
            </Button>
            <Button type="button" onClick={nextStep}>
              <span className="flex items-center gap-2">
                Siguiente
                <ArrowRight className="w-4 h-4" />
              </span>
            </Button>
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <div className="flex flex-col">
            <Label htmlFor="password">Contraseña:</Label>
            <input
              id="password"
              type="password"
              {...register("password")}
              className={inputClass}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <div className="flex flex-col">
            <Label htmlFor="confirmPassword">Confirmar Contraseña:</Label>
            <input
              id="confirmPassword"
              type="password"
              {...register("confirmPassword")}
              className={inputClass}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <Button type="button" onClick={prevStep}>
              <span className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Anterior
              </span>
            </Button>
            <Button type="submit">
              <span className="flex items-center gap-2">
                Registrarse
                <UserPlus className="w-4 h-4" />
              </span>
            </Button>
          </div>
        </>
      )}
    </form>
  );
};

export default RegisterForm;
