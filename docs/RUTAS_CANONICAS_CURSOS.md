# Rutas canonicas de cursos

Fecha: 2026-06-18

La URL publica oficial de cada curso es el `slug` declarado en `src/data/courses/cur-XXX.json`.

Ejemplo canonico:

`/curso/terapias-alternativas-vino-chocolate-barro-cafe`

Las rutas `/curso/CUR-XXX` se conservan solo como compatibilidad legacy. Cuando una ruta legacy resuelve un curso publicado, la app redirige al slug canonico para evitar contenido duplicado indexable.

Caso especial aprobado:

- `/curso/CUR-013` es un alias historico de `CUR-012` oficial, Taller de Terapias Alternativas (Vino, chocolate, barro, cafe).
- La URL oficial del nuevo `CUR-013` Kinesiotape es `/curso/taller-de-kinesiotape`.
- `/curso/CUR-013` no es, ni debe tratarse como, URL oficial de Kinesiotape.

Reglas operativas:

- Catalogo, sitemap, metadata canonical y Open Graph usan slugs.
- El formulario de reserva envia `sourceId` oficial mediante `idServicio`.
- `CUR-020` y `CUR-031` permanecen en draft y no se listan publicamente.
- No se crean IDs numericos internos posteriores a `CUR-040`.
