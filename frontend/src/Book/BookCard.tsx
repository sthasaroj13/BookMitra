import { Link } from "react-router-dom";


const BookCard = ({ book }) => {
    return (
        <div className=' flex flex-wrap gap-5  border p-5 shadow-md rounded mt-6'>
            <img
                src={book.coverImage}
                alt={book.title}
                width={0}
                height={0}
                sizes='100vw'
                style={{ width: 'auto', height: '12rem' }}


            />
            <div>
                <h2 className=' line-clamp-2 text-xl font-bold text-primary-600 text-balance'>{book.title}</h2>
                <p className=' font-bold text-primary-900 mt-1'>{book.author.name}</p>
                <Link to={`/dashboard/books/${book._id}`} className=' py-1 px-2 rounded border border-primary-500  mt-4 inline-block
                     font-medium text-sm hover:border-primary-100 hover:bg-primary-100 transation bg-orange-500 hover:bg-orange-600 text-white
                    '>Read More</Link>

            </div>
        </div>
    );
};
export default BookCard