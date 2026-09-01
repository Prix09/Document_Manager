import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 bg-gray-900 text-white p-6 flex flex-col">

      <h2 className="text-xl font-bold mb-8">
        Assistant
      </h2>

      <nav className="flex flex-col gap-4">

        <Link
          to="/chat"
          className="hover:bg-gray-800 p-2 rounded transition"
        >
          Chat
        </Link>

        <Link
          to="/documents"
          className="hover:bg-gray-800 p-2 rounded transition"
        >
          Uploaded Files
        </Link>

      </nav>

    </div>
  );
}

export default Sidebar;