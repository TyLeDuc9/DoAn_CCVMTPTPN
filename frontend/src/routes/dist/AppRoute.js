"use strict";
exports.__esModule = true;
exports.AppRoute = void 0;
var react_router_dom_1 = require("react-router-dom");
var Layout_1 = require("../layouts/Layout");
var Home_1 = require("../pages/Home/Home");
var Supplier_1 = require("../pages/Supplier/Supplier");
var Register_1 = require("../pages/Form/Register");
var Login_1 = require("../pages/Form/Login");
var AllProduct_1 = require("../pages/AllProduct/AllProduct");
var ProductCategory_1 = require("../pages/ProductCategory/ProductCategory");
var ProductDetail_1 = require("../pages/ProductDetail/ProductDetail");
var SupplierProduct_1 = require("../pages/SupplierProduct/SupplierProduct");
var PrivateUserRoute_1 = require("./PrivateUserRoute");
var User_1 = require("../pages/User/User");
var Profile_1 = require("../components/Profile/Profile");
var ChangePass_1 = require("../components/ChangePass/ChangePass");
var Cart_1 = require("../pages/Cart/Cart");
var About_1 = require("../pages/About/About");
var SearchPage_1 = require("../pages/SearchPage/SearchPage");
var Checkout_1 = require("../pages/Checkout/Checkout");
var CheckoutTwo_1 = require("../pages/Checkout/CheckoutTwo");
var Order_1 = require("../components/Order/Order");
var MyOrder_1 = require("../pages/MyOrder/MyOrder");
var Admin_1 = require("../pages/Admin/Admin");
var PrivateAdmin_1 = require("./PrivateAdmin");
var Dashboard_1 = require("../pages/Admin/Dashboard");
var UserManager_1 = require("../pages/Admin/UserManager");
var Category_1 = require("../pages/Admin/Category");
var SupplierManager_1 = require("../pages/Admin/SupplierManager");
var ProductManager_1 = require("../pages/Admin/ProductManager");
var Address_1 = require("../pages/Admin/Address");
var CartManager_1 = require("../pages/Admin/CartManager");
var AddCategory_1 = require("../pages/Admin/AddCategory");
var EditCategory_1 = require("../pages/Admin/EditCategory");
var AddSupplier_1 = require("../pages/Admin/AddSupplier");
var EditSupplier_1 = require("../pages/Admin/EditSupplier");
var AddProduct_1 = require("../pages/Admin/AddProduct");
var EditProduct_1 = require("../pages/Admin/EditProduct");
var OrderManager_1 = require("../pages/Admin/OrderManager");
exports.AppRoute = function () {
    return (React.createElement(react_router_dom_1.Routes, null,
        React.createElement(react_router_dom_1.Route, { path: "/", element: React.createElement(Layout_1.Layout, null) },
            React.createElement(react_router_dom_1.Route, { index: true, element: React.createElement(Home_1.Home, null) }),
            React.createElement(react_router_dom_1.Route, { path: "/nha-cung-cap", element: React.createElement(Supplier_1.Supplier, null) }),
            React.createElement(react_router_dom_1.Route, { path: "/dang-ky", element: React.createElement(Register_1.Register, null) }),
            React.createElement(react_router_dom_1.Route, { path: "/dang-nhap", element: React.createElement(Login_1.Login, null) }),
            React.createElement(react_router_dom_1.Route, { path: "/tat-ca-san-pham", element: React.createElement(AllProduct_1.AllProduct, null) }),
            React.createElement(react_router_dom_1.Route, { path: "/danh-muc/:categorySlug", element: React.createElement(ProductCategory_1.ProductCategory, null) }),
            React.createElement(react_router_dom_1.Route, { path: "/chi-tiet/:productSlug", element: React.createElement(ProductDetail_1.ProductDetail, null) }),
            React.createElement(react_router_dom_1.Route, { path: "/gio-hang", element: React.createElement(Cart_1.Cart, null) }),
            React.createElement(react_router_dom_1.Route, { path: "/gioi-thieu", element: React.createElement(About_1.About, null) }),
            React.createElement(react_router_dom_1.Route, { path: "/search", element: React.createElement(SearchPage_1.SearchPage, null) }),
            React.createElement(react_router_dom_1.Route, { path: "/checkout", element: React.createElement(Checkout_1.Checkout, null) }),
            React.createElement(react_router_dom_1.Route, { path: "/checkout/two", element: React.createElement(CheckoutTwo_1.CheckoutTwo, null) }),
            React.createElement(react_router_dom_1.Route, { path: "/nha-cung-cap/:supplierSlug", element: React.createElement(SupplierProduct_1.SupplierProduct, null) }),
            React.createElement(react_router_dom_1.Route, { path: "/nha-cung-cap/:supplierSlug", element: React.createElement(SupplierProduct_1.SupplierProduct, null) }),
            React.createElement(react_router_dom_1.Route, { element: React.createElement(PrivateUserRoute_1.PrivateRoute, null) },
                React.createElement(react_router_dom_1.Route, { path: "user", element: React.createElement(User_1.User, null) },
                    React.createElement(react_router_dom_1.Route, { path: "profile", element: React.createElement(Profile_1.Profile, null) }),
                    React.createElement(react_router_dom_1.Route, { path: "change-password", element: React.createElement(ChangePass_1.ChangePass, null) }),
                    React.createElement(react_router_dom_1.Route, { path: "order", element: React.createElement(Order_1.Order, null) }),
                    React.createElement(react_router_dom_1.Route, { path: "order/:id", element: React.createElement(MyOrder_1.MyOrder, null) })))),
        React.createElement(react_router_dom_1.Route, { element: React.createElement(PrivateAdmin_1.PrivateAdmin, null) },
            React.createElement(react_router_dom_1.Route, { path: "/admin", element: React.createElement(Admin_1.Admin, null) },
                React.createElement(react_router_dom_1.Route, { path: "dashboard", element: React.createElement(Dashboard_1.Dashboard, null) }),
                React.createElement(react_router_dom_1.Route, { path: "order", element: React.createElement(OrderManager_1.OrderManager, null) }),
                React.createElement(react_router_dom_1.Route, { path: "profile", element: React.createElement(Profile_1.Profile, null) }),
                React.createElement(react_router_dom_1.Route, { path: "user", element: React.createElement(UserManager_1.UserManager, null) }),
                React.createElement(react_router_dom_1.Route, { path: "category", element: React.createElement(Category_1.Category, null) }),
                React.createElement(react_router_dom_1.Route, { path: "supplier", element: React.createElement(SupplierManager_1.SupplierManager, null) }),
                React.createElement(react_router_dom_1.Route, { path: "product", element: React.createElement(ProductManager_1.ProductManager, null) }),
                React.createElement(react_router_dom_1.Route, { path: "address", element: React.createElement(Address_1.Address, null) }),
                React.createElement(react_router_dom_1.Route, { path: "cart", element: React.createElement(CartManager_1.CartManager, null) }),
                React.createElement(react_router_dom_1.Route, { path: "add/category", element: React.createElement(AddCategory_1.AddCategory, null) }),
                React.createElement(react_router_dom_1.Route, { path: "edit/category/:id", element: React.createElement(EditCategory_1.EditCategory, null) }),
                React.createElement(react_router_dom_1.Route, { path: "add/supplier", element: React.createElement(AddSupplier_1.AddSupplier, null) }),
                React.createElement(react_router_dom_1.Route, { path: "edit/supplier/:id", element: React.createElement(EditSupplier_1.EditSupplier, null) }),
                React.createElement(react_router_dom_1.Route, { path: "add/product", element: React.createElement(AddProduct_1.AddProduct, null) }),
                React.createElement(react_router_dom_1.Route, { path: "edit/product/:id", element: React.createElement(EditProduct_1.EditProduct, null) })))));
};
