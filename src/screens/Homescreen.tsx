import axios from "axios";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import RightArrow from "../assets/RightArrow";
import { Editor } from "../components/Editor";
import Sidebar from "../components/Sidebar";

export interface IVideos {
  videoUrl: string;
  title: string;
  thumbnail: { url: string; height: number; width: number };
}

export default function Homescreen() {
  const API_KEY = "AIzaSyBCfR4IRN9x8b1w1Vmjw8F3MYoSn1dwCek";
  const PLAYLIST_ID = "PLVKLWop9wWA85Tlhy2kReDGM_ZJZUdvjq";
  const PLAYLIST_ID2 = "PLVKLWop9wWA_smg-dlYFk79tEvpDkf7OA";
  const [videos, setVideos] = useState<IVideos[]>([]);

  useEffect(() => {
    fetchVideos();
  }, []);
  const [selectedVideo, setSelectedVideo] = useState(0);
  const [showSidebar, setShowSidebar] = useState(true);
  // const [remainingSeconds,setRemainingSeconds] = useState(100);
  const fetchVideos = async () => {
    try {
      const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${PLAYLIST_ID2}&key=${API_KEY}`;
      let nextPageToken = "";
      const response = await axios.get(url);
      const data = response.data;
      if (data && (data as unknown as any).items) {
        let videoList = (data as unknown as any).items.map(
          (item: {
            snippet: {
              title: string;
              resourceId: { videoId: string };
              thumbnails: {
                default: { url: string; height: number; width: number };
              };
            };
          }) => ({
            title: item.snippet.title,
            videoUrl: `https://www.youtube.com/embed/${item.snippet.resourceId.videoId}`,
            thumbnail: item.snippet.thumbnails.default,
          })
        );
        nextPageToken = (data as unknown as any).nextPageToken;
        while (nextPageToken && videoList.length < 200) {
          const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&pageToken=${nextPageToken}&playlistId=${PLAYLIST_ID}&key=${API_KEY}`;
          const response1 = await axios.get(url);
          nextPageToken = (response1.data as unknown as any).nextPageToken;
          let videoList1 = (response1.data as unknown as any).items.map(
            (item: {
              snippet: {
                title: string;
                resourceId: { videoId: string };
                thumbnails: {
                  default: { url: string; height: number; width: number };
                };
              };
            }) => ({
              title: item.snippet.title,
              videoUrl: `https://www.youtube.com/embed/${item.snippet.resourceId.videoId}`,
              thumbnail: item.snippet.thumbnails.default,
            })
          );
          videoList = [...videoList, ...videoList1];
        }
        setVideos(videoList);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-row">
      <div
        className={`transition-all duration-700 ease-in-out transform ${
          showSidebar
            ? "translate-x-0 opacity-100"
            : "-translate-x-full opacity-0"
        } absolute top-20 left-0 bottom-0 w-[33%] flex flex-col`}
      >
        <Sidebar
          selectedVideo={selectedVideo}
          videos={videos}
          setSelectedVideo={setSelectedVideo}
          setShowSidebar={setShowSidebar}
        />
      </div>
      <div
        className={`${
          showSidebar ? "w-[67%] ml-[33%]" : "w-full"
        } transition-all duration-700 ease-in-out h-screen overflow-auto`}
      >
        {selectedVideo >= 0 && selectedVideo < videos.length && (
          <div className={`flex ${showSidebar ? 'flex-col' : 'flex-row h-[90vh]'} transition-all duration-700 ease-in-out`}>
            <div className={`flex ${showSidebar ? 'w-full h-[75vh]' : 'w-[50%]'} transition-all duration-700 ease-in-out p-4`}>
              <ReactPlayer
                url={`${videos[selectedVideo].videoUrl}?autoplay=1`}
                width={"100%"}
                height={"100%"}
                controls={true}
              />
            </div>
            <div className={`${showSidebar ? 'w-[100%]' : 'w-[50%] h-[92vh] p-4'} transition-all duration-700 ease-in-out bg-black`}>
              <div className={`${showSidebar ? 'h-[50vh] mx-4' : 'h-[86vh] overflow-auto'} p-4 border-2 rounded-xl border-blue-400 items-start justify-start`}>
                <Editor />
              </div>
              {showSidebar && <div className="h-24"></div>}
            </div>
          </div>
        )}
      </div>
      {!showSidebar && (
        <div
          className="p-4 border-2 absolute top-44 left-0 bg-gray-800 hover:bg-black cursor-pointer group flex flex-row items-center gap-4"
          onClick={() => setShowSidebar(true)}
        >
          <span className="text-white -ml-[125px] group-hover:ml-0 transition-all ease-in-out duration-700 overflow-hidden">
            Playlist content
          </span>
          <div className="items-center justify-center w-6 h-6">
            <RightArrow />
          </div>
        </div>
      )}
    </div>
  );
}
