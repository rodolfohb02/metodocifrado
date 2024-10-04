import React, { useState } from 'react';
import Whirlpool from 'whirlpool-hash';

function Hash() {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    direccion: '',
    contrasenia: ''
  });

  const [hashedPassword, setHashedPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleEncrypt = () => {
    const hashed = Whirlpool(formData.contrasenia);  // Cifrar la contraseña usando Whirlpool
    setHashedPassword(hashed);
    alert('Contraseña cifrada con éxito');
  };

  const handleDecrypt = () => {
    const isMatch = hashedPassword === Whirlpool(formData.contrasenia);
    setVerifyPassword(isMatch ? 'La contraseña es correcta' : 'La contraseña no coincide');
    alert('Verificación completada');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos del formulario:', formData);
    alert('Formulario enviado con éxito');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Formulario de Método Hash</h2>

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
      {/* Botones de cifrar y verificar */}
      <div>
        <button type="button" onClick={handleEncrypt}>Cifrar Contraseña</button>
        <button type="button" onClick={handleDecrypt}>Verificar Contraseña</button>
      </div>

      <div>
        <p><strong>Contraseña Cifrada:</strong> {hashedPassword}</p>
        <p><strong>Verificación:</strong> {verifyPassword}</p>
      </div>

      {/* Botón de Envío */}
      <div>
        <button type="submit">Enviar Datos</button>
      </div>
    </form>
  );
}

export default Hash;
