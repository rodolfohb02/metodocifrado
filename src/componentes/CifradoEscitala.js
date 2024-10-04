import React, { useState } from "react";
import './CifradoEscitala.css'; // Asegúrate de crear este archivo y agregar estilos

const CifradoEscitala = () => {
  const [message, setMessage] = useState("");
  const [columns, setColumns] = useState(0);
  const [cipheredMessage, setCipheredMessage] = useState("");
  const [error, setError] = useState("");
  const [copySuccess, setCopySuccess] = useState("");

  const handleCipher = () => {
    const numColumns = parseInt(columns, 10);
    if (!message || isNaN(numColumns) || numColumns <= 0) {
      setError("Por favor, ingrese un mensaje y una clave válida.");
      return;
    }
    setError("");
    let result = "";
    const rows = Math.ceil(message.length / numColumns);
    for (let i = 0; i < numColumns; i++) {
      for (let j = 0; j < rows; j++) {
        const index = j * numColumns + i;
        if (index < message.length) {
          result += message[index];
        }
      }
    }
    setCipheredMessage(result);
  };

  const handleDecipher = () => {
    const numColumns = parseInt(columns, 10);
    if (numColumns <= 0 || isNaN(numColumns) || message.length === 0) {
      setError("Por favor, ingrese un mensaje y una clave válida.");
      return;
    }
    setError("");

    const rows = Math.ceil(message.length / numColumns);
    let result = Array(message.length).fill("");
    let currentIndex = 0;

    for (let i = 0; i < numColumns; i++) {
      for (let j = 0; j < rows; j++) {
        const index = j * numColumns + i;
        if (index < message.length) {
          result[index] = message[currentIndex++];
        }
      }
    }

    setCipheredMessage(result.join(""));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(cipheredMessage)
      .then(() => {
        setCopySuccess("Texto copiado");
        setTimeout(() => setCopySuccess(""), 3000);
      })
      .catch(() => setCopySuccess("No se pudo copiar el texto"));
  };

  return (
    <div className="container">
      <h2 className="text-center">Cifrado Escítala</h2>
      <div className="form-container">
        <div className="form-group">
          <label>Mensaje:</label>
          <input 
            type="text" 
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
            placeholder="Ingrese su mensaje aquí" 
          />
        </div>
        <div className="form-group">
          <label>Número de columnas (clave):</label>
          <input 
            type="number" 
            value={columns} 
            onChange={(e) => setColumns(e.target.value)} 
            placeholder="Ingrese el número de columnas" 
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="button-container">
          <button className="btn btn-primary" onClick={handleCipher}>Cifrar</button>
          <button className="btn btn-secondary" onClick={handleDecipher}>Descifrar</button>
        </div>
        {cipheredMessage && (
          <div className="result-container">
            <h4>Resultado:</h4>
            <p>{cipheredMessage}</p>
            <button className="btn btn-info" onClick={handleCopy}>Copiar Texto</button>
            {copySuccess && <div className="alert alert-success mt-2">{copySuccess}</div>}
          </div>
        )}
      </div>
    </div>
  );
};

export default CifradoEscitala;
