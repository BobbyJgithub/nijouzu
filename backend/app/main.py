from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Initializes FastAPI instance with metadata.
app = FastAPI(
    title="Nijouzu API",
    description="Japanese Learning API",
    version="0.1.0"
)

# Allows frontend (port 3000) to call your backend (port 8000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


# Defines two HTTP GET endpoints.
# The root endpoint returns a JSON response with a welcome and status message.
@app.get("/")
async def root():
    return {"message": "Welcome to Nijouzu API", "status": "running"}

# The health check endpoint returns a JSON response indicating the service is healthy.
@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "nijouzu-api"}