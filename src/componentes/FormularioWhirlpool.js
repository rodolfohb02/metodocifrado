import React, { useState } from 'react';
import forge from 'node-forge';

function FormularioSHA256() {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    direccion: '',
    contrasenia: ''
  });

  const [hashedData, setHashedData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setErrorMessage('');
  };

  const areFieldsFilled = () => {
    return Object.values(formData).every(field => field.trim() !== '');
  };

  const hashData = () => {
    if (!areFieldsFilled()) {
      setErrorMessage('Todos los campos son obligatorios. Por favor, completa el formulario.');
      return;
    }

    const newHashedData = {};
    try {
      // Hashear cada campo de forma individual
      Object.keys(formData).forEach((key) => {
        const hash = forge.md.sha256.create();
        hash.update(formData[key]);
        newHashedData[key] = hash.digest().toHex();
      });

      setHashedData(newHashedData);
      alert('Datos hasheados con éxito');
    } catch (error) {
      console.error('Error al generar el hash:', error);
      setErrorMessage('Error al generar el hash.');
    }
  };

  return (
    <div>
      {/* Formulario de entrada de datos */}
      <form onSubmit={(e) => e.preventDefault()}>
        <h2>Formulario de Hash con SHA-256</h2>

        <div>
          <label>Nombre Completo:</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Correo Electrónico:</label>
          <input
            type="email"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Número de Teléfono:</label>
          <input
            type="number"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            name="contrasenia"
            value={formData.contrasenia}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Dirección:</label>
          <input
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            required
          />
        </div>

        {errorMessage && (
          <div style={{ color: 'red' }}>
            <p>{errorMessage}</p>
          </div>
        )}

        {/* Botón para generar el hash */}
        <div>
          <button type="button" onClick={hashData}>Generar Hash</button>
        </div>
      </form>

      {/* Formulario para mostrar los hashes generados */}
      {hashedData && (
        <form>
          <h2>Datos Hasheados</h2>
          <div>
            <label>Nombre Completo:</label>
            <input
              type="text"
              value={hashedData.nombre}
              readOnly
            />
          </div>

          <div>
            <label>Correo Electrónico:</label>
            <input
              type="text"
              value={hashedData.correo}
              readOnly
            />
          </div>

          <div>
            <label>Número de Teléfono:</label>
            <input
              type="text"
              value={hashedData.telefono}
              readOnly
            />
          </div>

          <div>
            <label>Contraseña:</label>
            <input
              type="text"
              value={hashedData.contrasenia}
              readOnly
            />
          </div>

          <div>
            <label>Dirección:</label>
            <input
              type="text"
              value={hashedData.direccion}
              readOnly
            />
          </div>
        </form>
      )}
    </div>
  );
}

export default FormularioSHA256;
