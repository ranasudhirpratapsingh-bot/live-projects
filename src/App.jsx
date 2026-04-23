import { useEffect, useState } from "react";
import { createBlog, deleteBlog, fetchBlogs, fetchPublishedBlogs, publishBlog, updateBlog } from "./api/blogs";
import BlogForm from "./components/BlogForm";
import BlogList from "./components/BlogList";

const ADMIN_USERNAME = import.meta.env.VITE_ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "admin123";

function App() {
  const [adminAuthenticated, setAdminAuthenticated] = useState(() => localStorage.getItem("adminAuthenticated") === "true");
  const [role, setRole] = useState(() => (localStorage.getItem("adminAuthenticated") === "true" ? localStorage.getItem("userRole") || "admin" : "user"));
  const [isAdminRoute, setIsAdminRoute] = useState(() => window.location.pathname === "/admin");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [publishedBlogs, setPublishedBlogs] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null);

  const loadBlogs = async (currentRole) => {
    try {
      const data = await fetchBlogs(currentRole);
      setBlogs(data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadPublishedBlogs = async (currentRole) => {
    try {
      const data = await fetchPublishedBlogs(currentRole);
      setPublishedBlogs(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    localStorage.setItem("userRole", role);
    setEditingBlog(null);
    if (role === "admin") {
      loadBlogs(role);
    } else {
      setBlogs([]);
    }
    loadPublishedBlogs(role);
  }, [role]);

  useEffect(() => {
    const handlePopState = () => setIsAdminRoute(window.location.pathname === "/admin");
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    if (!adminAuthenticated && role === "admin") {
      setRole("user");
    }
  }, [adminAuthenticated, role]);

  const handleSave = async (blogData) => {
    try {
      if (editingBlog) {
        const updated = await updateBlog(editingBlog._id, {
          ...blogData,
          published: editingBlog.published,
        }, role);
        setBlogs((prev) => prev.map((item) => (item._id === updated._id ? updated : item)));
        setEditingBlog(null);
      } else {
        const created = await createBlog(blogData, role);
        setBlogs((prev) => [created, ...prev]);
      }
      await loadPublishedBlogs(role);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (blog) => {
    if (role !== "admin") return;
    setEditingBlog(blog);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    try {
      await deleteBlog(id, role);
      setBlogs((prev) => prev.filter((item) => item._id !== id));
      await loadPublishedBlogs(role);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTogglePublish = async (blog) => {
    try {
      const updated = await publishBlog(blog._id, !blog.published, role);
      setBlogs((prev) => prev.map((item) => (item._id === updated._id ? updated : item)));
      await loadPublishedBlogs(role);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    setEditingBlog(null);
  };

  const handleAdminLogin = (event) => {
    event.preventDefault();

    if (loginUsername === ADMIN_USERNAME && loginPassword === ADMIN_PASSWORD) {
      setAdminAuthenticated(true);
      localStorage.setItem("adminAuthenticated", "true");
      localStorage.setItem("userRole", "admin");
      setRole("admin");
      setLoginError("");
      setLoginUsername("");
      setLoginPassword("");
      return;
    }

    setLoginError("Invalid credentials. Please try again.");
  };

  const handleLogout = () => {
    setAdminAuthenticated(false);
    setRole("user");
    localStorage.setItem("adminAuthenticated", "false");
    localStorage.setItem("userRole", "user");
    setEditingBlog(null);
    setLoginError("");
    window.history.pushState({}, "", "/");
    setIsAdminRoute(false);
  };

  return (
    <div className="container py-4">
      <header className="mb-4 text-center">
        <h1 className="display-5">Global Warming</h1>
        <p className="text-muted">Save the Nature and Environment</p>
      </header>

      {isAdminRoute ? (
        adminAuthenticated ? (
          <section className="mb-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2 className="mb-0">Admin Panel</h2>
              <button type="button" className="btn btn-outline-secondary btn-sm" onClick={handleLogout}>
                Logout
              </button>
            </div>
            <BlogForm onSave={handleSave} editingBlog={editingBlog} onCancel={handleCancel} />
            <BlogList
              blogs={blogs}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onTogglePublish={handleTogglePublish}
              showAdminActions
            />
          </section>
        ) : (
          <section className="mb-5">
            <div className="card shadow-sm mb-4">
              <div className="card-body">
                <h2 className="h5 mb-3">Admin Authentication</h2>
                <p className="text-muted">Please authenticate to access the admin panel.</p>
                {loginError && <div className="alert alert-danger">{loginError}</div>}
                <form onSubmit={handleAdminLogin}>
                  <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      value={loginUsername}
                      onChange={(event) => setLoginUsername(event.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={loginPassword}
                      onChange={(event) => setLoginPassword(event.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Authenticate
                  </button>
                </form>
              </div>
            </div>
          </section>
        )
      ) : (
        <section className="mt-5">
          <h2 className="mb-3">Published Posts</h2>
          <BlogList blogs={publishedBlogs} />
        </section>
      )}
    </div>
  );
}

export default App;
