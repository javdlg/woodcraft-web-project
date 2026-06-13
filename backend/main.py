import json
import os
from typing import List, Optional
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware

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

# Ruta al archivo de productos JSON
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PRODUCTS_JSON_PATH = os.path.join(BASE_DIR, "products.json")


def load_products() -> List[dict]:
    """Carga los productos desde el archivo local JSON."""
    if not os.path.exists(PRODUCTS_JSON_PATH):
        raise HTTPException(status_code=500, detail="Archivo de datos no encontrado.")
    
    try:
        with open(PRODUCTS_JSON_PATH, "r", encoding="utf-8") as file:
            return json.load(file)
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Error al decodificar el archivo JSON de productos.")


@app.get("/")
def read_root():
    """Endpoint de bienvenida e información básica de la API."""
    return {
        "message": "Bienvenido a la API REST de Woodcraft",
        "endpoints": {
            "get_all_products": "/api/products",
            "get_product_by_id": "/api/products/{id}",
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
        # Filtramos insensible a mayúsculas/minúsculas y espacios
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
