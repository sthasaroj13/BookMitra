
import { useQuery } from "@tanstack/react-query";
import { getbooks } from "@/http/api";
import { Breadcrumb, BreadcrumbLink, BreadcrumbItem, BreadcrumbSeparator, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHeader, TableRow, TableHead } from "@/components/ui/table";
import { LoaderCircle, MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Book } from "@/type";
import { CirclePlus } from "lucide-react";
import { Link } from "react-router-dom";
import useTokenStore from "@/store";
import DeletePage from "./DeletePage";
import { useState } from "react";

const BooksPage = () => {
    const { userId } = useTokenStore();
    const [successMessage, setSuccessMessage] = useState('');
    const { data, isLoading, isError } = useQuery({
        queryKey: ['getBooks'],
        queryFn: getbooks,
        staleTime: 10000, // cache data for 10 seconds
    });
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
                <div className="text-red-500">Error loading books server is down.</div>
            </div>
        );
    }
    const handleDeleteSuccess = () => {
        setSuccessMessage('Book deleted successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
    };
    const userBooks = data?.data.filter((book) => book.author._id === userId);
    return (
        <>
            <div className="flex justify-between">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/dashboard/home">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Books</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <Link to={'/dashboard/books/create'}>
                    <Button size={"sm"} className="bg-orange-500 hover:bg-orange-600">
                        <CirclePlus size={20} className="mr-2" />Add Book
                    </Button>
                </Link>
            </div>

            <Card className="mt-6">
                <CardHeader>
                    <CardTitle className="text-orange-500 font-bold">Books</CardTitle>
                    <CardDescription>Manage your books here.</CardDescription>
                </CardHeader>
                <CardContent>
                    {
                        successMessage && (
                            <div className="mb-4 p-2 text-green-600 bg-green-100 rounded">{successMessage}</div>
                        )
                    }



                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="hidden w-[100px] sm:table-cell">
                                    <span className="sr-only">Image</span>
                                </TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Genre</TableHead>
                                <TableHead className="hidden md:table-cell">Author name</TableHead>
                                <TableHead className="hidden md:table-cell">Created at</TableHead>
                                <TableHead>
                                    <span className="sr-only">Actions</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {userBooks.map((book: Book) => (
                                <TableRow key={book._id}>
                                    <TableCell className="hidden sm:table-cell">
                                        <img
                                            alt={book.title}
                                            className="aspect-square rounded-md object-cover"
                                            height="64"
                                            src={book.coverImage}
                                            width="64"
                                        />
                                    </TableCell>
                                    <TableCell className="font-medium">{book.title}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">{book.genre}</Badge>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">{book.author.name}</TableCell>
                                    <TableCell className="hidden md:table-cell">{book.createdAt}</TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button aria-haspopup="true" size="icon" variant="ghost">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                    <span className="sr-only">Toggle menu</span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                                <DropdownMenuItem>


                                                    <DeletePage book={book} onDeleteSuccess={handleDeleteSuccess} />
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </>
    );
};

export default BooksPage;
function setSuccessMessage(arg0: string) {
    throw new Error("Function not implemented.");
}

