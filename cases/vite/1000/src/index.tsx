import { StrictMode } from "react";
import * as ReactDOMClient from "react-dom/client";

import App from "./App";

const rootElement = document.createElement("div");
document.body.appendChild(rootElement);
const root = ReactDOMClient.createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
