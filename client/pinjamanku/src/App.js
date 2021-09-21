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
            <Route path="/admin-dashboard/borrower">
              <ListUserBorrower />
            </Route>
            <Route path="/admin-dashboard/borrowerDetail/:userId">
              <DetailBorrower />
            </Route>
            <Route path="/admin-dashboard/lender">
              <ListUserLender />
            </Route>
            <Route path="/admin-dashboard/pendingborrower">
              <ListUserPendingBorrower />
            </Route>
            <Route path="/admin-dashboard/listLoan">
              <ListLoan />
            </Route>
            {/* Nanti di tambah ID landernya */}
            <Route path="/lender/dashboard">
              <Lander />
            </Route>
            <Route path="/lender/invest">
              <AddLoan />
            </Route>
            {/* Nanti di tambah ID borowernya. ini dijadiin home aja */}
            <Route path="/pendana/availableloans">
              <TempatMinjam />
            </Route>
            {/* Nanti di tambah ID borowernya */}
            <Route exact path="/borrower/dashboard">
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
