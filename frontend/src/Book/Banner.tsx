

function Banner() {
    return (
        <>

            <div className="mx-auto max-w-7xl py-5 ">
                <div className="relative ">
                    <img
                        src={'/paper-bg.jpg'}
                        alt="billboard"
                        className="h-72 w-full sm:w-[50rem] md:w-[75rem] lg:w-[100rem] rounded-lg object-cover"
                        height={0}
                        width={0}
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 h-full w-full rounded-lg bg-gray-950 opacity-30" />
                    <img
                        src={'/book.png'}
                        alt="book"
                        className="absolute bottom-0 right-5  hidden md:block"
                        height={0}
                        width={0}
                        style={{ width: 'auto', height: '15rem' }}
                        sizes="100vw"
                    />
                    <h3 className="absolute left-10 top-1/2 w-full max-w-3xl -translate-y-1/2 text-5xl font-semibold tracking-tight text-white">
                        Connect, Share and Trade Your Favourite Reads..
                    </h3>
                </div>

            </div>

        </>
    );
}

export default Banner;
