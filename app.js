const projects = [
  {
    id: "webestudio", year: "2026", stack: "JavaScript, Node.js, C#, .NET MAUI",
    es: { role: "Web de estudio", desc: "Aula de Interfaces: 18 lecciones, 85 preguntas de autoevaluación, 19 fichas y 13 proyectos MAUI descargables para 2º DAM. Sin dependencias de terceros, con progreso guardado en el navegador y búsqueda sin tildes." },
    en: { role: "Study website", desc: "Aula de Interfaces: 18 lessons, 85 self-test questions, 19 cheat sheets and 13 downloadable MAUI projects for a Desktop App Development course. No third-party dependencies, progress saved in the browser, accent-insensitive search." },
    live: "https://webestudio-three.vercel.app", repo: "https://github.com/cris4899/webestudio",
  },
  {
    id: "papeo", year: "2026", stack: "Expo, Next.js, Supabase, TypeScript",
    es: { role: "App móvil y panel", desc: "Monorepo con app móvil (Expo), panel de administración y landing (Next.js), sobre Supabase. Construido con especificaciones por fases y pruebas end-to-end." },
    en: { role: "Mobile app and dashboard", desc: "Monorepo with a mobile app (Expo), an admin dashboard and a landing page (Next.js), on Supabase. Built spec-first, with end-to-end tests." },
    live: "", app: "https://www.mipapeo.es", repo: "",
  },
  {
    id: "vecinaria", year: "2026", stack: "React, Vite, Expo, Supabase, Tailwind",
    es: { role: "Gestión de comunidades", desc: "Plataforma para administrar fincas, pensada para despachos profesionales y comunidades autogestionadas. Web en React, app en iOS y Android, base de datos con pruebas pgTAP." },
    en: { role: "Community management", desc: "Platform to manage residential communities, for professional firms and self-managed buildings. React web app, iOS and Android app, database covered by pgTAP tests." },
    live: "https://vecinaria-landing.vercel.app", repo: "",
  },
  {
    id: "jaquecapp", year: "2026", stack: "PWA, Vite, JavaScript, Firebase",
    es: { role: "PWA de bienestar", desc: "Agenda, registro del ciclo y de jaquecas con análisis de hábitos, gamificación suave e informe médico en PDF. Desarrollada con Spec-Driven Development, desplegada en Netlify con datos en Firebase." },
    en: { role: "Wellbeing PWA", desc: "Planner, cycle and migraine tracking with habit analysis, light gamification and a PDF report for doctors. Built with Spec-Driven Development, deployed on Netlify with Firebase data." },
    live: "https://jaquecapp.netlify.app", repo: "",
  },
];
const names = { webestudio: "WebEstudio", papeo: "Papeo", vecinaria: "Vecinaria", jaquecapp: "JaqueCapp" };

const i18n = {
  es: { "nav.work": "Proyectos", "nav.contact": "Contacto", "hero.role": "Desarrollo web y apps, experto en IA. Diseño, construyo y publico productos completos con desarrollo guiado por especificaciones (SDD) e ingeniería de prompts.", "hero.cv": "Descargar CV", "work.title": "Proyectos", "about.text": "Trabajo de principio a fin: producto, interfaz, base de datos y despliegue. Soy experto en IA: desarrollo guiado por especificaciones (SDD), ingeniería de prompts y agentes que escriben y prueban código. Trabajo a diario con Claude Code, gestión de skills y servidores MCP, y ayudo a equipos a desarrollar aplicaciones de forma rápida con IA. Me interesan las herramientas que simplifican trabajo real, como administrar una comunidad de vecinos o abrir un negocio en la web.", live: "Ver en vivo", app: "Abrir la app", repo: "Ver código", lang: "EN", theme: "Tema" },
  en: { "nav.work": "Work", "nav.contact": "Contact", "hero.role": "Web and app developer, AI expert. I design, build and ship complete products with spec-driven development (SDD) and prompt engineering.", "hero.cv": "Download CV", "work.title": "Work", "about.text": "I work end to end: product, interface, database and deployment. I'm an AI expert: spec-driven development (SDD), prompt engineering and agents that write and test code. I work daily with Claude Code, skills management and MCP servers, and I help teams build applications fast with AI. I like tools that simplify real work, like running a residential community or getting a business online.", live: "View live", app: "Open the app", repo: "View code", lang: "ES", theme: "Theme" },
};

const store = {
  get(k) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch {} },
};
let lang = store.get("lang") || (navigator.language.startsWith("en") ? "en" : "es");
const root = document.documentElement;
const rows = document.getElementById("rows");
const peek = document.getElementById("peek");
const peekImg = document.getElementById("peek-img");

function render() {
  const t = i18n[lang];
  root.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((el) => { el.textContent = t[el.dataset.i18n]; });
  document.getElementById("lang").textContent = t.lang;
  document.getElementById("theme").textContent = t.theme;
  document.querySelector("[download]").href = `cv-${lang}.pdf`;
  const open = rows.querySelector("[aria-expanded=true]")?.dataset.id;
  rows.innerHTML = projects.map((p) => {
    const c = p[lang];
    const links = [p.live && `<a href="${p.live}" rel="noopener">${t.live}</a>`, p.app && `<a href="${p.app}" rel="noopener">${t.app}</a>`, p.repo && `<a href="${p.repo}" rel="noopener">${t.repo}</a>`].filter(Boolean).join("");
    return `<li class="row">
      <button class="row-head" type="button" data-id="${p.id}" aria-expanded="${open === p.id}" aria-controls="b-${p.id}">
        <span class="row-name">${names[p.id]}</span>
        <span class="row-meta">${c.role}, ${p.year}<br>${p.stack}</span>
      </button>
      <div class="row-body" id="b-${p.id}"><div><div class="row-inner">
        <div><p>${c.desc}</p>${links && `<div class="links">${links}</div>`}</div>
        <img src="img/${p.id}.jpg" alt="${names[p.id]}" loading="lazy" onerror="this.outerHTML='<div class=&quot;shot-empty&quot;></div>'">
      </div></div></div>
    </li>`;
  }).join("");
}

rows.addEventListener("click", (e) => {
  const head = e.target.closest(".row-head");
  if (!head) return;
  const was = head.getAttribute("aria-expanded") === "true";
  rows.querySelectorAll(".row-head").forEach((h) => h.setAttribute("aria-expanded", "false"));
  head.setAttribute("aria-expanded", String(!was));
});

// Vista previa siguiendo el cursor (solo escritorio)
let x = 0, y = 0;
rows.addEventListener("pointermove", (e) => {
  if (e.pointerType !== "mouse") return;
  const head = e.target.closest(".row-head");
  const expanded = head?.getAttribute("aria-expanded") === "true";
  if (!head || expanded) return peek.classList.remove("on");
  if (peekImg.dataset.id !== head.dataset.id) {
    peekImg.dataset.id = head.dataset.id;
    peekImg.src = `img/${head.dataset.id}.jpg`;
  }
  x = e.clientX + 24; y = e.clientY - 120;
  peek.style.transform = `translate(${Math.min(x, innerWidth - peek.offsetWidth - 8)}px, ${Math.max(8, y)}px)`;
  peek.classList.add("on");
});
rows.addEventListener("pointerleave", () => peek.classList.remove("on"));

document.getElementById("lang").onclick = () => { lang = lang === "es" ? "en" : "es"; store.set("lang", lang); render(); };
document.getElementById("theme").onclick = () => {
  const dark = root.dataset.theme ? root.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
  root.dataset.theme = dark ? "light" : "dark";
  store.set("theme", root.dataset.theme);
};
if (store.get("theme")) root.dataset.theme = store.get("theme");
render();
