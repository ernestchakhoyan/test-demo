import React from "react";
import ReactDOM from "react-dom/client";
import {
    BrowserRouter,
    Route,
    Routes
} from "react-router-dom";

import "./index.css";

import { Provider } from "react-redux";
import store from "./store";
import {
    Counter,
    Layout,
    User,
    Repo,
} from "./containers";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                    <Layout>
                        <Routes>
                            <Route path="/" element={<Counter />} />
                            <Route path="/user" element={<User />} />
                            <Route path="/repo" element={<Repo />} />
                        </Routes>
                    </Layout>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
);

