import json
import os
import random
from datetime import datetime
from typing import List, Optional
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

# Inicialización de la aplicación FastAPI
app = FastAPI(
    title="Woodcraft API",
    description="API REST para la gestión y consulta del catálogo de productos de Woodcraft.",
    version="1.0.0"
)

# Configuración de CORS (Cross-Origin Resource Sharing)
# Esto es CRÍTICO para permitir que nuestro frontend en JavaScript (que corre localmente)
# pueda realizar peticiones HTTP (Fetch) a este servidor de Python.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # En producción, restringir a los dominios permitidos
    allow_credentials=True,
    allow_methods=["*"],  # Permitir todos los métodos HTTP (GET, POST, etc.)
    allow_headers=["*"],  # Permitir todas las cabeceras HTTP
)

# Rutas de archivos JSON de persistencia
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PRODUCTS_JSON_PATH = os.path.join(BASE_DIR, "products.json")
ORDERS_JSON_PATH = os.path.join(BASE_DIR, "orders.json")


# ==========================================================================
# MODELOS DE VALIDACIÓN CON PYDANTIC
# ==========================================================================

class CartItem(BaseModel):
    """Esquema de validación para un producto dentro del carrito."""
    id: int = Field(..., description="ID del producto de madera")
    name: str = Field(..., description="Nombre comercial del producto")
    price: float = Field(..., gt=0, description="Precio unitario (debe ser mayor a 0)")
    quantity: int = Field(..., gt=0, description="Cantidad seleccionada (debe ser mayor a 0)")

class CheckoutRequest(BaseModel):
    """Esquema de validación para el cuerpo de la petición de compra."""
    items: List[CartItem] = Field(..., min_items=1, description="Listado de ítems a comprar en el carrito")


# ==========================================================================
# FUNCIONES DE PERSISTENCIA LOCAL (SIMULACIÓN DE BASE DE DATOS)
# ==========================================================================

def load_products() -> List[dict]:
    """Carga los productos desde el archivo local JSON."""
    if not os.path.exists(PRODUCTS_JSON_PATH):
        raise HTTPException(status_code=500, detail="Archivo de datos no encontrado.")
    
    try:
        with open(PRODUCTS_JSON_PATH, "r", encoding="utf-8") as file:
            return json.load(file)
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Error al decodificar el archivo JSON de productos.")


def load_orders() -> List[dict]:
    """Carga las órdenes de compra guardadas."""
    if not os.path.exists(ORDERS_JSON_PATH):
        return []
    try:
        with open(ORDERS_JSON_PATH, "r", encoding="utf-8") as file:
            return json.load(file)
    except json.JSONDecodeError:
        return []


def save_orders(orders: List[dict]):
    """Persiste las órdenes de compra en el archivo JSON."""
    try:
        with open(ORDERS_JSON_PATH, "w", encoding="utf-8") as file:
            json.dump(orders, file, indent=4, ensure_ascii=False)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al escribir en la base de datos de órdenes: {str(e)}")


# ==========================================================================
# ENDPOINTS / RUTAS DE LA API
# ==========================================================================

@app.get("/")
def read_root():
    """Endpoint de bienvenida e información básica de la API."""
    return {
        "message": "Bienvenido a la API REST de Woodcraft",
        "endpoints": {
            "get_all_products": "/api/products",
            "get_product_by_id": "/api/products/{id}",
            "post_checkout": "/api/checkout",
            "docs": "/docs"
        }
    }


@app.get("/api/products", response_model=List[dict])
def get_products(category: Optional[str] = Query(None, description="Filtrar productos por categoría (cocina, baño, living, jardineria)")):
    """
    Obtiene el listado de productos de madera.
    Permite filtrar opcionalmente por categoría usando query parameters: /api/products?category=cocina
    """
    products = load_products()
    
    if category:
        category_clean = category.strip().lower()
        filtered_products = [
            p for p in products 
            if p.get("category", "").lower() == category_clean
        ]
        return filtered_products
        
    return products


@app.get("/api/products/{product_id}", response_model=dict)
def get_product(product_id: int):
    """
    Obtiene los detalles de un producto de madera específico buscando por su ID.
    """
    products = load_products()
    product = next((p for p in products if p.get("id") == product_id), None)
    
    if not product:
        raise HTTPException(
            status_code=404, 
            detail=f"Producto con ID {product_id} no encontrado en el catálogo."
        )
        
    return product


@app.post("/api/checkout")
def checkout(request: CheckoutRequest):
    """
    Procesa una orden de compra enviada desde el carrito de compras.
    Valida la estructura con Pydantic, calcula totales y persiste la orden en orders.json.
    """
    # 1. Calcular el total acumulado de la orden en el servidor (para evitar manipulaciones del cliente)
    total = sum(item.price * item.quantity for item in request.items)
    
    # 2. Generar un código de orden secuencial y aleatorio único
    timestamp = datetime.now().strftime("%Y%m%d-%H%M")
    rand_suffix = "".join(random.choices("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", k=4))
    order_id = f"ORD-{timestamp}-{rand_suffix}"
    
    # 3. Estructurar el cuerpo de la orden a guardar
    new_order = {
        "order_id": order_id,
        "date": datetime.now().isoformat(),
        "total": total,
        "items": [item.dict() for item in request.items]
    }
    
    # 4. Guardar en la base de datos simulada
    orders = load_orders()
    orders.append(new_order)
    save_orders(orders)
    
    return {
        "status": "success",
        "message": "¡Orden de compra generada de forma exitosa!",
        "order_id": order_id,
        "total": total
    }

