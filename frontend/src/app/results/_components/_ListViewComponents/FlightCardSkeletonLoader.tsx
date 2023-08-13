const Skeleton = () => (
  <div className="rounded-lg py-4 flex bg-white shadow-xl">
    <div className="flex-1 space-y-4 px-3">
      {/* Skeleton for Start Journey */}
      <div className="flex justify-evenly items-center space-x-4 sm:space-x-2">
        <div className="animate-pulse">
          <div className="h-4 sm:h-3 bg-gray-300 w-14 sm:w-10 rounded"></div>
          <div className="h-6 sm:h-5 bg-gray-300 w-16 sm:w-12 mt-2 rounded"></div>
        </div>
        <div className="flex flex-col items-center animate-pulse">
          <div className="h-3 bg-gray-300 w-16 rounded"></div>
          <div className="h-10 sm:h-8 bg-gray-300 w-10 mt-2 rounded"></div>
          <div className="h-4 bg-gray-300 w-20 mt-2 rounded"></div>
        </div>
        <div className="animate-pulse">
          <div className="h-4 sm:h-3 bg-gray-300 w-14 sm:w-10 rounded"></div>
          <div className="h-6 sm:h-5 bg-gray-300 w-16 sm:w-12 mt-2 rounded"></div>
        </div>
      </div>

      {/* Optional Skeleton for Return Journey */}
      <div className="flex justify-evenly items-center space-x-4 sm:space-x-2 animate-pulse mt-4">
        <div>
          <div className="h-4 sm:h-3 bg-gray-300 w-14 sm:w-10 rounded"></div>
          <div className="h-6 sm:h-5 bg-gray-300 w-16 sm:w-12 mt-2 rounded"></div>
        </div>
        <div className="flex flex-col items-center">
          <div className="h-3 bg-gray-300 w-16 rounded"></div>
          <div className="h-10 sm:h-8 bg-gray-300 w-10 mt-2 rounded"></div>
          <div className="h-4 bg-gray-300 w-20 mt-2 rounded"></div>
        </div>
        <div>
          <div className="h-4 sm:h-3 bg-gray-300 w-14 sm:w-10 rounded"></div>
          <div className="h-6 sm:h-5 bg-gray-300 w-16 sm:w-12 mt-2 rounded"></div>
        </div>
      </div>
    </div>

    <div className="flex-3 border-l px-8 flex flex-col justify-evenly animate-pulse">
      <div className="h-6 sm:h-5 bg-gray-300 w-16 rounded"></div>
      <div className="h-8 bg-gray-300 w-full mt-4 rounded-full"></div>
    </div>
  </div>
);

export default function FlightCardSkeletonLoader() {
  const skeletons = new Array(6).fill(<Skeleton />);

  return (
    <div className="flex flex-col space-y-6 mt-[84px] mb-24 relative">
      {skeletons.map((_, idx) => (
        <Skeleton key={idx} />
      ))}
    </div>
  );
}
