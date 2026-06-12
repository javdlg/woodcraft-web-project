/**
 * ==========================================================================
 * COORDINADOR PRINCIPAL Y INTERFAZ DE USUARIO (js/app.js)
 * ==========================================================================
 * Este archivo centraliza la lógica global de la interfaz de usuario (UI),
 * manejando los menús interactivos, el panel flotante del carrito y
 * coordinando la navegación del sitio.
 */

import { $, $$ } from './utils.js';

// Elementos del DOM para la navegación móvil
const navMenu = $('#nav-menu');
const mobileMenuToggle = $('#mobile-menu-toggle');

// Elementos del DOM para el panel del carrito
const cartDrawer = $('#cart-drawer');
const cartDrawerOverlay = $('#cart-drawer-overlay');
const cartToggleBtn = $('#cart-toggle-btn');
const cartCloseBtn = $('#cart-close-btn');
const cartBackToCatalogBtn = $('#cart-back-to-catalog');

/**
 * Abre el panel lateral del carrito de compras.
 */
export const openCart = () => {
    if (cartDrawer && cartDrawerOverlay) {
        cartDrawer.classList.add('open');
        cartDrawerOverlay.classList.add('active');
        cartDrawer.setAttribute('aria-hidden', 'false');
        // Impedir scroll de fondo para mejorar UX en dispositivos móviles
        document.body.style.overflow = 'hidden';
    }
};

/**
 * Cierra el panel lateral del carrito de compras.
 */
export const closeCart = () => {
    if (cartDrawer && cartDrawerOverlay) {
        cartDrawer.classList.remove('open');
        cartDrawerOverlay.classList.remove('active');
        cartDrawer.setAttribute('aria-hidden', 'true');
        // Restaurar el scroll de fondo
        document.body.style.overflow = '';
    }
};

// ==========================================================================
// REGISTRO DE EVENTOS (EVENT LISTENERS)
// ==========================================================================

// Inicialización de controladores de la UI
const initUI = () => {
    // 1. Menú Móvil Desplegable
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('open');
            // Gestión de accesibilidad WAI-ARIA
            mobileMenuToggle.setAttribute('aria-expanded', isOpen);
        });
    }

    // 2. Cerrar menú móvil al hacer clic en enlaces de anclaje (Smooth Scroll Link Interaction)
    const navLinks = $$('.nav-link', navMenu);
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Remueve la clase active de todos los enlaces y la asigna al seleccionado
            $$('.nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Cierra el menú si estamos en resolución móvil
            if (navMenu.classList.contains('open')) {
                navMenu.classList.remove('open');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // 3. Apertura y Cierre de Carrito
    if (cartToggleBtn) {
        cartToggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openCart();
        });
    }

    if (cartCloseBtn) {
        cartCloseBtn.addEventListener('click', closeCart);
    }

    if (cartDrawerOverlay) {
        cartDrawerOverlay.addEventListener('click', closeCart);
    }

    if (cartBackToCatalogBtn) {
        cartBackToCatalogBtn.addEventListener('click', (e) => {
            closeCart();
        });
    }
};

// Inicializar la interfaz una vez cargado el módulo
initUI();
