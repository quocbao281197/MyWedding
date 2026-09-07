import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "@ant-design/v5-patch-for-react-19";
import sal from "sal.js";
import "sal.js/dist/sal.css";

const root = createRoot(document.getElementById("root")!);
root.render(<App />);

setTimeout(() => {
  try {
    sal();
  } catch {}
}, 0);
