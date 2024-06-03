import BookCard from "@/Book/BookCard";
import { getbooks } from "@/http/api";
import { Book } from "@/type";
import { useQuery } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Allbook = () => {
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
    const handleClick = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        alert("you are not login")

    }

    return (
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between p-4 rounded-lg border border-dashed shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {data?.data.map((book: Book) => (
                    <div key={book._id} className='flex flex-wrap gap-5 border p-5 shadow-md rounded mt-6'>
                        <img
                            src={book.coverImage}
                            alt={book.title}
                            width={0}
                            height={0}
                            sizes='100vw'
                            style={{ width: 'auto', height: '12rem' }}
                        />
                        <div>
                            <h2 className='line-clamp-2 text-xl font-bold text-primary-600 text-balance'>{book.title}</h2>
                            <p className='font-bold text-primary-900 mt-1'>{book.author.name}</p>
                            <Link to={`/books/${book._id}`} className='py-1 px-2 rounded border border-primary-500 mt-4 inline-block font-medium text-sm hover:border-primary-100 hover:bg-primary-100 transition bg-orange-500 hover:bg-orange-600 text-white'>
                                <button onClick={handleClick}>

                                    Read More
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Allbook;
