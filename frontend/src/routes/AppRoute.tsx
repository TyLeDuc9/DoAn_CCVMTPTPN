import { Routes, Route } from "react-router-dom";
import { Layout } from "../layouts/Layout";
import { Home } from "../pages/Home/Home";
import { Supplier } from "../pages/Supplier/Supplier";
import { Register } from "../pages/Form/Register";
import { Login } from "../pages/Form/Login";
import { AllProduct } from "../pages/AllProduct/AllProduct";
import { ProductCategory } from "../pages/ProductCategory/ProductCategory";
import { ProductDetail } from "../pages/ProductDetail/ProductDetail";
import { SupplierProduct } from "../pages/SupplierProduct/SupplierProduct";
import { PrivateRoute } from "./PrivateUserRoute";
import { User } from "../pages/User/User";
import { Profile } from "../components/Profile/Profile";
import { ChangePass } from "../components/ChangePass/ChangePass";
import { Cart } from "../pages/Cart/Cart";
import { About } from "../pages/About/About";
import { SearchPage } from "../pages/SearchPage/SearchPage";
import { Checkout } from "../pages/Checkout/Checkout";
import { CheckoutTwo } from "../pages/Checkout/CheckoutTwo";
import { Order } from "../components/Order/Order";
import { MyOrder } from "../pages/MyOrder/MyOrder";
import { Admin } from "../pages/Admin/Admin";
import { PrivateAdmin } from "./PrivateAdmin";
import { Dashboard } from "../pages/Admin/Dashboard";
import { UserManager } from "../pages/Admin/UserManager";
import { Category } from "../pages/Admin/Category";
import { SupplierManager } from "../pages/Admin/SupplierManager";
import { ProductManager } from "../pages/Admin/ProductManager";
import { Address } from "../pages/Admin/Address";
import { CartManager } from "../pages/Admin/CartManager";
import { AddCategory } from "../pages/Admin/AddCategory";
import { EditCategory } from "../pages/Admin/EditCategory";
import { AddSupplier } from "../pages/Admin/AddSupplier";
import { EditSupplier } from "../pages/Admin/EditSupplier";
import { AddProduct } from "../pages/Admin/AddProduct";
import { EditProduct } from "../pages/Admin/EditProduct";
import { OrderManager } from "../pages/Admin/OrderManager";
import { EditOrder } from "../pages/Admin/EditOrder";

export const AppRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/nha-cung-cap" element={<Supplier />} />
        <Route path="/dang-ky" element={<Register />} />
        <Route path="/dang-nhap" element={<Login />} />
        <Route path="/tat-ca-san-pham" element={<AllProduct />} />
        <Route path="/danh-muc/:categorySlug" element={<ProductCategory />} />
        <Route path="/chi-tiet/:productSlug" element={<ProductDetail />} />
        <Route path="/gio-hang" element={<Cart />} />
        <Route path="/gioi-thieu" element={<About />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/checkout/two" element={<CheckoutTwo />} />
        <Route
          path="/nha-cung-cap/:supplierSlug"
          element={<SupplierProduct />}
        />
        <Route
          path="/nha-cung-cap/:supplierSlug"
          element={<SupplierProduct />}
        />

        <Route element={<PrivateRoute />}>
          <Route path="user" element={<User />}>
            <Route path="profile" element={<Profile />} />
            <Route path="change-password" element={<ChangePass />} />
            <Route path="order" element={<Order />} />
            <Route path="order/:id" element={<MyOrder />} />
          </Route>
        </Route>
      </Route>
      <Route element={<PrivateAdmin />}>
        <Route path="/admin" element={<Admin />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="order" element={<OrderManager />} />
          <Route path="profile" element={<Profile />} />
          <Route path="user" element={<UserManager />} />
          <Route path="category" element={<Category />} />
          <Route path="supplier" element={<SupplierManager />} />
          <Route path="product" element={<ProductManager />} />
          <Route path="address" element={<Address />} />
          <Route path="cart" element={<CartManager />} />
          <Route path="add/category" element={<AddCategory />} />
          <Route path="edit/category/:id" element={<EditCategory/>} />
          <Route path="add/supplier" element={<AddSupplier/>} />
          <Route path="edit/supplier/:id" element={<EditSupplier/>} />
          <Route path="add/product" element={<AddProduct/>} />
          <Route path="edit/product/:id" element={<EditProduct/>} />
          <Route path="edit/order/:id" element={<EditOrder/>} />
        </Route>
      </Route>
    </Routes>
  );
};
