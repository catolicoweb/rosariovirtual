# CLAUDE.md

Guía rápida de contexto para Claude Code al trabajar en este repositorio.

## Qué es este proyecto

**Rosario Virtual** es una aplicación web para rezar el Rosario y otras oraciones católicas
(Letanías a la Virgen, La Salve, Rosario de la Divina Misericordia) de forma guiada, paso a paso.
La interfaz muestra una "carta" (`PrayerCard`) por vez y el usuario avanza con un tap/click.

Stack:
- **React 19** + **TypeScript**
- **Vite 7** (dev server y build)
- **Tailwind CSS 4** (via `@tailwindcss/vite`)
- **Framer Motion** (transiciones entre pantallas)
- Deploy a **GitHub Pages** con `gh-pages`

No hay router externo: el ruteo es manual con `window.history.pushState` + `popstate`
(ver `src/App.tsx`, efectos que sincronizan `screen` ↔ URL, por ejemplo `/divinamisericordia`).

## Comandos

```bash
# Instalar dependencias
npm install

# Desarrollo (Vite dev server, HMR)
npm run dev              # http://localhost:5173 (o 5174 si está ocupado)

# Chequeo de tipos sin emitir
npx tsc --noEmit -p tsconfig.app.json

# Lint
npm run lint

# Build de producción (tsc -b && vite build -> dist/)
npm run build

# Preview del build local
npm run preview

# Deploy a GitHub Pages (rama gh-pages)
npm run deploy
```

## Estructura relevante

```
src/
  App.tsx                  # Estado global, máquina de pantallas (Screen), navegación, URL sync
  main.tsx                 # Entry point
  components/
    AppShell.tsx           # Layout/contenedor
    PrayerCard.tsx         # Tarjeta principal; onAdvance dispara el siguiente paso
    Splash.tsx             # Pantalla inicial + menú (misterios y oraciones standalone)
    BeadTrail.tsx          # Visual de las cuentas del rosario
    RosaryRail.tsx         # Riel horizontal de cuentas
    ProgressDots.tsx       # Indicador de progreso de mini-secuencias
  data/
    mystery.ts             # Misterios del día (Gozosos/Dolorosos/Gloriosos/Luminosos)
    prayerSteps.ts         # Array de pasos del rosario (kind: 'text' | 'sequence')
    intencionesDelPapa.ts  # Config de secuencia (tipos SequenceConfig)
    letaniasVirgen.ts      # Contenido de las Letanías a la Virgen
  assets/                  # Imágenes de misterios, cruz, etc.
  styles/globals.css       # Tailwind + variables de tema (--rv-*)
```

## Modelo de pantallas (src/App.tsx)

El estado central es `screen: Screen`:

```ts
type Screen =
  | { kind: 'splash' }
  | { kind: 'step'; stepIndex: number; sequenceIndex: number }
  | { kind: 'done' }
  | { kind: 'standalone'; prayerId: 'letanias' | 'salve' | 'divina-misericordia'; stepIndex: number }
```

- `advance()` → `computeNext(screen)` avanza al siguiente paso/secuencia.
- `back()` → `computePrev(screen)` retrocede.
- `navigate(next)` aplica una transición con fade (300ms) antes de commitear el nuevo screen.
- Los efectos de URL sincronizan `/divinamisericordia` con `screen` y escuchan `popstate`.

## Cómo agregar una nueva oración standalone

1. Crear el archivo de datos en `src/data/<nombre>.ts` (seguir patrón de `letaniasVirgen.ts`).
2. Extender el union de `prayerId` en `src/App.tsx` (tipo `Screen`).
3. Extender el prop `onStandalonePrayer` en `src/components/Splash.tsx`.
4. Agregar el botón en el menú de `Splash.tsx`.
5. Actualizar `computeNext` en `App.tsx` con el `maxIndex` correcto.
6. Agregar la rama de render dentro de `{screen.kind === 'standalone' ? ...}`.

## Cómo agregar/modificar pasos del Rosario

Editar `src/data/prayerSteps.ts`:
- Paso de texto: `{ kind: 'text', id, title, paragraphs: string[] }`
- Mini-secuencia (Padre Nuestro + Ave Marías, etc.): `{ kind: 'sequence', id, sequence: SequenceConfig }`

## Deploy

`vite.config.ts` tiene `base: '/'`. Si se despliega como "project page" de GitHub Pages sin dominio
custom, cambiar a `base: '/rosariovirtual/'`. Para dominio custom (con `CNAME`) dejar `/`.

Para que las rutas como `/divinamisericordia` funcionen al recargar en producción,
GitHub Pages necesita un `404.html` que sirva el `index.html` del SPA (aún por configurar).

## Repo / cuenta

- GitHub: cuenta **catolicoweb** (autenticada vía `gh auth`)
- Nombre del repo: `rosariovirtual`
