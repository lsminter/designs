export default function Header() {
  return (
    <header className="flex justify-between">
      <div className="flex">
        <a className="hover:text-blue-600 pt-2" href="/">Lucas Minter</a>
      </div>
      <div className="pt-2">
        <a className="hover:text-blue-600 px-2" href="/posts">Posts</a>
        <a className="hover:text-blue-600 pl-2" href="/">Home</a>
      </div>
    </header>
  )
}