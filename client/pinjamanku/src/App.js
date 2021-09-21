import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import { DasboardBorower, Home, Lander, ListLoan, ListUser, ListUserStatus, Login, Register, TempatMinjam } from "./pages";
import store from "./store";
export default function App() {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path="/admin-dashboard/listUser">
              <ListUser />
            </Route>
            <Route path="/admin-dashboard/listUserStatus">
              <ListUserStatus />
            </Route>
            <Route path="/admin-dashboard/listLoan">
              <ListLoan />
            </Route>
            {/* Nanti di tambah ID landernya */}
            <Route path="/lender">
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
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
        </BrowserRouter>
      </Provider>
    </div>
  );
}
