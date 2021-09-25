## __Docker Commands__ 
__docker run -p 8080:80 -p 8081:443 -d  gwadadasol/moneymanagerbackend__ 
docker remove  15b9020a8006
docker build -t gwadadasol/moneymanagerbackend .
docker build --no-cache  -t gwadadasol/moneymanagerbackend .
docker push gwadadasol/moneymanagerbackend



## __Kubernetes Commands__
__kubectl apply -f .\ingress-srv.yaml__: deploy ingress
__kubectl get pod__: see all running pods: 
- kubectl rollout restart deployment moneymanager-depl
- kubectl get deployments
- kubectl get services
kubectl remove moneymanager-depl-7bbb99965b-rfrcb

## __dotnet Commands__:
dotnet add  package Microsoft.EntityFrameworkCore.InMemory
dotnet ef migrations add initialmigration