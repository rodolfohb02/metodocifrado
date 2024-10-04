import React, { useState } from 'react';
import forge from 'node-forge';

function Hash() {
  const [formData, setFormData] = useState({
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
    return formData.contrasenia.trim() !== '';
  };

  const hashData = () => {
    if (!areFieldsFilled()) {
      setErrorMessage('El campo de contraseña es obligatorio. Por favor, completa el formulario.');
      return;
    }

    try {
      const md5 = forge.md.md5.create();
      md5.update(formData.contrasenia);
      const hashedPassword = md5.digest().toHex();

      setHashedData({ contrasenia: hashedPassword });
      alert('Contraseña hasheada con éxito');
    } catch (error) {
      console.error('Error al generar el hash:', error);
      setErrorMessage('Error al generar el hash.');
    }
  };

  return (
    <div>
      {/* Formulario de entrada de datos */}
      <form onSubmit={(e) => e.preventDefault()}>
        <h2>Formulario de Hash con Wirlpool</h2>
        <div className="form-group">
          <label>Nombre Completo:</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Correo Electrónico:</label>
          <input
            type="email"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
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

      {/* Mostrar el hash generado */}
      {hashedData && (
        <div>
          <h2>Contraseña Hasheada</h2>
          <div>
            <input
              type="text"
              value={hashedData.contrasenia}
              readOnly
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Hash;
