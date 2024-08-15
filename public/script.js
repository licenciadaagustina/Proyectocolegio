document.getElementById('matriculadoForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtener los datos del formulario
    const formData = new FormData(this);
    const matriculado = {};
    formData.forEach((value, key) => {
        matriculado[key] = value;
    });

    // Llamada al backend para registrar el matriculado
    fetch('/matriculados', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Usa el token almacenado
        },
        body: JSON.stringify(matriculado)
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert('Error al registrar matriculado: ' + data.error);
        } else {
            alert('Matriculado registrado correctamente');
            // Limpiar el formulario
            this.reset();
            // Actualizar la tabla
            fetchMatriculados();
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Hubo un problema al registrar el matriculado.');
    });
});

// Función para obtener y mostrar los matriculados
function fetchMatriculados() {
    fetch('/matriculados', {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Usa el token almacenado
        }
    })
    .then(response => response.json())
    .then(data => {
        const tbody = document.getElementById('matriculadosTable').querySelector('tbody');
        tbody.innerHTML = '';

        data.forEach(matriculado => {
            const tr = document.createElement('tr');

            Object.values(matriculado).forEach(value => {
                const td = document.createElement('td');
                td.textContent = value;
                tr.appendChild(td);
            });

            tbody.appendChild(tr);
        });
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Hubo un problema al obtener los matriculados.');
    });
}

// Cargar los matriculados cuando se carga la página
window.onload = fetchMatriculados;
document.getElementById('matriculadoForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtener los datos del formulario
    const formData = new FormData(this);
    const matriculado = {};
    formData.forEach((value, key) => {
        matriculado[key] = value;
    });

    // Llamada al backend para registrar el matriculado
    fetch('/matriculados', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Usa el token almacenado
        },
        body: JSON.stringify(matriculado)
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert('Error al registrar matriculado: ' + data.error);
        } else {
            alert('Matriculado registrado correctamente');
            // Limpiar el formulario
            this.reset();
            // Actualizar la tabla
            fetchMatriculados();
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Hubo un problema al registrar el matriculado.');
    });
});

// Función para obtener y mostrar los matriculados
function fetchMatriculados() {
    fetch('/matriculados', {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Usa el token almacenado
        }
    })
    .then(response => response.json())
    .then(data => {
        const tbody = document.getElementById('matriculadosTable').querySelector('tbody');
        tbody.innerHTML = '';

        data.forEach(matriculado => {
            const tr = document.createElement('tr');

            Object.values(matriculado).forEach(value => {
                const td = document.createElement('td');
                td.textContent = value;
                tr.appendChild(td);
            });

            tbody.appendChild(tr);
        });
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Hubo un problema al obtener los matriculados.');
    });
}

// Cargar los matriculados cuando se carga la página
window.onload = fetchMatriculados;
