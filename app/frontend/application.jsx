import ReactDOM from "react-dom/client";
import Root from "./App.jsx";

const root = document.getElementById("root");
if (root) {
  ReactDOM.createRoot(root).render(<Root />);
}
