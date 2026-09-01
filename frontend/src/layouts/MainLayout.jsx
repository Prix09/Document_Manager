import { Outlet } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";

function MainLayout() {
  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col">

        {/* Header */}
        <header className="bg-white shadow px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-800">
            Enterprise GenAI Knowledge Assistant
          </h1>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>

      </div>
    </div>
  );
}

export default MainLayout;