# DavanteDent - Sistema de Gestión de Citas Dentales

## Descripción del Proyecto

**DavanteDent** es una aplicación web desarrollada como trabajo de enfoque para el módulo *Desarrollo Web en Entorno Cliente* del **Técnico Superior en Desarrollo de Aplicaciones Web**. La aplicación permite gestionar las citas de pacientes en una clínica dental de manera local y eficiente.

### Contexto del Proyecto
La empresa **DavanteDent**, con múltiples clínicas franquiciadas, necesitaba una solución que permitiera:
- Gestionar citas de manera independiente por cada sede
- Almacenar datos localmente (sin base de datos externa)
- Validar y organizar la información de pacientes
- Proporcionar una interfaz intuitiva para el personal de recepción

## Características Principales

### **Gestión Completa de Citas**
- **Crear** nuevas citas con todos los datos necesarios del paciente
- **Leer** y visualizar todas las citas programadas en una tabla organizada
- **Actualizar** citas existentes con nuevos datos
- **Eliminar** citas cuando sea necesario

### **Validaciones Robustas**
- **DNI**: Formato español válido (8 números + letra)
- **Teléfono**: Exactamente 9 dígitos numéricos
- **Fechas**: Validación de fechas lógicas (no pasadas/futuras inválidas)
- **Campos obligatorios**: Todos los datos esenciales son requeridos
- **Mensajes de error específicos**: Información clara sobre correcciones necesarias

### **Almacenamiento Local**
- **Cookies del navegador**: Los datos persisten entre sesiones
- **Sin dependencias externas**: Todo funciona localmente
- **30 días de expiración**: Las citas se mantienen disponibles

### **Interfaz de Usuario**
- **Diseño responsivo**: Funciona en móviles, tablets y desktop
- **Tema profesional**: Colores corporativos y diseño dental
- **Iconografía intuitiva**: FontAwesome para mejor comprensión
- **Feedback visual**: Notificaciones y estados claros
- **Accesibilidad**: Estructura semántica HTML5

## Tecnologías Utilizadas

| Tecnología | Versión | Uso |
|------------|---------|-----|
| **HTML5** | - | Estructura semántica y formularios |
| **CSS3** | - | Estilos, Grid, Flexbox, animaciones |
| **JavaScript ES6+** | - | Lógica de aplicación, POO, eventos |
| **FontAwesome** | 6.4.0 | Iconos para mejor UX |
| **Cookies API** | Navegador | Almacenamiento local |



## Instalación y Uso

### Requisitos Previos
- Navegador web moderno (Chrome 80+, Firefox 75+, Edge 80+)
- No requiere servidor o instalación adicional

### Pasos para Ejecutar
1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/davantedent.git
2. **Abrir el proyecto:**
- Navegar a la carpeta del proyecto
- Abrir index.html en tu navegador 
3. **Uso inmediato:**
- La aplicación está lista para usar
- Los datos se guardan automáticamente en cookies
