// RegulationForm.tsx
import React from "react";
import Label from "../UI/Label";
import { Regulation } from "../../../domain/models/types/regulationsTypes";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useRegulation } from "../../hooks/useRegulation";
import { createRegulationAction } from "../../../application/store/regulations/regulationsActions";
import Button from "../UI/Button";
import { LIGHT_MODE_COLORS, DARK_MODE_COLORS } from "../../../shared/constants";

const RegulationForm = () => {
  const dispatch = useAppDispatch();
  const { loading } = useRegulation();

  const methods = useForm<Regulation>({
    defaultValues: {
      name: "",
      description: "",
      version: "",
    },
  });

  const { register, handleSubmit, reset } = methods;

  const onSubmit: SubmitHandler<Regulation> = async (data) => {
    await dispatch(createRegulationAction(data)).unwrap();

    reset({
      name: "",
      description: "",
      version: "",
    });
  };

  return (
    <FormProvider {...methods}>
      <section className="space-y-6">
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <h2
              className={`text-2xl font-bold mb-6 text-center ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}`}
            >
              Crear Normativa
            </h2>
            <div>
              <Label children="Nombre de la normativa" htmlFor="name" />
              <input
                {...register("name")}
                id="name"
                placeholder="Nombre de la normativa"
                className={`w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400
                                                        ${LIGHT_MODE_COLORS.INPUT_BACKGROUND} ${DARK_MODE_COLORS.INPUT_BACKGROUND} 
                                                        ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}
                                                      `}
              />
            </div>
            <div>
              <Label children="Descripción" htmlFor="description" />
              <textarea
                {...register("description")}
                id="description"
                placeholder="Descripción de la normativa"
                className={`w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none
                                                        ${LIGHT_MODE_COLORS.INPUT_BACKGROUND} ${DARK_MODE_COLORS.INPUT_BACKGROUND} 
                                                        ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}
                                                      `}
                rows={4}
              />
            </div>
            <div>
              <Label children="Versión" htmlFor="version" />
              <input
                {...register("version")}
                id="version"
                placeholder="Ej: 2024"
                className={`w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400
                                                        ${LIGHT_MODE_COLORS.INPUT_BACKGROUND} ${DARK_MODE_COLORS.INPUT_BACKGROUND} 
                                                        ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}
                                                      `}
              />
            </div>

            <Button type="submit" children="Crear Normativa" />
          </form>
        )}
      </section>
    </FormProvider>
  );
};

export default RegulationForm;
