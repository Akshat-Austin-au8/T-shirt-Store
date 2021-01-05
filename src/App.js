import React, { lazy, Suspense } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

//components
import Homepage from "./containers/Homepage/JS/homepage";
import SignUp from "./containers/Users/JS/sign_up";
import SignIn from "./containers/Users/JS/sign_in";
import ProductsInCategory from "./containers/Homepage/JS/products_in_category";
import CartPage from "./containers/Cart/JS/cart_page";
import SearchResultsPage from "./containers/SearchResult/JS/search_results_page";
import Spinner from "./components/UI/JS/spinner";

import spinnerStyle from "./containers/Homepage/CSS/products_in_category.module.css";

const UserProfile = () =>
{
    if (localStorage.length === 0 || !localStorage.userData)
    {
        return <Redirect to="/sign_up" />;
    } else if (
        (localStorage.fbLoggedIn === "false" &&
            Date.now() > localStorage.expiresIn) ||
        Date.now() > localStorage.expiresIn
    )
    {
        return <Redirect to="/sign_in" />;
    } else
    {
        return lazy(() => import("./containers/Users/JS/profile"));
    }
};

const App = () =>
{
    return (
        <BrowserRouter>
            <Switch>
                <Route
                    path="/:category/products"
                    component={ProductsInCategory}
                />
                <Route path="/search_results" component={SearchResultsPage} />
                <Route path="/sign_up" component={SignUp} />
                <Route path="/sign_in" component={SignIn} />
                <Route path="/cart" component={CartPage} />
                <Route exact path="/" component={Homepage} />
                <Suspense fallback={<Spinner id={spinnerStyle.spinnerPos} />}>
                    <Route path="/profile" component={UserProfile()} />
                </Suspense>
            </Switch>
        </BrowserRouter>
    );
};

export default App;
