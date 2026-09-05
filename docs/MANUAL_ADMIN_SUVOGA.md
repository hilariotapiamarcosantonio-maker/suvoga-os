# Manual operativo del panel admin SuVoGa

## Acceso y lectura

1. Entra a `/admin` con el acceso habitual.
2. Las inscripciones nuevas y los anticipos pendientes aparecen primero.
3. En cada fila se muestran nombre, WhatsApp, curso, fecha y estado de anticipo.
4. Usa **WhatsApp** para abrir una conversación y **Detalle** para ver los datos técnicos.

## Registrar pagos

1. Abre **Detalle** de la alumna.
2. En **Registrar nuevo pago**, completa monto, método, concepto y fecha.
3. Agrega vencimiento o nota si aplica.
4. Pulsa **Guardar pago** y espera el mensaje **Pago guardado correctamente**.

Cada pago se agrega a `Historial_Pagos`. El panel suma el historial y actualiza `Control_Anticipos` con monto pagado, balance, método y estado. El historial no borra pagos anteriores.

Si aparece **No se pudo guardar. Revisa conexión o permisos.**, no repitas varias veces el cobro: revisa conexión/permisos y confirma en Sheets si el pago llegó a registrarse.

## Asistencia y seguimiento

En el detalle selecciona uno de estos estados: Inscrito, Contactado, Asistió, No asistió, Reprogramar o Finalizada. El cambio se guarda en `Inscripciones_Citas`.

## Crear grupos y programaciones

1. Abre la pestaña **Calendario**.
2. Selecciona curso, fecha, hora y cupos.
3. Opcionalmente agrega nombre de grupo, modalidad y nota.
4. Pulsa **Guardar programación**.

La programación se guarda en `Programacion_Cursos` con cupos totales y restantes. Luego aparece en Calendario y en **Vista por Curso**. Si `Inscripciones_Citas` tiene la columna opcional `ID_Programacion`, se puede asignar una alumna a un grupo desde su detalle; al asignar se ajustan los cupos restantes.

## Reporte de posibles datos de prueba

El endpoint protegido `/admin/api/reporte-demo` entrega un listado de pacientes, inscripciones o pagos que parecen ser de prueba por marca, nombre, origen, correo o nota. Es solo un reporte: no elimina ni modifica registros. Revisa cada resultado antes de tomar cualquier decisión.

## Alcance

El catálogo, el formulario público de reservas y la lógica de Google Calendar se mantienen fuera de estas operaciones. No elimines filas ni cambies encabezados de las hojas sin revisar primero el flujo.
