package com.klef.service;

import com.klef.entity.Book;
import java.util.List;

public interface BookService {
    List<Book> getAllBooks();
    Book getBookById(Long id);
    Book saveBook(Book book);
    Book updateBook(Long id, Book bookDetails);
    void deleteBook(Long id);
}
