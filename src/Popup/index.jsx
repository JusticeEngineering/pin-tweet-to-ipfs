import React from "react";
import { createRoot } from "react-dom/client";

import Popup from "./Popup";

const root = createRoot(window.document.getElementById("app-container"));
root.render(<Popup />);
