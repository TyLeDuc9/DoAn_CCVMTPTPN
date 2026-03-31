"use strict";
exports.__esModule = true;
exports.MenuNavbar = void 0;
var react_router_dom_1 = require("react-router-dom");
var fa_1 = require("react-icons/fa");
exports.MenuNavbar = function () {
    var linkClass = function (_a) {
        var isActive = _a.isActive;
        return "flex items-center gap-3 px-4 py-3 rounded-xl transition " + (isActive
            ? "bg-green-500 text-white"
            : "text-gray-700 hover:bg-gray-200");
    };
    return (React.createElement("div", { className: "w-full lg:w-[260px] h-80 bg-white rounded-2xl shadow p-4" },
        React.createElement("h2", { className: "text-lg font-semibold mb-4 text-center" }, "T\u00E0i kho\u1EA3n"),
        React.createElement("nav", { className: "flex flex-col gap-2" },
            React.createElement(react_router_dom_1.NavLink, { to: "/user/profile", className: linkClass },
                React.createElement(fa_1.FaUser, null),
                React.createElement("span", null, "Th\u00F4ng tin c\u00E1 nh\u00E2n")),
            React.createElement(react_router_dom_1.NavLink, { to: "/user/change-password", className: linkClass },
                React.createElement(fa_1.FaLock, null),
                React.createElement("span", null, "\u0110\u1ED5i m\u1EADt kh\u1EA9u")),
            React.createElement(react_router_dom_1.NavLink, { to: "/user/order", className: linkClass },
                React.createElement(fa_1.FaBox, null),
                React.createElement("span", null, "\u0110\u01A1n h\u00E0ng")))));
};
