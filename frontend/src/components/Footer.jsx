const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-700 text-gray-300 w-full shadow-inner mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <p className="text-center text-sm">
          &copy; {currentYear} ResumeBuilder. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;