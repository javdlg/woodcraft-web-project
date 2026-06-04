# 📖 Bitácora de Desarrollo (Journal) - Woodcraft

Este documento sirve como registro y bitácora de aprendizaje para la construcción de **Woodcraft**, una plataforma web orientada a la exhibición y comercialización de productos artesanales de madera (cocina, baño, living, jardinería, exterior, etc.). 

El objetivo principal es documentar el progreso, explicar las decisiones arquitectónicas de frontend y repasar conceptos fundamentales y avanzados de desarrollo web.

---

## 🏗️ Arquitectura y Diseño Web (Best Practices)

Para asegurar que el proyecto sea escalable, mantenible y rinda adecuadamente, nos guiaremos por los siguientes principios:

1. **Mobile-First & Diseño Responsivo**: Comenzar los estilos desde dispositivos móviles hacia resoluciones mayores usando Media Queries en CSS. Esto asegura mejor performance en móviles y una experiencia de usuario (UX) adaptada a cada pantalla.
2. **Separación de Responsabilidades (SoC)**: 
   - `HTML` para semántica y estructura.
   - `CSS` (modularizado) para estilos y animaciones.
   - `JavaScript` estructurado para la lógica, manipulación del DOM y peticiones asíncronas.
3. **Semántica SEO y Accesibilidad (a11y)**: Uso de etiquetas correctas (`<header>`, `<main>`, `<article>`, `<nav>`) para mejorar el posicionamiento y ayudar a los lectores de pantalla.
4. **Optimización de Recursos**: Las imágenes (vitales en un e-commerce de madera) deberán estar optimizadas (formatos WebP, carga diferida `loading="lazy"`).
5. **Estado Inmutable (State Management)**: En fases avanzadas de JS, gestionaremos el estado del carrito de compras de manera centralizada para evitar desincronizaciones en la UI.

---

## 🚀 Fase 1: Portafolio Dinámico (Vanilla JavaScript)

### 1. Estructura Inicial (HTML y CSS Base)
**Objetivo:** Crear el esqueleto semántico de la aplicación y la grilla base.
* **Lógica a aplicar:** Utilizaremos CSS Grid para la disposición general de la página y Flexbox para componentes internos (como la barra de navegación y tarjetas de productos).

### 2. Galería de Proyectos (`js/gallery.js`)
**Objetivo:** Mostrar los trabajos en madera con filtros y visualización detallada.
* **Lógica a documentar:** 
  * **Manipulación del DOM**: Cómo seleccionamos elementos (`querySelector`) y creamos nodos HTML dinámicamente (`createElement`, `innerHTML`) para renderizar las tarjetas basándonos en un array de datos (nuestros productos).
  * **Event Delegation**: En lugar de agregar un `addEventListener` a cada botón de filtro, lo agregaremos al contenedor padre. Esto mejora el rendimiento y es una excelente práctica.

---

## 🛒 Fase 2: Bases del E-commerce

En esta fase transformamos el portafolio en una tienda funcional.

### 1. Catálogo de Productos
**Objetivo:** Estructurar los productos de madera (Cocina, Baño, Jardinería, etc.) en un formato consumible.
* **Lógica a documentar:** Modelado de datos. Creación de un JSON o Array de objetos con propiedades como `id`, `name`, `category`, `price`, `image`, y `stock`.

### 2. Carrito de Compras
**Objetivo:** Permitir a los usuarios seleccionar productos y guardarlos para "comprar".
* **Lógica a documentar:**
  * **Local Storage API**: Cómo guardamos el estado del carrito en el navegador (`localStorage.setItem`) para que los datos persistan si el usuario recarga la página.
  * **State UI Update**: Funciones puras para calcular el total, cantidad de ítems, y cómo re-renderizar la UI sin parpadeos cada vez que cambia el carrito.

---

## 🧠 Fase 3: Conceptos Avanzados de JavaScript

A medida que el proyecto crezca, aplicaremos y explicaremos estos conceptos para solidificar nuestro conocimiento en Web Development:

### Fetch API y Asincronía (Promises / Async-Await)
* **Caso de Uso:** Si decidimos simular una base de datos de productos usando un archivo `productos.json` local (o una API pública), utilizaremos asincronía para cargar el catálogo inicial sin bloquear el renderizado de la página.
* **Concepto:** `async/await` para mantener el código legible y manejo de errores con `try/catch`.

### Modularidad (ES6 Modules)
* **Caso de Uso:** Dividir nuestro código JavaScript en múltiples archivos (`app.js`, `cart.js`, `api.js`, `ui.js`) e importarlos/exportarlos.
* **Concepto:** `import` / `export`. Mantenibilidad del código evitando contaminar el scope global (Global Namespace).

---

## 📝 Entradas de la Bitácora (Log de Trabajo)

*A partir de aquí, iremos documentando fecha por fecha nuestros avances, fragmentos de código explicados y lecciones aprendidas durante la construcción de la tienda.*

> **[2026-06-03] - Configuración Inicial y Creación de .gitignore**
> - **Qué se hizo:** Se configuró el archivo `.gitignore` del proyecto para asegurar que solo los archivos de código fuente, diseño y documentación sean rastreados por Git, omitiendo dependencias pesadas, archivos de sistema e información sensible.
> - **Explicación de la Lógica:**
>   - **node_modules/**: Evita subir las dependencias de Node.js instaladas localmente. Estas dependencias se descargan dinámicamente con `npm install` basándose en el archivo `package.json`, por lo que subirlas a Git ralentizaría innecesariamente el repositorio.
>   - **dist/, build/, .next/**: Carpetas de compilación/transpilación de código. El código de producción se genera local o automáticamente en el servidor de despliegue, por lo que no debe subirse a Git.
>   - **.env, *.pem, *.key**: Archivos que contienen variables de entorno y credenciales (como contraseñas de bases de datos o llaves API). Subir estos archivos es una vulnerabilidad de seguridad crítica.
>   - **.DS_Store, Thumbs.db**: Archivos temporales generados por macOS y Windows respectivamente para almacenar metadatos de las carpetas (ej. posición de íconos). No tienen relevancia para el proyecto.
>   - **.vscode/**: Configuraciones locales del editor de código de cada desarrollador. Se ignoran excepto por archivos compartidos específicos de configuración (`settings.json`, `launch.json`, etc.) mediante reglas de exclusión (`!`).

> **[2026-06-04] - Estructura HTML5 Inicial (`index.html`)**
> - **Qué se hizo:** Se definió el esqueleto mínimo y estándar de un documento HTML5 para dar inicio al proyecto Woodcraft.
> - **Explicación de la Lógica:**
>   - **`<!DOCTYPE html>`**: Indica al navegador que el documento es de tipo HTML5, garantizando que se renderice en el modo estándar y se interpreten correctamente las etiquetas modernas.
>   - **`<html lang="es">`**: Declara el idioma del sitio como español, lo cual es vital para el SEO y la accesibilidad (los lectores de pantalla lo usan para la pronunciación correcta).
>   - **`<meta charset="UTF-8">`**: Habilita la codificación universal, permitiendo mostrar correctamente caracteres especiales, tildes y la letra 'ñ'.
>   - **`<meta name="viewport" content="width=device-width, initial-scale=1.0">`**: Obligatorio para diseño responsivo. Ajusta el tamaño de visualización a la pantalla del dispositivo y evita que los dispositivos móviles escalen la página hacia atrás por defecto.
>   - **`<meta name="description" ...>`**: Resumen meta descriptivo del sitio que ayuda a los buscadores a indexarnos y mejora la tasa de clics (CTR) en los resultados de búsqueda.


