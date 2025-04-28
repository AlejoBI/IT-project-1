import React from "react";
import Label from "../UI/Label";
import { Regulation } from "../../../domain/models/types/regulationsTypes";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { createRegulationAction } from "../../../application/store/regulations/regulationsActions";
import Button from "../UI/Button";

const RegulationForm = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.regulation);

  const methods = useForm<Regulation>({
    defaultValues: {
      name: "",
      description: "",
      version: "",
    },
  });
  const { register, handleSubmit, reset } = methods;

  const onSubmit: SubmitHandler<Regulation> = async (data) => {
    try {
      await dispatch(createRegulationAction(data)).unwrap();

      reset({
        name: "",
        description: "",
        version: "",
      });
    } catch (error) {
      console.error("Error al crear la normativa:", error);
    }
  };

  return (
    <FormProvider {...methods}>
      <section className="space-y-6">
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Crear Normativa
            </h2>

            <div>
              <Label children="Nombre de la normativa" htmlFor="name" />
              <input
                {...register("name")}
                id="name"
                placeholder="Nombre de la normativa"
                className="w-full p-3 rounded-md border"
              />
            </div>
            <div>
              <Label children="Descripción" htmlFor="description" />
              <textarea
                {...register("description")}
                id="description"
                placeholder="Descripción de la normativa"
                className="w-full rounded-md border resize-none"
                rows={4}
              />
            </div>
            <div>
              <Label children="Versión" htmlFor="version" />
              <input
                {...register("version")}
                id="version"
                placeholder="Ej: 2024"
                className="w-full p-3 rounded-md border"
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
