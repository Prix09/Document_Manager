from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.openapi.docs import get_swagger_ui_html

# Import routers
from app.routes.chat_routes import router as chat_router
from app.routes.document_routes import router as document_router


app = FastAPI(
    title="Enterprise GenAI Knowledge Assistant",
    description="API for RAG-based document and web knowledge assistant",
    version="2.0.0"
)


from fastapi.middleware.cors import CORSMiddleware

# ---------------------------------------------------
# Serve static files (Swagger assets, favicon, etc.)
# ---------------------------------------------------
app.mount("/static", StaticFiles(directory="app/static"), name="static")

# ---------------------------------------------------
# CORS Config
# ---------------------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------------------
# Custom Swagger UI
# ---------------------------------------------------
@app.get("/docs", include_in_schema=False)
def custom_docs():
    return get_swagger_ui_html(
        openapi_url="/openapi.json",
        title="Enterprise GenAI Assistant — Custom API Documentation",

        # Local swagger files
        swagger_js_url="/static/swagger-ui-bundle.js",
        swagger_css_url="/static/swagger-ui.css",
        swagger_favicon_url="/static/favicon.png",

        # Required for UI to function
        swagger_ui_bundle_js="/static/swagger-ui-bundle.js",
        swagger_ui_standalone_preset_js="/static/swagger-ui-standalone-preset.js"
    )


# ---------------------------------------------------
# Register API Routes
# ---------------------------------------------------
app.include_router(document_router, prefix="/documents", tags=["Documents"])
app.include_router(chat_router, prefix="/chat", tags=["Chat"])


# ---------------------------------------------------
# Root Endpoint
# ---------------------------------------------------
@app.get("/")
def root():
    return {
        "message": "Enterprise GenAI Knowledge Assistant Backend Running",
        "docs": "/docs"
    }