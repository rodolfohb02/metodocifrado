import React, { useState } from "react";
import './CifradoCesar.css'; // Asegúrate de crear este archivo y agregar estilos

const CifradoCesar = () => {
  const [message, setMessage] = useState("");
  const [shift, setShift] = useState(0);
  const [cipheredMessage, setCipheredMessage] = useState("");
  const [error, setError] = useState("");
  const [copySuccess, setCopySuccess] = useState("");

  const handleCipher = () => {
    if (!message || isNaN(shift)) {
      setError("Por favor, ingrese un mensaje y una clave válida.");
      return;
    }
    setError("");
    let result = "";
    for (let i = 0; i < message.length; i++) {
      let char = message[i];
      if (char.match(/[a-z]/i)) {
        let code = message.charCodeAt(i);
        // Letras mayúsculas
        if (code >= 65 && code <= 90) {
          char = String.fromCharCode(((code - 65 + parseInt(shift)) % 26) + 65);
        }
        // Letras minúsculas
        else if (code >= 97 && code <= 122) {
          char = String.fromCharCode(((code - 97 + parseInt(shift)) % 26) + 97);
        }
      }
      result += char;
    }
    setCipheredMessage(result);
  };

  const handleDecipher = () => {
    let decipherShift = -shift;
    let result = "";
    for (let i = 0; i < message.length; i++) {
      let char = message[i];
      if (char.match(/[a-z]/i)) {
        let code = message.charCodeAt(i);
        // Letras mayúsculas
        if (code >= 65 && code <= 90) {
          char = String.fromCharCode(((code - 65 + parseInt(decipherShift)) % 26 + 26) % 26 + 65);
        } 
        // Letras minúsculas
        else if (code >= 97 && code <= 122) {
          char = String.fromCharCode(((code - 97 + parseInt(decipherShift)) % 26 + 26) % 26 + 97);
        }
      }
      result += char;
    }
    setCipheredMessage(result);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(cipheredMessage)
      .then(() => {
        setCopySuccess("Texto copiado");
        setTimeout(() => setCopySuccess(""), 3000); // Ocultar el mensaje después de 3 segundos
      })
      .catch(() => setCopySuccess("No se pudo copiar el texto"));
  };

  return (
    <div className="container">
      <h2 className="text-center">Cifrado César</h2>
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
          <label>Clave de desplazamiento:</label>
          <input 
            type="number" 
            value={shift} 
            onChange={(e) => setShift(e.target.value)} 
            placeholder="Ingrese el desplazamiento" 
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

export default CifradoCesar;
