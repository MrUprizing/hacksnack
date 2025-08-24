# Hackathon Nutrition AI

Hackathon Nutrition AI es una aplicación web que permite a los usuarios llevar el control de todo lo que comen y registrar sus alimentos de manera sencilla e inteligente, apoyándose en IA para mejorar la experiencia y el análisis nutricional.

## 🚀 Objetivo

El objetivo principal es ayudar a los usuarios a registrar y visualizar su ingesta diaria de alimentos, obtener análisis nutricionales automáticos y recomendaciones personalizadas, todo potenciado por inteligencia artificial.

## 🛠️ Stack Tecnológico

- **Frontend:** Next.js 15 (App Router), TypeScript, Tailwind CSS v4, shadcn/ui
- **Backend:** Next.js API Routes, Vercel AI SDK
- **Base de Datos:** PostgreSQL + Drizzle ORM
- **IA:** Claude Sonnet, Claude Vision, ai-sdk by Vercel
- **Deploy:** Vercel
- **Auth:** Better-auth

## ✨ Funcionalidades Principales

- Registro de alimentos diarios.
- Visualización de historial y estadísticas nutricionales.
- Análisis automático de alimentos usando IA (Claude Sonnet/Vision).
- Recomendaciones personalizadas.
- Autenticación segura.
- UI moderna y responsiva.

## ⚡ Instalación y uso local

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/hackathon-nutrition-ai.git
   cd hackathon-nutrition-ai
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

3. **Configura las variables de entorno:**
   - Renombra `.env.example` a `.env` y completa los valores necesarios (o usa el archivo `.env` proporcionado).
   - Ejemplo de archivo `.env.example`:
     ```env
     BETTER_AUTH_SECRET=tu_secreto_super_seguro
     BETTER_AUTH_URL=http://localhost:3000
     DATABASE_URL=postgresql://usuario:contraseña@host:puerto/base_de_datos
     ANTHROPIC_API_KEY=sk-xxx-tu-api-key
     V0_API_KEY=tu_api_key_v0
     VERCEL_API_KEY=tu_api_key_vercel
     NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
     NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_supabase
     ```

4. **Ejecuta la app en desarrollo:**
   ```bash
   npm run dev
   ```

5. **Accede a la app:**
   - Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🧠 IA y herramientas

- **Análisis de imágenes y texto:** Usa Claude Sonnet y Vision para extraer información nutricional de fotos y descripciones.
- **SDK de Vercel AI:** Para integración rápida y eficiente de modelos de IA.
- **Herramientas generativas:** UI dinámica basada en respuestas de IA.

## 📦 Estructura del proyecto

- `/app` – Rutas y páginas principales (Next.js App Router)
- `/components` – Componentes reutilizables de React
- `/ai` – Herramientas y lógica de IA
- `/db` – Configuración y modelos de Drizzle ORM
- `/public` – Recursos estáticos

## 📝 Licencia

MIT


