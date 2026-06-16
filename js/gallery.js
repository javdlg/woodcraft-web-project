/**
 * ==========================================================================
 * LÓGICA DE GALERÍA Y CATÁLOGO DINÁMICO (js/gallery.js)
 * ==========================================================================
 * Este módulo gestiona la descarga asíncrona de los productos desde la API
 * de Python, su renderizado dinámico en la grilla y el filtrado por categorías.
 */

import { $, $$, formatPrice } from './utils.js';

// Configuración de la API
const API_BASE_URL = 'http://127.0.0.1:8000/api/products';

// Datos de respaldo (Fallback) en caso de que la API REST esté offline
const FALLBACK_PRODUCTS = [
    {
        "id": 1,
        "name": "Tabla de Picar 'Roble Centenario'",
        "category": "cocina",
        "price": 28900,
        "image": "https://images.unsplash.com/photo-1606836591695-4d58a73efa1e?auto=format&fit=crop&w=600&q=80",
        "description": "Tabla de picar premium elaborada con madera de roble recuperado. Curada con aceite mineral y cera de abeja natural.",
        "badge": "Destacado",
        "stock": 10
    },
    {
        "id": 2,
        "name": "Set de Cucharas de Cocina 'Haya'",
        "category": "cocina",
        "price": 14900,
        "image": "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=600&q=80",
        "description": "Juego de 3 utensilios de madera de haya pulidos a mano. No rayan las sartenes y son extremadamente duraderos.",
        "badge": null,
        "stock": 15
    },
    {
        "id": 3,
        "name": "Jabonera Orgánica de Coihue",
        "category": "baño",
        "price": 9500,
        "image": "https://images.unsplash.com/photo-1609172765488-5111451f3b3d?auto=format&fit=crop&w=600&q=80",
        "description": "Jabonera con ranuras de drenaje rápido, tallada en madera de coihue resistente a la humedad constante.",
        "badge": "Eco-friendly",
        "stock": 25
    },
    {
        "id": 4,
        "name": "Organizador de Baño 'Raulí'",
        "category": "baño",
        "price": 22000,
        "image": "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=600&q=80",
        "description": "Caja organizadora modular de madera de raulí con tratamiento de impermeabilización ecológica.",
        "badge": "Nuevo",
        "stock": 8
    },
    {
        "id": 5,
        "name": "Mesa Auxiliar Rústica de Ciprés",
        "category": "living",
        "price": 65000,
        "image": "https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=600&q=80",
        "description": "Mesa lateral hecha de rodaja de ciprés natural con vetas marcadas y patas de acero negro estilo hairpin.",
        "badge": "Pieza Única",
        "stock": 3
    },
    {
        "id": 6,
        "name": "Posavasos Geométricos 'Alerce' (Set de 6)",
        "category": "living",
        "price": 12900,
        "image": "https://images.unsplash.com/photo-1565192647048-f997ed87f5e2?auto=format&fit=crop&w=600&q=80",
        "description": "Conjunto de 6 posavasos de alerce tallados con patrones geométricos sutiles. Incluye soporte de madera.",
        "badge": null,
        "stock": 20
    },
    {
        "id": 7,
        "name": "Portamaceta Flotante 'Lenga'",
        "category": "jardineria",
        "price": 18500,
        "image": "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80",
        "description": "Estructura colgante para macetas pequeñas, elaborada en madera de lenga con cuerdas de algodón natural.",
        "badge": "Popular",
        "stock": 12
    },
    {
        "id": 8,
        "name": "Jardinera Escalonada de Pino Oregón",
        "category": "jardineria",
        "price": 42000,
        "image": "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=600&q=80",
        "description": "Jardinera vertical de 3 niveles para hierbas o flores, tratada especialmente para intemperie.",
        "badge": null,
        "stock": 5
    }
];

// Estado local de los productos mostrados
let currentProducts = [];

/**
 * Busca un producto por su ID en el catálogo actualmente cargado (o en el listado local de respaldo).
 * Permite al carrito acceder a la información de los productos de forma síncrona y resiliente.
 * @param {number|string} id - ID del producto.
 * @returns {Object|null} El objeto de producto encontrado.
 */
export const getProductById = (id) => {
    const idNum = parseInt(id, 10);
    return currentProducts.find(p => p.id === idNum) || FALLBACK_PRODUCTS.find(p => p.id === idNum) || null;
};


/**
 * Renderiza el catálogo de productos en el contenedor HTML.
 * @param {Array} products - Lista de objetos de producto a renderizar.
 */
export const renderCatalog = (products) => {
    const grid = $('#products-grid');
    if (!grid) return;

    // Si no hay productos, mostramos un aviso
    if (products.length === 0) {
        grid.innerHTML = `
            <div class="catalog-loading">
                <i class="fa-solid fa-face-frown"></i> No se encontraron productos en esta categoría.
            </div>
        `;
        return;
    }

    // Mapeamos los productos a HTML seguro y lo inyectamos
    grid.innerHTML = products.map(product => {
        // Renderizamos la insignia solo si existe
        const badgeHTML = product.badge 
            ? `<span class="product-badge">${product.badge}</span>` 
            : '';

        return `
            <article class="product-card" id="product-${product.id}">
                <div class="product-image-container">
                    ${badgeHTML}
                    <img 
                        src="${product.image}" 
                        alt="${product.name}" 
                        class="product-image" 
                        loading="lazy"
                    >
                </div>
                <div class="product-info">
                    <span class="product-category">${product.category}</span>
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-price">${formatPrice(product.price)}</p>
                    <div class="product-actions">
                        <button 
                            class="btn btn-primary btn-block add-to-cart-btn" 
                            data-id="${product.id}"
                        >
                            Agregar al Carrito
                        </button>
                    </div>
                </div>
            </article>
        `;
    }).join('');
};

/**
 * Descarga los productos desde la API REST (o usa el fallback local si falla).
 * @param {string} [categoryFilter=''] - Nombre de la categoría por la cual filtrar.
 */
export const loadProductsFromAPI = async (categoryFilter = '') => {
    const grid = $('#products-grid');
    if (grid) {
        // Mostrar spinner de carga antes de la petición
        grid.innerHTML = `
            <div class="catalog-loading" id="catalog-loading">
                <i class="fa-solid fa-spinner fa-spin"></i> Cargando catálogo de madera...
            </div>
        `;
    }

    try {
        // Construimos la URL agregando query params si hay un filtro activo
        let url = API_BASE_URL;
        if (categoryFilter && categoryFilter !== 'all') {
            url += `?category=${encodeURIComponent(categoryFilter)}`;
        }

        // Petición asíncrona con Timeout manual (para dar feedback rápido si la API está caída)
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 segundos de timeout

        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        currentProducts = data;
        console.log('📦 Catálogo cargado desde la API en Python.');
        renderCatalog(currentProducts);
    } catch (error) {
        console.warn('⚠️ La API en Python está desconectada. Cargando catálogo de respaldo local...', error);
        
        // Simular retardo de carga para mantener consistencia en la UX
        setTimeout(() => {
            if (categoryFilter && categoryFilter !== 'all') {
                currentProducts = FALLBACK_PRODUCTS.filter(
                    p => p.category.toLowerCase() === categoryFilter.toLowerCase()
                );
            } else {
                currentProducts = FALLBACK_PRODUCTS;
            }
            renderCatalog(currentProducts);
        }, 300);
    }
};

// Elementos del DOM del Modal
const modal = $('#product-modal');
const modalOverlay = $('#product-modal-overlay');

/**
 * Genera especificaciones técnicas simuladas basadas en la categoría y nombre del producto.
 * @param {Object} product - El objeto de producto.
 * @returns {Object} Un objeto con madera, acabado, dimensiones y stock.
 */
const getProductSpecs = (product) => {
    const category = product.category;
    let wood = "Madera Noble";
    const nameLower = product.name.toLowerCase();
    
    if (nameLower.includes("roble")) wood = "Roble";
    else if (nameLower.includes("haya")) wood = "Haya";
    else if (nameLower.includes("coihue")) wood = "Coihue";
    else if (nameLower.includes("raulí")) wood = "Raulí";
    else if (nameLower.includes("ciprés")) wood = "Ciprés";
    else if (nameLower.includes("alerce")) wood = "Alerce";
    else if (nameLower.includes("lenga")) wood = "Lenga";
    else if (nameLower.includes("oregón") || nameLower.includes("oregon")) wood = "Pino Oregón";

    return {
        wood,
        finish: category === "cocina" ? "Aceite mineral apto alimentos" : "Cera de abejas impermeable",
        dimensions: category === "cocina" ? "40 x 25 x 3 cm" : category === "baño" ? "20 x 12 x 8 cm" : category === "living" ? "50 x 50 x 45 cm" : "30 x 15 x 60 cm",
        stock: product.stock || 5
    };
};

/**
 * Abre el modal de detalles del producto consultando el endpoint específico de la API.
 * Si la API falla, carga los detalles desde la memoria local para mantener la resiliencia.
 * @param {number|string} productId - ID del producto.
 */
export const openProductModal = async (productId) => {
    if (!modal || !modalOverlay) return;

    let product = null;

    try {
        // Intentamos consumir el endpoint de FastAPI específico por ID
        const response = await fetch(`${API_BASE_URL}/${productId}`);
        if (response.ok) {
            product = await response.json();
        } else {
            throw new Error(`HTTP Error: ${response.status}`);
        }
    } catch (error) {
        console.warn(`⚠️ API offline o error al traer producto ${productId}. Cargando desde datos de respaldo local.`, error);
        product = getProductById(productId);
    }

    if (!product) return;

    const specs = getProductSpecs(product);

    // Inyectar contenido en el modal de forma dinámica
    modal.innerHTML = `
        <button class="modal-close-btn" id="modal-close-btn" aria-label="Cerrar detalles del producto">
            <i class="fa-solid fa-xmark"></i>
        </button>
        <div class="modal-body">
            <div class="modal-image-container">
                <img src="${product.image}" alt="${product.name}" class="modal-image">
            </div>
            <div class="modal-details">
                <span class="modal-cat">${product.category}</span>
                <h3 class="modal-title">${product.name}</h3>
                <span class="modal-price">${formatPrice(product.price)}</span>
                <p class="modal-desc">${product.description}</p>
                
                <div class="modal-specs">
                    <div class="spec-item"><strong>Madera:</strong> ${specs.wood}</div>
                    <div class="spec-item"><strong>Acabado:</strong> ${specs.finish}</div>
                    <div class="spec-item"><strong>Medidas:</strong> ${specs.dimensions}</div>
                    <div class="spec-item"><strong>Stock:</strong> ${specs.stock} unidades</div>
                </div>
                
                <div class="modal-actions">
                    <button class="btn btn-primary btn-block modal-add-to-cart-btn" data-id="${product.id}">
                        <i class="fa-solid fa-cart-plus"></i> Agregar al Carrito
                    </button>
                </div>
            </div>
        </div>
    `;

    // Abrir modal con clases de transición y atributos ARIA
    modal.classList.add('open');
    modalOverlay.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Evitar scroll de fondo
};

/**
 * Cierra el modal de detalles del producto.
 */
export const closeProductModal = () => {
    if (!modal || !modalOverlay) return;
    
    modal.classList.remove('open');
    modalOverlay.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = ''; // Devolver scroll al body
};

/**
 * Inicializa los controladores del catálogo y la delegación de eventos.
 */
const initCatalog = () => {
    const filterContainer = $('#filter-container');
    
    if (filterContainer) {
        // EVENT DELEGATION: Escuchamos clics en el contenedor padre
        filterContainer.addEventListener('click', (e) => {
            const button = e.target.closest('.filter-btn');
            if (!button) return;

            // Evitar re-filtrar si el botón ya estaba activo
            if (button.classList.contains('active')) return;

            // Actualizar clases activas en los botones de filtro
            $$('.filter-btn', filterContainer).forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Leer filtro del dataset y solicitar datos a la API
            const filterValue = button.dataset.filter;
            loadProductsFromAPI(filterValue);
        });
    }

    // EVENT DELEGATION: Clic en la tarjeta de producto para abrir detalles
    const grid = $('#products-grid');
    if (grid) {
        grid.addEventListener('click', (e) => {
            // Evitar abrir modal si el clic se hizo en el botón directo de comprar
            if (e.target.closest('.add-to-cart-btn')) return;

            const card = e.target.closest('.product-card');
            if (card) {
                const productId = card.id.replace('product-', '');
                openProductModal(productId);
            }
        });
    }

    // EVENT DELEGATION: Clics dentro del modal (Cerrar y Comprar)
    if (modal) {
        modal.addEventListener('click', (e) => {
            // Clic en botón cerrar
            if (e.target.closest('#modal-close-btn')) {
                closeProductModal();
                return;
            }

            // Clic en "Agregar al Carrito" dentro del modal
            const addBtn = e.target.closest('.modal-add-to-cart-btn');
            if (addBtn) {
                const id = addBtn.dataset.id;
                // Emitimos un evento personalizado para desacoplar de cart.js
                // Esto previene dependencias circulares ES6 (cart.js importa gallery.js y viceversa)
                document.dispatchEvent(new CustomEvent('addToCartRequested', { detail: { id } }));
                closeProductModal();
            }
        });
    }

    // Cierre del modal al hacer clic en el overlay difuminado
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeProductModal);
    }

    // Cierre de accesibilidad: tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
            closeProductModal();
        }
    });

    // Carga inicial al cargar el script
    loadProductsFromAPI();
};

// Arrancar catálogo
initCatalog();

