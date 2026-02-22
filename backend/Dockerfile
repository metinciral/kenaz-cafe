# Use Python 3.11 slim image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Copy requirements first for better caching
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Expose port (Railway will provide $PORT)
EXPOSE 8001

# Start command
CMD uvicorn server:app --host 0.0.0.0 --port ${PORT:-8001}
