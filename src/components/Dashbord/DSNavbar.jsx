import { Menu } from "lucide-react";

const DSNavbar = () => {
    return (
        <div>
               <nav className="flex h-14 shrink-0 items-center gap-3 border-b-2 border-gray-300 px-5">
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        aria-label="Open sidebar"
                        className="md:hidden"
                    >
                        <Menu size={22} />
                    </button>
                    <h1 className="text-lg font-semibold">Navbar</h1>
                </nav>
        </div>
    );
};

export default DSNavbar;