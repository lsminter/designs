import Image from 'next/image'


export default function Footer() {
  return(
    <footer className="flex justify-between mt-4">
      <div className="text-sm items-center">
        Lucas Minter ©{new Date().getFullYear()}
      </div>
      <div className="flex">
        <div>
          <a className="hover:text-gray-600" href="https://twitter.com/lucasminter">
            <Image src={'/images/twitterLogo.png'} alt="Twitter Logo" width={30} height={30} />
          </a>
        </div>
        <div>
          <a className="hover:text-gray-600" href="https://github.com/lsminter">
            <Image src={'/images/githubLogo.png'} alt="Github Logo" width={25} height={25} />
          </a>
        </div>
      </div>
    </footer>
  )
}