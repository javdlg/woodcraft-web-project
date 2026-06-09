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

> **[2026-06-07] - CSS Reset y Estilos Base (`css/main.css`)**
> - **Qué se hizo:** Se aplicó un reinicio de estilos global (Reset) para unificar la visualización de la web en todos los navegadores y se definieron los estilos tipográficos y de fondo para la etiqueta `<body>`.
> - **Explicación de la Lógica:**
>   - **`box-sizing: border-box` Global**: Cambia el modelo de caja por defecto. Ahora, el ancho y alto definidos para cualquier elemento incluirán el `padding` y el `border`. Evita que las cajas "exploten" o se desborden al añadirles relleno, facilitando enormemente el cálculo de layouts.
>   - **Eliminación de Margen y Relleno Inicial**: Homogeneiza la página eliminando los espaciados por defecto que aplican Chrome, Safari o Firefox en elementos como `body`, listas y títulos.
>   - **Font Smoothing (Suavizado de Tipografía)**: Configura la renderización de texto a nivel de subpíxel para que las tipografías se lean más nítidas y limpias, evitando el efecto de "grosor artificial" en pantallas macOS y Windows.
>   - **Estilo Base de Enlaces y Listas**: Eliminamos los subrayados de los enlaces (`text-decoration: none`) and los puntos/números de las listas (`list-style: none`) para tener un lienzo limpio. Los enlaces heredan el color del texto contenedor (`color: inherit`) de forma natural.

> **[2026-06-07] - Clases de Utilidad de Estructura y Títulos (`css/main.css`)**
> - **Qué se hizo:** Se añadieron clases utilitarias para centrar y estructurar el diseño del sitio (`.container`), alinear texto y estandarizar la tipografía de títulos y subtítulos de secciones comunes.
> - **Explicación de la Lógica:**
>   - **Contenedor Responsivo (`.container`)**: Centra y delimita horizontalmente el contenido de la web usando márgenes automáticos laterales y estableciendo un ancho máximo (`--max-width` = 1200px). Además, mediante una Media Query adaptamos el relleno lateral (más pequeño en móviles para ganar espacio útil y más amplio en pantallas de escritorio).
>   - **Clases de Utilidad Atómicas**: Pequeñas clases enfocadas en una sola tarea (ej: `.text-center`, `.text-muted`, `.text-accent`). Nos permiten dar formato sutil de color o alineación en el HTML directamente, reduciendo la redundancia de código.
>   - **Estandarización de Encabezados (`.section-title` y `.section-subtitle`)**: Asegura que todas las secciones del sitio (catálogo, categorías, proceso artesanal) tengan títulos perfectamente uniformes en tamaño, tipografía (*Playfair Display*) y espaciado. Los tamaños de fuente cambian de forma responsiva en pantallas medianas/grandes para mantener la armonía visual.

> **[2026-06-08] - Estilos del Encabezado y Navegación (`css/components.css`)**
> - **Qué se hizo:** Se estilizó la cabecera principal (`.main-header`), el logotipo, el menú con efectos hover y el botón flotante del carrito con su badge indicador.
> - **Explicación de la Lógica:**
>   - **Cabecera Fija (`position: fixed`)**: Permite que el menú y el botón del carrito sigan visibles mientras el usuario navega (hace scroll) por la página, una práctica estándar y necesaria en e-commerce.
>   - **Efecto de Desenfoque Translúcido (Glassmorphism)**: Usamos `background-color` con transparencia (`rgba`) y `backdrop-filter: blur(10px)`. Consigue un efecto esmerilado que difumina el contenido que pasa por debajo al hacer scroll, dando un aspecto estético premium y moderno.
>   - **Transición Hover Avanzada (`::after`)**: Creamos la línea decorativa inferior de los enlaces usando un pseudoelemento `::after`. En lugar de animar el ancho (`width`), lo cual recalcula el diseño y es costoso para la CPU, animamos la escala horizontal (`transform: scaleX(...)`) con `transform-origin` dinámico. Esto dibuja la línea de izquierda a derecha en hover y la recoge en la misma dirección, logrando una animación muy fluida y optimizada.
>   - **Posicionamiento del Badge del Carrito**: Usamos `position: absolute` referenciado a un contenedor `relative` (`.cart-toggle-btn`). Esto nos permite colocar el globo del contador flotando sobre la esquina superior derecha del botón.
>   - **Menú Móvil Desplegable**: Usamos Media Queries para ocultar el menú de navegación horizontal en móviles y transformarlo en un bloque de ancho completo absoluto que cae por debajo de la cabecera. La visibilidad de este menú se activará al añadir la clase `.open` mediante JavaScript.

> **[2026-06-08] - Estilos de Botones y Sección Héroe (`css/components.css`)**
> - **Qué se hizo:** Se definió el sistema de botones reutilizables (`.btn`, `.btn-primary`, `.btn-secondary`) y se estilizó visualmente la sección Héroe principal (`.hero-section`) aplicando degradados y responsive design.
> - **Explicación de la Lógica:**
>   - **Sistema de Botones Reutilizable**: Establecemos estilos base con `.btn` (alineación flex, bordes redondeados y transiciones). `.btn-primary` (color acento ocre) incluye una sombra suave; en hover aplica un efecto de elevación física (`transform: translateY(-2px)`) con sombra más profunda. `.btn-secondary` utiliza un borde lineal (`outline`) que se invierte a fondo sólido al interactuar.
>   - **Offset de Cabecera Fija (`padding-top: calc(...)`)**: Puesto que el header flota fijo arriba, restaría espacio útil y taparía la sección. Lo solucionamos calculando el relleno superior del Héroe sumando la altura del header más espaciado dinámico: `calc(var(--header-height) + var(--space-2xl))`.
>   - **Efecto de Degradado Cálido Tridimensional**: Combinamos un `radial-gradient` y un `linear-gradient` en tonos beige y crema suave. Esto emula la iluminación cálida de un estudio de carpintería sobre madera, aportando volumen y sofisticación al fondo.
>   - **Tipografía Fluida Responsiva**: El título del Héroe se escala desde `2rem` (32px) en dispositivos móviles hasta `3rem` (48px) a partir de 768px mediante media queries. Esto garantiza legibilidad y un balance jerárquico perfecto para dispositivos táctiles y pantallas grandes.

> **[2026-06-09] - Estilos de Tarjetas de Categorías (`css/components.css`)**
> - **Qué se hizo:** Se implementó el diseño de la grilla de categorías destacadas usando CSS Grid responsivo y se agregaron efectos visuales premium (zoom de imagen, oscurecimiento de overlay y desplazamiento de texto) en hover.
> - **Explicación de la Lógica:**
>   - **Grilla Responsiva (`.categories-grid`)**: Usamos CSS Grid estructurando las columnas dinámicamente con Media Queries: 1 columna en móviles, 2 columnas en tablets y 4 columnas en monitores de escritorio. Esto optimiza el flujo de lectura según el área de visualización.
>   - **Zoom de Imagen Inteligente (`.category-card::before`)**: Colocar la foto de fondo en un pseudoelemento `::before` y animar su escala (`transform: scale(1.08)`) en hover es un truco premium. Como el contenedor padre tiene `overflow: hidden`, la foto se agranda sutilmente dentro de sus límites sin deformar el marco ni la tarjeta, aportando dinamismo visual.
>   - **Garantía de Legibilidad (Overlay Gradiente)**: El elemento `.category-overlay` utiliza un degradado vertical oscuro (`linear-gradient` de abajo hacia arriba). Esto crea una base de contraste constante bajo el texto blanco, asegurando que se cumplan las normas de contraste de accesibilidad (WCAG) sin tapar por completo la foto de madera del fondo.
>   - **Efecto de Desplazamiento del Texto (`.category-info`)**: Al hacer hover sobre la tarjeta, el texto se desliza levemente hacia arriba (`transform: translateY(-4px)`). Al combinarse con el zoom de la imagen que va en sentido contrario, crea un efecto de profundidad tridimensional.

> **[2026-06-09] - Estilos del Catálogo y Tarjetas de Producto (`css/components.css`)**
> - **Qué se hizo:** Se maquetaron los botones de filtrado interactivos de catálogo y se definieron los estilos visuales responsivos para las tarjetas de productos (`.product-card`) junto con su indicador de carga.
> - **Explicación de la Lógica:**
>   - **Botones de Filtro Tipo Píldora**: Diseñamos los botones con bordes circulares y transiciones rápidas. El botón `.active` adopta el color ocre con una sombra paralela difusa para indicar claramente la categoría seleccionada.
>   - **Grilla de Productos Responsiva (`.products-grid`)**: Configuración con CSS Grid en 3 columnas en ordenadores, 2 en tabletas y 1 en móviles, adaptándose al espacio horizontal para lucir las piezas de madera.
>   - **Alineación del Spinner de Carga (`grid-column: 1 / -1`)**: Para centrar el indicador de carga en la grilla, usamos `grid-column: 1 / -1`. Esto hace que el elemento ocupe todas las columnas disponibles y se posicione en el centro de la pantalla.
>   - **Tarjetas Flex-Column con Botones Alineados**: Las tarjetas de producto usan `display: flex` con dirección de columna. Agregamos `margin-top: auto` al contenedor de acciones (`.product-actions`). Esto asegura que, incluso si un producto tiene un título más largo que otro, el botón de compra siempre se mantenga alineado en la base de la tarjeta.
>   - **Zoom sutil de Producto y Elevación**: Al hacer hover, la tarjeta se eleva (`translateY(-6px)`) con sombra más profunda, y la foto del producto hace un zoom suave de `1.05`.

