import "./App.css";
import { Route, BrowserRouter } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Home from "./components/Home/Home";
import CreatePokemon from "./components/CreatePokemon/CreatePokemon";
import PokemonDetails from "./components/PokemonDetails/PokemonDetails";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/pokemons" component={Home} />
        <Route exact path="/details/:id" component={PokemonDetails} />
        <Route exact path="/pokemon" component={CreatePokemon} />
      </div>
    </BrowserRouter>
  );
}

export default App;
