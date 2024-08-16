document.getElementById('matriculadoForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que la página se recargue al enviar el formulario

    const formData = new FormData(this);
    const matriculado = {};
    formData.forEach((value, key) => {
        matriculado[key] = value;
    });

    fetch('/matriculados', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(matriculado)
    })
    .then(response => response.json())
    .then(data => {
        alert('Matriculado registrado correctamente');
        this.reset();
        fetchMatriculados(); 
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Hubo un problema al registrar el matriculado.');
    });
});

function fetchMatriculados() {
    fetch('/matriculados')
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

window.onload = fetchMatriculados;
