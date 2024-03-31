import Image from "next/image";

const HomeBanner = () => {
  return (
    <div className="relative bg-gradient-to-r from-zinc-950 to-zinc-700 mb-8">
      <div className="mx-auto px-8 py-12 flex flex-col gap-2 md:flex-row items-center justify-evenly">
        <div className="mb-8 md:mb-0 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-200 mb-4">
            encor<span className="text-emerald-500">6</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-200 mt-6">
            HANDMADE CLOTHING
          </p>
          <p className="text-xl md:text-xl text-slate-200">ONLINE STORE</p>
        </div>
        <div className="w-full md:w-1/2 relative aspect-square">
          <Image src="/logo.png" alt="Banner Image" fill className="" />
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
