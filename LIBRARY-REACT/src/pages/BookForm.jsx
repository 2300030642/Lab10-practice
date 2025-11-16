import { useState, useEffect } from "react";
import { addBook, updateBook } from "../service/bookService";
import "../service/config";

function BookForm({ book, refresh, clearEdit }) {
  const [form, setForm] = useState({ title: "", author: "", category: "", copies: 1 });

  useEffect(() => {
    if (book) {
      setForm(book); // Pre-fill form for editing
    } else {
      setForm({ title: "", author: "", category: "", copies: 1 });
    }
  }, [book]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (form.id) {
        await updateBook(form.id, form);
        clearEdit();
      } else {
        await addBook(form);
      }
      refresh();
      setForm({ title: "", author: "", category: "", copies: 1 });
    } catch (err) {
      console.error("❌ Error saving book:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required />
      <input name="author" value={form.author} onChange={handleChange} placeholder="Author" required />
      <input name="category" value={form.category} onChange={handleChange} placeholder="Category" required />
      <input type="number" name="copies" value={form.copies} onChange={handleChange} min="1" required />
      <button type="submit">{form.id ? "Update" : "Add"} Book</button>
      {form.id && <button type="button" onClick={clearEdit}>Cancel</button>}
    </form>
  );
}

export default BookForm;
