import Image from "next/image";

const HomeBanner = () => {
    return ( 
        <div className="relative bg-gradient-to-r from-zinc-950 to-zinc-700 mb-8">
            <div className="mx-auto px-8 py-12 flex flex-col gap-2 md:flex-row items-center justify-evenly">
                <div className="mb-8 md:mb-0 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-slate-200 mb-4">Encor<span className="text-red-500">6</span></h1>
                    <p className="text-lg md:text-xl text-slate-200 mb-6">HANDMADE CLOTHING</p>
                    <p className="text-xl md:text-xl text-slate-200 font-bold">ONLINE STORE</p>
                </div>
                <div className="w-1/3 relative aspect-video">
                    <Image 
                    src='/sample.jpg' 
                    alt='Banner Image'
                    fill
                    className='object-contain'
                    />
                </div>
            </div>
        </div>
     );
}
 
export default HomeBanner;