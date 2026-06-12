# 🪓 Woodcraft - Web Platform

## 📌 Descripción General
Plataforma web para un taller de carpintería y trabajo artesanal de la madera. Este repositorio contiene el código fuente del portafolio y la futura tienda online, desarrollado enfocándose en el rendimiento, la escalabilidad y el diseño responsivo.

## 🎯 Objetivos del Proyecto
* **Fase 1:** Construir un portafolio dinámico utilizando Vanilla JavaScript para exhibir proyectos de carpintería (galería, detalles de la madera, procesos).
* **Fase 2:** Sentar las bases del frontend para un futuro e-commerce (carrito de compras, catálogo de productos).
* **Fase 3:** Refuerzo y documentación de conceptos avanzados de JavaScript (DOM Manipulation, Fetch API/Async, Event Delegation).

## 🛠️ Stack Tecnológico
* **Frontend:** HTML5, CSS3 (Flexbox/Grid), JavaScript (ES6+).
* **Backend (API):** Python 3.x, FastAPI (o Flask), Uvicorn (servidor ASGI).
* **Herramientas:** Git, GitHub, VS Code.
* **Diseño:** UI/UX responsivo (Mobile-first).

## 📂 Estructura del Proyecto

```text
woodcraft-web-project/
│
├── backend/                # API REST y lógica en Python
│   ├── main.py             # Servidor y endpoints de la API (FastAPI)
│   └── products.json       # Datos simulados de productos de madera
│
├── assets/                 # Recursos estáticos (imágenes de la madera, íconos)
├── css/                    # Hojas de estilo
│   ├── main.css
│   └── components.css
├── js/                     # Lógica de la aplicación frontend
│   ├── app.js              # Archivo principal / Coordinador
│   ├── gallery.js          # Lógica de la galería de proyectos y catálogo
│   └── utils.js            # Funciones auxiliares
├── index.html              # Página principal
├── journal.md              # Bitácora de aprendizaje y registro de desarrollo
└── README.md               # Documentación del proyecto
```

---

## 🐍 Foco en Python & Arquitectura Full-Stack
Dado que el objetivo profesional principal del desarrollador está centrado en el ecosistema **Python**, la arquitectura de este proyecto se diseñó de forma **Full-Stack desacoplada**:
1. **Frontend Interactivo (JavaScript)**: Muestra habilidades en la manipulación del DOM, delegación de eventos y consumo de APIs de manera asíncrona (Fetch API), construyendo una experiencia de usuario (UX) premium sin frameworks pesados.
2. **Backend de Servicios (Python + FastAPI)**: Permite demostrar dominio de Python en entornos web modernos mediante la creación de una API RESTful para el catálogo de productos y la gestión del carrito, configurando políticas de CORS, enrutamiento y serialización de JSON de nivel profesional.

Esta combinación demuestra versatilidad para trabajar tanto en el desarrollo del cliente como en la lógica del servidor de alto rendimiento.

---

## 🏷️ Guía de Personalización y Rebranding
El proyecto está diseñado bajo principios de diseño limpio y desacoplado, lo que facilita cambiar la marca de fantasía **Woodcraft** por un nombre e identidad definitiva en el futuro:
* **Identidad Visual (CSS Variables):** Todos los colores, tipografías y espaciados están centralizados en `:root` dentro de `css/main.css`. Para cambiar el estilo o paleta de colores, solo se requiere modificar estas variables.
* **Textos y Contenidos (HTML):** Los títulos y logos están estructurados semánticamente en `index.html` bajo etiquetas descriptivas y clases unificadas. Se puede realizar un reemplazo global del término `Woodcraft` en el editor por el nombre definitivo.
* **Datos del Catálogo (JSON/API):** Las descripciones, nombres e imágenes de los productos provienen de la API en Python (`backend/products.json`), permitiendo actualizar o cambiar todo el catálogo de productos de madera sin tocar una sola línea de código frontend.