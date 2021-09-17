import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/navbar";
import DasboardBorower from "./pages/Brower/DasboardBorower";
import TempatMinjam from "./pages/Brower/TempatMinjam";
import Home from "./pages/Home/Home";
import Lander from "./pages/Lander/Lander";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import store from "./store";
export default function App() {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
          <Switch>
            {/* Nanti di tambah ID landernya */}
            <Route path="/lander">
              <Lander />
            </Route>
            {/* Nanti di tambah ID borowernya */}
            <Route path="/pendana/tempat-minjam">
              <TempatMinjam />
            </Route>
            {/* Nanti di tambah ID borowernya */}
            <Route path="/pendana">
              <DasboardBorower />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </BrowserRouter>
      </Provider>
    </div>
  );
}
