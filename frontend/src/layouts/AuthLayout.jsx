import { Outlet } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";

function MainLayout() {

  return (
    <div className="flex h-screen bg-gray-100">

      <Sidebar />

      <div className="flex flex-col flex-1 p-6 overflow-y-auto">
        <Outlet />
      </div>

    </div>
  );
}

export default MainLayout;