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
  // console.log(localStorage.getItem("access_token"));
  // console.log(localStorage.getItem("role"));
  const Guard = (to, from, next) => {
    if (localStorage.getItem("role") === "admin" && to.meta.name === "admin") {
      next();
    }
    if (localStorage.getItem("role") !== "admin" && to.meta.name === "admin") {
      next.redirect("/");
    }
    if (localStorage.getItem("access_token") && to.meta.name === "register") {
      next.redirect("/");
    }
    if (localStorage.getItem("access_token") && to.meta.name === "login") {
      next.redirect("/");
    }
    if (
      localStorage.getItem("role") === "lender" &&
      to.meta.name === "borrower"
    ) {
      next.redirect("/");
    }
    if (
      localStorage.getItem("role") === "borrower" &&
      to.meta.name === "lender"
    ) {
      next.redirect("/");
    }
    if (
      localStorage.getItem("role") === "borrower" &&
      to.meta.name === "addLoan"
    ) {
      next.redirect("/");
    }
    if (!localStorage.getItem("access_token") && to.meta.name === "addLoan") {
      next.redirect("/login");
    }
    if (!localStorage.getItem("access_token") && to.meta.name === "lender") {
      next.redirect("/login");
    }
    if (!localStorage.getItem("access_token") && to.meta.name === "borrower") {
      next.redirect("/login");
    }
    next();
  };
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <GuardProvider guards={Guard} loading={""} error={""}>
            <Switch>
              <GuardedRoute
                path="/admin-dashboard/borrowerDetail/:userId"
                component={DetailBorrower}
                meta={{ name: "admin" }}
              />

              <GuardedRoute
                path="/admin-dashboard/borrower"
                exact
                component={ListUserBorrower}
                meta={{ name: "admin" }}
              />

              <GuardedRoute
                path="/admin-dashboard/lender"
                exact
                component={ListUserLender}
                meta={{ name: "admin" }}
              />

              <GuardedRoute
                path="/admin-dashboard/pendingborrower"
                exact
                component={ListUserPendingBorrower}
                meta={{ name: "admin" }}
              />
              <GuardedRoute
                path="/admin-dashboard/listLoan"
                exact
                component={ListLoan}
                meta={{ name: "admin" }}
              />
              <GuardedRoute
                path="/lender/add-loan"
                exact
                component={AddLoan}
                meta={{ name: "addLoan" }}
              />
              <GuardedRoute
                path="/lender"
                exact
                component={Lender}
                meta={{ name: "lender" }}
              />
              <GuardedRoute
                path="/borrower"
                exact
                component={DasboardBorower}
                meta={{ name: "borrower" }}
              />
              <GuardedRoute
                path="/register"
                exact
                component={Register}
                meta={{ name: "register" }}
              />
              <GuardedRoute
                path="/login"
                exact
                component={Login}
                meta={{ name: "login" }}
              />

              <GuardedRoute path="/" exact component={Home} />
            </Switch>
          </GuardProvider>
        </BrowserRouter>
      </Provider>
    </div>
  );
}
