"use strict";
exports.__esModule = true;
exports.OrderManager = void 0;
var useAllOrder_1 = require("../../hooks/useAllOrder");
exports.OrderManager = function () {
    var _a = useAllOrder_1.useAllOrder(), orders = _a.orders, loading = _a.loading, error = _a.error;
    if (loading)
        return (React.createElement("div", { className: "text-center py-10 text-gray-500" }, "\u0110ang t\u1EA3i \u0111\u01A1n h\u00E0ng..."));
    if (error)
        return (React.createElement("div", { className: "text-center py-10 text-red-500" }, error));
    return (React.createElement("div", { className: "p-6 min-h-screen" },
        React.createElement("h2", { className: "text-2xl font-bold mb-6" }, "Qu\u1EA3n l\u00FD \u0111\u01A1n h\u00E0ng"),
        orders.length === 0 ? (React.createElement("div", { className: "text-center py-10 text-gray-500" }, "Ch\u01B0a c\u00F3 \u0111\u01A1n h\u00E0ng n\u00E0o")) : (React.createElement("div", { className: "overflow-x-auto" },
            React.createElement("table", { className: "min-w-full bg-white border border-gray-200 shadow rounded-lg" },
                React.createElement("thead", { className: "bg-green-500 text-white" },
                    React.createElement("tr", null,
                        React.createElement("th", { className: "px-4 py-2 text-left  font-medium" }, "ID \u0110\u01A1n"),
                        React.createElement("th", { className: "px-4 py-2 text-left  font-medium" }, "Ng\u01B0\u1EDDi \u0111\u1EB7t"),
                        React.createElement("th", { className: "px-4 py-2 text-left  font-medium" }, "T\u1ED5ng ti\u1EC1n"),
                        React.createElement("th", { className: "px-4 py-2 text-left  font-medium" }, "Tr\u1EA1ng th\u00E1i"),
                        React.createElement("th", { className: "px-4 py-2 text-left  font-medium" }, "Thanh to\u00E1n"),
                        React.createElement("th", { className: "px-4 py-2 text-left  font-medium" }, "Ng\u00E0y t\u1EA1o"),
                        React.createElement("th", { className: "px-4 py-2 text-left  font-medium" }, "S\u1EA3n ph\u1EA9m"))),
                React.createElement("tbody", null, orders.map(function (order) {
                    var _a;
                    return (React.createElement("tr", { key: order._id, className: "border-t hover:bg-gray-50" },
                        React.createElement("td", { className: "px-4 py-2 text-sm text-gray-700" }, order._id),
                        React.createElement("td", { className: "px-4 py-2 text-sm text-gray-700" }, ((_a = order.userId) === null || _a === void 0 ? void 0 : _a.name) || "Unknown"),
                        React.createElement("td", { className: "px-4 py-2 text-sm text-gray-700" },
                            order.total_amount.toLocaleString(),
                            "\u20AB"),
                        React.createElement("td", { className: "px-4 py-2 text-sm font-semibold " + (order.status === "pending"
                                ? "text-yellow-500"
                                : order.status === "processing"
                                    ? "text-blue-500"
                                    : order.status === "delivered"
                                        ? "text-green-500"
                                        : "text-red-500") }, order.status),
                        React.createElement("td", { className: "px-4 py-2 text-sm text-gray-700" }, order.payment_method),
                        React.createElement("td", { className: "px-4 py-2 text-sm text-gray-500" },
                            new Date(order.createdAt).toLocaleDateString(),
                            " ",
                            new Date(order.createdAt).toLocaleTimeString()),
                        React.createElement("td", { className: "px-4 py-2 text-sm text-gray-700" }, order.products.map(function (p) { return (React.createElement("div", { key: p.productId._id, className: "flex items-center mb-1" },
                            React.createElement("img", { src: p.productId.image_url, alt: p.productId.name, className: "w-12 h-12 object-cover rounded mr-2" }),
                            React.createElement("div", null,
                                React.createElement("span", { className: "font-medium" }, p.productId.name),
                                " ",
                                "x ",
                                p.quantity,
                                " - ",
                                p.price.toLocaleString(),
                                "\u20AB"))); }))));
                })))))));
};
