import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import ProveedorSesion from "./contexts/ProveedorSesion.jsx";
import "./index.css";
import App from "./App.jsx";
import ProveedorNotificaciones from "./contexts/ProveedorNotificaciones.jsx";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<BrowserRouter>
		<ProveedorNotificaciones>
			<ProveedorSesion>
				<App />
			</ProveedorSesion>
		</ProveedorNotificaciones>
		</BrowserRouter>
	</StrictMode>
);
