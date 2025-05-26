import React from "react";
import {
  LIGHT_MODE_COLORS,
  DARK_MODE_COLORS,
  GRADIENTS,
  DARK_GRADIENTS,
  ANIMATION_TIMINGS,
} from "../../shared/constants";
import AboutCard from "../components/about/AboutCard";
import TeamMemberCard from "../components/about/TeamMemberCard";

import juanFoto from "../../assets/img/team/juan_jaramillo.jpg";
import alejoFoto from "../../assets/img/team/alejandro_bravo.jpg";
import ludyFoto from "../../assets/img/team/ludy_astrid.jpg";

const teamMembers = [
  { name: "Juan Jaramillo", role: "Desarrollador Backend", image: juanFoto },
  { name: "Ludy Astrid", role: "Diseñadora UI/UX y Frontend", image: ludyFoto },
  { name: "Alejandro Bravo", role: "Arquitecto de Software", image: alejoFoto },
  {
    name: "José Sterling",
    role: "Ingeniero DevOps",
    image: "jose_sterling.jpg",
  },
];

const About = () => {
  return (
    <div
      className={`min-h-screen py-12 px-6 md:px-20 ${LIGHT_MODE_COLORS.BACKGROUND} ${DARK_MODE_COLORS.BACKGROUND} ${ANIMATION_TIMINGS.TRANSITION_DURATION}`}
    >
      {/* Header */}
      <section className="text-center mb-12">
        <h1
          className={`text-4xl font-bold mb-4 ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}`}
        >
          ¿Quiénes somos?
        </h1>
        <p
          className={`max-w-3xl mx-auto text-lg ${LIGHT_MODE_COLORS.TEXT_SECONDARY} ${DARK_MODE_COLORS.TEXT_SECONDARY}`}
        >
          Somos estudiantes de Ingeniería Informática de la Universidad Autónoma
          de Occidente. Conformamos <strong>ByteForge</strong>, una empresa
          emergente dedicada al desarrollo de soluciones digitales enfocadas en
          la gestión de cumplimiento normativo.
        </p>
      </section>

      {/* Tarjetas con AboutCard */}
      <section className="grid gap-8 md:grid-cols-2 mb-12">
        <AboutCard
          title="¿Qué hacemos?"
          description="En ByteForge diseñamos, desarrollamos e implementamos plataformas tecnológicas orientadas a automatizar procesos de evaluación, auditoría y cumplimiento normativo. Nos apoyamos en las bases de la Ingeniería Informática: arquitectura de software, bases de datos, interfaces de usuario, computación en la nube y seguridad informática. Nuestra herramienta permite que organizaciones gestionen normas como ISO 9001, ISO/IEC 27001 o ITIL 4 mediante formularios inteligentes, autoevaluaciones, seguimiento por secciones y reportes de cumplimiento dinámicos."
        />
        <AboutCard
          title="Nuestra misión"
          description="Desarrollar soluciones tecnológicas de alta calidad que automaticen y optimicen los procesos de evaluación y cumplimiento normativo en organizaciones públicas y privadas. Aplicamos el conocimiento adquirido en Ingeniería Informática para resolver problemas reales de forma innovadora, segura y eficiente."
        />
        <AboutCard
          title="Nuestra visión"
          description="Ser reconocidos como una empresa emergente de referencia en el desarrollo de software para la gestión del cumplimiento normativo. Queremos liderar con innovación y excelencia técnica desde la perspectiva de la Ingeniería Informática, contribuyendo activamente a la transformación digital de las organizaciones en Latinoamérica."
        />
        <AboutCard
          title="Nuestro origen"
          description="Formamos ByteForge, un equipo apasionado de estudiantes que unimos fuerzas para crear una solución real al problema del cumplimiento normativo. El equipo está conformado por Juan Eduardo Jaramillo, Ludy Astrid, Alejandro Bravo, José Sterling y más compañeros comprometidos con la excelencia tecnológica."
        />
      </section>

      {/* Equipo */}
      <section className="mb-12">
        <h2
          className={`text-3xl font-semibold mb-6 ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}`}
        >
          Nuestro equipo
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {teamMembers.map((member) => (
            <TeamMemberCard
              key={member.name}
              name={member.name}
              role={member.role}
              image={member.image}
            />
          ))}
        </div>
      </section>

      {/* Cierre promocional */}
      <section
        className={`rounded-xl p-6 text-white text-center ${GRADIENTS.WELCOME_BANNER} ${DARK_GRADIENTS.WELCOME_BANNER}`}
      >
        <h3 className="text-2xl font-bold mb-2">
          ByteForge: Innovando el cumplimiento normativo
        </h3>
        <p>
          Tu empresa puede estar siempre lista para auditorías, regulaciones y
          mejoras continuas con nuestras soluciones.
        </p>
      </section>
    </div>
  );
};

export default About;
