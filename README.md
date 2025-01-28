# Backend Softtek Challenge

Bienvenido al proyecto **Backend Softtek Challenge**, un reto técnico diseñado para demostrar habilidades en el desarrollo de arquitecturas backend robustas, escalables y seguras utilizando servicios de AWS y principios de diseño avanzados.

## Descripción del Proyecto

Este proyecto implementa una solución backend que aprovecha servicios de AWS y está construido siguiendo principios de **Clean Architecture**. Su objetivo principal es garantizar un alto rendimiento, seguridad y escalabilidad. Además, se han utilizado patrones de diseño como **DI Container**, **Decorador** y **Singleton** para optimizar la organización y el funcionamiento del código.

## Características

1. **Amazon Cognito:** Proporciona autenticación robusta para proteger rutas privadas.
2. **AWS Lambda:** Procesamiento eficiente y escalable de solicitudes.
3. **Amazon API Gateway:** Manejo centralizado de los endpoints del backend.
4. **Amazon DynamoDB:** Almacenamiento NoSQL para datos.
5. **AWS ElastiCache con Redis:** Implementación de caching para mejorar tiempos de respuesta.
6. **AWS X-Ray:** Rastreo avanzado para identificar cuellos de botella y errores.
7. **Amazon Route 53:** Servicio DNS para registro de dominio personalizados: sofftek.digitalbonds.link .
8. **Red configurada con AWS:**
   - **VPC personalizada:** Una red virtual aislada para la infraestructura del backend.
   - **Subnets públicas y privadas:** Para segmentar y controlar el tráfico entre los recursos.
   - **Internet Gateway y NAT Gateway:** Para gestionar el acceso a internet desde los recursos dentro de la VPC.
   - **Security Groups:** Control de acceso detallado para las Lambdas y Redis.
9. **Amazon Cloudfront:** Infrsestructura de red privilegiada basada en puntos de presencia cercanos al usuario.
10. **Amazon Cognito:** Autenticación de usuarios.
11. **Clean Architecture:** División clara de responsabilidades en capas, facilitando el mantenimiento.
12. **Pruebas Unitarias e Integración:** Cobertura de funcionalidades clave del proyecto.
13. **Patrones de Diseño:**
   - **DI Container:** Simplifica la gestión de dependencias.
   - **Decorador:** Facilita la extensión de funcionalidades.
   - **Singleton:** Garantiza únicas instancias globales donde sea necesario.

## Arquitectura

## Documentación de la API
![image](https://github.com/user-attachments/assets/e2489cf8-6f94-4178-a10f-70cb784368f2)

La documentación interactiva de la API está disponible a través de Swagger. Consulta todos los detalles en:

[Documentación API](https://sofftek.digitalbonds.link/docs)

## Estructura del Proyecto (Resumen)

```plaintext
backend-softtek-challenge/
├── src/
│   ├── interface/         # Handlers, DTOs y adaptadores para la API
│   ├── application/       # Casos de uso
│   ├── domain/            # Entidades y repositorios
│   ├── infrastructure/    # Configuraciones y servicios externos
│   └── __integration__/   # Pruebas de integración
├── serverless.yml         # Configuración de Serverless Framework
├── docker-compose.yml     # Configuración de dynamoDB para desarrollo local
├── package.json           # Dependencias y scripts
└── README.md              # Documentación del proyecto
```

## Otras tecnologías usadas

- **Node.js:** Lenguaje principal para el backend.
- **Typescript:** Extensión de JS para tipado estático y otras funcionalidades adicionales.
- **Swagger:** Generación y consulta de documentación interactiva de la API.
- **Serverless Framework:** Orquestación y despliegue de la infraestructura.

