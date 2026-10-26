#!/usr/bin/env bash
set -e

echo "=========================================================="
echo " Starting ParkCloud Smart Parking in Docker"
echo "=========================================================="

# Check if Docker is running
if ! docker info >/dev/null 2>&1; then
    echo "ERROR: Docker daemon is not running. Please start Docker Desktop."
    exit 1
fi

# Build and launch containers in detached mode
docker compose up -d --build

echo ""
echo "Waiting for services to become healthy..."
docker compose ps

echo ""
echo "=========================================================="
echo " ParkCloud is running successfully!"
echo " Web UI:     http://localhost (or http://localhost:80)"
echo " Direct API: http://localhost:5001"
echo " Check logs: docker compose logs -f"
echo " Stop app:   ./docker-stop.sh"
echo "=========================================================="
