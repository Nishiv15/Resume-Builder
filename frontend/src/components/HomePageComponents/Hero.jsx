const Hero = () => {
  return (
    <div className="relative isolate overflow-hidden bg-gradient-to-br from-indigo-50 to-blue-100 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
            Build Your Professional Resume in Minutes
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-700">
            Leverage AI to craft a standout resume that gets you noticed.
            Simple, fast, and effective.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <button
              className="rounded-md bg-gray-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700"
            >
              Get started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;