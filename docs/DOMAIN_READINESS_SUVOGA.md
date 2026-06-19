# Domain readiness SuVoGa

Fecha: 2026-06-19

## Estado

SuVoGa todavia no tiene dominio propio confirmado. No se conecto ningun dominio
en esta fase.

La produccion temporal sigue siendo:

```text
https://suvoga-os-tjaa.vercel.app
```

## Variable principal

La URL canonica se controla con:

```text
NEXT_PUBLIC_SITE_URL
```

Compatibilidad temporal:

```text
NEXT_PUBLIC_APP_URL
```

Si no existe ninguna variable, la app usa el fallback definido en
`src/config/seo.config.ts`.

## Puntos centralizados

- `src/lib/site-url.ts`
- `src/config/seo.config.ts`
- `src/app/layout.tsx`
- `src/app/sitemap.ts`
- `src/app/robots.ts`
- metadata/canonical de rutas publicas;
- Open Graph de rutas publicas;
- URLs de recursos y formularios cuando requieren origen absoluto.

## Robots

`src/app/robots.ts` genera reglas para:

- permitir rutas publicas;
- bloquear `/admin`;
- bloquear `/api`;
- publicar `sitemap.xml` usando la URL canonica configurada.

## Que no se hizo

- No se compro dominio.
- No se conecto DNS.
- No se uso `lumapremium.com` como dominio de SuVoGa.
- No se uso `marcoshilario.com` como dominio de SuVoGa.
- No se configuro remitente corporativo.

## Checklist cuando Marcos entregue el dominio

1. Configurar `NEXT_PUBLIC_SITE_URL` con el dominio real.
2. Configurar dominio en Vercel.
3. Verificar DNS.
4. Ejecutar `npm run build`.
5. Abrir `/`, `/cursos`, `/contacto`, `/facilitadores`, `/sitemap.xml` y
   `/robots.txt`.
6. Confirmar canonical y Open Graph con el dominio real.
7. Probar formulario de contacto con credenciales autorizadas.
8. Probar remitente de correo verificado.
9. Confirmar que `marcoshilario.com` y `lumapremium.com` solo aparecen en el
   credito profesional.
