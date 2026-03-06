import { RouterProvider } from "react-router-dom";
import { router } from "./app.routes";
import { AuthProvider } from "./features/auth/auth.context";
import { PlayerProvider } from "./context/PlayerContext";

const App = () => {
  return (
    <AuthProvider>
      <PlayerProvider>
        <RouterProvider router={router} />
      </PlayerProvider>
    </AuthProvider>
  );
};

export default App;
