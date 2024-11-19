import React from "react";
import { IVideos } from "../screens/Homescreen";
import CloseButton from "../assets/CloseButton";

export default function Sidebar({videos,selectedVideo,setSelectedVideo,setShowSidebar}:{videos:IVideos[],selectedVideo:number,setSelectedVideo:React.Dispatch<React.SetStateAction<number>>,setShowSidebar:React.Dispatch<React.SetStateAction<boolean>>}) {
  return (
      <div
        className={'border-gray-500 h-[92vh] bg-gray-900'}
      >
        <div className="flex flex-row justify-between border-b-2 border-gray-500">
          <div
            className={`p-4 flex flex-row items-center justify-between w-full bg-gray-900`}
          >
            <p className="text-white text-xl p-4">Playlist Videos</p>
            <div
              className="cursor-pointer"
              onClick={() => {
                setShowSidebar(false);
              }}
            >
              <CloseButton />
            </div>
          </div>
        </div>
        <div className="p-4 h-[82vh] overflow-auto">
          {videos.length > 0 ? (
            videos.map((video, index) => (
              <IndividualVideoCard
                selectedVideo={selectedVideo}
                index={index}
                setSelectedVideo={setSelectedVideo}
                title={video.title}
                thumbnail={video.thumbnail}
                key={index}
              />
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
  );
}

export function IndividualVideoCard({
    index,
    title,
    selectedVideo,
    setSelectedVideo,
    thumbnail,
  }: {
    index: number;
    title: string;
    selectedVideo:number;
    setSelectedVideo: React.Dispatch<React.SetStateAction<number>>;
    thumbnail: { url: string; height: number; width: number };
  }) {
    return (
      <div
        className={`flex flex-row gap-4 p-4 hover:bg-gray-700 rounded-lg cursor-pointer ${selectedVideo==index ? "bg-gradient-to-r from-pink-950 via-violet-950 to-blue-950":""}`}
        onClick={() => setSelectedVideo(index)}
      >
        <img
          src={thumbnail.url}
          className="rounded-lg object-stretch"
          alt="thumbnail"
        />
        <p className="text-white">
          {`${index + 1}. `}
          {title}
        </p>
      </div>
    );
  }
  