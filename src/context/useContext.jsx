import { createContext, useContext } from "react";

const ModalContext = createContext();

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }
  return context;
};
// <ModalProvider>
//   <SettingsProfile />
// </ModalProvider>;
// import { ModalProvider } from "./context/ModalContext";
// import SettingsProfile from "./components/SettingsProfile";
