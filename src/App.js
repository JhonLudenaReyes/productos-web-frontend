import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./components/Dashboard/Main";
import ProductRegister from "./components/product/ProductRegister";

import { Provider } from "react-redux";
import store from "./store";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/product-register" element={<ProductRegister />} />
          </Routes>
        </Router>
      </Provider>
    </>
  );
};

export default App;
