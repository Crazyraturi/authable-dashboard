
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Make sure we have a root element to mount to
const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

// Create a root and render the app
const root = createRoot(rootElement);
root.render(<App />);
