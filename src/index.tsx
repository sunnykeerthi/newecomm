import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "mapbox-gl/dist/mapbox-gl.css";
import { ProductsProvider } from "./context/ProductsContext";
import "@yext/answers-react-components/bundle.css";
import "./index.css";

// ReactDOM.render(
//   <React.StrictMode>
//     <ProductsProvider>
//       <App />
//     </ProductsProvider>
//   </React.StrictMode>,
//   document.getElementById("root")
// );

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <ProductsProvider>
      <App />
    </ProductsProvider>
  </React.StrictMode>
);
