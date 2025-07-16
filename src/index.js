import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// import ProductDetail from "./pages/product/[id]/page";
import Cart from "./pages/cart/page";
import Checkout from "./pages/checkout/page";
import Orders from "./pages/orders/page";
import ListCategory from "./pages/listCategory/page";
import Success from "./pages/success/page";
import AuthPage from "./pages/auth/page";
import AdminDashboard from "./pages/admin/page";
import OrderHistory from "./pages/OrderHistory/page";
import SearchResults from "./pages/SearchResults/SearchResults";
import HelpContact from "./pages/help/page";
import AddressPage from "./pages/address/page";
import ShippingPage from "./pages/shipping/page";
import ShipperDashboard from "./pages/shipper/page";
import UserProfile from "./pages/profile/page";
import ProductDetail from "./pages/product/[id]/page";
// ⬇️ Import RegionProvider
import { RegionProvider } from "./context/RegionContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RegionProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          {/* <Route path="/product/:id" element={<ProductDetail />} /> */}
          <Route path="/cart/" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/success" element={<Success />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/list-category/:categoryId" element={<ListCategory />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/adminDashboard" element={<AdminDashboard />} />
          <Route path="/help" element={<HelpContact />} />
          <Route path="/address" element={<AddressPage />} />
          <Route path="/shipping" element={<ShippingPage />} />
          <Route path="/shipper" element={<ShipperDashboard />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </BrowserRouter>
    </RegionProvider>
  </React.StrictMode>
);

reportWebVitals();
