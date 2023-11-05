import React from 'react'
import ReactDOM from 'react-dom/client'
import "./styles/global.css";
import { AppRouter } from "./routes";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <AppRouter />
)
