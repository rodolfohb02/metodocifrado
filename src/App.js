import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MenuDesplegable from "./componentes/MenuDesplegable";
import CifradoCesar from './componentes/CifradoCesar';
import CifradoEscitala from './componentes/CifradoEscitala';
import MetodoSimetrico from './componentes/MetodoSimetrico';
import MetodoAsimetrico from './componentes/MetodoAsimetrico';
import FormularioWhirlpool from './componentes/FormularioWhirlpool';
import Hash from './componentes/Hash';
import './App.css'; // Importa el archivo CSS

function App() {
  return (
    <Router>
      <div className="App">
        <MenuDesplegable />
        <div className="content-container">
          <Routes>
            <Route path="/CifradoCesar" element={<CifradoCesar />} />
            <Route path="/CifradoEscitala" element={<CifradoEscitala />} />
            <Route path="/MetodoSimetrico" element={<MetodoSimetrico />} />
            <Route path="/MetodoAsimetrico" element={<MetodoAsimetrico />} />
            <Route path="/Hash" element={<Hash />} />
            <Route path="/FormularioWhirlpool" element={<FormularioWhirlpool />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
