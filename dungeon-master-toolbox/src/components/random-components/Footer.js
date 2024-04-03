import Link from 'next/link'

export default function Footer() {
  const todaysYear = new Date().getFullYear();
  return(
    <div className="flex justify-between mt-4 p-2">
      <div className="grid grid-cols-1">
        <Link href={'/contact'}>
          Contact
        </Link>
        <Link href="https://github.com/lsminter/dnd-5e-dm-toolbox/discussions">
          Give Feedback
        </Link>
        <a href="https://github.com/lsminter" className="flex space-x-2 text-sm items-end">
          <p>Site by Lucas Minter</p>
          <p>© {todaysYear}</p>
        </a>
      </div>
      <div className="grid grid-cols-1 items-end">
        <Link href={'/terms-and-conditions'}>
          Terms and Conditions
        </Link>
        <Link href={'/privacy-policy'}>
          Privacy Policy
        </Link>
      </div>
    </div>
  )
}