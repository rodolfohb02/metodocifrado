import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MenuDesplegable.css'; // Importar el archivo CSS para el diseño

function MenuDesplegable() {
  const [abierto, setAbierto] = useState(false);
  const navigate = useNavigate();

  const opciones = [
    { nombre: 'Cifrado Cesar', ruta: '/CifradoCesar' },
    { nombre: 'Cifrado Escitala', ruta: '/CifradoEscitala' },
    { nombre: 'Método Simétrico', ruta: '/MetodoSimetrico' },
    { nombre: 'Método Asimétrico', ruta: '/MetodoAsimetrico' },
    { nombre: 'Método Hash', ruta: '/Hash' },
  ];

  const toggleMenu = () => {
    setAbierto(!abierto);
  };

  const handleOptionClick = (ruta) => {
    setAbierto(false); // Cerrar el menú
    navigate(ruta); // Redirigir a la ruta seleccionada
  };

  return (
    <div className="menu-container">
      <button className="menu-button" onClick={toggleMenu}>
        {abierto ? 'Cifrado' : 'Cifrado'}
      </button>
      {abierto && (
        <ul className="menu-options horizontal">
          {opciones.map((opcion, index) => (
            <li
              key={index}
              className="menu-option"
              onClick={() => handleOptionClick(opcion.ruta)}
            >
              {opcion.nombre}
            </li>
          ))}
        </ul>
      )}
      {/* Sección para el texto sobre los métodos de cifrado */}
      <div className="footer-text">
        <h3>Diferencias entre métodos de cifrado</h3>
        <p>
          La seguridad de la información en la era digital se basa en métodos de cifrado que protegen los datos de accesos no autorizados. Entre estos métodos, el cifrado simétrico, el cifrado asimétrico y las funciones hash son fundamentales, cada uno con características y aplicaciones específicas.
        </p>
        <p>
          <strong>Cifrado Simétrico: TEA (Tiny Encryption Algorithm)</strong><br />
          El algoritmo TEA es un método de cifrado simétrico, lo que significa que utiliza la misma clave tanto para cifrar como para descifrar la información. Diseñado para ser simple y eficiente, TEA opera con bloques de 64 bits y se caracteriza por su rapidez en la ejecución. Sin embargo, su seguridad se ve comprometida si la clave es expuesta, ya que cualquier atacante que obtenga esta clave podría descifrar fácilmente los datos. TEA es ampliamente utilizado en aplicaciones que requieren una implementación rápida y con pocos recursos, aunque su longitud de clave (128 bits) puede no ser suficiente para resistir ataques avanzados.
        </p>
        <p>
          <strong>Cifrado Asimétrico: RSA (Rivest-Shamir-Adleman)</strong><br />
          A diferencia del TEA, el algoritmo RSA es un método de cifrado asimétrico que utiliza un par de claves: una pública y otra privada. La clave pública se puede compartir libremente, permitiendo que cualquier persona cifre un mensaje destinado al propietario de la clave privada, quien es el único que puede descifrarlo. RSA se basa en la dificultad de factorizar grandes números primos, lo que lo hace seguro contra ataques. Su uso es común en la transmisión de datos seguros a través de Internet, como en el protocolo HTTPS. Sin embargo, RSA es más lento que el cifrado simétrico y, por ello, a menudo se utiliza en combinación con otros métodos de cifrado.
        </p>
        <p>
          <strong>Funciones Hash: Whirlpool</strong><br />
          Por otro lado, Whirlpool es una función hash, que no es un método de cifrado en sí, sino una forma de transformar datos de cualquier tamaño en una cadena de longitud fija (512 bits). Su principal objetivo es garantizar la integridad de la información, ya que cualquier cambio en los datos originales producirá un hash completamente diferente. Whirlpool es utilizado en aplicaciones donde se requiere verificar la autenticidad de los datos, como en la firma digital o en la comprobación de la integridad de archivos. A diferencia de TEA y RSA, no se utiliza para cifrar y descifrar información, sino para generar un resumen único que representa un conjunto de datos.
        </p>
        <p>
          En resumen, mientras que TEA y RSA son métodos de cifrado que aseguran la confidencialidad de la información a través de claves, Whirlpool se enfoca en garantizar la integridad de los datos mediante la generación de un hash. Cada uno de estos métodos juega un papel crucial en la seguridad digital, abordando diferentes aspectos de la protección de la información.
        </p>
      </div>
    </div>
  );
}

export default MenuDesplegable;
