import { Route, Routes, useLocation } from "react-router-dom";
import Homepage from "./screens/Homepage";
import Admin from "./admin/screens/Admin";
import AdminLogin from "./admin/screens/AdminLogin";
import Shoes from "./admin/screens/Shoes";
import { AdminContextProvider } from "./admin/contexts/AdminContext";
import Protected from "./admin/components/Protected";

function App() {
  return (
    <>
      <AdminContextProvider>
        <Routes>
          {/* ROUTES APP */}
          <Route path="/" element={<Homepage />} />

          {/* ROUTES ADMIN */}
          <Route path="login" element={<AdminLogin />} />
          <Route path="admin" element={<Admin />}>
            <Route path="contenu" element={<Shoes />} />
            <Route path="shoes" element={<Shoes />} />
          </Route>
        </Routes>
      </AdminContextProvider>
    </>
  );
}

export default App;
