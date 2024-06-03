import { Button } from "@/components/ui/button";
import { deleteBook } from "@/http/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Heading1 } from "lucide-react";

interface DeletePageProps {
  book: Book;
  onDeleteSuccess: () => void; // Callback function to notify success
}
const DeletePage: React.FC<DeletePageProps> = ({ book, onDeleteSuccess }) => {
  const queryClient = useQueryClient();

  // Set up the mutation
  const mutation = useMutation({
    mutationFn: deleteBook,
    onSuccess: () => {
      // Invalidate and refetch the getBooks query to update the list
      queryClient.invalidateQueries('getBooks');
      onDeleteSuccess();


    },
  });

  return (
    <>
      <button onClick={() => mutation.mutate(book._id)}>
        Delete
      </button>
    </>
  )
}

export default DeletePage
function setSuccessMessage(p0: string) {
  throw new Error("Function not implemented.");
}

