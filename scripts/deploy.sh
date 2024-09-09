#!/bin/bash

set -e

if ! command -v kubectl &> /dev/null; then
    echo "kubectl is not installed. Please install kubectl and try again."
    exit 1
fi

if [ ! -f "$HOME/.kube/config" ]; then
    echo "Kubernetes configuration not found. Please set up your kubeconfig and try again."
    exit 1
fi

kubectl apply -f kubernetes/deployment.yaml
kubectl apply -f kubernetes/service.yaml

kubectl rollout status deployment/nexusflow-cicd-orchestrator

echo "Deployment and service created successfully."