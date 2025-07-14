import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { CourseContextProvider } from "./context/CourseContext.jsx";
import { UserContextProvider } from "./context/UserContext.jsx";
import "./index.css";

export const server = "https://e-learning-platform-5i59.onrender.com";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserContextProvider>
      <CourseContextProvider>
        <App />
      </CourseContextProvider>
    </UserContextProvider>
  </StrictMode>
);
