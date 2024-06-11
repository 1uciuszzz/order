import React from "react";
import { createRoot } from "react-dom/client";
import { defineCustomElements } from "@ionic/pwa-elements/loader";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./theme/global.css";
import App from "./App";
import { Directory, Filesystem } from "@capacitor/filesystem";

const container = document.getElementById("root");
const root = createRoot(container!);
const queryClient = new QueryClient();

const initFolders = async () => {
  await Filesystem.mkdir({
    path: "dishes",
    directory: Directory.Data,
  });
  await Filesystem.mkdir({
    path: "orders",
    directory: Directory.Data,
  });
  await Filesystem.mkdir({
    path: "orderDishes",
    directory: Directory.Data,
  });
  await Filesystem.mkdir({
    path: "covers",
    directory: Directory.Data,
  });
};

initFolders();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);

defineCustomElements(window);
