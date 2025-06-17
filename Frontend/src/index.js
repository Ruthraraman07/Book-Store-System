
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "@blueprintjs/core/lib/css/blueprint.css";
import axios from "axios";

// Set base URL for all axios requests
axios.defaults.baseURL = "http://localhost:4000";

// Correct way to use createRoot in React 18+
const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
