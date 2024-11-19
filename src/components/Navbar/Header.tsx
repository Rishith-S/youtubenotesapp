import LogoutIcon from '../../assets/LogoutIcon';

export default function Header() {
  return (
    <div className="h-20 flex items-center border-b-2 border-blue-500 p-4 justify-between w-screen">
        <p className="text-2xl font-extrabold bg-gradient-to-b from-blue-400 via-blue-500  to-blue-800 inline-block text-transparent bg-clip-text">YoutubeXnoteS</p>
        <div className='flex flex-row gap-2 items-center  hover:cursor-pointer logout'>
          <LogoutIcon />
          <p className='text-white logoutText'>Logout</p>
        </div>
    </div>
  )
}
