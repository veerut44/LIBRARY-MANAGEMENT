import React, { useState } from 'react';
import { Search, BookOpen, Plus, Trash2, BookOpenCheck, BookX, UserCircle2 } from 'lucide-react';

interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  status: 'available' | 'borrowed';
}

interface User {
  email: string;
  password: string;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState<User>({ email: '', password: '' });
  const [books, setBooks] = useState<Book[]>([
    {
      id: '1',
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      isbn: '978-0743273565',
      status: 'available',
    },
    {
      id: '2',
      title: '1984',
      author: 'George Orwell',
      isbn: '978-0451524935',
      status: 'borrowed',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newBook, setNewBook] = useState<Omit<Book, 'id'>>({
    title: '',
    author: '',
    isbn: '',
    status: 'available',
  });

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser({ email: '', password: '' });
  };

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.isbn.includes(searchTerm)
  );

  const availableBooks = books.filter(book => book.status === 'available').length;
  const borrowedBooks = books.filter(book => book.status === 'borrowed').length;

  const handleAddBook = (e: React.FormEvent) => {
    e.preventDefault();
    const book: Book = {
      ...newBook,
      id: Math.random().toString(36).substr(2, 9),
    };
    setBooks([...books, book]);
    setNewBook({ title: '', author: '', isbn: '', status: 'available' });
    setShowAddForm(false);
  };

  const handleDeleteBook = (id: string) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  const toggleBookStatus = (id: string) => {
    setBooks(
      books.map((book) =>
        book.id === id
          ? {
              ...book,
              status: book.status === 'available' ? 'borrowed' : 'available',
            }
          : book
      )
    );
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
          <div className="text-center">
            <BookOpen className="mx-auto h-12 w-12 text-indigo-600" />
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              {isLogin ? 'Sign in to your account' : 'Create new account'}
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleAuth}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Email address"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Password"
                  value={user.password}
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {isLogin ? 'Sign in' : 'Sign up'}
              </button>
            </div>
          </form>
          <div className="text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-indigo-600 hover:text-indigo-500"
            >
              {isLogin
                ? "Don't have an account? Sign up"
                : 'Already have an account? Sign in'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-indigo-600 text-white p-6">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-8 w-8" />
            <h1 className="text-2xl font-bold">Library Management System</h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-white text-indigo-600 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-50 transition-colors"
            >
              <Plus className="h-5 w-5" />
              Add Book
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 hover:bg-indigo-700 px-4 py-2 rounded-lg transition-colors"
            >
              <UserCircle2 className="h-5 w-5" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-3">
              <BookOpenCheck className="h-8 w-8 text-green-600" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Available Books</h3>
                <p className="text-3xl font-bold text-green-600">{availableBooks}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-3">
              <BookX className="h-8 w-8 text-yellow-600" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Borrowed Books</h3>
                <p className="text-3xl font-bold text-yellow-600">{borrowedBooks}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative mb-8">
          <input
            type="text"
            placeholder="Search books by title, author, or ISBN..."
            className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        </div>

        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <form
              onSubmit={handleAddBook}
              className="bg-white rounded-lg p-6 w-full max-w-md"
            >
              <h2 className="text-xl font-bold mb-4">Add New Book</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Title"
                  className="w-full p-2 border rounded"
                  value={newBook.title}
                  onChange={(e) =>
                    setNewBook({ ...newBook, title: e.target.value })
                  }
                  required
                />
                <input
                  type="text"
                  placeholder="Author"
                  className="w-full p-2 border rounded"
                  value={newBook.author}
                  onChange={(e) =>
                    setNewBook({ ...newBook, author: e.target.value })
                  }
                  required
                />
                <input
                  type="text"
                  placeholder="ISBN"
                  className="w-full p-2 border rounded"
                  value={newBook.isbn}
                  onChange={(e) =>
                    setNewBook({ ...newBook, isbn: e.target.value })
                  }
                  required
                />
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                  >
                    Add Book
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold">{book.title}</h3>
                  <p className="text-gray-600">{book.author}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDeleteBook(book.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-500 mb-4">ISBN: {book.isbn}</p>
              <div className="flex justify-between items-center">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    book.status === 'available'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {book.status}
                </span>
                <button
                  onClick={() => toggleBookStatus(book.id)}
                  className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                >
                  {book.status === 'available' ? 'Mark as Borrowed' : 'Return Book'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;