
import DownloadButton from '../Book/DownloadButton';
import { Book } from '@/type';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


const SingleBook = () => {
    const { bookId } = useParams<{ bookId: string }>();
    console.log("booki id is ", bookId);



    const [book, setBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await fetch(`http://localhost:5523/api/books/${bookId}`);
                if (!response.ok) {
                    throw new Error('Error fetching book. Please try again later.');
                }
                const data = await response.json();
                console.log(data);
                setBook(data);
                setLoading(false);
            } catch (err) {
                setError(err.message || 'Error fetching book. Please try again later.');
                setLoading(false);
            }
        };

        fetchBook();

    }, [bookId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!book) {
        return <div>Book not found</div>;
    }

    return (
        <>
            <div className="mx-auto grid max-w-6xl grid-cols-3 gap-10 px-5 py-10 border">
                <div className="col-span-2 pr-16 text-primary-950">
                    <h2 className="mb-5 text-5xl font-bold leading-[1.1]">{book.title}</h2>
                    <span className="font-semibold">by {book.author.name}</span>
                    <p className="mt-5 text-lg leading-8">{book.description}</p>
                </div>
                <div className="flex justify-end">
                    <img
                        src={book.coverImage}
                        alt={book.title}
                        className="rounded-md border"
                        height={0}
                        width={0}
                        sizes="100vw"
                        style={{ width: 'auto', height: 'auto' }}
                    />

                </div>

                <DownloadButton fileLink={book.file} />
            </div>


        </>
    );
};

export default SingleBook;
