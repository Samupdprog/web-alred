/** Textos de las demostraciones; los valores numéricos son ilustrativos. */
const ingles: Record<string, string> = {
  "Clientes": "Customers", "Stock": "Stock", "Presupuestos": "Quotes", "Equipo": "Team",
  "Software adaptable": "Adaptable software", "Módulos de software": "Software modules",
  "Panel de gestión": "Management workspace", "Activo": "Active",
  "4 módulos · una sola herramienta": "4 modules · one workspace",
  "Solicitud": "Request", "Entrada recibida": "Request received",
  "Validación": "Validation", "Reglas verificadas": "Rules verified",
  "Asignación": "Assignment", "Tarea creada": "Task created",
  "Notificación": "Notification", "Envío completado": "Delivery completed",
  "Flujo automático activo": "Automated workflow active",
  "4 pasos · sin intervención manual": "4 steps · no manual work",
  "Datos en tiempo real": "Real-time data", "Panel de control": "Control dashboard",
  "Últimos 30 días": "Last 30 days", "Actividad": "Activity", "eventos": "events",
  "Completadas": "Completed", "Pendientes": "Pending", "Tiempo medio": "Average time",
  "Todo bajo control": "Everything under control", "Chat": "Chat", "Tableros": "Boards",
  "CRM": "CRM", "Informes": "Reports", "Un ecosistema conectado": "A connected ecosystem",
  "Conectar": "Connect", "4 fuentes sincronizadas": "4 sources synchronized",
  "Sincronizando fuentes": "Synchronizing sources", "registros": "records",
  "Tus datos, siempre al día": "Your data, always up to date",
  "4 fuentes · una conexión": "4 sources · one connection",
  "Movimiento reducido": "Reduced motion", "Reanudar animaciones": "Resume animations",
  "Pausar animaciones": "Pause animations", "Ver": "View",
};

export function textoVisual(locale: string, texto: string) {
  return locale === "en" ? ingles[texto] ?? texto : texto;
}
