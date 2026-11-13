import React, { useEffect } from "react";
import { useForm, useFieldArray, FormProvider, SubmitHandler } from "react-hook-form";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { createEvaluationFormAction } from "../../../application/store/evaluationForm/evaluationFormActions";
import { fetchRegulationsAction } from "../../../application/store/regulations/regulationsActions";
import { Form } from "../../../domain/models/types/EvaluationFormTypes";
import SectionEditor from "./SectionEditor";
import Button from "../UI/Button";
import { useRegulation } from "../../hooks/useRegulation";
import Notification from "../common/Notification";
import { LIGHT_MODE_COLORS, DARK_MODE_COLORS, UI_COLORS } from "../../../shared/constants";
import { Trash2 } from "lucide-react";

const NormativeForm = () => {
  const dispatch = useAppDispatch();
  const { regulations, loading, error } = useRegulation();

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

  const onSubmit: SubmitHandler<Form> = async (data) => {
    await dispatch(createEvaluationFormAction(data)).unwrap();
    methods.reset();
  };

  return (
    <FormProvider {...methods}>
      {error && <Notification message={error} type="error" />}
      <section
        className={`${UI_COLORS.SURFACE} ${UI_COLORS.BORDER} rounded-2xl border p-4 shadow-sm sm:p-6`}
      >
        <h2
          className={`text-2xl font-bold mb-6 text-center
            ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}`}
        >
          Crear Formulario
        </h2>
        {loading ? (
          <p className={`${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}`}>
            Cargando...
          </p>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <select
                {...register("regulationId", { required: true })}
                className={`w-full ${UI_COLORS.CONTROL} ${UI_COLORS.FOCUS} p-2.5`}
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
              className={`w-full ${UI_COLORS.CONTROL} ${UI_COLORS.FOCUS} p-2.5`}
            />
            <textarea
              {...register("description")}
              placeholder="Descripción"
              className={`w-full resize-none ${UI_COLORS.CONTROL} ${UI_COLORS.FOCUS} p-2.5`}
            />

            {sections.map((section, index) => (
              <div key={section.id}>
                <div className="mb-2 flex items-center gap-2">
                  <h3
                    className={`flex text-lg font-semibold
                      ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}
                      `}
                  >
                    Sección {index + 1}
                  </h3>
                  <div className="flex-1" />
                  <button
                    type="button"
                    onClick={() => removeSection(index)}
                    aria-label={`Eliminar sección ${index + 1}`}
                    className={`rounded-lg p-2 ${UI_COLORS.DANGER} ${UI_COLORS.DANGER_SURFACE} transition-colors`}
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
                <SectionEditor key={section.id} sectionIndex={index} />
              </div>
            ))}

            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
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
