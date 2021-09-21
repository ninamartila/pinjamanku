import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { GuardProvider, GuardedRoute } from "react-router-guards";
import "./App.css";
import {
  DasboardBorower,
  Home,
  Lander,
  ListLoan,
  ListUser,
  ListUserStatus,
  Login,
  Register,
  TempatMinjam,
} from "./pages";
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
              {/* <Route path="/listUser">
              <ListUser />
            </Route>
            <Route path="/listUserStatus">
              <ListUserStatus />
            </Route>
            <Route path="/listLoan">
              <ListLoan />
            </Route>
          
            <Route path="/lender">
              <Lander />
            </Route>
           
            <Route path="/pendana/tempat-minjam">
              <TempatMinjam />
            </Route>
            
            <Route path="/pendana">
              <DasboardBorower />
            </Route> */}
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
              {/* <Route path="/register">
                <Register />
              </Route>
              <Route path="/login">
                <Login />
              </Route> */}
              <GuardedRoute path="/" exact component={Home} />
              {/* <Route path="/">
                <Home />
              </Route> */}
            </Switch>
          </GuardProvider>
        </BrowserRouter>
      </Provider>
    </div>
  );
}
