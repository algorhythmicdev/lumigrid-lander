#!/bin/bash

# This script builds and pushes a Docker image to an Alibaba Cloud container registry.

# --- Configuration ---
# Replace these with your actual Alibaba Cloud details.
REGISTRY_URL="registry.cn-hangzhou.aliyuncs.com" # Example: registry.cn-hangzhou.aliyuncs.com
NAMESPACE="your-namespace"
APP_NAME="lumigrid-lander"
TAG="latest"

# --- Script ---

set -e # Exit immediately if a command exits with a non-zero status.

echo "Building the Docker image..."
docker build -t "$APP_NAME:$TAG" .

echo "Logging in to Alibaba Cloud container registry..."
# You should have already configured your Docker client with your Alibaba Cloud credentials.
# See the Alibaba Cloud documentation for how to do this.
# For example: sudo docker login --username=<your-username> registry.cn-hangzhou.aliyuncs.com

echo "Tagging the image for Alibaba Cloud..."
docker tag "$APP_NAME:$TAG" "$REGISTRY_URL/$NAMESPACE/$APP_NAME:$TAG"

echo "Pushing the image to Alibaba Cloud container registry..."
docker push "$REGISTRY_URL/$NAMESPACE/$APP_NAME:$TAG"

echo "Deployment script finished."
