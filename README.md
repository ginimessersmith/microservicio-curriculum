# 🚀 Microsistema de Análisis de Currículums (NestJS + OpenAI + Cloudinary)

> 

![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-412957?style=for-the-badge&logo=openai&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

Este es el servicio backend encargado del procesamiento y análisis automatizado de documentos de currículum vitae. Desarrollado con **NestJS**, proporciona una API robusta que utiliza la API de **OpenAI** para extraer y evaluar información clave de los documentos. El almacenamiento de los archivos se gestiona eficientemente mediante **Cloudinary**, y la persistencia de datos se realiza con **PostgreSQL**.

---

## ✨ Características Principales

* **Framework :** Construido sobre **NestJS**, proporcionando una arquitectura modular, escalable y mantenible .
* **Análisis Inteligente:** Utiliza la API de **OpenAI** para el procesamiento de lenguaje natural (NLP) y la extracción de datos de valor de los CVs cargados.
* **Almacenamiento en la Nube:** Integración con **Cloudinary** para el almacenamiento seguro y la gestión de archivos multimedia (el código fuente muestra el uso de `streamifier` para una subida eficiente).
* **Contenedorizado:** Configurado para un despliegue rápido y consistente usando **Docker** y **Docker Compose**.
* **Base de Datos:** Persistencia de datos gestionada con **PostgreSQL**.

---

## 🛠️ Tecnologías Utilizadas

| Categoría | Tecnología | Versión de Node |
| :--- | :--- | :--- |
| **Backend** | NestJS, TypeScript | Node 19-alpine |
| **Análisis** | OpenAI API | - |
| **Almacenamiento** | Cloudinary, Multer, Streamifier | - |
| **Contenedores** | Docker, Docker Compose (v3) | - |
| **Base de Datos** | PostgreSQL (14.3) | - |

---
## Instalacion

```bash
$ npm install
```

## Comandos

```bash
# desarrollo
$ npm run start

# watch mode
$ npm run start:dev

# produccion
$ npm run start:prod
```

## ⚙️ Configuración del Entorno

Este proyecto está diseñado para ejecutarse completamente dentro de contenedores de Docker. Necesitarás las siguientes **variables de entorno** para que la aplicación y todos los servicios se inicialicen correctamente.

Crea un archivo llamado **`.env`** en la raíz del proyecto y complétalo con tus credenciales:

```bash
PORT=3000

DB_USERNAME=user_app
DB_PASSWORD=password_secure
DB_NAME=curriculum_db
DB_HOST=db
DB_PORT=5432

CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret

API_OPENAI=tu_clave_secreta_de_openai

El proyecto sigue una estructura modular y limpia, típica de NestJS, organizando el código por módulos de funcionalidad y utilizando una carpeta de `helpers` para utilidades genéricas:
.
├── src/
│   ├── cloudinary/                  # Módulo de integración con Cloudinary.
│   │   ├── cloudinary-response.ts   
│   │   └── cloudinary.service.ts    # Maneja la subida a la nube.
│   ├── curriculum/                  # Módulo principal de la lógica de negocio.
│   │   ├── dto/                     # DTOs
│   │   ├── entities/                # Modelos de la Base de Datos
│   │   ├── interface/               # Interfaces clave
│   │   ├── use-cases/               # Lógica de Análisis con OpenAI.
│   │   └── curriculum.controller.ts # Rutas: /api/v1/curriculum/...
│   ├── helpers/                     # Funciones de ayuda.
│   └── main.ts                      # Punto de entrada de la aplicación.
├── Dockerfile                       # Definición de la imagen (Multi-stage build).
├── docker-compose.prod.yml          # Configuración de los servicios (app y db).
├── .env.example                     # Archivo de ejemplo de entorno.
└── README.md
