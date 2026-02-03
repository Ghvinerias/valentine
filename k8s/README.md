# Kubernetes Deployment for Valentine Website

This directory contains Kubernetes manifests for deploying the Valentine website.

## Prerequisites

- Kubernetes cluster (v1.19+)
- kubectl configured to access your cluster
- NGINX Ingress Controller installed
- cert-manager installed for TLS certificate management

## Installation

### 1. Install NGINX Ingress Controller (if not already installed)

```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.1/deploy/static/provider/cloud/deploy.yaml
```

### 2. Install cert-manager (if not already installed)

```bash
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.13.0/cert-manager.yaml
```

### 3. Create ClusterIssuer for Let's Encrypt

```bash
cat <<EOF | kubectl apply -f -
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    server: https://acme-v02.api.letsencrypt.org/directory
    email: your-email@example.com
    privateKeySecretRef:
      name: letsencrypt-prod
    solvers:
    - http01:
        ingress:
          class: nginx
EOF
```

### 4. Update Domain Name

Edit `ingress.yaml` and `certificate.yaml` to replace `valentine.example.com` with your actual domain name.

### 5. Deploy the Application

```bash
# Apply all manifests
kubectl apply -f k8s/

# Or apply them individually
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
kubectl apply -f k8s/certificate.yaml
kubectl apply -f k8s/ingress.yaml
```

## Verification

Check the deployment status:

```bash
# Check pods
kubectl get pods -n valentine

# Check service
kubectl get svc -n valentine

# Check ingress
kubectl get ingress -n valentine

# Check certificate status
kubectl get certificate -n valentine
```

## Accessing the Application

Once the certificate is issued and the ingress is configured:

- HTTPS: https://valentine.example.com
- HTTP will automatically redirect to HTTPS

## Configuration

### Scaling

To scale the deployment:

```bash
kubectl scale deployment valentine -n valentine --replicas=3
```

### Updating the Image

To update to a new version:

```bash
kubectl set image deployment/valentine valentine=slickg/valentine:new-tag -n valentine
```

### Resource Limits

Current resource limits per pod:
- Requests: 100m CPU, 128Mi memory
- Limits: 500m CPU, 512Mi memory

Adjust these in `deployment.yaml` based on your needs.

## Troubleshooting

### Check logs

```bash
kubectl logs -n valentine -l app=valentine
```

### Check certificate status

```bash
kubectl describe certificate valentine-tls -n valentine
```

### Check ingress events

```bash
kubectl describe ingress valentine -n valentine
```

## Cleanup

To remove all resources:

```bash
kubectl delete -f k8s/
```
