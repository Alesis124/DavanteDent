class Cita {
    constructor(id, nombre, apellidos, dni, telefono, fechaNacimiento, fechaCita, horaCita, observaciones) {
        this.id = id;
        this.nombre = nombre.trim();
        this.apellidos = apellidos.trim();
        this.dni = dni.trim();
        this.telefono = telefono.trim();
        this.fechaNacimiento = fechaNacimiento;
        this.fechaCita = fechaCita;
        this.horaCita = horaCita;
        this.observaciones = observaciones.trim();
        this.fechaCreacion = new Date().toISOString();
    }
}

//cosas del DOM
const form = document.getElementById('formCita');
const cuerpoTabla = document.getElementById('cuerpoTabla');
const btnCancelar = document.getElementById('btnCancelar');
const contadorCitas = document.getElementById('contadorCitas');

document.addEventListener('DOMContentLoaded', cargarCitas);
form.addEventListener('submit', guardarCita);
btnCancelar.addEventListener('click', limpiarFormulario);

//carga citas desde las cookies
function obtenerCitas() {
    const cookie = document.cookie.split('; ').find(row => row.startsWith('citas='));
    if (cookie) {
        try {
            return JSON.parse(cookie.split('=')[1]);
        } catch (e) {
            console.error('Error al parsear cookies:', e);
            return [];
        }
    }
    return [];
}

//guarda info en las cookies
function guardarEnCookies(citas) {
    const fechaExpiracion = new Date();
    fechaExpiracion.setDate(fechaExpiracion.getDate() + 30); // 30 días de expiración
    document.cookie = `citas=${JSON.stringify(citas)}; expires=${fechaExpiracion.toUTCString()}; path=/`;
}

//carga las ciras
function cargarCitas() {
    const citas = obtenerCitas();
    cuerpoTabla.innerHTML = '';
    
    if (citas.length === 0) {
        cuerpoTabla.innerHTML = `
            <tr id="filaVacia">
                <td colspan="6" class="empty-message">
                    <i class="fas fa-calendar-times"></i>
                    No hay citas programadas
                </td>
            </tr>
        `;
        contadorCitas.textContent = 'Total: 0 citas';
        return;
    }
    
    contadorCitas.textContent = `Total: ${citas.length} cita${citas.length !== 1 ? 's' : ''}`;
    
    citas.forEach((cita, index) => {
        const fechaCita = new Date(cita.fechaCita + 'T' + cita.horaCita);
        const fechaFormateada = fechaCita.toLocaleDateString('es-ES', {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
        const horaFormateada = fechaCita.toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit'
        });
        
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${index + 1}</td>
            <td>
                <strong>${cita.nombre} ${cita.apellidos}</strong><br>
                <small class="text-light">${cita.fechaNacimiento}</small>
            </td>
            <td>${cita.dni}</td>
            <td>${cita.telefono}</td>
            <td>
                <strong>${fechaFormateada}</strong><br>
                <small>${horaFormateada}</small>
            </td>
            <td>
                <div class="acciones">
                    <button onclick="editarCita('${cita.id}')" class="btn btn-success" title="Editar">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="eliminarCita('${cita.id}')" class="btn btn-danger" title="Eliminar">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        cuerpoTabla.appendChild(fila);
    });
}

//validacion
function validarFormulario() {
    let valido = true;
    const elementos = form.elements;
    
    document.querySelectorAll('.error-msg').forEach(span => span.textContent = '');
    document.querySelectorAll('.error-input').forEach(input => input.classList.remove('error-input'));
    
    const camposRequeridos = ['nombre', 'apellidos', 'dni', 'telefono', 'fechaNacimiento', 'fechaCita', 'horaCita'];
    camposRequeridos.forEach(id => {
        const input = document.getElementById(id);
        if (!input.value.trim()) {
            mostrarError(id, 'Este campo es obligatorio');
            valido = false;
        }
    });
    
    //Comprueba el dni
    const dniInput = document.getElementById('dni');
    const dniRegex = /^[0-9]{8}[A-Za-z]$/;
    if (dniInput.value.trim() && !dniRegex.test(dniInput.value.trim())) {
        mostrarError('dni', 'Formato DNI incorrecto (8 números + letra)');
        valido = false;
    }
    
    //comprueba longitud telefono
    const telefonoInput = document.getElementById('telefono');
    const telefonoRegex = /^[0-9]{9}$/;
    if (telefonoInput.value.trim() && !telefonoRegex.test(telefonoInput.value.trim())) {
        mostrarError('telefono', 'Teléfono debe tener 9 dígitos');
        valido = false;
    }
    
    //comprueba fechas
    const fechaNacimiento = new Date(document.getElementById('fechaNacimiento').value);
    const fechaCita = new Date(document.getElementById('fechaCita').value);
    const hoy = new Date();
    
    if (fechaNacimiento > hoy) {
        mostrarError('fechaNacimiento', 'La fecha de nacimiento no puede ser futura');
        valido = false;
    }
    
    if (fechaCita < hoy) {
        mostrarError('fechaCita', 'La cita no puede ser en el pasado');
        valido = false;
    }
    
    return valido;
}

function mostrarError(campoId, mensaje) {
    const input = document.getElementById(campoId);
    const errorSpan = document.getElementById(`error-${campoId}`);
    
    if (input && errorSpan) {
        input.classList.add('error-input');
        errorSpan.textContent = mensaje;
    }
}

function mostrarNotificacion(mensaje, tipo = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${tipo}`;
    notification.innerHTML = `
        <i class="fas fa-${tipo === 'success' ? 'check-circle' : tipo === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        ${mensaje}
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

//guarda la cita
function guardarCita(e) {
    e.preventDefault();
    
    if (!validarFormulario()) {
        mostrarNotificacion('Por favor, corrija los errores en el formulario', 'error');
        return;
    }
    
    const idCitaInput = document.getElementById('idCita');
    const id = idCitaInput.value || `cita_${Date.now()}`;
    
    const cita = new Cita(
        id,
        document.getElementById('nombre').value,
        document.getElementById('apellidos').value,
        document.getElementById('dni').value,
        document.getElementById('telefono').value,
        document.getElementById('fechaNacimiento').value,
        document.getElementById('fechaCita').value,
        document.getElementById('horaCita').value,
        document.getElementById('observaciones').value
    );
    
    let citas = obtenerCitas();
    
    if (idCitaInput.value) {
        //la edita
        citas = citas.map(c => c.id === id ? cita : c);
        mostrarNotificacion('Cita modificada correctamente');
    } else {
        //la crea
        citas.push(cita);
        mostrarNotificacion('Cita guardada correctamente');
    }
    
    guardarEnCookies(citas);
    limpiarFormulario();
    cargarCitas();
}

function editarCita(id) {
    const citas = obtenerCitas();
    const cita = citas.find(c => c.id === id);
    
    if (!cita) {
        mostrarNotificacion('Cita no encontrada', 'error');
        return;
    }
    
    document.getElementById('idCita').value = cita.id;
    document.getElementById('nombre').value = cita.nombre;
    document.getElementById('apellidos').value = cita.apellidos;
    document.getElementById('dni').value = cita.dni;
    document.getElementById('telefono').value = cita.telefono;
    document.getElementById('fechaNacimiento').value = cita.fechaNacimiento;
    document.getElementById('fechaCita').value = cita.fechaCita;
    document.getElementById('horaCita').value = cita.horaCita;
    document.getElementById('observaciones').value = cita.observaciones;
    
    const btnSubmit = form.querySelector('button[type="submit"]');
    btnSubmit.innerHTML = '<i class="fas fa-sync-alt"></i> Actualizar Cita';
    
    form.scrollIntoView({ behavior: 'smooth' });
    
    mostrarNotificacion('Cita cargada para edición');
}

function eliminarCita(id) {
    if (!confirm('¿Está seguro de que desea eliminar esta cita?')) {
        return;
    }
    
    let citas = obtenerCitas();
    const nuevaCantidad = citas.filter(c => c.id !== id).length;
    
    if (nuevaCantidad === citas.length) {
        mostrarNotificacion('Cita no encontrada', 'error');
        return;
    }
    
    citas = citas.filter(c => c.id !== id);
    guardarEnCookies(citas);
    cargarCitas();
    
    mostrarNotificacion('Cita eliminada correctamente', 'warning');
}

function limpiarFormulario() {
    form.reset();
    document.getElementById('idCita').value = '';
    
    document.querySelectorAll('.error-msg').forEach(span => span.textContent = '');
    document.querySelectorAll('.error-input').forEach(input => input.classList.remove('error-input'));
    
    //restaura el texto del boton
    const btnSubmit = form.querySelector('button[type="submit"]');
    btnSubmit.innerHTML = '<i class="fas fa-save"></i> Guardar Cita';
    
    mostrarNotificacion('Formulario limpiado');
}