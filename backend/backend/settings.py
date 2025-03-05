"""
Django settings for backend project.
"""

import os
from pathlib import Path
from dotenv import load_dotenv
from datetime import timedelta
from corsheaders.defaults import default_headers
import dj_database_url

BASE_DIR = Path(__file__).resolve().parent.parent

# Load environment variables
env_path = os.path.join(BASE_DIR, ".env")
load_dotenv(env_path)

SECRET_KEY = os.getenv("SECRET_KEY", "replace-me-with-a-secret-key")
DEBUG = True
ALLOWED_HOSTS = ["127.0.0.1", "localhost"]

# CORS settings
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",  # Vite
    "http://127.0.0.1:5173",  # for Vite if you use 127.0.0.1
    "http://localhost:8000",  # if your frontend is served from localhost:8000
    "http://127.0.0.1:8000",  # if your frontend or dev server uses 127.0.0.1:8000
]
CORS_ALLOW_METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
CORS_ALLOW_HEADERS = list(default_headers) + ["Authorization", "Content-Type"]
CORS_ALLOW_CREDENTIALS = True

# Application definition
INSTALLED_APPS = [
    # Django apps
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    # Third-party apps
    "rest_framework",
    "rest_framework_simplejwt",
    "rest_framework_simplejwt.token_blacklist",
    "corsheaders",
    # Local apps
    "habits",
]

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
}

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(hours=1),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=7),
    "ROTATE_REFRESH_TOKENS": True,
    "BLACKLIST_AFTER_ROTATION": True,
    "AUTH_HEADER_TYPES": ("Bearer",),
}

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")  # For AI Chat & Sorting

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",  # Added for static file serving
    "django.contrib.sessions.middleware.SessionMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "backend.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        # Update the path if your built frontend files (including index.html) are now in <project-root>/static/assets
        "DIRS": [os.path.join(BASE_DIR, "static", "assets")],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",  # Required for admin sidebar
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "backend.wsgi.application"

# Database configuration using dj_database_url
DATABASES = {
    "default": dj_database_url.config(default=os.getenv("DATABASE_URL"))
}

AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

# Static files settings
STATIC_URL = "/assets/"

# The directory with your built static assets from Vite
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, "static", "assets"),
]

# Define STATIC_ROOT so that collectstatic gathers files here in production
STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")

# Configure WhiteNoise for better static file handling (compression and caching)
STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

# Internationalization
LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
