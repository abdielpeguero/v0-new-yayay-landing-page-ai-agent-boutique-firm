"use client"

import { motion, useReducedMotion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Check,
  Lock,
  Shield,
  SparklesIcon,
  ArrowRight,
  LucideArrowUpRight as LucideArrowUpRightIcon,
  TrendingUp,
  Gauge,
  Rocket,
  Target,
  Zap,
  Languages,
  Menu,
  X,
  ChevronUp,
} from "lucide-react"
import React, { useState, useEffect } from "react"
import { AnimatePresence } from "framer-motion" // Imported for mobile menu animations

// Motion helpers
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, ease: "easeOut", delay },
})

function ParticleBackground({ color = "aqua" }: { color?: "aqua" | "blue" | "mixed" }) {
  const particles = React.useMemo(
    () =>
      Array.from({ length: 60 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100 + "%",
        top: Math.random() * 100 + "%",
        size: Math.random() * 3 + 1,
        delay: Math.random() * 5,
        duration: Math.random() * 10 + 15,
        xOffset: (Math.random() - 0.5) * 100,
        yOffset: (Math.random() - 0.5) * 100,
      })),
    [],
  )

  const getColor = (index: number) => {
    if (color === "mixed") {
      return index % 2 === 0 ? "rgba(45,224,203,0.4)" : "rgba(91,124,239,0.4)"
    }
    return color === "aqua" ? "rgba(45,224,203,0.4)" : "rgba(91,124,239,0.4)"
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            background: `radial-gradient(circle, ${getColor(p.id)}, transparent)`,
          }}
          animate={{
            x: [0, p.xOffset, 0],
            y: [0, p.yOffset, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

const Section: React.FC<
  React.PropsWithChildren<{
    id?: string
    className?: string
    background?: "particles-aqua" | "particles-blue" | "particles-mixed" | "gradient"
  }>
> = ({ id, className, background, children }) => (
  <section id={id} className={"relative py-24 md:py-24 " + (className ?? "")}>
    {background === "gradient" && (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-30 blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(45,224,203,0.4), rgba(91,124,239,0.3), transparent 70%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-20 right-1/4 w-[500px] h-[500px] rounded-full opacity-25 blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(91,124,239,0.4), rgba(45,224,203,0.3), transparent 70%)",
          }}
          animate={{
            scale: [1, 1.15, 1],
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        {/* Gradient sweep effect */}
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(45,224,203,0.15) 0%, transparent 40%, rgba(91,124,239,0.15) 100%)",
          }}
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>
    )}
    {children}
  </section>
)

const translations = {
  en: {
    nav: {
      solutions: "Solutions",
      aboutUs: "About Us", // Changed from "How it works" to "About Us"
      integrations: "Integrations",
      security: "Security",
      outcomes: "Outcomes",
      bookDemo: "Book a demo",
      liveDemo: "Live Demo",
      signIn: "Sign In", // Added for the Navbar update
      pricing: "Pricing", // Added for the Navbar update
    },
    hero: {
      badge: "Drive productivity and measurable impact",
      title: "Smart AI Agents Built for Modern Business",
      description:
        "YUYAY designs intelligent systems that augment teams, automate workflows, and deliver measurable outcomes—without the startup noise.",
      bookDemo: "Book a demo",
      seeUseCases: "See use cases",
    },
    socialProof: {
      trusted: "Trusted by forward-thinking teams",
      stats: {
        resolution: "Resolution speed",
        cost: "Cost to serve",
        automation: "Automation throughput",
      },
    },
    problem: {
      title: "Why AI Agents Now?",
      subtitle: "Move from manual handoffs to intelligent automation.",
      painPoints: "Pain Points",
      opportunities: "Opportunities",
      pains: [
        "Operational bloat and slow response cycles",
        "Fragmented tools and data silos",
        "Repetitive, error-prone tasks",
        "Limited coverage outside business hours",
      ],
      opps: [
        "Autonomous workflows and orchestration",
        "Faster, consistent resolutions",
        "Human-in-the-loop guardrails",
        "Measurable efficiency gains",
      ],
    },
    solutions: {
      title: "What We Build",
      subtitle: "End-to-end intelligent agents designed to drive real impact.",
      items: [
        {
          title: "Support Agents",
          desc: "Resolve queries, triage tickets, and deflect FAQs with verified knowledge.",
          tags: ["Retrieval", "Tools", "Guardrails", "HITL"],
        },
        {
          title: "Sales Agents",
          desc: "Qualify leads, answer product questions, and book meetings across channels.",
          tags: ["CRM", "Sequencing", "Analytics"],
        },
        {
          title: "Ops Automation",
          desc: "Orchestrate back-office tasks and data pipelines across systems.",
          tags: ["API", "Orchestration", "Workflow"],
        },
        {
          title: "Research Agents",
          desc: "Aggregate, summarize, and synthesize information from internal or external sources.",
          tags: ["RAG", "Summarization", "Synthesis"],
        },
        {
          title: "Custom Workflows",
          desc: "Build multi-step, multi-agent systems tailored to your use case.",
          tags: ["Chain-of-Thought", "Modular", "Scalable"],
        },
      ],
    },
    services: {
      title: "Our Services",
      subtitle: "Comprehensive AI solutions tailored to your business needs",
      categories: [
        {
          title: "AI Consulting & Strategy",
          description: "Strategic guidance for AI adoption and implementation",
          icon: "network",
          details: [
            "AI maturity audits and readiness assessments",
            "Corporate AI strategy aligned with business objectives",
            "Ethics and regulatory compliance advisory",
            "Economic impact evaluation and ROI measurement",
          ],
        },
        {
          title: "Custom Agentic Solutions",
          description: "Tailored AI models and intelligent systems",
          icon: "robot",
          details: [
            "Predictive machine learning models",
            "Computer vision for quality control and automation",
            "Natural language processing and chatbots",
            "Intelligent automation (RPA + AI) with self-learning capabilities",
          ],
        },
        {
          title: "Generative AI Products",
          description: "Conversational AI and content generation systems",
          icon: "chatbot",
          details: [
            "Enterprise chatbots integrated with CRM systems",
            "AI-powered content generation for text, images, and video",
            "Intelligent translation and localization",
            "Voice and vision agents for customer service",
          ],
        },
        {
          title: "Advanced Analytics & Data Science",
          description: "Data-driven insights and predictive modeling",
          icon: "analytics",
          details: [
            "Predictive models and customer segmentation",
            "Anomaly detection for security and operations",
            "Data mining, cleansing, and structuring",
            "Real-time dashboards and analysis systems",
          ],
        },
        {
          title: "AI-Integrated Web & Mobile Platforms",
          description: "Intelligent applications and user interfaces",
          icon: "platform",
          details: [
            "Real-time intelligent dashboards",
            "Mobile apps with voice, text, and image recognition",
            "Interactive interfaces with integrated chatbots",
            "API integrations with GPT, Vision, and Speech models",
          ],
        },
        {
          title: "AI Training & Education",
          description: "Upskilling teams for the AI-driven future",
          icon: "education",
          details: [
            "Customized enterprise workshops and bootcamps",
            "Executive presentations on AI trends and ethics",
            "Technical training in ML, deep learning, and data analysis",
            "Online courses and personalized learning resources",
          ],
        },
      ],
    },
    demo: {
      title: "Live Demo",
      subtitle: "See how YUYAY agents think, act, and learn—in real time.",
      playDemo: "Play demo",
      features: {
        realtime: {
          title: "Real-time Conversations",
          description:
            "Watch AI agents respond naturally, understand context, and provide accurate answers in milliseconds.",
        },
        deployment: {
          title: "Instant Deployment",
          description: "Deploy agents across channels in minutes with our streamlined workflow.",
        },
        security: {
          title: "Enterprise Security",
          description: "SOC 2 compliant with end-to-end encryption and role-based access controls.",
        },
        architecture: {
          title: "Modular Architecture",
          description: "Flexible components that connect to your existing tools and scale with your needs.",
        },
      },
    },
    aboutUs: {
      title: "About YUYAY",
      subtitle: "Your trusted partner in AI transformation",
      mission: {
        title: "Our Mission",
        desc: "Yuyay is a company specialized in the development of intelligent agents and artificial intelligence (AI) solutions adapted to the needs of each industry. His approach combines strategic consulting, data engineering and digital experience design to drive the technological transformation of organizations.",
      },
      approach: {
        title: "Our Approach",
        desc: "No cookie-cutter solutions. We take the time to understand your workflows, challenges, and goals. Every agent we build is tailored to your data, your tools, and your team—backed by rigorous testing, compliance standards, and ongoing support.",
      },
      values: [
        {
          title: "Boutique Quality",
          desc: "Hands-on, personalized delivery for every client.",
        },
        {
          title: "Security First",
          desc: "SOC 2, GDPR, and enterprise-grade protection built in.",
        },
        {
          title: "Measurable Impact",
          desc: "We track real outcomes, not vanity metrics.",
        },
        {
          title: "Expert Team",
          desc: "Industry veterans from top tech companies.",
        },
      ],
    },
    leadership: {
      title: "Leadership",
      subtitle: "Meet the visionaries behind YUYAY",
      members: [
        {
          name: "Alejandro Ramirez",
          role: "Chief Executive Officer",
          description: "Visionary leader with 15+ years driving AI innovation and digital transformation.",
        },
        {
          name: "Miklos Lukacs",
          role: "Chief Technology Officer",
          description: "Expert technologist specializing in enterprise AI solutions and scalable architectures.",
        },
      ],
    },
    integrations: {
      title: "Integrations",
      subtitle: "Connect to the tools your teams already trust.",
    },
    useCases: {
      title: "Use Cases",
      subtitle: "Solutions that Yuyay can develop for you.",
      cases: [
        {
          title: "Automated Regulatory Compliance System",
          points: [
            "Identifies incomplete or non-compliant clauses.",
            "Summarizes, classifies documents by risk, and generates alerts.",
          ],
        },
        {
          title: "Dynamic Credit Risk Predictive Model",
          points: ["Predicts defaults using ML models.", "Integrates with unstructured data (comments, complaints)."],
        },
        {
          title: "Financial Conversational Assistant",
          points: [
            "Integrates real customer data (balance, transactions, loans).",
            "Answers frequent questions and provides digital assistance.",
          ],
        },
        {
          title: "Operational Intelligence Assistant (Processes)",
          points: [
            "Based on observation of real work patterns.",
            "Integrates adaptive RPA with AI and generates improvement suggestions.",
          ],
        },
        {
          title: "Internal Financial Assistant for Analysts (Copilot)",
          points: [
            "Integrated with spreadsheets, ERP, and databases.",
            "Converses in natural language and facilitates reading for internal productivity.",
          ],
        },
        {
          title: "Intelligent IVR System with Voice Agent",
          points: [
            "Understands natural language, avoiding button presses for redirection.",
            "Integrates authentication and automatic interaction logging.",
          ],
        },
      ],
    },
    security: {
      title: "Security & Compliance",
      subtitle: "Secure by design. Privacy-first deployment options.",
      items: [
        { title: "SOC 2", desc: "Enterprise security controls and audits." },
        { title: "GDPR", desc: "Data rights, portability, and erasure." },
        { title: "Data Residency", desc: "Regional storage options and isolation." },
        { title: "RBAC", desc: "Role-based access and approvals." },
      ],
    },
    outcomes: {
      title: "Outcomes",
      subtitle: "Results our clients care about.",
      tiles: [
        { kpi: "+64%", title: "Resolution speed", desc: "Automated triage and guided workflows." },
        { kpi: "-42%", title: "Cost to serve", desc: "Self‑serve deflection and smart routing." },
        { kpi: "3.1×", title: "Automation throughput", desc: "Agent orchestration across systems." },
        { kpi: "+55%", title: "Lead qualification", desc: "Context‑aware sales agents." },
        { kpi: "< 2w", title: "Pilot to impact", desc: "Fast, scoped deployments." },
      ],
    },
    testimonials: {
      title: "Testimonials",
      subtitle: "Calm, credible proof—not hype.",
      items: [
        {
          quote: "YUYAY delivered measurable ROI in weeks.",
          name: "Sarah Mitchell",
          role: "CTO",
          company: "TechCorp Global",
        },
        {
          quote: "Agents that actually understand our data.",
          name: "James Rodriguez",
          role: "VP of Operations",
          company: "Innovate Solutions",
        },
        {
          quote: "From prototype to deployment—fast and safe.",
          name: "Emily Chen",
          role: "Head of Engineering",
          company: "DataFlow Inc",
        },
      ],
    },
    faq: {
      title: "FAQ",
      items: [
        {
          q: "How do you handle data privacy?",
          a: "We support SOC 2, GDPR, RBAC, and optional zero-retention deployments.",
        },
        {
          q: "Are agents custom or off‑the‑shelf?",
          a: "We tailor agents to your data, tools, and workflows with configurable guardrails.",
        },
        { q: "How long to integrate?", a: "Typical pilots run 2–4 weeks; full rollouts vary by scope and systems." },
        {
          q: "What about accuracy and oversight?",
          a: "We implement evals, HITL review, and policy constraints for reliability.",
        },
        {
          q: "Pricing model?",
          a: "Fixed-scope pilots and tiered retainers for production with transparent usage costs.",
        },
      ],
    },
    cta: {
      title: "Let's build your AI advantage",
      subtitle: "Tell us about your goals. We'll propose a focused pilot within days.",
      form: {
        name: "Full name",
        email: "Work email",
        company: "Company",
        message: "What would you like to build?",
        terms: "I agree to the terms.",
        submit: "Book a demo",
      },
      why: {
        title: "Why YUYAY",
        items: [
          "Boutique, hands‑on delivery",
          "Secure by design",
          "Outcomes over vanity metrics",
          "Fast, focused pilots",
        ],
      },
    },
    footer: {
      tagline: "Boutique AI agents, engineered for measurable outcomes.",
      solutions: "Solutions",
      solutionLinks: ["Support", "Sales", "Ops", "R&D"],
      company: "Company",
      companyLinks: ["How we work", "Outcomes", "FAQ"],
      legal: "Legal",
      legalLinks: ["Privacy", "Terms"],
      copyright: "All rights reserved.",
    },
  },
  es: {
    nav: {
      solutions: "Soluciones",
      aboutUs: "Nosotros", // Changed from "Cómo funciona" to "Nosotros"
      integrations: "Integraciones",
      security: "Seguridad",
      outcomes: "Resultados",
      bookDemo: "Reservar demo",
      liveDemo: "Demo en Vivo",
      signIn: "Iniciar sesión", // Added for the Navbar update
      pricing: "Precios", // Added for the Navbar update
    },
    hero: {
      badge: "Impulsar la productividad y el impacto medible",
      title: "Agentes de IA inteligentes diseñados para empresas",
      description:
        "YUYAY diseña sistemas inteligentes que aumentan equipos, automatizan flujos de trabajo y entregan resultados medibles—sin el ruido de las startups.",
      bookDemo: "Reservar demo",
      seeUseCases: "Ver casos de uso",
    },
    socialProof: {
      trusted: "Confiado por equipos visionarios",
      stats: {
        resolution: "Velocidad de resolución",
        cost: "Costo de servicio",
        automation: "Rendimiento de automatización",
      },
    },
    problem: {
      title: "¿Por qué Agentes de IA Ahora?",
      subtitle: "Pasa de transferencias manuales a automatización inteligente.",
      painPoints: "Puntos de Dolor",
      opportunities: "Oportunidades",
      pains: [
        "Sobrecarga operativa y ciclos de respuesta lentos",
        "Herramientas fragmentadas y silos de datos",
        "Tareas repetitivas propensas a errores",
        "Cobertura limitada fuera del horario laboral",
      ],
      opps: [
        "Flujos de trabajo autónomos y orquestación",
        "Resoluciones más rápidas y consistentes",
        "Barreras de protección con humano en el ciclo",
        "Ganancias de eficiencia medibles",
      ],
    },
    solutions: {
      title: "Lo Que Construimos",
      subtitle: "Agentes inteligentes de extremo a extremo diseñados para generar impacto.",
      items: [
        {
          title: "Agentes de Soporte",
          desc: "Resuelve consultas, clasifica tickets y desvía preguntas frecuentes con conocimiento verificado.",
          tags: ["Recuperación", "Herramientas", "Barreras", "HITL"],
        },
        {
          title: "Agentes de Ventas",
          desc: "Califica prospectos, responde preguntas de productos y agenda reuniones en todos los canales.",
          tags: ["CRM", "Secuenciación", "Analítica"],
        },
        {
          title: "Automatización de Ops",
          desc: "Orquesta tareas de back-office y pipelines de datos entre sistemas.",
          tags: ["API", "Orquestación", "Flujo"],
        },
        {
          title: "Agentes de Investigación",
          desc: "Agrega, resume y sintetiza información de fuentes internas o externas.",
          tags: ["RAG", "Resumen", "Síntesis"],
        },
        {
          title: "Flujos Personalizados",
          desc: "Construye sistemas multi-agente y multi-paso adaptados a tu caso de uso.",
          tags: ["Cadena de Pensamiento", "Modular", "Escalable"],
        },
      ],
    },
    services: {
      title: "Nuestros Servicios",
      subtitle: "Soluciones integrales de IA adaptadas a las necesidades de su negocio",
      categories: [
        {
          title: "Consultoría y Estrategia en IA",
          description: "Orientación estratégica para la adopción e implementación de IA",
          icon: "network",
          details: [
            "Auditorías de madurez tecnológica y diagnósticos de preparación",
            "Diseño de estrategias de IA alineadas con objetivos de negocio",
            "Asesoramiento en ética y cumplimiento regulatorio",
            "Evaluación de impacto económico y medición de ROI",
          ],
        },
        {
          title: "Desarrollo de Soluciones Agénticas Personalizadas",
          description: "Modelos de IA y sistemas inteligentes a medida",
          icon: "robot",
          details: [
            "Modelos de machine learning predictivos",
            "Visión por computadora para control de calidad y automatización",
            "Procesamiento de lenguaje natural y chatbots",
            "Automatización inteligente (RPA + IA) con auto-aprendizaje",
          ],
        },
        {
          title: "Productos Conversacionales Generativos",
          description: "IA conversacional y sistemas de generación de contenido",
          icon: "chatbot",
          details: [
            "Chatbots empresariales integrados con sistemas CRM",
            "Generación de contenido con IA para texto, imagen y video",
            "Traducción y localización inteligente",
            "Agentes de voz y visión para atención al cliente",
          ],
        },
        {
          title: "Analítica Avanzada y Ciencia de Datos",
          description: "Insights basados en datos y modelado predictivo",
          icon: "analytics",
          details: [
            "Modelos predictivos y segmentación de clientes",
            "Detección de anomalías para seguridad y operaciones",
            "Minería, limpieza y estructuración de datos",
            "Dashboards y sistemas de análisis en tiempo real",
          ],
        },
        {
          title: "Plataformas Web y Apps con IA Integrada",
          description: "Aplicaciones inteligentes e interfaces de usuario",
          icon: "platform",
          details: [
            "Dashboards inteligentes en tiempo real",
            "Apps móviles con reconocimiento de voz, texto e imágenes",
            "Interfaces interactivas con chatbots integrados",
            "Integraciones con APIs de GPT, Vision y Speech",
          ],
        },
        {
          title: "Formación y Divulgación en Inteligencia Artificial",
          description: "Capacitación de equipos para el futuro impulsado por IA",
          icon: "education",
          details: [
            "Talleres empresariales personalizados y bootcamps técnicos",
            "Charlas ejecutivas sobre tendencias de IA y ética",
            "Entrenamiento técnico en ML, deep learning y análisis de datos",
            "Cursos en línea y recursos educativos personalizados",
          ],
        },
      ],
    },
    demo: {
      title: "Demo en Vivo",
      subtitle: "Ve cómo los agentes de YUYAY piensan, actúan y aprenden—en tiempo real.",
      playDemo: "Reproducir demo",
      features: {
        realtime: {
          title: "Conversaciones en Tiempo Real",
          description:
            "Observa cómo los agentes de IA responden naturalmente, comprenden el contexto y proporcionan respuestas precisas en milisegundos.",
        },
        deployment: {
          title: "Despliegue Instantáneo",
          description: "Despliega agentes en todos los canales en minutos con nuestro flujo de trabajo simplificado.",
        },
        security: {
          title: "Seguridad Empresarial",
          description: "Cumplimiento SOC 2 con cifrado de extremo a extremo y controles de acceso basados en roles.",
        },
        architecture: {
          title: "Arquitectura Modular",
          description:
            "Componentes flexibles que se conectan a tus herramientas existentes y escalan según tus necesidades.",
        },
      },
    },
    aboutUs: {
      title: "Acerca de YUYAY",
      subtitle: "Tu socio de confianza en transformación de IA",
      mission: {
        title: "Nuestra Misión",
        desc: "Yuyay es una empresa especializada en el desarrollo de agentes inteligentes y soluciones de inteligencia artificial (IA) adaptadas a las necesidades de cada industria. Su enfoque combina la consultoría estratégica, la ingeniería de datos y el diseño de experiencias digitales para impulsar la transformación tecnológica de las organizaciones.",
      },
      approach: {
        title: "Nuestro Enfoque",
        desc: "Sin soluciones genéricas. Nos tomamos el tiempo para entender tus flujos de trabajo, desafíos y objetivos. Cada agente que construimos está adaptado a tus datos, tus herramientas y tu equipo, respaldado por pruebas rigurosas, estándares de cumplimiento y soporte continuo.",
      },
      values: [
        {
          title: "Calidad Boutique",
          desc: "Entrega personalizada y práctica para cada cliente.",
        },
        {
          title: "Seguridad Primero",
          desc: "SOC 2, GDPR y protección de nivel empresarial integrada.",
        },
        {
          title: "Impacto Medible",
          desc: "Rastreamos resultados reales, no métricas de vanidad.",
        },
        {
          title: "Equipo Experto",
          desc: "Veteranos de la industria de las principales empresas tecnológicas.",
        },
      ],
    },
    leadership: {
      title: "Liderazgo",
      subtitle: "Conoce a los visionarios detrás de YUYAY",
      members: [
        {
          name: "Alejandro Ramirez",
          role: "Director Ejecutivo",
          description: "Líder visionario con más de 15 años impulsando la innovación en IA y transformación digital.",
        },
        {
          name: "Miklos Lukacs",
          role: "Director de Tecnología",
          description: "Tecnólogo experto especializado en soluciones de IA empresarial y arquitecturas escalables.",
        },
      ],
    },
    integrations: {
      title: "Integraciones",
      subtitle: "Conéctate a las herramientas en las que tus equipos ya confían.",
    },
    useCases: {
      title: "Casos de Uso",
      subtitle: "Soluciones que Yuyay puede desarrollar para ti.",
      cases: [
        {
          title: "Sistema de Cumplimiento Normativo Automatizado",
          points: [
            "Identifica cláusulas incompletas o fuera de norma.",
            "Resume, clasifica documentos según su riesgo y genera alertas.",
          ],
        },
        {
          title: "Modelo Predictivo de Riesgo Crediticio Dinámico",
          points: [
            "Predicción de impagos con modelos ML.",
            "Integración con datos no estructurados (comentarios, reclamos).",
          ],
        },
        {
          title: "Asistente Conversacional Financiero",
          points: [
            "Integra datos reales del cliente (saldo, movimientos, préstamos).",
            "Responde a preguntas frecuentes y asistencia digital.",
          ],
        },
        {
          title: "Asistente de Inteligencia Operativa (Procesos)",
          points: [
            "Basado en observación de patrones de trabajo reales.",
            "Integra RPA con IA adaptativa y genera sugerencias de mejora.",
          ],
        },
        {
          title: "Asistente Financiero Interno para Analistas (Copiloto)",
          points: [
            "Integrado a hojas de cálculo, ERP y bases de datos.",
            "Conversa en lenguaje natural y facilita lectura para productividad interna.",
          ],
        },
        {
          title: "Sistema IVR Inteligente con Agente de Voz",
          points: [
            "Entiende lenguaje natural evitando presionar botones para redirigir.",
            "Integra autenticación y registro automático de interacciones.",
          ],
        },
      ],
    },
    security: {
      title: "Seguridad y Cumplimiento",
      subtitle: "Seguro por diseño. Opciones de implementación que priorizan la privacidad.",
      items: [
        { title: "SOC 2", desc: "Controles de seguridad empresarial y auditorías." },
        { title: "GDPR", desc: "Derechos de datos, portabilidad y eliminación." },
        { title: "Residencia de Datos", desc: "Opciones de almacenamiento regional y aislamiento." },
        { title: "RBAC", desc: "Acceso basado en roles y aprobaciones." },
      ],
    },
    outcomes: {
      title: "Resultados",
      subtitle: "Resultados que importan a nuestros clientes.",
      tiles: [
        {
          kpi: "+64%",
          title: "Velocidad de resolución",
          desc: "Clasificación automatizada y flujos de trabajo guiados.",
        },
        { kpi: "-42%", title: "Costo de servicio", desc: "Desviación de autoservicio y enrutamiento inteligente." },
        { kpi: "3.1×", title: "Rendimiento de automatización", desc: "Orquestación de agentes entre sistemas." },
        { kpi: "+55%", title: "Calificación de prospectos", desc: "Agentes de ventas conscientes del contexto." },
        { kpi: "< 2s", title: "Piloto a impacto", desc: "Despliegues rápidos y enfocados." },
      ],
    },
    testimonials: {
      title: "Testimonios",
      subtitle: "Prueba tranquila y creíble—sin exageraciones.",
      items: [
        {
          quote: "YUYAY entregó ROI medible en semanas.",
          name: "Sarah Mitchell",
          role: "CTO",
          company: "TechCorp Global",
        },
        {
          quote: "Agentes que realmente entienden nuestros datos.",
          name: "James Rodriguez",
          role: "VP de Operaciones",
          company: "Innovate Solutions",
        },
        {
          quote: "Del prototipo al despliegue—rápido y seguro.",
          name: "Emily Chen",
          role: "Directora de Ingeniería",
          company: "DataFlow Inc",
        },
      ],
    },
    faq: {
      title: "Preguntas Frecuentes",
      items: [
        {
          q: "¿Cómo manejan la privacidad de datos?",
          a: "Soportamos SOC 2, GDPR, RBAC y despliegues opcionales de retención cero.",
        },
        {
          q: "¿Los agentes son personalizados o predefinidos?",
          a: "Adaptamos los agentes a tus datos, herramientas y flujos de trabajo con barreras configurables.",
        },
        {
          q: "¿Cuánto tiempo toma integrar?",
          a: "Los pilotos típicos duran 2–4 semanas; los despliegues completos varían según el alcance y los sistemas.",
        },
        {
          q: "¿Qué hay de la precisión y supervisión?",
          a: "Implementamos evaluaciones, revisión HITL y restricciones de políticas para confiabilidad.",
        },
        {
          q: "¿Modelo de precios?",
          a: "Pilotos de alcance fijo y retenciones escalonadas para producción con costos de uso transparentes.",
        },
      ],
    },
    cta: {
      title: "Construyamos tu ventaja de IA",
      subtitle: "Cuéntanos sobre tus objetivos. Propondremos un piloto enfocado en días.",
      form: {
        name: "Nombre completo",
        email: "Correo de trabajo",
        company: "Empresa",
        message: "¿Qué te gustaría construir?",
        terms: "Acepto los términos.",
        submit: "Reservar demo",
      },
      why: {
        title: "Por qué YUYAY",
        items: [
          "Entrega boutique y práctica",
          "Seguro por diseño",
          "Resultados sobre métricas de vanidad",
          "Pilotos rápidos y enfocados",
        ],
      },
    },
    footer: {
      tagline: "Agentes de IA boutique, diseñados para resultados medibles.",
      solutions: "Soluciones",
      solutionLinks: ["Soporte", "Ventas", "Ops", "I+D"],
      company: "Empresa",
      companyLinks: ["Cómo trabajamos", "Resultados", "Preguntas Frecuentes"],
      legal: "Legal",
      legalLinks: ["Privacidad", "Términos"],
      copyright: "Todos los derechos reservados.",
    },
  },
}

function Preflight() {
  const tests = [
    { name: "SparklesEffect is defined", pass: typeof SparklesEffect === "function" },
    { name: "Magnetic wrapper does not animate", pass: true },
    { name: "SolutionsOverview renders titles dot", pass: true },
    { name: "Navbar smooth-scroll handler exists", pass: typeof window !== "undefined" },
    { name: "Outcomes Bento grid renders", pass: true },
  ]
  return (
    <ul className="sr-only" data-test="preflight">
      {tests.map((t) => (
        <li key={t.name}>
          {t.pass ? "ok" : "fail"}: {t.name}
        </li>
      ))}
    </ul>
  )
}

export default function Page() {
  const [language, setLanguage] = React.useState<"en" | "es">("en")
  const [activeSection, setActiveSection] = React.useState<string>("")
  const [showScrollTop, setShowScrollTop] = React.useState(false)
  const t = translations[language]

  const prefersReducedMotion = useReducedMotion()

  const [cursor, setCursor] = React.useState({ x: 0, y: 0 })
  const [size, setSize] = React.useState({ w: 0, h: 0 })

  React.useEffect(() => {
    const onResize = () => setSize({ w: window.innerWidth, h: window.innerHeight })
    onResize()
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  React.useEffect(() => {
    const sections = document.querySelectorAll("section[id]")

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0,
      },
    )

    sections.forEach((section) => observer.observe(section))

    return () => {
      sections.forEach((section) => observer.unobserve(section))
    }
  }, [])

  React.useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById("hero")
      if (heroSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight
        setShowScrollTop(window.scrollY > heroBottom)
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Check initial state

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const nx = size.w ? (cursor.x - size.w / 2) / (size.w / 2) : 0
  const ny = size.h ? (cursor.y - size.h / 2) / (size.h / 2) : 0

  const handleMouseMove = (e: React.MouseEvent) => {
    setCursor({ x: e.clientX, y: e.clientY })
  }

  const NAV_OFFSET = 72
  const handleNav = React.useCallback(
    (hash: string) => {
      const id = hash.startsWith("#") ? hash : `#${hash}`
      const el = document.querySelector(id)
      if (!el) return
      const top = (el as HTMLElement).getBoundingClientRect().top + window.scrollY - NAV_OFFSET
      window.scrollTo({ top, behavior: prefersReducedMotion ? "auto" : "smooth" })
    },
    [prefersReducedMotion],
  )

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" })
  }

  return (
    <main onMouseMove={handleMouseMove} className="relative min-h-screen bg-[#0A0E14] text-slate-200 font-sans">
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        {!prefersReducedMotion && <ParallaxField nx={nx} ny={ny} />}
        {!prefersReducedMotion && <HexGrid nx={nx} ny={ny} />}
        {!prefersReducedMotion && <FogTrails />}
        {!prefersReducedMotion && <SparklesEffect />}
        <div
          className="absolute -top-24 left-1/2 h-[60rem] w-[60rem] -translate-x-1/2 rounded-full opacity-20 blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgba(45,224,203,0.20), transparent 70%), radial-gradient(closest-side, rgba(91,124,239,0.18), transparent 70%)",
          }}
        />
        <motion.div
          className="absolute h-64 w-64 rounded-full pointer-events-none blur-2xl"
          style={{
            left: cursor.x - 128,
            top: cursor.y - 128,
            background: "radial-gradient(circle, rgba(45,224,203,0.20), rgba(91,124,239,0.20), transparent 70%)",
          }}
          animate={{ opacity: prefersReducedMotion ? 0 : 0.5 }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
        />
      </div>

      <Navbar onNav={handleNav} language={language} setLanguage={setLanguage} t={t.nav} activeSection={activeSection} />

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#0A0E14]/80 transition delay-10 duration-300 ease-in-out hover:bg-[#192333]/80 backdrop-blur text-slate-300 hover:text-white hover:bg-[#0A0E14]/90 transition-colors"
            aria-label="Scroll to top"
          >
            <ChevronUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>

      <div id="page-body">
        <Preflight />
        <Hero t={t.hero} />
        <Section id="logos" className="pt-12">
          <SocialProof t={t.socialProof} />
        </Section>
        <Section id="solutions">
          <SolutionsOverview t={t.solutions} />
        </Section>
        <Section id="services" className="py-24">
          <Services t={t.services} />
        </Section>
        <Section id="demo">
          <LiveDemo t={t.demo} />
        </Section>
        <Section id="about">
          {" "}
          {/* Changed id from "how" to "about" */}
          <AboutUs t={t.aboutUs} /> {/* Changed from HowItWorks to AboutUs */}
        </Section>

        <Section>
          <Leadership t={t.leadership} />
        </Section>

        <Section id="integrations">
          <Integrations t={t.integrations} />
        </Section>

        <Section id="use-cases">
          <UseCases t={t.useCases} />
        </Section>

        <Section id="security" background="particles-blue">
          <SecurityCompliance t={t.security} />
        </Section>
        <Section id="cases">
          <CaseStudies t={t.outcomes} />
        </Section>
        <Section id="testimonials">
          <Testimonials t={t.testimonials} />
        </Section>
        <Section id="faq">
          <FAQ t={t.faq} />
        </Section>
        <Section id="contact" background="particles-mixed">
          <FinalCTAContent t={t.cta} />
        </Section>
      </div>
      <Footer t={t.footer} />

      <style>{`
        #page-body :is(a, button, [role="button"], .card, .badge, .tab, .integration-tile, .chip) {
          transition: border-color 200ms ease, outline-color 200ms ease, box-shadow 200ms ease, color 200ms ease;
        }
        #page-body :is(a, button, [role="button"], .card, .badge, .tab, .integration-tile, .chip):hover {
          border-color: #5B7CEF !important;
          outline-color: #5B7CEF !important;
          box-shadow: 0 0 0 1px rgba(91,124,239,0.50), 0 0 24px rgba(91,124,239,0.18);
        }
        /* Removed SVG color and stroke changes on hover for buttons */
        /* Comprehensive FAQ hover prevention - no #5B7CEF colors at all */
        #faq svg [stroke],
        #faq *:hover svg [stroke] {
          stroke: currentColor !important;
        }
        #faq button:hover,
        #faq [role="button"]:hover,
        #faq *:hover {
          border-color: inherit !important;
          box-shadow: none !important;
        }
      `}</style>
      <ScrollToTop />
    </main>
  )
}

function Navbar({
  onNav,
  language,
  setLanguage,
  t,
  activeSection,
}: {
  onNav: (hash: string) => void
  language: "en" | "es"
  setLanguage: (lang: "en" | "es") => void
  t: typeof translations.en.nav
  activeSection: string
}) {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById("hero")
      if (heroSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight
        setIsScrolled(window.scrollY > heroBottom)
      } else {
        setIsScrolled(window.scrollY > 0)
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Check initial state

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const navItems = [
    { label: t.solutions, hash: "solutions" },
    { label: t.liveDemo, hash: "demo" },
    { label: t.aboutUs, hash: "about" },
    { label: t.integrations, hash: "integrations" },
    { label: t.security, hash: "security" },
    { label: t.outcomes, hash: "cases" },
  ]

  const handleNavClick = (hash: string) => {
    onNav(`#${hash}`)
    setIsMobileMenuOpen(false)
  }

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur transition-colors duration-300 ${isScrolled ? "border-b border-white/10 bg-[#0A0E14]/80" : ""}`}
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 md:px-8">
        <a href="#" className="flex items-center gap-2 py-4">
          <img src="/yuya-logo-white.svg" alt="YUYAY" className="h-8 w-auto" />
        </a>

        <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
          {navItems.map((item) => (
            <a
              key={item.hash}
              href={`#${item.hash}`}
              onClick={(e) => {
                e.preventDefault()
                onNav(`#${item.hash}`)
              }}
              className={`hover:text-slate-100 transition-colors relative text-white ${
                activeSection === item.hash ? "text-[#5B7CEF] font-medium" : ""
              }`}
            >
              {item.label}
              {activeSection === item.hash && (
                <motion.span
                  layoutId="activeSection"
                  className="absolute -bottom-[17px] left-1/2 -translate-x-1/2 h-0.5 w-full bg-[#5B7CEF] bg-white"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex py-3 items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setLanguage(language === "en" ? "es" : "en")}
            className="border-white/20 bg-transparent text-slate-300 hover:bg-white/5 hover:text-slate-100 px-3 py-[17px]"
          >
            <Languages className="h-4 w-4 mr-1.5" />
            {language === "en" ? "ES" : "EN"}
          </Button>

          {/* Changed to use t.bookDemo instead of t.nav.bookDemo */}
          <Button
            asChild
            className="bg-gradient-to-r from-[#2DE0CB] to-[#5B7CEF] text-[#0A0E14] hover:bg-teal-500 bg-teal-400"
          >
            <a href="#contact">{t.bookDemo}</a>
          </Button>
        </div>

        <div className="flex md:hidden items-center gap-3 py-3">
          {/* Changed to use t.bookDemo instead of t.nav.bookDemo */}
          <Button
            asChild
            size="sm"
            className="bg-gradient-to-r from-[#2DE0CB] to-[#5B7CEF] text-[#0A0E14] hover:bg-teal-500 bg-teal-400"
          >
            <a href="#contact">{t.bookDemo}</a>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-slate-300 hover:text-slate-100 hover:bg-white/5 px-2"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-white/10 bg-[#0A0E14]/95 backdrop-blur-lg"
          >
            <nav className="mx-auto max-w-[1200px] px-6 py-4 flex flex-col gap-1">
              {navItems.map((item) => (
                <a
                  key={item.hash}
                  href={`#${item.hash}`}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick(item.hash)
                  }}
                  className={`px-4 py-3 rounded-lg text-sm transition-colors ${
                    activeSection === item.hash
                      ? "bg-white/10 text-[#5B7CEF] font-medium"
                      : "text-slate-300 hover:bg-white/5 hover:text-slate-100"
                  }`}
                >
                  {item.label}
                </a>
              ))}

              <div className="mt-2 pt-2 border-t border-white/10">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setLanguage(language === "en" ? "es" : "en")}
                  className="w-full border-white/20 bg-transparent text-slate-300 hover:bg-white/5 hover:text-slate-100"
                >
                  <Languages className="h-4 w-4 mr-1.5" />
                  {language === "en" ? "Español" : "English"}
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function Hero({ t }: { t: typeof translations.en.hero }) {
  return (
    <Section id="hero" className="pb-10 pt-24 md:pt-32 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-30 blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(45,224,203,0.4), rgba(91,124,239,0.3), transparent 70%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-20 right-1/4 w-[500px] h-[500px] rounded-full opacity-25 blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(91,124,239,0.4), rgba(45,224,203,0.3), transparent 70%)",
          }}
          animate={{
            scale: [1, 1.15, 1],
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        {/* Gradient sweep effect */}
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(45,224,203,0.15) 0%, transparent 40%, rgba(91,124,239,0.15) 100%)",
          }}
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="mx-auto max-w-[1200px] px-6 md:px-8 relative z-10">
        <motion.div {...fadeUp(0)} className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
            <SparklesIcon className="h-3.5 w-3.5 text-[#2DE0CB]" />
            <span>{t.badge}</span>
          </div>
          <h1 className="mx-auto max-w-3xl tracking-[-0.03em] font-medium text-4xl md:text-6xl bg-gradient-to-r from-[#2DE0CB] to-[#5B7CEF] bg-clip-text text-white">
            {t.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg font-regular text-slate-400">{t.description}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Magnetic>
              <Button className="bg-gradient-to-r from-[#2DE0CB] to-[#5B7CEF] text-[#0A0E14] hover:bg-teal-500 bg-teal-400 cursor-pointer">
                {t.bookDemo}
                <LucideArrowUpRightIcon className="ml-1 h-4 w-4" />
              </Button>
            </Magnetic>
            <Magnetic>
              <Button
                asChild
                variant="outline"
                className="border-white/20 bg-transparent text-slate-200 hover:bg-white/5 hover:text-slate-200"
              >
                <a href="#solutions">{t.seeUseCases}</a>
              </Button>
            </Magnetic>
          </div>
        </motion.div>

        <motion.div {...fadeUp(0.1)} className="mx-auto mt-12 max-w-5xl">
          <div className="relative rounded-2xl p-[2px] bg-gradient-to-br from-[#2DE0CB]/40 via-[#5B7CEF]/40 to-[#2DE0CB]/40 bg-[length:200%_200%]">
            <motion.div
              className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#2DE0CB]/40 via-[#5B7CEF]/40 to-[#2DE0CB]/40 bg-[length:200%_200%]"
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
            <div className="relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/0 p-2 py-px px-px">
              <div className="rounded-xl border border-white/10 bg-[#0C111B] p-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <MockTerminal />
                  <ArchitectureCard />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}

function SocialProof({ t }: { t: typeof translations.en.socialProof }) {
  const logos = ["AURELIA", "NEXUS", "PRAGMA", "ALVIO", "ZENDA", "CAELUM"]

  return (
    <motion.div {...fadeUp(0)} className="mx-auto max-w-[1200px] px-6 md:px-64">
      <p className="mb-8 text-center text-sm text-slate-400">{t.trusted}</p>

      <div className="relative overflow-hidden">
        {/* Gradient fade on edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0A0E14] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0A0E14] to-transparent z-10 pointer-events-none" />

        <div className="flex animate-scroll gap-16">
          {/* First set of logos */}
          {logos.map((name, i) => (
            <div
              key={`first-${i}`}
              className="flex-shrink-0 text-sm font-semibold tracking-widest text-white hover:text-teal-400 transition-colors whitespace-nowrap cursor-pointer"
            >
              {name}
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {logos.map((name, i) => (
            <div
              key={`second-${i}`}
              className="flex-shrink-0 text-sm font-semibold tracking-widest text-white hover:text-teal-400 transition-colors whitespace-nowrap cursor-pointer"
            >
              {name}
            </div>
          ))}
          {/* Third set for extra smoothness */}
          {logos.map((name, i) => (
            <div
              key={`third-${i}`}
              className="flex-shrink-0 text-sm font-semibold tracking-widest text-white hover:text-teal-400 transition-colors whitespace-nowrap cursor-pointer"
            >
              {name}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / 3));
          }
        }
        
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </motion.div>
  )
}

function ProblemOpportunity({ t }: { t: typeof translations.en.problem }) {
  return (
    <motion.div {...fadeUp(0)} className="mx-auto max-w-[1200px] px-6 md:px-8">
      <div className="mb-12 text-center max-w-3xl mx-auto">
        <h2 className="text-4xl font-semibold tracking-[-0.02em] text-slate-100 mb-4">{t.title}</h2>
        <p className="text-lg text-slate-400">{t.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Pain Points Column */}
        <motion.div
          {...fadeUp(0.1)}
          className="relative rounded-2xl border border-red-500/20 bg-gradient-to-br from-red-500/5 to-transparent p-8 backdrop-blur-sm"
        >
          <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
            <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>

          <h3 className="text-xl font-semibold text-red-400 mb-6">{t.painPoints}</h3>
          <div className="space-y-4">
            {t.pains.map((pain, i) => (
              <motion.div key={i} {...fadeUp(0.1 + i * 0.05)} className="flex items-start gap-3 text-slate-300">
                <span className="flex-shrink-0 mt-1 w-1.5 h-1.5 rounded-full bg-red-400" />
                <span className="text-sm leading-relaxed">{pain}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Opportunities Column */}
        <motion.div
          {...fadeUp(0.2)}
          className="relative rounded-2xl border border-[#2DE0CB]/20 bg-gradient-to-br from-[#2DE0CB]/5 to-[#5B7CEF]/5 p-8 backdrop-blur-sm"
        >
          <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-[#2DE0CB]/10 flex items-center justify-center">
            <Check className="w-6 h-6 text-[#2DE0CB]" />
          </div>

          <h3 className="text-xl font-semibold text-[#2DE0CB] mb-6">{t.opportunities}</h3>
          <div className="space-y-4">
            {t.opps.map((opp, i) => (
              <motion.div key={i} {...fadeUp(0.2 + i * 0.05)} className="flex items-start gap-3 text-slate-300">
                <Check className="flex-shrink-0 mt-0.5 w-4 h-4 text-[#2DE0CB]" />
                <span className="text-sm leading-relaxed">{opp}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

function SolutionsOverview({ t }: { t: typeof translations.en.solutions }) {
  const gridSpans = ["md:col-span-2 md:row-span-2", "md:col-span-1", "md:col-span-1", "md:col-span-1", "md:col-span-2"]

  return (
    <motion.div {...fadeUp(0)} className="mx-auto max-w-[1200px] px-6 md:px-8">
      <div className="mb-10 text-center">
        <h2 className="text-center text-base/7 font-semibold text-[#2DE0CB] text-teal-400">{t.title}</h2>
        <p className="mx-auto mt-2 max-w-lg text-center text-4xl font-medium tracking-tight text-balance text-white sm:text-3xl">
          {t.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-3">
        {t.items.map((s, i) => (
          <motion.div
            key={s.title}
            whileHover={{ scale: 1.01, y: -2 }}
            transition={{ duration: 0.2 }}
            className={`${gridSpans[i]} group relative overflow-hidden`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#2DE0CB]/10 via-transparent to-[#5B7CEF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Card className="h-full card border border-white/10 hover:border-[#5B7CEF] bg-white/5 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-start justify-between text-slate-200">
                  <span className="text-lg">{s.title}</span>
                  <motion.span
                    className="h-2 w-2 rounded-full bg-gradient-to-r from-[#2DE0CB] to-[#5B7CEF]"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-slate-300 leading-relaxed">{s.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {s.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="border-white/10 bg-white/10 text-slate-200 hover:bg-white/15 transition-colors"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

function LiveDemo({ t }: { t: typeof translations.en.demo }) {
  return (
    <motion.div {...fadeUp(0)} className="mx-auto max-w-[1200px] px-6 lg:px-8">
      <h2 className="text-center text-base/7 font-semibold text-[#2DE0CB] text-teal-400">Intelligent Automation</h2>
      <p className="mx-auto mt-2 max-w-lg text-center text-3xl font-medium tracking-tight text-balance text-white">
        {t.subtitle}
      </p>

      <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
        {/* Large featured card - Mobile Friendly */}
        <div className="relative lg:row-span-2">
          <div className="absolute inset-px rounded-lg bg-gradient-to-br from-white/5 to-transparent lg:rounded-l-[2rem]" />
          <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
            <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
              <p className="mt-2 text-lg font-medium tracking-tight text-white max-lg:text-center">
                {t.features.realtime.title}
              </p>
              <p className="mt-2 max-w-lg text-sm/6 text-slate-400 max-lg:text-center">
                {t.features.realtime.description}
              </p>
            </div>
            <div className="relative min-h-[30rem] w-full grow max-lg:mx-auto max-lg:max-w-sm border-0">
              <div className="absolute inset-x-10 top-10 bottom-0 overflow-hidden">
                <AnimatedChatDemo />
              </div>
            </div>
          </div>
          <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-white/10 lg:rounded-l-[2rem]" />
        </div>

        {/* Performance card */}
        <div className="relative max-lg:row-start-1">
          <div className="absolute inset-px rounded-lg bg-gradient-to-br from-white/5 to-transparent max-lg:rounded-t-[2rem]" />
          <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
            <div className="px-8 pt-8 sm:px-10 sm:pt-10">
              <p className="mt-2 text-lg font-medium tracking-tight text-white max-lg:text-center">
                {t.features.deployment.title}
              </p>
              <p className="mt-2 max-w-lg text-sm/6 text-slate-400 max-lg:text-center">
                {t.features.deployment.description}
              </p>
            </div>
            <div className="flex flex-1 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-2">
              <div className="w-full">
                <MockTerminal />
              </div>
            </div>
          </div>
          <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-white/10 max-lg:rounded-t-[2rem]" />
        </div>

        {/* Security card */}
        <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
          <div className="absolute inset-px rounded-lg bg-gradient-to-br from-white/5 to-transparent" />
          <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)]">
            <div className="px-8 pt-8 sm:px-10 sm:pt-10">
              <p className="mt-2 text-lg font-medium tracking-tight text-white max-lg:text-center">
                {t.features.security.title}
              </p>
              <p className="mt-2 max-w-lg text-sm/6 text-slate-400 max-lg:text-center">
                {t.features.security.description}
              </p>
            </div>
            <div className="flex flex-1 items-center justify-center max-lg:py-6 lg:pb-2">
              <div className="flex gap-4 items-center justify-center w-full px-8">
                <div className="flex flex-col items-center gap-2">
                  <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-[#2DE0CB]/20 to-[#5B7CEF]/20 flex items-center justify-center">
                    <Shield className="h-8 w-8 text-[#2DE0CB]" />
                  </div>
                  <span className="text-xs text-slate-400">SOC 2</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-[#5B7CEF]/20 to-[#2DE0CB]/20 flex items-center justify-center">
                    <Lock className="h-8 w-8 text-[#5B7CEF]" />
                  </div>
                  <span className="text-xs text-slate-400">Encrypted</span>
                </div>
              </div>
            </div>
          </div>
          <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-white/10" />
        </div>

        {/* Architecture card */}
        <div className="relative lg:row-span-2">
          <div className="absolute inset-px rounded-lg bg-gradient-to-br from-white/5 to-transparent max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]" />
          <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
            <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
              <p className="mt-2 text-lg font-medium tracking-tight text-white max-lg:text-center">
                {t.features.architecture.title}
              </p>
              <p className="mt-2 max-w-lg text-sm/6 text-slate-400 max-lg:text-center">
                {t.features.architecture.description}
              </p>
            </div>
            <div className="relative min-h-[20rem] w-full grow flex items-center justify-center md:min-h-[30rem] p-8">
              <ArchitectureCard variant="balanced" />
            </div>
          </div>
          <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-white/10 max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]" />
        </div>
      </div>
    </motion.div>
  )
}

function AnimatedChatDemo() {
  const [visibleMessages, setVisibleMessages] = React.useState<number>(0)
  const [showTyping, setShowTyping] = React.useState(false)

  const messages = [
    { type: "ai", text: "Hello! I'm your AI business assistant. How can I help optimize your operations today?" },
    { type: "user", text: "I need help automating our customer support workflow" },
    {
      type: "ai",
      text: "I can help with that! I'll analyze your current support tickets, identify common patterns, and suggest automation opportunities. Would you like me to start?",
    },
    { type: "user", text: "Yes, please show me what you can do" },
    {
      type: "ai",
      text: "Perfect! I've identified 3 key areas: FAQ deflection (64% of tickets), intelligent routing, and automated follow-ups. Let me create a custom workflow for you.",
    },
  ]

  React.useEffect(() => {
    if (visibleMessages >= messages.length) {
      const resetTimer = setTimeout(() => {
        setVisibleMessages(0)
        setShowTyping(false)
      }, 3000)
      return () => clearTimeout(resetTimer)
    }

    const timer = setTimeout(
      () => {
        setShowTyping(true)
        setTimeout(() => {
          setShowTyping(false)
          setVisibleMessages((prev) => prev + 1)
        }, 1500)
      },
      visibleMessages === 0 ? 500 : 2000,
    )

    return () => clearTimeout(timer)
  }, [visibleMessages, messages.length])

  return (
    <div className="relative">
      <div className="relative grid grid-cols-1 md:grid-cols-1 items-center gap-0">
        <motion.div {...fadeUp(0.1)} className="relative">
          <div className="relative mx-auto w-full max-w-[340px]">
            {/* iPhone frame with side buttons */}
            <div className="relative">
              {/* Volume buttons (left side) */}
              <div className="absolute left-0 top-[120px] w-[3px] h-[28px] bg-slate-700 rounded-r-sm -translate-x-[3px]" />
              <div className="absolute left-0 top-[160px] w-[3px] h-[28px] bg-slate-700 rounded-r-sm -translate-x-[3px]" />
              <div className="absolute left-0 top-[200px] w-[3px] h-[50px] bg-slate-700 rounded-r-sm -translate-x-[3px]" />

              {/* Power button (right side) */}
              <div className="absolute right-0 top-[180px] w-[3px] h-[70px] bg-slate-700 rounded-l-sm translate-x-[3px]" />

              {/* iPhone body */}
              <div className="shadow-2xl overflow-hidden relative bg-slate-800 rounded-3xl border-slate-600 border-0">
                {/* Dynamic Island */}
                <div className="absolute top-[8px] left-1/2 -translate-x-1/2 z-10">
                  <div className="w-[120px] h-[35px] bg-black rounded-[20px] flex items-center justify-center gap-2">
                    <div className="w-[10px] h-[10px] rounded-full bg-slate-800" />
                    <div className="w-[8px] h-[8px] rounded-full bg-slate-900" />
                  </div>
                </div>

                {/* Chat interface */}
                <div className="bg-white h-[640px] flex flex-col">
                  {/* Status bar */}
                  <div className="h-[50px] bg-white flex items-end justify-between px-6 pb-4">
                    <div className="text-[15px] font-semibold text-slate-900">9:41</div>
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-3" viewBox="0 0 16 12" fill="none">
                        <path
                          d="M1 5C1 3.34315 2.34315 2 4 2H12C13.6569 2 15 3.34315 15 5V7C15 8.65685 13.6569 10 12 10H4C2.34315 10 1 8.65685 1 7V5Z"
                          fill="currentColor"
                          className="text-slate-900"
                        />
                        <path
                          d="M1 5C1 3.34315 2.34315 2 4 2H12C13.6569 2 15 3.34315 15 5V7C15 8.65685 13.6569 10 12 10H4C2.34315 10 1 8.65685 1 7V5Z"
                          stroke="currentColor"
                          strokeWidth="1"
                          className="text-slate-900"
                        />
                      </svg>
                      <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                        <rect
                          x="1"
                          y="3"
                          width="14"
                          height="10"
                          rx="2"
                          stroke="currentColor"
                          strokeWidth="1"
                          className="text-slate-900"
                        />
                        <path
                          d="M15 7V9"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          className="text-slate-900"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Chat interface */}
                  <div className="bg-white h-[640px] flex flex-col">
                    {/* Header */}
                    <div className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#2DE0CB] to-[#5B7CEF] flex items-center justify-center">
                          <SparklesIcon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-slate-900">Business Assistant</div>
                          <div className="text-xs text-green-600">Online</div>
                        </div>
                      </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
                      {messages.slice(0, visibleMessages).map((msg, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm ${
                              msg.type === "user"
                                ? "bg-slate-900 text-white rounded-br-sm"
                                : "bg-white text-slate-900 border border-slate-200 rounded-bl-sm"
                            }`}
                          >
                            {msg.text}
                          </div>
                        </motion.div>
                      ))}

                      {showTyping && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex justify-start"
                        >
                          <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1">
                            <motion.span
                              className="h-2 w-2 rounded-full bg-slate-400"
                              animate={{ opacity: [0.3, 1, 0.3] }}
                              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, delay: 0 }}
                            />
                            <motion.span
                              className="h-2 w-2 rounded-full bg-slate-400"
                              animate={{ opacity: [0.3, 1, 0.3] }}
                              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, delay: 0.2 }}
                            />
                            <motion.span
                              className="h-2 w-2 rounded-full bg-slate-400"
                              animate={{ opacity: [0.3, 1, 0.3] }}
                              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, delay: 0.4 }}
                            />
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* Input */}
                    <div className="bg-white border-t border-slate-200 p-3 flex items-center gap-2 pb-6">
                      <button className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                        +
                      </button>
                      <div className="flex-1 bg-slate-100 rounded-full px-4 py-2 text-sm text-slate-400">
                        Type your message...
                      </div>
                      <button className="h-8 w-8 rounded-full bg-gradient-to-r from-[#2DE0CB] to-[#5B7CEF] flex items-center justify-center text-white">
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function AboutUs({ t }: { t: typeof translations.en.aboutUs }) {
  return (
    <motion.div {...fadeUp(0)} className="mx-auto max-w-[1200px] px-6 md:px-8">
      {/* Header */}
      <div className="mb-12 text-center max-w-3xl mx-auto">
        <h2 className="text-center text-base/7 font-semibold text-[#2DE0CB] text-teal-400">{t.title}</h2>
        <p className="mx-auto mt-2 max-w-lg text-center text-3xl font-medium tracking-tight text-balance text-white">
          {t.subtitle}
        </p>
      </div>

      {/* Mission & Approach */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <motion.div
          {...fadeUp(0.1)}
          className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-8"
        >
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#2DE0CB]/20 to-[#5B7CEF]/20">
            <Target className="h-6 w-6 text-[#2DE0CB]" />
          </div>
          <h3 className="text-xl font-semibold text-slate-100 mb-3">{t.mission.title}</h3>
          <p className="text-sm text-slate-400 leading-relaxed">{t.mission.desc}</p>
        </motion.div>

        <motion.div
          {...fadeUp(0.15)}
          className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-8"
        >
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#2DE0CB]/20 to-[#5B7CEF]/20">
            <Rocket className="h-6 w-6 text-[#5B7CEF]" />
          </div>
          <h3 className="text-xl font-semibold text-slate-100 mb-3">{t.approach.title}</h3>
          <p className="text-sm text-slate-400 leading-relaxed">{t.approach.desc}</p>
        </motion.div>
      </div>

      {/* Values Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {t.values.map((value, i) => (
          <motion.div
            key={value.title}
            {...fadeUp(0.2 + i * 0.05)}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#2DE0CB]/10 to-[#5B7CEF]/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />

            <div className="relative h-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 group-hover:border-[#2DE0CB]/50 transition-all duration-300">
              <div className="mb-3 inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-[#2DE0CB]/20 to-[#5B7CEF]/20 text-[#2DE0CB] text-sm font-semibold">
                {i + 1}
              </div>

              <h4 className="text-base font-semibold text-slate-100 mb-2">{value.title}</h4>
              <p className="text-sm text-slate-400 leading-relaxed">{value.desc}</p>

              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#2DE0CB] via-[#5B7CEF] to-[#2DE0CB] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

function Leadership({ t }: { t: typeof translations.en.leadership }) {
  const members = [
    {
      name: t.members[0].name,
      role: t.members[0].role,
      description: t.members[0].description,
      image: "/images/alejandro-ramirez.png",
    },
    {
      name: t.members[1].name,
      role: t.members[1].role,
      description: t.members[1].description,
      image: "/images/mikloslukacs1.png",
    },
  ]

  return (
    <motion.div {...fadeUp(0)} className="mx-auto max-w-[1200px] px-6 md:px-8">
      {/* Header */}
      <div className="mb-12 text-center max-w-3xl mx-auto">
        <h2 className="text-center text-base/7 font-semibold text-[#2DE0CB] text-teal-400">{t.title}</h2>
        <p className="mx-auto mt-2 max-w-lg text-center text-3xl font-medium tracking-tight text-balance text-white">
          {t.subtitle}
        </p>
      </div>

      {/* Team Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {members.map((member, i) => (
          <motion.div
            key={member.name}
            {...fadeUp(0.1 + i * 0.1)}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
            className="group relative"
          >
            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#2DE0CB]/20 to-[#5B7CEF]/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl" />

            {/* Card */}
            <div className="relative h-full rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm overflow-hidden group-hover:border-[#5B7CEF]/50 transition-all duration-300">
              {/* Image Container */}
              <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-slate-800/50 to-slate-900/50">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E14] via-transparent to-transparent opacity-60" />
              </div>

              {/* Content */}
              <div className="p-6 lg:p-8">
                <h3 className="text-2xl font-semibold text-slate-100 mb-2">{member.name}</h3>
                <p className="text-base font-medium text-[#2DE0CB] mb-4">{member.role}</p>
                <p className="text-sm text-slate-400 leading-relaxed">{member.description}</p>
              </div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#2DE0CB] via-[#5B7CEF] to-[#2DE0CB] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

function Integrations({ t }: { t: typeof translations.en.integrations }) {
  const categories = [
    { name: "CRMs", items: ["Salesforce", "HubSpot", "Pipedrive"], color: "from-[#2DE0CB]/20 to-[#2DE0CB]/5" },
    { name: "Helpdesks", items: ["Zendesk", "Intercom", "Freshdesk"], color: "from-[#5B7CEF]/20 to-[#5B7CEF]/5" },
    { name: "Data", items: ["Snowflake", "BigQuery", "Databricks"], color: "from-[#2DE0CB]/10 to-[#5B7CEF]/10" },
    { name: "AI/ML", items: ["OpenAI", "Anthropic", "Pinecone"], color: "from-[#5B7CEF]/20 to-[#2DE0CB]/10" },
  ]

  return (
    <motion.div {...fadeUp(0)} className="mx-auto max-w-[1200px] px-6 md:px-8">
      <div className="mb-10 text-center">
        <h2 className="text-center text-base/7 font-semibold text-[#2DE0CB] text-teal-400">{t.title}</h2>
        <p className="mx-auto mt-2 max-w-lg text-center text-4xl font-medium tracking-tight text-balance text-white sm:text-3xl">
          {t.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {categories.map((cat, i) => (
          <motion.div key={cat.name} {...fadeUp(i * 0.05)} className="relative group">
            <div
              className={`absolute inset-0 bg-gradient-to-br ${cat.color} rounded-2xl opacity-50 group-hover:opacity-70 transition-opacity blur-xl`}
            />
            <div className="relative rounded-2xl border border-white/10 bg-[#0A0E14]/90 backdrop-blur-sm p-6">
              <h3 className="mb-4 font-semibold text-slate-200 flex items-center gap-2 text-base">
                <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[#2DE0CB] to-[#5B7CEF]" />
                {cat.name}
              </h3>
              <div className="flex flex-wrap gap-3">
                {cat.items.map((item) => (
                  <motion.div
                    key={item}
                    whileHover={{ scale: 1.05, y: -2 }}
                    transition={{ duration: 0.2 }}
                    className="integration-tile rounded-lg border border-white/10 bg-white/5 px-4 py-2 hover:border-[#5B7CEF] text-sm text-slate-300 hover:text-slate-100 transition-colors"
                  >
                    {item}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div {...fadeUp(0.2)} className="mt-6 text-center">
        <p className="text-sm text-slate-400">
          + 50 more integrations including ERPs, Analytics, Messaging, and Custom APIs
        </p>
      </motion.div>
    </motion.div>
  )
}

function UseCases({ t }: { t: typeof translations.en.useCases }) {
  const useCaseIcons = [
    // Icon 1: Compliance/Document (Gear + Chart)
    <svg key="compliance" className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M9 8h2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>,
    // Icon 2: Predictive/Analytics (Chart trending up)
    <svg key="predictive" className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>,
    // Icon 3: Conversational (Chat bubbles)
    <svg
      key="conversational"
      className="h-12 w-12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="10" r="1" />
      <circle cx="15" cy="10" r="1" />
      <path d="M9 14c.5.5 2 1 3 1s2.5-.5 3-1" />
    </svg>,
    // Icon 4: Operational Intelligence (Atom/Network)
    <svg
      key="operational"
      className="h-12 w-12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>,
    // Icon 5: Copilot/Assistant (Window/Code)
    <svg key="copilot" className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>,
    // Icon 6: Voice/IVR (Microphone/Voice)
    <svg key="voice" className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path
        d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>,
  ]

  // Split cases into 3 columns for masonry layout
  const chunkArray = <T,>(array: T[], chunkSize: number): T[][] => {
    const result: T[][] = []
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize))
    }
    return result
  }

  const useCaseChunks = chunkArray(t.cases, Math.ceil(t.cases.length / 3))

  return (
    <motion.div {...fadeUp(0)} className="mx-auto max-w-[1200px] px-6 md:px-8">
      <div className="mb-12 text-center">
        <h2 className="text-center text-base/7 font-semibold text-[#2DE0CB] text-teal-400">{t.title}</h2>
        <p className="mx-auto mt-2 max-w-lg text-center text-4xl font-medium tracking-tight text-balance text-white sm:text-3xl">
          {t.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {useCaseChunks.map((chunk, chunkIndex) => (
          <div key={chunkIndex} className="space-y-4">
            {chunk.map((useCase, index) => {
              const globalIndex = chunkIndex * Math.ceil(t.cases.length / 3) + index
              return (
                <motion.div key={index} {...fadeUp(globalIndex * 0.05)} className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#2DE0CB]/10 to-[#5B7CEF]/10 rounded-2xl opacity-50 group-hover:opacity-70 transition-opacity blur-xl" />
                  <div className="relative rounded-2xl border border-white/10 bg-[#0A0E14]/90 backdrop-blur-sm p-6 hover:border-[#2DE0CB]/50 transition-colors min-h-[280px] flex flex-col">
                    <div className="mb-4 text-[#2DE0CB]">{useCaseIcons[globalIndex]}</div>
                    <h3 className="mb-3 text-lg font-semibold text-slate-100">{useCase.title}</h3>
                    <ul className="space-y-2 flex-1">
                      {useCase.points.map((point, pointIndex) => (
                        <li key={pointIndex} className="flex items-start gap-2 text-sm text-slate-400">
                          <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-[#2DE0CB]" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )
            })}
          </div>
        ))}
      </div>
    </motion.div>
  )
}

function SecurityCompliance({ t }: { t: typeof translations.en.security }) {
  return (
    <motion.div {...fadeUp(0)} className="mx-auto max-w-[1200px] px-6 md:px-8">
      <div className="mb-12 text-center max-w-3xl mx-auto">
        <h2 className="text-center text-base/7 font-semibold text-[#2DE0CB] text-teal-400">{t.title}</h2>
        <p className="mx-auto mt-2 max-w-lg text-center text-4xl font-medium tracking-tight text-balance text-white sm:text-3xl">
          {t.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {t.items.map((item, i) => {
          const icons = [
            <Shield key="shield" className="h-8 w-8" />,
            <Lock key="lock" className="h-8 w-8" />,
            <svg
              key="globe"
              className="h-8 w-8"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>,
            <svg
              key="users"
              className="h-8 w-8"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>,
          ]

          return (
            <motion.div
              key={item.title}
              {...fadeUp(i * 0.05)}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#2DE0CB]/5 to-[#5B7CEF]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />

              <div className="relative h-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 hover:border-white/20 transition-colors">
                <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-white/10 to-white/5 text-[#2DE0CB] group-hover:text-[#5B7CEF] transition-colors">
                  {icons[i]}
                </div>

                <h3 className="text-lg font-semibold text-slate-100 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Additional security badges */}
      <motion.div {...fadeUp(0.3)} className="mt-12 flex flex-wrap items-center justify-center gap-4">
        <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
          🔒 End-to-end encryption
        </div>
        <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
          ✓ Zero-retention options
        </div>
        <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
          🛡️ Penetration tested
        </div>
        <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
          📋 Regular audits
        </div>
      </motion.div>
    </motion.div>
  )
}

function CaseStudies({ t }: { t: typeof translations.en.outcomes }) {
  const icons = [
    <Zap key="zap" className="h-5 w-5" />,
    <Gauge key="gauge" className="h-5 w-5" />,
    <TrendingUp key="trending-up" className="h-5 w-5" />,
    <Target key="target" className="h-5 w-5" />,
    <Rocket key="rocket" className="h-5 w-5" />,
  ]
  const spans = ["lg:row-span-2 lg:col-span-2", "lg:col-span-1", "lg:col-span-1", "lg:col-span-1", "lg:col-span-1"]
  const bgs = [
    "from-[#2DE0CB]/15 to-[#5B7CEF]/15",
    "from-[#5B7CEF]/15 to-[#2DE0CB]/0",
    "from-[#2DE0CB]/10 to-[#5B7CEF]/0",
    "from-[#5B7CEF]/12 to-transparent",
    "from-[#2DE0CB]/12 to-transparent",
  ]
  const rings = [
    "ring-[#2DE0CB]/30",
    "ring-[#5B7CEF]/30",
    "ring-[#2DE0CB]/25",
    "ring-[#5B7CEF]/25",
    "ring-[#2DE0CB]/25",
  ]

  return (
    <motion.div {...fadeUp(0)} className="mx-auto max-w-[1200px] px-6 md:px-8">
      <div className="mb-8 text-center">
        <h2 className="text-center text-base/7 font-semibold text-[#2DE0CB] text-teal-400">{t.title}</h2>
        <p className="mx-auto mt-2 max-w-lg text-center text-4xl font-medium tracking-tight text-balance text-white sm:text-3xl">
          {t.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
        {t.tiles.map((tile, i) => (
          <motion.div
            key={tile.title}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
            className={`${spans[i]} group relative rounded-2xl border border-white/10 bg-white/5 overflow-hidden`}
          >
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-br backdrop-blur-lg opacity-70"
              style={{
                background: `radial-gradient(circle at 50% 0%, rgba(45,224,203,0.1), transparent 60%), radial-gradient(circle at 50% 100%, rgba(91,124,239,0.1), transparent 60%)`,
              }}
            />
            <div
              className={`pointer-events-none absolute inset-0 rounded-2xl ring-0 group-hover:ring-2 ${rings[i]} transition`}
            />

            <div className="relative flex h-full flex-col justify-between p-6">
              <div className="flex items-center gap-2 text-slate-300">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-[#2DE0CB] group-hover:text-[#5B7CEF]">
                  {icons[i]}
                </span>
                <span className="text-sm text-slate-300">{tile.title}</span>
              </div>

              <div className="mt-5">
                <div className="text-3xl font-semibold tracking-tight text-slate-100">{tile.kpi}</div>
                <div className="mt-1 text-xs text-slate-400">{tile.desc}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

function Testimonials({ t }: { t: typeof translations.en.testimonials }) {
  const testimonials = [
    {
      name: t.items[0].name,
      role: t.items[0].role,
      company: t.items[0].company,
      avatar: "/professional-woman-executive.png",
      rating: 5,
      content: t.items[0].quote,
    },
    {
      name: t.items[1].name,
      role: t.items[1].role,
      company: t.items[1].company,
      avatar: "/professional-executive-man.png",
      rating: 5,
      content: t.items[1].quote,
    },
    {
      name: t.items[2].name,
      role: t.items[2].role,
      company: t.items[2].company,
      avatar: "/professional-asian-woman.png",
      rating: 4,
      content: t.items[2].quote,
    },
  ]

  return (
    <div className="mx-auto max-w-[1200px] px-6 md:px-8">
      <motion.div {...fadeUp(0)} className="mb-12 text-center">
        <h2 className="text-center text-base/7 font-semibold text-[#2DE0CB] text-teal-400">{t.title}</h2>
        <p className="mx-auto mt-2 max-w-lg text-center text-4xl font-medium tracking-tight text-balance text-white sm:text-3xl">
          {t.subtitle}
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial, i) => (
          <motion.div
            key={i}
            {...fadeUp(i * 0.1)}
            className="group relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 via-white/[0.02] to-transparent p-8 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:shadow-lg hover:shadow-[#2DE0CB]/10"
          >
            {/* Gradient glow on hover */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#2DE0CB]/0 to-[#5B7CEF]/0 opacity-0 transition-opacity duration-300 group-hover:opacity-10" />

            <div className="relative">
              {/* Rating stars */}
              <div className="mb-4 flex gap-1">
                {[...Array(5)].map((_, starIdx) => (
                  <svg
                    key={starIdx}
                    className={`h-4 w-4 ${
                      starIdx < testimonial.rating ? "fill-[#2DE0CB] text-[#2DE0CB]" : "fill-slate-700 text-slate-700"
                    }`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Testimonial content */}
              <p className="mb-6 text-base leading-relaxed text-slate-300">"{testimonial.content}"</p>

              {/* Author info with avatar */}
              <div className="flex items-center gap-3 border-t border-white/10 pt-6">
                <img
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="h-12 w-12 rounded-full border-2 border-white/10 object-cover"
                />
                <div>
                  <div className="font-medium text-slate-100">{testimonial.name}</div>
                  <div className="text-sm text-slate-400">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function FAQ({ t }: { t: typeof translations.en.faq }) {
  return (
    <motion.div {...fadeUp(0)} className="mx-auto max-w-[1200px] px-6 md:px-8">
      <div className="mb-16 text-center">
        <h2 className="text-center text-base/7 font-semibold text-[#2DE0CB] text-teal-400">{t.title}</h2>
        <p className="mx-auto mt-2 max-w-lg text-center text-3xl font-medium tracking-tight text-balance text-white">
          Everything you need to know about YUYAY AI Agents
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {t.items.map((f, i) => (
          <motion.div key={i} {...fadeUp(i * 0.1)} className="group">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem
                value={`item-${i}`}
                className="border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-sm rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300"
              >
                <AccordionTrigger className="text-left text-slate-100 px-6 py-5 hover:no-underline font-medium text-lg group-hover:text-[#2DE0CB] transition-colors">
                  <span className="flex items-start gap-3">
                    <span className="mt-1 flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-br from-[#2DE0CB]/20 to-[#5B7CEF]/20 flex items-center justify-center text-xs font-semibold text-[#2DE0CB]">
                      {i + 1}
                    </span>
                    <span className="flex-1">{f.q}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-slate-400 px-6 pb-6 pl-[60px] leading-relaxed">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

function FinalCTAContent({ t }: { t: typeof translations.en.cta }) {
  return (
    <div className="mx-auto max-w-[1200px] px-6 md:px-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <motion.div {...fadeUp(0)} className="rounded-2xl border border-white/10 bg-white/5 p-8">
          <h3 className="text-2xl font-semibold tracking-[-0.02em] text-slate-100">{t.title}</h3>
          <p className="mt-2 text-sm text-slate-300">{t.subtitle}</p>
          <form className="mt-6 space-y-3">
            <Input
              placeholder={t.form.name}
              className="border-white/15 bg-transparent text-slate-200 placeholder:text-slate-500"
            />
            <Input
              type="email"
              placeholder={t.form.email}
              className="border-white/15 bg-transparent text-slate-200 placeholder:text-slate-500"
            />
            <Input
              placeholder={t.form.company}
              className="border-white/15 bg-transparent text-slate-200 placeholder:text-slate-500"
            />
            <Textarea
              placeholder={t.form.message}
              className="min-h-[120px] border-white/15 bg-transparent text-slate-200 placeholder:text-slate-500"
            />
            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center gap-2 text-xs text-slate-400">
                <input type="checkbox" className="h-4 w-4 rounded border-white/20 bg-transparent" /> {t.form.terms}
              </label>
              <Magnetic>
                <Button className="bg-gradient-to-r from-[#2DE0CB] to-[#5B7CEF] text-[#0A0E14] hover:bg-teal-500 bg-teal-400">
                  {t.form.submit}
                </Button>
              </Magnetic>
            </div>
          </form>
        </motion.div>

        <motion.div
          {...fadeUp(0.05)}
          className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/0 p-8"
        >
          <h4 className="text-lg font-semibold text-slate-100">{t.why.title}</h4>
          <ul className="mt-4 space-y-3 text-sm text-slate-300">
            {t.why.items.map((item, i) => (
              <ListItem key={i}>
                <Check className="mr-2 inline h-4 w-4 text-[#2DE0CB]" />
                {item}
              </ListItem>
            ))}
          </ul>
          <div className="mt-6 grid grid-cols-2 gap-3 text-xs text-slate-400">
            <div className="rounded-lg border border-white/10 bg-white/5 p-3">SOC 2</div>
            <div className="rounded-lg border border-white/10 bg-white/5 p-3">GDPR</div>
            <div className="rounded-lg border border-white/10 bg-white/5 p-3">Data Residency</div>
            <div className="rounded-lg border border-white/10 bg-white/5 p-3">RBAC</div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function Footer({ t }: { t: typeof translations.en.footer }) {
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="mx-auto grid max-w-[1200px] grid-cols-2 gap-6 px-6 text-sm text-slate-400 md:grid-cols-4 md:px-8">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <img src="/yuya-logo-white.svg" alt="YUYAY" className="h-6 w-auto" />
          </div>
          <p className="max-w-xs text-xs">{t.tagline}</p>
        </div>
        <div>
          <div className="mb-2 text-slate-300">{t.solutions}</div>
          <ul className="space-y-1">
            {t.solutionLinks.map((link) => (
              <li key={link}>
                <a href="#solutions" className="hover:text-slate-200">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="mb-2 text-slate-300">{t.company}</div>
          <ul className="space-y-1">
            {t.companyLinks.map((link, i) => (
              <li key={link}>
                <a href={i === 0 ? "#how" : i === 1 ? "#cases" : "#faq"} className="hover:text-slate-200">
                  {" "}
                  {/* Changed to #how for consistency */}
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="mb-2 text-slate-300">{t.legal}</div>
          <ul className="space-y-1">
            {t.legalLinks.map((link) => (
              <li key={link}>
                <a href="#" className="hover:text-slate-200">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-6 max-w-[1200px] px-6 text-xs text-slate-500 md:px-8">
        © {new Date().getFullYear()} YUYAY. {t.copyright}
      </div>
    </footer>
  )
}

function ParallaxField({ nx, ny }: { nx: number; ny: number }) {
  const layers = [
    { size: 900, opacity: 0.18, depth: 12 },
    { size: 700, opacity: 0.14, depth: 20 },
    { size: 520, opacity: 0.12, depth: 32 },
  ]
  return (
    <>
      {layers.map((l, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            width: l.size,
            height: l.size,
            left: `calc(50% - ${l.size / 2}px)`,
            top: `calc(40% - ${l.size / 2}px)`,
            background:
              "radial-gradient(circle at 30% 30%, rgba(45,224,203,0.35), transparent 55%), radial-gradient(circle at 70% 70%, rgba(91,124,239,0.30), transparent 55%)",
          }}
          animate={{ x: nx * l.depth, y: ny * l.depth, opacity: l.opacity }}
          transition={{ type: "spring", stiffness: 30, damping: 20 }}
        />
      ))}
    </>
  )
}

function HexGrid({ nx, ny }: { nx: number; ny: number }) {
  return (
    <motion.svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      style={{ opacity: 0.08 }}
      animate={{ x: nx * 8, y: ny * 8 }}
      transition={{ type: "spring", stiffness: 25, damping: 18 }}
    >
      <defs>
        <pattern id="hex" width="8" height="13.856" patternUnits="userSpaceOnUse" patternTransform="scale(1)">
          <polygon
            points="4,0 8,2.309 8,6.928 4,9.237 0,6.928 0,2.309"
            fill="none"
            stroke="url(#g)"
            strokeWidth="0.3"
          />
        </pattern>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2DE0CB" />
          <stop offset="100%" stopColor="#5B7CEF" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="100%" height="100%" fill="url(#hex)" />
    </motion.svg>
  )
}

function FogTrails() {
  const blobs = [
    { size: 1200, x: "-20%", y: "-10%", from: 0, to: 20 },
    { size: 900, x: "60%", y: "70%", from: -15, to: 10 },
  ]
  return (
    <>
      {blobs.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            width: b.size,
            height: b.size,
            left: b.x,
            top: b.y,
            background: "radial-gradient(circle, rgba(255,255,255,0.04), transparent 60%)",
          }}
          initial={{ y: b.from, opacity: 0.25 }}
          animate={{ y: b.to, opacity: 0.3 }}
          transition={{
            duration: 12 + i * 4,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  )
}

function SparklesEffect() {
  const dots = React.useMemo(
    () =>
      Array.from({ length: 40 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100 + "%",
        top: Math.random() * 100 + "%",
        delay: Math.random() * 4,
      })),
    [],
  )

  return (
    <>
      {dots.map((d) => (
        <motion.span
          key={d.id}
          className="absolute h-[2px] w-[2px] rounded-full"
          style={{ left: d.left, top: d.top, background: "radial-gradient(circle, #fff, rgba(255,255,255,0))" }}
          initial={{ opacity: 0.1, scale: 0.8 }}
          animate={{ opacity: [0.1, 0.6, 0.12], scale: [0.8, 1.1, 0.8] }}
          transition={{ duration: 3.2, delay: d.delay, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
      ))}
    </>
  )
}

function Magnetic({ children }: { children: React.ReactNode }) {
  return <div className="inline-block">{children}</div>
}

function ListItem({ children }: React.PropsWithChildren) {
  return <div className="flex items-start gap-2">{children}</div>
}

function MockTerminal() {
  const fullText = `$ yuyay agents upgrade --env=prod > Checking versioning, pulling latest...

> Integrations connected: CRM, Billing API, Knowledge Hub, Observability...`

  const [displayedText, setDisplayedText] = React.useState("")
  const [currentIndex, setCurrentIndex] = React.useState(0)

  const isMobile = typeof window !== "undefined" ? window.matchMedia("(max-width: 840px)").matches : false

  React.useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(fullText.slice(0, currentIndex + 1))
        setCurrentIndex(currentIndex + 1)
      }, 30)
      return () => clearTimeout(timeout)
    } else if (!isMobile) {
      const resetTimeout = setTimeout(() => {
        setDisplayedText("")
        setCurrentIndex(0)
      }, 5000)
      return () => clearTimeout(resetTimeout)
    }
  }, [currentIndex, fullText, isMobile])

  return (
    <div className="rounded-xl border border-white/10 bg-[#0B1220] p-4">
      <div className="mb-3 flex items-center gap-1">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-300/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
      </div>
      <pre className="whitespace-pre-wrap text-xs leading-relaxed text-slate-300">
        {displayedText}
        {currentIndex < fullText.length && (
          <span className="inline-block w-1.5 h-3.5 bg-slate-300 ml-0.5 animate-pulse" />
        )}
      </pre>
    </div>
  )
}

function ArchitectureCard({ variant = "default" }: { variant?: "default" | "balanced" }) {
  if (variant === "balanced") {
    return (
      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
        <div className="mb-4 text-base text-slate-300">High‑level Architecture</div>
        <div className="grid grid-col gap-3 text-xs lg:text-base">
          <div className="rounded-lg border border-white/10 bg-[#0C111B] p-3 text-center text-slate-300">Connect</div>
          <div className="rounded-lg border border-white/10 bg-[#0C111B] p-3 text-center text-slate-300">
            Orchestrate
          </div>
          <div className="rounded-lg border border-white/10 bg-[#0C111B] p-3 text-center text-slate-300">Govern</div>
          <div className="rounded-lg border border-white/10 bg-[#0C111B] p-3 text-center text-slate-300">Deploy</div>
          <div className="rounded-lg border border-white/10 bg-[#0C111B] p-3 text-center text-slate-300">Measure</div>
        </div>
        <div className="mt-4 rounded-md bg-gradient-to-r from-[#2DE0CB]/30 to-[#5B7CEF]/30 p-[1px]">
          <div className="rounded-md bg-[#0C111B] p-3 text-xs lg:text-base text-center text-slate-400">
            Secure data plane · Tooling · Policies
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="mb-4 text-base text-slate-300">High‑level Architecture</div>
      <div className="grid grid-cols md:grid-cols-3 lg:grid-cols-3 gap-3 text-xs lg:text-base">
        <div className="rounded-lg border border-white/10 bg-[#0C111B] p-3 text-center text-slate-300">Connect</div>
        <div className="rounded-lg border border-white/10 bg-[#0C111B] p-3 text-center text-slate-300">Orchestrate</div>
        <div className="rounded-lg border border-white/10 bg-[#0C111B] p-3 text-center text-slate-300">Govern</div>
        <div className="rounded-lg border border-white/10 bg-[#0C111B] p-3 text-center text-slate-300">Deploy</div>
        <div className="col-span md:col-span-2 rounded-lg border border-white/10 bg-[#0C111B] p-3 text-center text-slate-300">
          Measure
        </div>
      </div>
      <div className="mt-4 rounded-md bg-gradient-to-r from-[#2DE0CB]/30 to-[#5B7CEF]/30 p-[1px]">
        <div className="rounded-md bg-[#0C111B] p-3 text-xs lg:text-base text-center text-slate-400">
          Secure data plane · Tooling · Policies
        </div>
      </div>
    </div>
  )
}

function Services({ t }: { t: typeof translations.en.services }) {
  const iconMap = {
    network: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="2" />
        <circle cx="6" cy="6" r="2" />
        <circle cx="18" cy="6" r="2" />
        <circle cx="6" cy="18" r="2" />
        <circle cx="18" cy="18" r="2" />
        <line x1="12" y1="10" x2="12" y2="6" />
        <line x1="10.5" y1="11.5" x2="7.5" y2="7.5" />
        <line x1="13.5" y1="11.5" x2="16.5" y2="7.5" />
        <line x1="10.5" y1="12.5" x2="7.5" y2="16.5" />
        <line x1="13.5" y1="12.5" x2="16.5" y2="16.5" />
      </svg>
    ),
    robot: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="5" y="11" width="14" height="10" rx="2" />
        <circle cx="9" cy="15" r="1" />
        <circle cx="15" cy="15" r="1" />
        <path d="M9 18h6" />
        <path d="M12 3v5" />
        <circle cx="12" cy="3" r="1" />
      </svg>
    ),
    chatbot: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <circle cx="9" cy="10" r="1" />
        <circle cx="15" cy="10" r="1" />
        <path d="M9 14c.5.5 2 1 3 1s2.5-.5 3-1" />
      </svg>
    ),
    analytics: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 3v2m0 14v2M4.9 4.93l1.41 1.41M11.32 11.32l1.41 1.41M3 12h2m14 0h2M4.93 19.07l1.41-1.41M11.32 11.32l1.41-1.41" />
      </svg>
    ),
    platform: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="14" rx="2" />
        <path d="M8 21h8" />
        <path d="M12 17v4" />
      </svg>
    ),
    education: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
  }

  return (
    <motion.div {...fadeUp(0)} className="mx-auto max-w-[1200px] px-6 md:px-8">
      <div className="mb-16 text-center">
        <h2 className="text-center text-base/7 font-semibold text-[#2DE0CB]">{t.title}</h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-3xl font-medium tracking-tight text-balance text-white sm:text-4xl">
          {t.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {t.categories.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.02, y: -4 }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#2DE0CB]/10 to-[#5B7CEF]/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <Card className="h-full border border-white/10 bg-white/5 backdrop-blur-sm hover:border-[#5B7CEF]/50 transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="relative mx-auto mb-4 flex h-20 w-20 items-center justify-center">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] opacity-30 rounded-lg" />
                  <div className="relative flex items-center justify-center w-12 h-12 bg-gradient-to-br from-[#2DE0CB]/20 to-[#5B7CEF]/20 rounded-lg border border-white/10 text-[#2DE0CB] group-hover:text-[#5B7CEF] transition-colors">
                    {iconMap[service.icon as keyof typeof iconMap]}
                  </div>
                </div>
                <CardTitle className="text-center text-lg text-slate-200 group-hover:text-white transition-colors">
                  {service.title}
                </CardTitle>
                <p className="text-center text-sm text-slate-400 mt-2">{service.description}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gradient-to-r from-[#2DE0CB] to-[#5B7CEF]" />
                      <span className="leading-relaxed">{detail}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const toggleVisibility = () => {
      const heroSection = document.getElementById("hero")
      if (heroSection) {
        const heroBottom = heroSection.getBoundingClientRect().bottom
        setIsVisible(heroBottom < 0)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    toggleVisibility()

    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#0A0E14]/80 backdrop-blur border border-white/10 text-cyan-400 shadow-lg transition-all hover:bg-[#0A0E14]/90 hover:scale-110 hover:shadow-cyan-500/20"
          aria-label="Scroll to top"
        >
          <ChevronUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
