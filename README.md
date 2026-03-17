# valentine
Will you be my valentine

## Argo CD

1. Update `argocd/application.yaml` `repoURL` to this repository URL.
2. Apply the app manifest:
   ```bash
   kubectl apply -f argocd/application.yaml
   ```
3. Argo CD will sync manifests from `k8s/`.

Notes:
- `k8s/deployment.yaml` uses image tag `slickg/valentine:8bda4ff`.
- Update the image tag when a new image is published, or configure Argo CD Image Updater.
