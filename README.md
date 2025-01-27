# Backend Softtek Challenge

Bienvenido al proyecto **Backend Softtek Challenge**, un reto técnico diseñado para demostrar habilidades en el desarrollo de arquitecturas backend robustas, escalables y seguras utilizando servicios de AWS y principios de diseño avanzados.

## Descripción del Proyecto

Este proyecto implementa una solución backend que aprovecha servicios de AWS y está construido siguiendo principios de **Clean Architecture**. Su objetivo principal es garantizar un alto rendimiento, seguridad y escalabilidad. Además, se han utilizado patrones de diseño como **DI Container**, **Decorador** y **Singleton** para optimizar la organización y el funcionamiento del código.

## Características

1. **Amazon Cognito:** Proporciona autenticación robusta para proteger rutas privadas.
2. **AWS Lambda:** Procesamiento eficiente y escalable de solicitudes.
3. **Amazon API Gateway:** Manejo centralizado de los endpoints del backend.
4. **Amazon DynamoDB:** Almacenamiento NoSQL para datos como planetas y registros históricos.
5. **AWS ElastiCache con Redis:** Implementación de caching para mejorar tiempos de respuesta.
6. **AWS X-Ray:** Rastreo avanzado para identificar cuellos de botella y errores.
7. **Clean Architecture:** División clara de responsabilidades en capas, facilitando el mantenimiento.
8. **Pruebas Unitarias e Integración:** Cobertura de funcionalidades clave del proyecto.
9. **Patrones de Diseño:**
   - **DI Container:** Simplifica la gestión de dependencias.
   - **Decorador:** Facilita la extensión de funcionalidades.
   - **Singleton:** Garantiza únicas instancias globales donde sea necesario.

## Documentación de la API

La documentación interactiva de la API está disponible a través de Swagger. Consulta todos los detalles en:

[Documentación API](https://sofftek.digitalbonds.link/docs)

## Requisitos

- **AWS CLI** instalado y configurado.
- **Node.js** 16 o superior.
- Cuenta de AWS con permisos para gestionar servicios como Lambda, API Gateway, DynamoDB y Cognito.

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/backend-softtek-challenge.git
   cd backend-softtek-challenge
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura tus credenciales de AWS:
   ```bash
   aws configure
   ```

4. Despliega la infraestructura con Serverless:
   ```bash
   serverless deploy --stage dev
   ```

## Uso

1. Consulta la documentación de la API para conocer los endpoints disponibles: [Documentación API](https://sofftek.digitalbonds.link/docs).
2. Realiza solicitudes a los endpoints usando herramientas como Postman o cURL.

## Estructura del Proyecto

```plaintext
├── src/
│   ├── application/     # Casos de uso
│   ├── domain/          # Modelos y repositorios de dominio
│   ├── infrastructure/  # Conexión con servicios externos y configuraciones
│   ├── interface/       # Controladores y endpoints
│   └── __integration__/ # Pruebas de integración
├── serverless.yml       # Configuración de Serverless Framework
├── package.json         # Dependencias y scripts
└── README.md            # Documentación del proyecto
```

## Tecnologías Usadas

- **AWS Services:** Cognito, API Gateway, Lambda, DynamoDB, ElastiCache (Redis), X-Ray.
- **Node.js:** Lenguaje principal para el backend.
- **Swagger:** Generación y consulta de documentación interactiva de la API.
- **Serverless Framework:** Orquestación y despliegue de la infraestructura.
- **Clean Architecture:** Organización del código en capas.

## Próximos Pasos

- **Mejoras en la Seguridad:** Implementar AWS WAF para proteger contra ataques maliciosos.
- **Monitoreo Avanzado:** Integrar métricas detalladas con CloudWatch para identificar y resolver problemas.
- **Optimizaciones de Rendimiento:** Ampliar el uso de caching y mejorar los tiempos de respuesta.
- **Pruebas Adicionales:** Crear pruebas E2E para validar flujos completos.

## Contribuciones

Si deseas contribuir a este proyecto, por favor abre un **issue** o envía un **pull request**. Cualquier mejora o corrección es bienvenida.

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.

