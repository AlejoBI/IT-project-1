import React, { useEffect } from "react";
import { useForm, useFieldArray, FormProvider, SubmitHandler } from "react-hook-form";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { createEvaluationForm } from "../../../application/store/evaluationForm/evaluationFormActions";
import { fetchRegulationsAction } from "../../../application/store/regulations/regulationsActions";
import { Form } from "../../../domain/models/types/EvaluationFormTypes";
import SectionEditor from "./SectionEditor";
import {
  GRADIENTS,
  DARK_GRADIENTS,
  ANIMATION_TIMINGS,
} from "../../../shared/constants";
import Button from "../UI/Button";

const NormativeForm = () => {
  const dispatch = useAppDispatch();
  const { regulations, loading } = useAppSelector((state) => state.regulation);

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
    dispatch(createEvaluationForm(data));
  };

  return (
    <FormProvider {...methods}>
      <section
        className={`p-6 rounded-xl shadow-lg ${GRADIENTS.WELCOME_BANNER} ${DARK_GRADIENTS.WELCOME_BANNER} transition-colors ${ANIMATION_TIMINGS.TRANSITION_DURATION}`}
      >
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block mb-2 font-medium">
                Selecciona una normativa:
              </label>
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
              >
                Agregar Sección
              </Button>
              <Button type="submit">Guardar Formulario</Button>
            </div>
          </form>
        )}
      </section>
    </FormProvider>
  );
};

export default NormativeForm;
