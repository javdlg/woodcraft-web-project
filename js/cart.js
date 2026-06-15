/**
 * ==========================================================================
 * GESTOR DEL CARRITO DE COMPRAS (js/cart.js)
 * ==========================================================================
 * Este módulo administra el estado del carrito, su persistencia en el
 * almacenamiento local (localStorage) y la sincronización con la UI.
 */

import { $, $$, formatPrice } from './utils.js';
import { getProductById } from './gallery.js';
import { openCart, closeCart } from './app.js';

// Nombre de la clave para almacenamiento en LocalStorage
const STORAGE_KEY = 'woodcraft_cart_items';

// Estado del Carrito (Lista de productos agregados)
let cart = [];

/**
 * Guarda el estado actual del carrito en LocalStorage.
 */
const saveCart = () => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
        console.error('Error al guardar el carrito en LocalStorage:', error);
    }
};

/**
 * Carga el carrito desde LocalStorage al iniciar.
 */
const loadCart = () => {
    try {
        const storedCart = localStorage.getItem(STORAGE_KEY);
        cart = storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
        console.warn('No se pudo cargar el carrito previo. Iniciando vacío.', error);
        cart = [];
    }
};

/**
 * Actualiza todos los elementos visuales de la UI del carrito.
 */
export const updateCartUI = () => {
    const badge = $('#cart-badge-count');
    const container = $('#cart-items-container');
    const totalPriceEl = $('#cart-total-price');
    const emptyMessage = $('#cart-empty-message');
    const footer = $('#cart-drawer-footer');

    // 1. Calcular cantidad total de productos para la insignia de la cabecera
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    if (badge) {
        badge.textContent = totalItems;
    }

    // 2. Controlar la visualización según si el carrito tiene productos
    if (cart.length === 0) {
        // Mostrar mensaje de vacío y ocultar footer de pago
        if (emptyMessage) emptyMessage.style.display = 'flex';
        if (footer) footer.style.display = 'none';
        if (container) {
            // Limpiar los elementos anteriores manteniendo el mensaje de vacío
            const emptyHTML = emptyMessage ? emptyMessage.outerHTML : '';
            container.innerHTML = emptyHTML;
        }
        if (totalPriceEl) totalPriceEl.textContent = formatPrice(0);
        return;
    }

    // Hay productos: Ocultamos el mensaje de vacío y mostramos el footer de pago
    if (emptyMessage) emptyMessage.style.display = 'none';
    if (footer) footer.style.display = 'block';

    // 3. Renderizar listado de productos
    let totalCartPrice = 0;
    const itemsHTML = cart.map(item => {
        const itemSubtotal = item.price * item.quantity;
        totalCartPrice += itemSubtotal;

        return `
            <div class="cart-item" data-id="${item.id}">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.name}</h4>
                    <span class="cart-item-price">${formatPrice(item.price)}</span>
                    <div class="cart-item-quantity-controls">
                        <button class="qty-btn dec-qty-btn" data-id="${item.id}">-</button>
                        <span class="qty-val">${item.quantity}</span>
                        <button class="qty-btn inc-qty-btn" data-id="${item.id}">+</button>
                    </div>
                </div>
                <button class="cart-item-remove-btn" data-id="${item.id}" aria-label="Eliminar producto de madera">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </div>
        `;
    }).join('');

    if (container) {
        container.innerHTML = itemsHTML;
    }

    // 4. Actualizar subtotal general
    if (totalPriceEl) {
        totalPriceEl.textContent = formatPrice(totalCartPrice);
    }
};

/**
 * Añade un producto al carrito (o incrementa su cantidad si ya existe).
 * @param {number|string} productId - ID del producto a agregar.
 */
export const addToCart = (productId) => {
    const idNum = parseInt(productId, 10);
    const existingItem = cart.find(item => item.id === idNum);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        // Obtenemos los detalles del producto desde el catálogo cargado en gallery.js
        const product = getProductById(idNum);
        if (!product) {
            console.error(`No se encontró el producto con ID ${idNum} para agregar al carrito.`);
            return;
        }

        // Agregamos una copia con cantidad inicial de 1
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    saveCart();
    updateCartUI();
    openCart(); // Abrimos el panel para feedback visual inmediato (premium UX)
};

/**
 * Cambia la cantidad de un ítem en el carrito (+1 o -1).
 * @param {number|string} productId - ID del producto.
 * @param {number} change - Valor de incremento/decremento (ej. +1, -1).
 */
export const changeQuantity = (productId, change) => {
    const idNum = parseInt(productId, 10);
    const item = cart.find(item => item.id === idNum);

    if (!item) return;

    item.quantity += change;

    // Si la cantidad llega a 0 o menos, removemos el producto automáticamente
    if (item.quantity <= 0) {
        cart = cart.filter(i => i.id !== idNum);
    }

    saveCart();
    updateCartUI();
};

/**
 * Elimina por completo un producto del carrito sin importar su cantidad.
 * @param {number|string} productId - ID del producto.
 */
export const removeFromCart = (productId) => {
    const idNum = parseInt(productId, 10);
    cart = cart.filter(item => item.id !== idNum);

    saveCart();
    updateCartUI();
};

/**
 * Vacía por completo el carrito de compras.
 */
export const clearCart = () => {
    cart = [];
    saveCart();
    updateCartUI();
};

// ==========================================================================
// INICIALIZACIÓN Y EVENTOS DEL CARRITO
// ==========================================================================

const initCart = () => {
    // 1. Carga inicial del estado persistido
    loadCart();
    updateCartUI();

    // 2. Event Delegation en el listado de productos de la galería (Botones "Agregar al Carrito")
    const productsGrid = $('#products-grid');
    if (productsGrid) {
        productsGrid.addEventListener('click', (e) => {
            const addBtn = e.target.closest('.add-to-cart-btn');
            if (addBtn) {
                const productId = addBtn.dataset.id;
                addToCart(productId);
            }
        });
    }

    // 3. Event Delegation en las acciones internas del drawer (Cerrar, Aumentar, Disminuir y Remover)
    const cartContainer = $('#cart-items-container');
    if (cartContainer) {
        cartContainer.addEventListener('click', (e) => {
            const target = e.target;

            // Botón Aumentar cantidad (+)
            const incBtn = target.closest('.inc-qty-btn');
            if (incBtn) {
                const id = incBtn.dataset.id;
                changeQuantity(id, 1);
                return;
            }

            // Botón Disminuir cantidad (-)
            const decBtn = target.closest('.dec-qty-btn');
            if (decBtn) {
                const id = decBtn.dataset.id;
                changeQuantity(id, -1);
                return;
            }

            // Botón Eliminar del carrito (tacho)
            const removeBtn = target.closest('.cart-item-remove-btn');
            if (removeBtn) {
                const id = removeBtn.dataset.id;
                removeFromCart(id);
                return;
            }
        });
    }

    // 4. Conectar botón de checkout con la API de Python
    const checkoutBtn = $('#cart-checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', async () => {
            // Evitar doble envío deshabilitando el botón temporalmente
            checkoutBtn.disabled = true;
            const originalText = checkoutBtn.textContent;
            checkoutBtn.textContent = 'Procesando pedido...';

            try {
                // Hacemos el POST asíncrono enviando los datos del carrito en formato JSON
                const response = await fetch('http://127.0.0.1:8000/api/checkout', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ items: cart })
                });

                if (!response.ok) {
                    throw new Error(`Error en el servidor: ${response.status}`);
                }

                const data = await response.json();

                // Mostrar un modal/alerta estética confirmando la compra
                alert(`📦 ¡Pedido realizado con éxito!\n\nCódigo de Orden: ${data.order_id}\nTotal procesado: ${formatPrice(data.total)}\n\nTu base de datos local 'orders.json' ha registrado este pedido.`);
                
                // Limpiamos el carrito local
                clearCart();
                closeCart();

            } catch (error) {
                console.error('Error durante el checkout:', error);
                
                // Mensaje en caso de que la API REST esté offline
                alert('⚠️ No se pudo conectar con el servidor de pago de Python.\n\nPor favor, enciende la API en tu terminal (uvicorn backend.main:app --reload) e inténtalo de nuevo.');
            } finally {
                // Restauramos el botón a su estado original
                checkoutBtn.disabled = false;
                checkoutBtn.textContent = originalText;
            }
        });
    }
};

// Inicializar el carrito al cargar el script
initCart();
