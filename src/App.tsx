import { BrowserRouter } from "react-router-dom";
import RenderRoutes from "router/Router";

function App() {
  return (
    <>
      <BrowserRouter>
        <RenderRoutes></RenderRoutes>
      </BrowserRouter>
    </>
  );
}

export default App;
