import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import App from "./App";
import DisplayProductDetails from "./ProductDetails";
import DisplayProducts from "./Products";

const routerInstance = createBrowserRouter([
    {
        path: "/",
        element: <App/>
    },
    {
        path: "/productDetails/:category/:id",
        element: <DisplayProductDetails/>
    }, 
    {
        path: "/products/:category/:brand",
        element: <DisplayProducts/>
    }
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <RouterProvider router={routerInstance}/>
    </StrictMode>
);