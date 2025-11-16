import { useEffect, useState } from "react";
import { getBooks, deleteBook } from "../service/bookService";
import "../service/config";

function BookList({ onEdit, reload }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadBooks();
  }, [reload]);

  const loadBooks = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getBooks();
      // Ensure books is always an array
      const booksArray = Array.isArray(res.data) ? res.data : [];
      setBooks(booksArray);
    } catch (err) {
      console.error("❌ Error loading books:", err);
      setError("Failed to load books.");
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteBook(id);
      loadBooks();
    } catch (err) {
      console.error("❌ Error deleting book:", err);
      setError("Failed to delete book.");
    }
  };

  if (loading) return <p>Loading books...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!books.length) return <p>No books found.</p>;

  return (
    <div>
      <h2>Books List</h2>
      <ul>
        {books.map((b) => (
          <li key={b.id}>
            {b.title} - {b.author} ({b.category}) [Copies: {b.copies}]
            <button onClick={() => onEdit(b)}>Edit</button>
            <button onClick={() => handleDelete(b.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;
