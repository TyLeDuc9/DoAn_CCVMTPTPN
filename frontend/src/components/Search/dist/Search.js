"use strict";
exports.__esModule = true;
exports.Search = void 0;
var fa_1 = require("react-icons/fa");
var react_1 = require("react");
var useSearchProduct_1 = require("../../hooks/useSearchProduct");
var react_router_dom_1 = require("react-router-dom");
exports.Search = function () {
    var _a = react_1.useState(""), query = _a[0], setQuery = _a[1];
    var _b = useSearchProduct_1.useSearchProduct(), products = _b.products, loading = _b.loading, error = _b.error, searchProduct = _b.searchProduct;
    var navigate = react_router_dom_1.useNavigate();
    react_1.useEffect(function () {
        if (!query.trim())
            return;
        searchProduct(query); // ✅ cập nhật products bên trong hook
    }, [query]);
    var handleSubmit = function (e) {
        e.preventDefault();
        if (!query.trim())
            return;
        // Khi nhấn Enter, chuyển sang trang SearchPage
        navigate("/search?name=" + encodeURIComponent(query.trim()));
    };
    // const handleSubmit = (e: React.FormEvent) => {
    //   e.preventDefault();
    //   searchProduct(query);
    // };
    return (React.createElement("div", { className: "relative w-80" },
        React.createElement("form", { onSubmit: handleSubmit, className: "flex items-center border rounded w-full overflow-hidden bg-white text-black" },
            React.createElement("input", { type: "text", value: query, onChange: function (e) { return setQuery(e.target.value); }, placeholder: "T\u00ECm s\u1EA3n ph\u1EA9m...", className: "px-3 py-1 outline-none w-full" }),
            React.createElement("button", { type: "submit", className: "px-3" },
                React.createElement(fa_1.FaSearch, null))),
        loading && (React.createElement("div", { className: "absolute bg-white w-full mt-1 p-2 shadow" }, "\u0110ang t\u1EA3i...")),
        error && (React.createElement("div", { className: "absolute bg-white w-full mt-1 p-2 shadow text-red-500" }, error)),
        products.length > 0 && (React.createElement("ul", { className: "absolute bg-white w-full mt-1 p-2 shadow max-h-64 overflow-y-auto z-50" }, products.map(function (p) { return (React.createElement("li", { key: p._id, onClick: function () { return navigate("chi-tiet/" + p.slug); }, className: "flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer" },
            p.image_url ? (React.createElement("img", { src: p.image_url, alt: p.name, className: "w-12 h-12 object-cover rounded" })) : (React.createElement("div", { className: "w-12 h-12 bg-gray-200 flex items-center justify-center rounded text-gray-500" }, "No Image")),
            React.createElement("div", { className: "flex flex-col" },
                React.createElement("span", { className: "text-green-700 font-medium line-clamp-1" }, p.name),
                React.createElement("span", { className: "text-red-500 font-medium" },
                    p.price.toLocaleString(),
                    "\u20AB")))); })))));
};
