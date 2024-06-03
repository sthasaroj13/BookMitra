import Allbook from "@/Book/Allbook";
import Banner from "@/Book/Banner";
import { Link } from "react-router-dom";


function Navbar() {
    return (
        <>
            <nav className="border-b">
                <div className=" max-w-7xl mx-auto flex flex-wrap items-center justify-between p-4">
                    <Link to="/">
                        <div className="flex items-center mb-2 sm:mb-0">
                            <img src="/icon.png" alt="logo" width={50} height={50} />
                            <h1 className="text-orange-400 text-xl font-bold uppercase tracking-tight ml-2">Bookमित्र</h1>
                        </div>
                    </Link>
                    <div className="flex items-center gap-2 sm:gap-4">
                        <Link to={'/auth/login'}>
                            <button className="h-10 rounded-md border border-orange-500 px-2 sm:px-4 py-2 text-xs sm:text-sm font-medium text-orange-500 transition-all hover:border-orange-100 hover:bg-primary-100
                         active:border-orange-200 active:bg-orange-200">
                                Sign in
                            </button>
                        </Link>
                        <Link to={'/auth/sign-up'}>
                            <button className="h-10 rounded-md bg-orange-500 px-2 sm:px-4 
                        py-2 text-xs sm:text-sm font-medium text-white transition-all hover:bg-orange-600 active:bg-orange-700">
                                Sign up
                            </button>
                        </Link>

                    </div>
                </div>
            </nav>
            <Banner />
            <Allbook />
        </>
    );
}

export default Navbar;

