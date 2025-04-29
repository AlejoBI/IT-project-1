import React, { useEffect } from "react";
import {
  useForm,
  useFieldArray,
  FormProvider,
  SubmitHandler,
} from "react-hook-form";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { createEvaluationFormAction } from "../../../application/store/evaluationForm/evaluationFormActions";
import { fetchRegulationsAction } from "../../../application/store/regulations/regulationsActions";
import { Form } from "../../../domain/models/types/EvaluationFormTypes";
import SectionEditor from "./SectionEditor";
import Button from "../UI/Button";
import { useRegulation } from "../../hooks/useRegulation"

const NormativeForm = () => {
  const dispatch = useAppDispatch();
  const { regulations, loading } = useRegulation();

  const methods = useForm<Form>({
    defaultValues: {
      regulationId: "",
      name: "",
      description: "",
      sections: [],
    },
  });

  const { register, handleSubmit, control } = methods;
  const {
    fields: sections,
    append: appendSection,
    remove: removeSection,
  } = useFieldArray({
    control,
    name: "sections",
  });

  useEffect(() => {
    dispatch(fetchRegulationsAction());
  }, [dispatch]);

  const onSubmit: SubmitHandler<Form> = (data) => {
    // Aquí despachas la acción para crear el formulario
    console.log("Formulario enviado:", data);
    dispatch(createEvaluationFormAction(data));
  };

  return (
    <FormProvider {...methods}>
      <section>
        <h2 className="text-xl font-semibold mb-4 text-center">
          Crear Formulario
        </h2>
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <select
                {...register("regulationId", { required: true })}
                className="w-full p-2 border rounded-md"
              >
                <option value="">-- Selecciona una normativa --</option>
                {(regulations ?? []).map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>

            <input
              {...register("name", { required: true })}
              placeholder="Nombre del formulario"
              className="w-full p-2 rounded-md border"
            />
            <textarea
              {...register("description")}
              placeholder="Descripción"
              className="w-full p-2 rounded-md border"
            />

            {sections.map((section, index) => (
              <div key={section.id}>
                <div className="flex flex-row">
                  <button
                    type="button"
                    onClick={() => removeSection(index)}
                    className="flex text-red-500 hover:text-red-700 transition-colors"
                  >
                    ❌
                  </button>
                  <h3 className="flex text-lg font-semibold mb-2">
                    Sección {index + 1}
                  </h3>
                </div>
                <SectionEditor key={section.id} sectionIndex={index} />
              </div>
            ))}

            <div className="flex gap-2">
              <Button
                type="button"
                onClick={() => appendSection({ title: "", questions: [] })}
                children="Agregar Sección"
              />
              <Button type="submit" children="Guardar Formulario" />
            </div>
          </form>
        )}
      </section>
    </FormProvider>
  );
};

export default NormativeForm;
