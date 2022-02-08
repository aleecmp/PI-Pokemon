import "./App.css";
import { Route, BrowserRouter } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import PokemonCreate from "./components/PokemonCreate";
import PokemonDetails from "./components/PokemonDetails";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/pokemons" component={Home} />
        <Route exact path="/details/:id" component={PokemonDetails} />
        <Route exact path="/pokemon" component={PokemonCreate} />
      </div>
    </BrowserRouter>
  );
}

export default App;
