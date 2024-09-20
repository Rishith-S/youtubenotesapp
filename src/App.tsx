import { useEffect, useState } from 'react';
import '../src/index.css'

const API_KEY = 'AIzaSyAAaM1000dlsKBRqQc63A7yfmCbmsSG8VQ';
const PLAYLIST_ID = 'PLIG26yC5t1Du1RoeDA9sErW5BBp6AFp8G';

const Playlist = () => {
  const [videos, setVideos] = useState<{videoUrl:string,title:string}[]>([]);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${PLAYLIST_ID}&key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.items) {
      const videoList = data.items.map((item: { snippet: { title: any; resourceId: { videoId: any; }; }; }) => ({
        title: item.snippet.title,
        videoUrl: `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`,
      }));
      setVideos(videoList);
    }
  };

  return (
    <div>
      <h2 className='text-blue-700 text-xl'>Playlist Videos</h2>
      <ul>
        {/* {videos.map((video, index) => (
          <li key={index}>
            <a href={video.videoUrl} target="_blank" rel="noopener noreferrer">
              {video.title}
            </a>
          </li>
        ))} */}
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/NNgYId7b4j0"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </ul>
    </div>
  );
};

export default Playlist;
