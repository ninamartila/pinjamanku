import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { GuardProvider, GuardedRoute } from "react-router-guards";
import "./App.css";
import {
  DasboardBorower,
  DetailBorrower,
  Home,
  Lender,
  ListLoan,
  ListUserBorrower,
  ListUserLender,
  ListUserPendingBorrower,
  Login,
  Register,
  TempatMinjam,
} from "./pages";

import AddLoan from "./pages/Lender/formAddLoan";
import store from "./store";
export default function App() {
  console.log(localStorage.getItem("access_token"));
  const Guard = (to, from, next) => {
    console.log(to);
    if (to.meta.auth) {
      if (
        localStorage.getItem("access_token") &&
        to.match.path === "/register"
      ) {
        next.redirect("/");
      }
      if (localStorage.getItem("access_token") && to.match.path === "/login") {
        next.redirect("/");
      }
      next();
    } else {
      next();
    }
    // if (localStorage.getItem("access_token")) {
    //   console.log("masuk");
    //   next("/login");
    // }
    // if (localStorage.getItem("access_token") && to === "/register") {
    //   next().redirect("/");
    // }
    // next();
  };
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <GuardProvider guards={Guard} loading={""} error={""}>
            <Switch>
              <Route path="/admin-dashboard/borrowerDetail/:userId">
                <DetailBorrower />
              </Route>
              <Route path="/admin-dashboard/borrower">
                <ListUserBorrower />
              </Route>
              <Route path="/admin-dashboard/lender">
                <ListUserLender />
              </Route>
              <Route path="/lederform">
                <AddLoan />
              </Route>
              <Route path="/admin-dashboard/pendingborrower">
                <ListUserPendingBorrower />
              </Route>
              <Route path="/admin-dashboard/listLoan">
                <ListLoan />
              </Route>
              <Route path="/lender/add-loan">
                <AddLoan />
              </Route>

              <Route path="/lender">
                <Lender />
              </Route>

              <Route path="/pendana/tempat-minjam">
                <TempatMinjam />
              </Route>

              <Route path="/pendana">
                <DasboardBorower />
              </Route>
              <GuardedRoute
                path="/register"
                exact
                component={Register}
                meta={{ auth: true }}
              />
              <GuardedRoute
                path="/login"
                exact
                component={Login}
                meta={{ auth: true }}
              />

              <GuardedRoute path="/" exact component={Home} />
            </Switch>
          </GuardProvider>
        </BrowserRouter>
      </Provider>
    </div>
  );
}
