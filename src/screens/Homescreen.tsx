
export default function Homescreen() {
  const PLAYLIST_ID = "PLVKLWop9wWA85Tlhy2kReDGM_ZJZUdvjq";
  const PLAYLIST_ID2 = "PLVKLWop9wWA_smg-dlYFk79tEvpDkf7OA";
  const playLists = [PLAYLIST_ID, PLAYLIST_ID2];
 
  return (
    <div>
      {
        playLists.map((playlistId) => (
          <a className="text-2xl text-white" href={`/playlist/${playlistId}`}>
            <h1>{playlistId}</h1>
          </a>
        ))
      }
    </div>
  );
}
