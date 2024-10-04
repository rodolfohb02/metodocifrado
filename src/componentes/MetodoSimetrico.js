import React, { useState } from 'react';
import './MetodoSimetrico.css'; // Importa el archivo CSS

function MetodoSimetrico() {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    direccion: '',
    contrasenia: ''
  });

  const [encryptedData, setEncryptedData] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    direccion: '',
    contrasenia: ''
  });

  const [decryptedData, setDecryptedData] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    direccion: '',
    contrasenia: ''
  });

  const key = [0x01234567, 0x89abcdef, 0xfedcba98, 0x76543210];

  // Funciones de cifrado y descifrado (no cambian)
  function stringToUint32Array(str) {
    const data = new Uint8Array(new TextEncoder().encode(str));
    const arrayLength = Math.ceil(data.length / 4);
    const uint32Array = new Uint32Array(arrayLength);
    for (let i = 0; i < data.length; i++) {
      uint32Array[Math.floor(i / 4)] |= data[i] << ((i % 4) * 8);
    }
    return uint32Array;
  }

  function uint32ArrayToString(array) {
    const byteArray = new Uint8Array(array.buffer);
    return new TextDecoder().decode(byteArray);
  }

  function encryptTEA(data, key) {
    const delta = 0x9E3779B9;
    let v0 = data[0], v1 = data[1], sum = 0;

    for (let i = 0; i < 32; i++) {
      sum += delta;
      v0 += ((v1 << 4) + key[0]) ^ (v1 + sum) ^ ((v1 >> 5) + key[1]);
      v1 += ((v0 << 4) + key[2]) ^ (v0 + sum) ^ ((v0 >> 5) + key[3]);
    }

    return [v0, v1];
  }

  function decryptTEA(data, key) {
    const delta = 0x9E3779B9;
    let v0 = data[0], v1 = data[1], sum = delta * 32;

    for (let i = 0; i < 32; i++) {
      v1 -= ((v0 << 4) + key[2]) ^ (v0 + sum) ^ ((v0 >> 5) + key[3]);
      v0 -= ((v1 << 4) + key[0]) ^ (v1 + sum) ^ ((v1 >> 5) + key[1]);
      sum -= delta;
    }

    return [v0, v1];
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleEncrypt = () => {
    const encrypted = {
      nombre: encryptTEA(stringToUint32Array(formData.nombre), key).join(' '),
      correo: encryptTEA(stringToUint32Array(formData.correo), key).join(' '),
      telefono: encryptTEA(stringToUint32Array(formData.telefono), key).join(' '),
      direccion: encryptTEA(stringToUint32Array(formData.direccion), key).join(' '),
      contrasenia: encryptTEA(stringToUint32Array(formData.contrasenia), key).join(' '),
    };
    setEncryptedData(encrypted);
    alert('Datos cifrados con éxito');
  };

  const handleDecrypt = () => {
    const decrypted = {
      nombre: uint32ArrayToString(new Uint32Array(decryptTEA(encryptedData.nombre.split(' ').map(Number), key))),
      correo: uint32ArrayToString(new Uint32Array(decryptTEA(encryptedData.correo.split(' ').map(Number), key))),
      telefono: uint32ArrayToString(new Uint32Array(decryptTEA(encryptedData.telefono.split(' ').map(Number), key))),
      direccion: uint32ArrayToString(new Uint32Array(decryptTEA(encryptedData.direccion.split(' ').map(Number), key))),
      contrasenia: uint32ArrayToString(new Uint32Array(decryptTEA(encryptedData.contrasenia.split(' ').map(Number), key))),
    };
    setDecryptedData(decrypted);
    alert('Datos descifrados con éxito');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos del formulario:', formData);
    alert('Formulario enviado con éxito');
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>Formulario de Método Simétrico</h2>

      <div className="form-group">
        <label>Nombre Completo:</label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
        <span> - Cifrado: {encryptedData.nombre}</span>
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
        <span> - Cifrado: {encryptedData.correo}</span>
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
        <span> - Cifrado: {encryptedData.telefono}</span>
      </div>

      <div className="form-group">
        <label>Contraseña:</label>
        <input
          type="text"
          name="contrasenia"
          value={formData.contrasenia}
          onChange={handleChange}
          required
        />
        <span> - Cifrado: {encryptedData.contrasenia}</span>
      </div>

      <div className="form-group">
        <label>Dirección:</label>
        <input
          type="text"
          name="direccion"
          value={formData.direccion}
          onChange={handleChange}
          required
        />
        <span> - Cifrado: {encryptedData.direccion}</span>
      </div>

      {/* Botones de cifrar y descifrar */}
      <div className="button-group">
        <button type="button" onClick={handleEncrypt}>Cifrar Datos</button>
        <button type="button" onClick={handleDecrypt}>Descifrar Datos</button>
      </div>

      <div className="decrypted-data">
        <p><strong>Datos Descifrados:</strong></p>
        <p>Nombre: {decryptedData.nombre}</p>
        <p>Correo: {decryptedData.correo}</p>
        <p>Teléfono: {decryptedData.telefono}</p>
        <p>Dirección: {decryptedData.direccion}</p>
        <p>Contraseña: {decryptedData.contrasenia}</p>
      </div>

      <div>
        <button type="submit">Enviar Datos</button>
      </div>
    </form>
  );
}

export default MetodoSimetrico;
