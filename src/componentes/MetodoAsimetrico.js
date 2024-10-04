import React, { useState, useEffect } from 'react';
import forge from 'node-forge';
import './MetodoAsimetrico.css'; // Importa el archivo CSS

function MetodoAsimetrico() {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    direccion: '',
    contrasenia: ''
  });

  const [encryptedData, setEncryptedData] = useState(null);
  const [decryptedData, setDecryptedData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [keys, setKeys] = useState({ publicKey: null, privateKey: null });

  useEffect(() => {
    const generateKeys = async () => {
      const keyPair = forge.pki.rsa.generateKeyPair(2048);
      setKeys({
        publicKey: keyPair.publicKey,
        privateKey: keyPair.privateKey
      });
    };
    generateKeys();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setErrorMessage('');
  };

  const areFieldsFilled = () => {
    return (
      formData.nombre &&
      formData.correo &&
      formData.telefono &&
      formData.direccion &&
      formData.contrasenia
    );
  };

  const encryptData = async () => {
    if (!areFieldsFilled()) {
      setErrorMessage('Todos los campos son obligatorios. Por favor, completa el formulario.');
      return;
    }

    if (!keys.publicKey) {
      setErrorMessage('La clave pública no está disponible.');
      return;
    }

    const dataString = JSON.stringify(formData);

    try {
      const encrypted = keys.publicKey.encrypt(dataString, 'RSA-OAEP', {
        md: forge.md.sha256.create(),
      });
      setEncryptedData(forge.util.encode64(encrypted));
      alert('Datos cifrados con éxito');
    } catch (error) {
      console.error('Error al cifrar los datos:', error);
      setErrorMessage('Error al cifrar los datos.');
    }
  };

  const decryptData = async () => {
    try {
      if (!keys.privateKey) {
        setErrorMessage('La clave privada no está disponible.');
        return;
      }

      const decodedData = forge.util.decode64(encryptedData);
      const decrypted = keys.privateKey.decrypt(decodedData, 'RSA-OAEP', {
        md: forge.md.sha256.create(),
      });
      setDecryptedData(JSON.parse(decrypted));
      alert('Datos descifrados con éxito');
    } catch (error) {
      console.error('Error al descifrar:', error);
      alert('Error al descifrar los datos');
    }
  };

  return (
    <div className="container">
      <form className="form-container">
        <h2>Formulario de Método Asimétrico</h2>

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

        <div className="form-group">
          <label>Contraseña:</label>
          <input
            type="text"
            name="contrasenia"
            value={formData.contrasenia}
            onChange={handleChange}
            required
          />
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
        </div>

        {errorMessage && (
          <div className="error-message">
            <p>{errorMessage}</p>
          </div>
        )}

        <div className="button-group">
          <button type="button" onClick={encryptData}>Cifrar</button>
        </div>
      </form>

      {encryptedData && (
        <div className="encrypted-container">
          <h2>Datos Cifrados</h2>
          <textarea
            readOnly
            value={encryptedData}
            rows="10"
            cols="50"
          />
          <div className="button-group">
            <button type="button" onClick={decryptData}>Descifrar</button>
          </div>
        </div>
      )}

      {decryptedData && (
        <div className="decrypted-container">
          <h2>Datos Descifrados</h2>
          <pre>{JSON.stringify(decryptedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default MetodoAsimetrico;
