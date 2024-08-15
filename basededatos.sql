CREATE TABLE Matriculados (
    id SERIAL PRIMARY KEY,
    apellido VARCHAR(255) NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    dni VARCHAR(20) UNIQUE NOT NULL,
    titulo_universitario VARCHAR(255),
    instituto_universidad VARCHAR(255),
    matricula_profesional VARCHAR(100) UNIQUE,
    correo_electronico VARCHAR(255) UNIQUE,
    domicilio_consultorio TEXT,
    observaciones TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
