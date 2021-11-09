Step 1 — Setting Up whitewhale Backend Services
* kubectl apply -f k8s/whitewhale-service.yaml -n whitewhale
* kubectl apply -f k8s/whitewhale-deploy.yaml -n whitewhale

Step 2 — Setting Up the Kubernetes Nginx Ingress Controller
* kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.0.4/deploy/static/provider/cloud/deploy.yaml

Step 3 — Creating the Ingress Resource
* kubectl apply -f k8s/ingress.yaml

Step 4 — Installing and Configuring Cert-Manager
* kubectl apply --validate=false -f https://github.com/jetstack/cert-manager/releases/download/v0.16.1/cert-manager.yaml
* kubectl apply -f k8s/certificate_issuer.yaml

Step 5 — Enabling Pod Communication through the Load Balancer
* kubectl apply -f k8s/ingress_nginx_svc.yaml

