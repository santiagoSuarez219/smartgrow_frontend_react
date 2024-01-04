import { useRoutes, BrowserRouter } from "react-router-dom";
import { SmartgrowProvider } from "../../SmartgrowContext";
import Home from "../Home";
import Cultivo from "../Cultivo";
import Hidroponico from "../Hidroponico";
import NotFound from "../NotFound";
import Sistema from "../Sistema";

const AppRoutes = () => {
  let routes = useRoutes([
    {
      path: "/",
      element: <Cultivo />,
    },
    {
      path: "/hidroponico",
      element: <Hidroponico />,
    },
    {
      path: "/*",
      element: <NotFound />,
    },
    {
      path: "/sistema",
      element: <Sistema />,
    },
  ]);
  return routes;
};

const App = () => {
  return (
    <BrowserRouter>
      <SmartgrowProvider>
        <Home />
        <AppRoutes />
      </SmartgrowProvider>
    </BrowserRouter>
  );
};

export default App;
