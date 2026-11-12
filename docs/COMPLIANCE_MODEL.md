# Modelo de cumplimiento

## Entidades y ciclo de vida

1. **Regulación:** identifica el marco evaluado mediante nombre, descripción,
   versión y, cuando aplica, `effectiveFrom`/`effectiveTo` en formato ISO 8601.
   Una fecha final anterior a la inicial es inválida; sin fechas, la vigencia se
   considera abierta hasta que se configure explícitamente.
2. **Formulario:** pertenece a una regulación y agrupa secciones y preguntas.
3. **Sesión de evaluación:** se crea como `in_progress`, acumula respuestas y
   secciones completadas, y puede reanudarse.
4. **Evaluación completada:** al enviar respuestas pasa a `completed` y conserva
   `userId`, `regulationId`, `formId`, respuestas y puntajes.
5. **Informe:** resume el resultado de una evaluación concreta y sus puntajes por
   sección.
6. **Auditoría:** se relaciona con el identificador exacto de la evaluación para
   permitir revisión posterior.

## Fórmula implementada

Solo las respuestas con `subQuestionId` o `subQuestionText` son evaluables.

- Una respuesta evaluable tiene un máximo de 100 puntos.
- `single-choice`: usa el `score` seleccionado, limitado a 100.
- `multiple-choice`: suma los `score` seleccionados, limitado a 100.
- `text` y otros tipos: actualmente reciben 100 puntos por defecto; esta regla
  debe revisarse si se incorporan respuestas textuales que requieran revisión.
- Puntaje de sección: `puntos_obtenidos / puntos_posibles * 100`, redondeado.
- Puntaje total: promedio simple de los puntajes de sección, redondeado.
- Sin respuestas evaluables, el puntaje es 0.

La función pura está en `services/compliance-service/src/services/calculateScores.ts`
y cuenta con pruebas de casos normales, acumulación múltiple y respuestas no
evaluables.

## Trazabilidad y límites

Los resultados conservan la sección y el título de sección, pero la versión del
formulario debe persistirse junto con la evaluación para garantizar auditorías
históricas. El resultado es una ayuda operativa para detectar brechas y no una
conclusión jurídica definitiva.
