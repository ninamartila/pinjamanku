import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import { DasboardBorower, DetailBorrower, Home, Lander, ListLoan, ListUserBorrower, ListUserLender, ListUserPendingBorrower, Login, Register, TempatMinjam } from "./pages";

import AddLoan from "./pages/Lander/formAddLoan";
import store from "./store";
export default function App() {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path="/listUserBorrower">
              <ListUserBorrower />
            </Route>
            <Route path="/borrowerDetail/:userId">
              <DetailBorrower />
            </Route>
            <Route path="/listUserLender">
              <ListUserLender />
            </Route>
            <Route path="/listUserPendingBorrower">
              <ListUserPendingBorrower />
            </Route>
            <Route path="/listLoan">
              <ListLoan />
            </Route>
            {/* Nanti di tambah ID landernya */}
            <Route path="/lander">
              <Lander />
            </Route>
            <Route path="/addLoan">
              <AddLoan />
            </Route>
            {/* Nanti di tambah ID borowernya */}
            <Route path="/pendana/tempat-minjam">
              <TempatMinjam />
            </Route>
            {/* Nanti di tambah ID borowernya */}
            <Route exact path="/pendana">
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
