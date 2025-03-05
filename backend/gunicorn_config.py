# backend/gunicorn_config.py

bind = "127.0.0.1:8000"
workers = 2
timeout = 120  # Increase the timeout to 120 seconds for long-running requests
