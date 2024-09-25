import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import "modern-normalize/modern-normalize.css";
import App from "./App.jsx";
import "./index.css";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {persistor, store} from "./redux/store.js";
import {PersistGate} from "redux-persist/integration/react";

import "./localization/configI18n.js";
import {Toaster} from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
          <Toaster position="top-center" reverseOrder={false} />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
