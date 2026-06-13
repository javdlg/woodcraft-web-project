/**
 * ==========================================================================
 * FUNCIONES AUXILIARES DE UTILIDAD (js/utils.js)
 * ==========================================================================
 * Este módulo contiene funciones reutilizables que simplifican tareas
 * comunes de manipulación del DOM y formateo de datos.
 */

/**
 * Acceso directo para seleccionar un único elemento del DOM (tipo jQuery $).
 * @param {string} selector - Selector CSS a buscar.
 * @param {HTMLElement} [parent=document] - Elemento padre desde donde buscar.
 * @returns {HTMLElement|null} El elemento encontrado.
 */
export const $ = (selector, parent = document) => parent.querySelector(selector);

/**
 * Acceso directo para seleccionar múltiples elementos del DOM (tipo jQuery $$).
 * @param {string} selector - Selector CSS a buscar.
 * @param {HTMLElement} [parent=document] - Elemento padre desde donde buscar.
 * @returns {NodeList} Lista de elementos encontrados.
 */
export const $$ = (selector, parent = document) => parent.querySelectorAll(selector);

/**
 * Formatea un número decimal/entero a divisa en Pesos Argentinos (ARS).
 * La madera de este taller se comercializa localmente en Buenos Aires.
 * @param {number} amount - El valor numérico a formatear.
 * @returns {string} El valor formateado (ej. $15.990).
 */
export const formatPrice = (amount) => {
    // Usamos el constructor nativo de JS Intl.NumberFormat para formateo internacional.
    // Esto garantiza que la divisa se muestre según las normas oficiales de Argentina (es-AR, ARS).
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 0
    }).format(amount);
};
