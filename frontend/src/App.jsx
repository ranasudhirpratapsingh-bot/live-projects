import { useEffect, useState } from "react";
import { createBlog, deleteBlog, fetchBlogs, updateBlog } from "./api/blogs";
import BlogForm from "./components/BlogForm";
import BlogList from "./components/BlogList";

function App() {
  const [blogs, setBlogs] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null);

  const loadBlogs = async () => {
    try {
      const data = await fetchBlogs();
      setBlogs(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const handleSave = async (blogData) => {
    try {
      if (editingBlog) {
        const updated = await updateBlog(editingBlog._id, blogData);
        setBlogs((prev) => prev.map((item) => (item._id === updated._id ? updated : item)));
        setEditingBlog(null);
      } else {
        const created = await createBlog(blogData);
        setBlogs((prev) => [created, ...prev]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    try {
      await deleteBlog(id);
      setBlogs((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    setEditingBlog(null);
  };

  return (
    <div className="container py-4">
      <header className="mb-4 text-center">
        <h1 className="display-5">Global Warming</h1>
        <p className="text-muted">Create, edit, and manage blog posts with React, Node, MongoDB, and Bootstrap.</p>
      </header>

      <BlogForm onSave={handleSave} editingBlog={editingBlog} onCancel={handleCancel} />

      <section className="mt-5">
        <h2 className="mb-3">Latest Posts</h2>
        <BlogList blogs={blogs} onEdit={handleEdit} onDelete={handleDelete} />
      </section>
    </div>
  );
}

export default App;
