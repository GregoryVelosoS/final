import "./App.css";

//Importar o bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

//Importar o gerenciador de rotas
import { BrowserRouter, Route, Routes } from "react-router-dom";

//Importar componentes
import NavBarra from "./components/NavBarra.jsx";

//Importar paginas
import Home from "./pages/Home.jsx"
import Login from "./pages/Login.jsx"
import CadastroUsuario from "./pages/CadastroUsuario.jsx"
import CadastroProduto from "./pages/CadastroProduto.jsx";
import EditarProduto from "./pages/EditarProduto.jsx";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBarra />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />         
          <Route path="/cadastrar" element={<CadastroUsuario />} />
          <Route path="/produto/cadastrar/" element={<CadastroProduto />} />
          <Route path="/produto/editar/" element={<EditarProduto />} />
        </Routes>
      </BrowserRouter> 
    </div>
  );
}

export default App;
