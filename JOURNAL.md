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
>   - **`rel="preconnect"`**: Atributo de optimización de rendimiento. Le dice al navegador que inicie la conexión con los servidores de Google Fonts antes de solicitar las fuentes de forma explícita. Esto ahorra valiosos milisegundos en la resolución DNS y negociación TLS, reduciendo el tiempo hasta el primer pintado (FMP).
>   - **Emparejamiento de fuentes (Font Pairing)**: Elegimos *Playfair Display* (Serif clásica, cálida y con aspecto artesanal) para títulos decorativos y *Inter* (Sans-serif moderna, neutra y de excelente legibilidad) para textos de lectura. Esto crea un contraste visual premium y profesional.
>   - **FontAwesome (Iconos)**: Cargado desde CDN para contar con iconos en formato vectorial que no pierden nitidez en pantallas de alta densidad (Retina) y pesan menos que los assets tradicionales.
>   - **Separación de CSS (`main.css` y `components.css`)**: Estructura modular recomendada. `main.css` contendrá variables globales, reset de estilos y la grilla base (diseño global). `components.css` albergará los estilos de elementos reutilizables (botones, tarjetas, menú flotante del carrito, etc.).

> **[2026-06-05] - Estructura Semántica del Encabezado (`<header>`)**
> - **Qué se hizo:** Se implementó la estructura de navegación principal y acciones de la tienda en el `<body>` usando etiquetas semánticas de HTML5.
> - **Explicación de la Lógica:**
>   - **`<header>`**: Indica semánticamente al navegador y buscadores que este bloque contiene el encabezado del sitio (marca, navegación y acciones globales).
>   - **`<nav>` con `aria-label="Navegación principal"`**: Define la sección de navegación de la página. El atributo `aria-label` ayuda a las herramientas de accesibilidad a distinguir este menú principal de otros posibles menús en el sitio (como el del footer).
>   - **Estructura de Lista (`<ul>`, `<li>`)**: Es el estándar de accesibilidad para estructurar menús de navegación, permitiendo que lectores de pantalla informen al usuario cuántos enlaces hay disponibles en el menú.
>   - **Botón del Carrito (`#cart-toggle-btn`) y Contador**: Contiene un icono de bolsa de compras y un elemento `<span>` (`#cart-badge-count`) que inicia en `0`. Este contador se actualizará dinámicamente mediante JavaScript cuando el usuario agregue productos.
>   - **Botón de Menú Móvil (`#mobile-menu-toggle`)**: Botón hamburguesa con `aria-expanded="false"`. Es una buena práctica de accesibilidad (WAI-ARIA) para indicar a lectores de pantalla si el menú móvil desplegable está actualmente abierto o cerrado.

> **[2026-06-05] - Contenedor Principal y Sección Héroe (`#hero-section`)**
> - **Qué se hizo:** Se introdujo la etiqueta estructural `<main>` y la sección Héroe (`<section>`) con el título principal `<h1>` y botones de llamado a la acción (CTA).
> - **Explicación de la Lógica:**
>   - **`<main>`**: Define el contenido central único de la página. Solo debe haber un elemento `<main>` activo por documento, facilitando la navegación de lectores de pantalla que permiten "saltar al contenido principal".
>   - **Único `<h1>` de la página (SEO)**: Mantener un solo `<h1>` por página es una regla crítica de accesibilidad y SEO. Este indica el tema principal de la página a los buscadores (*Madera con Historia para tu Hogar*). Para secciones secundarias usaremos `<h2>`, `<h3>`, etc.
>   - **Llamados a la Acción Jerarquizados (CTA - Call To Action)**:
>     - **CTA Primario (`#hero-cta-primary`)**: Enfocado en la conversión rápida (ir a `#catalog`). Tendrá el color de acento más fuerte y mayor peso visual.
>     - **CTA Secundario (`#hero-cta-secondary`)**: Enfocado en el branding y la confianza (ir a `#process`). Llevará estilos más ligeros (outline o fondo translúcido) para no competir visualmente con el botón principal.

> **[2026-06-05] - Sección de Categorías Destacadas (`#categories-section`)**
> - **Qué se hizo:** Se agregó la estructura para las categorías principales de la tienda (Cocina, Baño, Living, Jardín & Exterior).
> - **Explicación de la Lógica:**
>   - **Atributos de Datos Personalizados (`data-category`)**: El uso de atributos `data-*` de HTML5 es una excelente práctica para almacenar metadatos en el DOM sin comprometer la semántica. En JavaScript, podremos leer fácilmente qué categoría seleccionó el usuario usando `element.dataset.category` para filtrar dinámicamente el catálogo.
>   - **Maquetación en Grid (.categories-grid)**: Dejamos el contenedor listo para aplicar **CSS Grid** en la fase de diseño. Esto facilitará la adaptabilidad (ej: 1 columna en móvil, 2 en tabletas y 4 en pantallas grandes) manteniendo el código limpio.
>   - **Capa Overlay (`.category-overlay`)**: Esquina fundamental para el diseño visual y la accesibilidad. Esta capa superpuesta semitransparente (que estilizaremos con CSS) asegura un buen contraste entre la imagen de fondo de madera y el texto superior blanco, garantizando la legibilidad (directrices WCAG) y sirviendo para micro-animaciones al pasar el cursor (hover).

> **[2026-06-05] - Catálogo y Filtros Dinámicos (`#catalog`)**
> - **Qué se hizo:** Se estructuró la sección del catálogo con botones de filtrado rápido y un contenedor vacío para la renderización dinámica de productos vía JavaScript.
> - **Explicación de la Lógica:**
>   - **Renderizado Dinámico (Separación Datos-Vista)**: Dejar el contenedor `.products-grid` vacío con la ID `#products-grid` es clave para la escalabilidad. En lugar de escribir HTML estático para cada producto de madera, usaremos JavaScript para mapear nuestro array de datos y generar las tarjetas en tiempo de ejecución. Así, modificar o añadir productos no requerirá alterar el HTML.
>   - **Experiencia de Usuario (UX) - Estado de Carga**: Agregamos un indicador provisional de carga (`#catalog-loading`) con un icono de cargando (`fa-spinner`). Esto le indica al usuario que la aplicación está trabajando activamente en traer la información del servidor o del script, y será removido dinámicamente por JavaScript tan pronto como los productos se rendericen.
>   - **Preparación de Delegación de Eventos (`#filter-container`)**: En lugar de agregar un escuchador de eventos (`addEventListener`) a cada botón de filtro (lo cual consume memoria innecesaria), adjuntaremos un solo escuchador en el contenedor padre `#filter-container`. Mediante la propiedad `event.target`, detectaremos en cuál botón se hizo clic y leeremos su atributo `data-filter` para filtrar los productos, un patrón altamente eficiente para optimizar rendimiento.

> **[2026-06-05] - Sección de Proceso Artesanal (`#process`)**
> - **Qué se hizo:** Se creó la sección informativa y de branding para detallar los pasos del proceso de carpintería y aportar confianza al usuario sobre la calidad del producto.
> - **Explicación de la Lógica:**
>   - **Estructura Multicolumna (`.process-container`)**: En el diseño responsivo, esta sección se apilará verticalmente en móviles (para fácil lectura) y se dividirá en dos columnas (imagen a la izquierda, texto explicativo a la derecha) en escritorio.
>   - **Contenedor Placeholder para Imagen (`.image-placeholder`)**: En lugar de incluir una etiqueta `<img>` con una ruta vacía o rota, creamos un marcador de posición dinámico usando estilos de CSS e iconos. Esto asegura que la web se renderice de forma pulida desde el primer momento, facilitando su sustitución posterior por imágenes reales.
>   - **Lista de Pasos Estructurada (`.process-steps`)**: Combinación de `<ul>` y `<li>` con divs internos para separar el número decorativo del paso (`.step-num`) del contenido. Esto permite al diseñador aplicar estilos distintos al círculo con el número de manera independiente a la tipografía del contenido.

> **[2026-06-05] - Panel Lateral del Carrito (`#cart-drawer`)**
> - **Qué se hizo:** Se implementó la estructura para el carrito de compras lateral desplegable (Drawer) junto con su capa overlay de fondo.
> - **Explicación de la Lógica:**
>   - **Semántica con `<aside>`**: Usamos `<aside>` ya que el carrito es una interfaz secundaria o panel flotante que no forma parte del flujo principal de lectura de la página.
>   - **Capa Overlay (`.cart-drawer-overlay`)**: Un contenedor independiente que servirá para oscurecer la web detrás del carrito cuando esté abierto, mejorando el contraste visual. También sirve para cerrar el menú si el usuario hace clic fuera del carrito.
>   - **Estado de Accesibilidad (`aria-hidden="true"`)**: Al estar oculto por defecto, le indicamos a los navegadores y lectores de pantalla que ignoren este elemento en la carga inicial. JavaScript cambiará este atributo a `false` al abrirlo para que sea legible y navegable con el teclado.
>   - **Mensaje de Carrito Vacío (`#cart-empty-message`)**: Un contenedor provisional que da feedback al usuario si no hay ítems. JavaScript ocultará este mensaje y dibujará las tarjetas de compra una vez que agreguemos productos de madera.

> **[2026-06-05] - Pie de Página Semántico (`<footer>`) e Importación de Scripts**
> - **Qué se hizo:** Se finalizó la maquetación del archivo HTML base integrando la sección de pie de página (`<footer>`) y enlazando el archivo de script principal (`js/app.js`).
> - **Explicación de la Lógica:**
>   - **Semántica con `<footer>`**: Contiene la información de cierre del sitio (créditos de marca, redes sociales, enlaces adicionales y datos de contacto).
>   - **Accesibilidad en Iconos Sociales (a11y)**: Al usar solo iconos para los enlaces de redes sociales (Instagram, Pinterest, Facebook), los lectores de pantalla no tendrían texto que leer. Para solucionarlo, añadimos el atributo `aria-label="..."` en cada etiqueta `<a>`, asegurando que personas con discapacidad visual entiendan el destino de cada enlace.
>   - **Carga de Scripts No Bloqueante (`type="module"`)**: Al usar `type="module"`, el navegador maneja el script de forma diferida automáticamente (similar a un atributo `defer`), descargándolo en segundo plano sin interrumpir el renderizado del HTML. También nos permite estructurar nuestro JavaScript usando módulos de ES6 (`import` / `export`) nativamente.

> **[2026-06-07] - Sistema de Diseño y Variables CSS (`css/main.css`)**
> - **Qué se hizo:** Se inicializó el archivo `css/main.css` definiendo los tokens visuales globales de la tienda dentro del bloque `:root` (colores cálidos, fuentes, tamaños, espaciados y animaciones).
> - **Explicación de la Lógica:**
>   - **Centralización con CSS Custom Properties**: El uso de `:root` permite definir variables globales en CSS. Esto facilita la consistencia en el diseño de toda la aplicación y hace que cambios de marca a futuro sean rápidos (ej: cambiar el color principal se realiza modificando una única línea).
>   - **Paleta de Colores "Woodcraft"**: Usamos tonalidades marrones oscuras (`--color-primary`) inspiradas en la madera y un tono ocre/caramelo (`--color-accent`) de contraste para llamadas a la acción (CTAs). Usamos un fondo off-white (`--color-bg`) en lugar de blanco puro para dar calidez y reducir la fatiga visual.
>   - **Escalas Relativas con `rem`**: Definir fuentes y espaciados en `rem` (unidad relativa al tamaño base del navegador, usualmente 16px) es una gran práctica de accesibilidad. Si el usuario aumenta el zoom de texto en su navegador, el diseño se escala de forma fluida sin romperse.
>   - **Micro-interacciones Orgánicas (`cubic-bezier`)**: Las variables de transición usan la función de tiempo `cubic-bezier(0.4, 0, 0.2, 1)`. A diferencia de las animaciones lineales aburridas, esta curva imita la física del mundo real acelerando rápido al inicio y frenando suavemente al final, aportando un aspecto sumamente interactivo y premium.
