const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 text-gray-50 "
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const Navbar = () => {
  return (
    <nav className="bg-gray-700 shadow-md w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side: Brand */}
          <div className="flex-shrink-0 cursor-pointer">
            <span className="text-2xl font-bold text-gray-50">
              ResumeBuilder
            </span>
          </div>
          
          {/* Right side: User Icon */}
          <div className="flex items-center">
            <button
              aria-label="User profile"
              className="p-2 rounded-full text-gray-50 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              <UserIcon />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;