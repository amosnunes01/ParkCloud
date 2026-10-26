#!/usr/bin/env bash
set -e

echo "Stopping ParkCloud Docker services..."
docker compose down

echo "ParkCloud containers stopped successfully."
