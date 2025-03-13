#!/bin/bash
set -e
set -o pipefail

STACK_NAME="echo_frontend"
SERVICE_NAME="echo_frontend"
IMAGE_NAME="echo_frontend:latest"

echo "Starting Docker image build process..."
docker build -t $IMAGE_NAME .

if docker info 2>/dev/null | grep -q "^ Swarm: active"; then
    echo "Swarm is active."
else
    echo "Swarm is not active. Initializing swarm..."
    docker swarm init --advertise-addr $(hostname -I | awk '{print $1}')
fi

if docker stack ls | grep -q "^$STACK_NAME\s"; then
    echo "Stack $STACK_NAME already exists. Forcing service update..."
    docker service update --force $SERVICE_NAME 2>&1 | grep -vE "(overall progress:|verify: Waiting)"
else
    echo "Deploying the stack..."
    docker stack deploy -c compose.yaml $STACK_NAME 2>&1 | grep -vE "(overall progress:|verify: Waiting)"
fi

echo "Checking running services..."
docker service ls

echo "Deploy completed."
