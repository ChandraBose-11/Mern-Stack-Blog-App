import { createRoot } from "react-dom/client";
import axios from "axios";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "./index.css";
import App from "./App.jsx";
import ThemeProvider from "./Components/ThemeProvider.jsx";
import { store, persistor } from "./Redux/store.js";

// Set axios base URL from environment (Netlify: set VITE_API_URL to your Render service URL)
axios.defaults.baseURL = import.meta.env.VITE_API_URL || "";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </PersistGate>
  </Provider>
);
