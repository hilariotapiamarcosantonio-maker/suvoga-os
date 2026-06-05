# Suvoga Academia — Continuidad Nano Banana Pro

Estado actual:
- Proyecto: Suvoga Academia / Suvoga OS
- Rama: main
- Últimos commits locales antes del push:
  - c30e0ae: 25 cursos enriquecidos + landings premium + imágenes CUR-001 a CUR-017 + placeholders CUR-018 a CUR-025
  - 672c3d2: CRM Académico completo + Vista por Curso
- Estado: listo para push/deploy, con imágenes reales pendientes para CUR-018 a CUR-025.

Pendiente:
Generar imágenes premium reales con Nano Banana Pro para:

- CUR-018 Taller de Manejo de Máquina G5
- CUR-019 Taller de Drenaje Brasileño
- CUR-020 Taller Manejo de Complicaciones Post Quirúrgicas
- CUR-021 Taller de Terapia de Alineación Estructura Ósea
- CUR-022 Taller de Drenaje Linfático Facial
- CUR-023 Taller de Masaje Desestructurante
- CUR-024 Taller de Depilación con Cera
- CUR-025 Curso Reflexología Podal

Guardar en:

public/images/courses/cur-018.png
public/images/courses/cur-019.png
public/images/courses/cur-020.png
public/images/courses/cur-021.png
public/images/courses/cur-022.png
public/images/courses/cur-023.png
public/images/courses/cur-024.png
public/images/courses/cur-025.png

Reglas visuales:
- Academia spa high-ticket.
- Verde profundo, crema, dorado champagne.
- Sin texto.
- Sin logos.
- Sin cirugía, sangre, agujas ni procedimientos invasivos.
- Debe verse educativo, elegante, profesional y comercial.

Prompts recomendados:

CUR-018:
Premium spa academy image, professional G5 massage machine training, elegant wellness classroom, instructor showing device heads on treatment table, forest green towels, ivory linen, champagne gold accents, soft natural light, professional high-ticket spa education, no text, no logos.

CUR-019:
Premium spa academy image, Brazilian lymphatic drainage body sculpting class, instructor demonstrating manual drainage technique in elegant spa classroom, forest green and ivory palette, warm champagne light, professional educational setting, no text, no logos.

CUR-020:
Premium spa academy image, post-surgical care theory and manual lymphatic recovery class, non-invasive educational setting, instructor explaining body recovery protocols with anatomy chart and spa treatment table, clean elegant wellness classroom, no surgery, no blood, no needles, no text, no logos.

CUR-021:
Premium spa academy image, structural alignment therapy class, instructor explaining posture and body alignment using anatomical model, elegant wellness classroom, forest green, ivory and champagne palette, professional holistic education, no text, no logos.

CUR-022:
Premium spa academy image, facial lymphatic drainage training, instructor demonstrating gentle facial massage technique, luxury facial spa classroom, clean towels, botanical accents, soft natural light, forest green and ivory palette, no text, no logos.

CUR-023:
Premium spa academy image, decontracting massage workshop, instructor demonstrating deep tissue back massage on spa table, elegant professional training space, forest green towels, ivory linens, warm champagne lighting, no text, no logos.

CUR-024:
Premium spa academy image, waxing depilation workshop, elegant beauty academy classroom, professional waxing tools arranged on ivory tray, instructor preparing clean non-invasive demonstration, forest green and champagne accents, no explicit skin exposure, no text, no logos.

CUR-025:
Premium spa academy image, foot reflexology course, instructor demonstrating reflexology points on feet in elegant spa classroom, botanical details, forest green towels, ivory linen, warm soft lighting, professional wellness education, no text, no logos.

Después de generar:
1. Reemplazar los placeholders SVG.
2. Confirmar que existen los PNG.
3. Ejecutar:
   git status --short
   git diff --check
   npm run lint
   npm run build
4. Validar /curso/CUR-018 a /curso/CUR-025.
5. Hacer commit:
   git add public/images/courses docs/CONTINUAR_NANO_BANANA_IMAGES.md
   git commit -m "feat: finalize remaining Suvoga course images"
