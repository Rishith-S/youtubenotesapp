import CloseButton from "../assets/CloseButton";

export default function PlaylistSkeleton() {
  return (
    <div className="flex flex-row">
      <div className={"border-gray-500 h-[92vh] bg-gray-900 w-[33%]"}>
        <div className="flex flex-row justify-between border-b-2 border-gray-500">
          <div
            className={`p-4 flex flex-row items-center justify-between w-full bg-gray-900`}
          >
            <p className="text-white text-xl p-4">Playlist Videos</p>
            <div className="cursor-pointer">
              <CloseButton />
            </div>
          </div>
        </div>
        <div className={`flex flex-row gap-4 rounded-lg cursor-pointer `}>
          <div className="flex flex-col items-center w-[100%] bg-gray-900 p-4 min-h-screen">
            <div className="space-y-4 w-[100%] max-w-lg">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="flex p-4 bg-gray-800 rounded-lg w-[100%] animate-pulse"
                >
                  <div className="w-32 h-20 bg-gray-700 rounded-md" />
                  <div className="flex-1 items-start justify-start space-y-2 px-4">
                    <div className="h-4 rounded-sm bg-gray-700 w-3/4" />
                    <div className="h-4 rounded-sm bg-gray-700 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="w-[67%] p-4 gap-4 flex flex-col">
        <div className="w-[100%] h-[70vh] bg-gray-700 justify-center animate-pulse"></div>
        <div className="w-[100%] h-[50vh] border-2 border-gray-700 rounded-md animate-pulse"></div>
      </div>
    </div>
  );
}
