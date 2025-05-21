# FRONTEND
docker build -t alejandrobi/it-project:frontend-v1 ./FRONTEND
docker push alejandrobi/it-project:frontend-v1

# API GATEWAY
docker build -t alejandrobi/it-project:api-gateway-v1 ./services/api-gateway
docker push alejandrobi/it-project:api-gateway-v1

# AUTH SERVICE
docker build -t alejandrobi/it-project:auth-service-v1 ./services/auth-service
docker push alejandrobi/it-project:auth-service-v1

# USER SERVICE
docker build -t alejandrobi/it-project:user-service-v1 ./services/user-service
docker push alejandrobi/it-project:user-service-v1

# COMPLIANCE SERVICE
docker build -t alejandrobi/it-project:compliance-service-v1 ./services/compliance-service
docker push alejandrobi/it-project:compliance-service-v1

# NOTIFICATION SERVICE
docker build -t alejandrobi/it-project:notification-service-v1 ./services/notification-service
docker push alejandrobi/it-project:notification-service-v1

# REGULATION SERVICE
docker build -t alejandrobi/it-project:regulation-service-v1 ./services/regulation-service
docker push alejandrobi/it-project:regulation-service-v1

# EVALUATION FORM SERVICE
docker build -t alejandrobi/it-project:evaluation-form-service-v1 ./services/evaluation-form-service
docker push alejandrobi/it-project:evaluation-form-service-v1

# AUDIT SERVICE
docker build -t alejandrobi/it-project:audit-service-v1 ./services/audit-service
docker push alejandrobi/it-project:audit-service-v1
