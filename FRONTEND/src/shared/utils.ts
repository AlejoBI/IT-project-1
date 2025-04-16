export const norms = ["ISO 9001", "ITIL 4", "ISO 27001", "NIST"];
export const normatives = {
    "ISO 9001": [
      {
        id: "iso9001-q1",
        question: "¿Se han definido procedimientos documentados para todos los procesos clave?",
        options: ["Sí", "No", "Parcialmente"],
      },
      {
        id: "iso9001-q2",
        question: "¿Se realizan auditorías internas periódicamente?",
        options: ["Sí", "No", "Parcialmente"],
      },
      {
        id: "iso9001-q3",
        question: "¿Existe un sistema de gestión de no conformidades?",
        options: ["Sí", "No", "Parcialmente"],
      },
    ],
    "ITIL 4": [
      {
        id: "itil4-q1",
        question: "¿Se utiliza un enfoque basado en valor para la gestión de servicios?",
        options: ["Sí", "No", "Parcialmente"],
      },
      {
        id: "itil4-q2",
        question: "¿Se han implementado prácticas de mejora continua (CSI)?",
        options: ["Sí", "No", "Parcialmente"],
      },
      {
        id: "itil4-q3",
        question: "¿Se gestionan incidentes de manera eficiente y efectiva?",
        options: ["Sí", "No", "Parcialmente"],
      },
    ],
    "ISO 27001": [
      {
        id: "iso27001-q1",
        question: "¿Se ha realizado un análisis de riesgos de seguridad de la información?",
        options: ["Sí", "No", "Parcialmente"],
      },
      {
        id: "iso27001-q2",
        question: "¿Se han implementado controles de acceso adecuados?",
        options: ["Sí", "No", "Parcialmente"],
      },
      {
        id: "iso27001-q3",
        question: "¿Se realizan copias de seguridad regulares de los datos críticos?",
        options: ["Sí", "No", "Parcialmente"],
      },
    ],
    "NIST": [
      {
        id: "nist-q1",
        question: "¿Se han identificado y documentado los activos de información?",
        options: ["Sí", "No", "Parcialmente"],
      },
      {
        id: "nist-q2",
        question: "¿Se han implementado políticas de cifrado para datos sensibles?",
        options: ["Sí", "No", "Parcialmente"],
      },
      {
        id: "nist-q3",
        question: "¿Se realizan pruebas de penetración regularmente?",
        options: ["Sí", "No", "Parcialmente"],
      },
    ],
  };