
import BookCard from "@/Book/BookCard";

import { getbooks } from "@/http/api";
import { Book } from "@/type";
import { useQuery } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";


const HomePage = () => {


    const { data, isLoading, isError } = useQuery({
        queryKey: ['books'],
        queryFn: getbooks,
        staleTime: 10000,

    });
    console.log(data);


    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin"><LoaderCircle size={30} /></div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-red-500">Error loading books, server is down.</div>
            </div>
        );
    }

    return (
        <>
            <div className="flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl">Welcome Home</h1>
            </div>
            <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between p-4 rounded-lg border border-dashed shadow-sm">
                <div className="mx-auto">
                    <div className="relative">
                        <img
                            src={'/paper-bg.jpg'}
                            alt="billboard"
                            className="h-72 w-full sm:w-[50rem] md:w-[75rem] lg:w-[100rem] rounded-lg object-cover"
                            sizes="100vw"
                        />
                        <div className="absolute inset-0 h-full w-full rounded-lg bg-gray-950 opacity-30" />
                        <img
                            src={'/book1.png'}
                            alt="book"
                            className="absolute bottom-0 right-5 hidden md:block"
                            style={{ width: 'auto', height: '15rem' }}
                        />
                        <h3 className="absolute left-5 sm:left-10 md:left-16 top-1/2 w-full max-w-xs sm:max-w-md md:max-w-xl lg:max-w-3xl transform -translate-y-1/2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-white">
                            Welcome to <span className="text-orange-500 font-bold">Bookमित्र</span> where you Connect, Share and Trade Your Favourite Reads..
                        </h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {data?.data.map((book: Book) => (
                            <BookCard key={book._id} book={book} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomePage;
