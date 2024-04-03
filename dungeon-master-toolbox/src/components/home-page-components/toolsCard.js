import Image from 'next/image';
import Link from 'next/link';

export default function ToolsCard({ image, title, description, toolPage }) {
  return (
    <div 
      className="flex flex-col text-center space-y-1 bg-[#FFEBED] w-84 h-[442px] rounded-md justify-self-center max-w-md hover:cursor-pointer"
    >
    <Link href={toolPage}>
      <div className="items-start py-8 px-2">
        <Image 
          alt="header image for tools card" 
          src={image} 
          width={360}
          height={180}
          className="rounded-md"
        />
        <h2 className="p-1 text-2xl font-bold">{title}</h2>
        <p className="p-1 text-md">{description}</p>
      </div>
      </Link>
    </div>
  );
}