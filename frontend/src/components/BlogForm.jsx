import { useEffect, useState } from "react";

function BlogForm({ onSave, editingBlog, onCancel }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [publishNow, setPublishNow] = useState(false);

  useEffect(() => {
    if (editingBlog) {
      setTitle(editingBlog.title);
      setAuthor(editingBlog.author);
      setContent(editingBlog.content);
      setPublishNow(false);
    } else {
      setTitle("");
      setAuthor("");
      setContent("");
      setPublishNow(false);
    }
  }, [editingBlog]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title || !author || !content) return;
    const blogData = { title, author, content };
    if (!editingBlog) {
      blogData.published = publishNow;
    }
    onSave(blogData);
    setTitle("");
    setAuthor("");
    setContent("");
    setPublishNow(false);
  };

  const handleCancel = () => {
    setTitle("");
    setAuthor("");
    setContent("");
    setPublishNow(false);
    onCancel();
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h3 className="card-title">{editingBlog ? "Edit Blog Post" : "Create New Blog Post"}</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              className="form-control"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Enter title"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Author</label>
            <input
              className="form-control"
              value={author}
              onChange={(event) => setAuthor(event.target.value)}
              placeholder="Your name"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Content</label>
            <textarea
              className="form-control"
              rows="6"
              value={content}
              onChange={(event) => setContent(event.target.value)}
              placeholder="Write your post content here"
              required
            />
          </div>
          {!editingBlog && (
            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="publishNow"
                checked={publishNow}
                onChange={(event) => setPublishNow(event.target.checked)}
              />
              <label className="form-check-label" htmlFor="publishNow">
                Publish now
              </label>
            </div>
          )}
          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-primary">
              {editingBlog ? "Update Post" : publishNow ? "Create and Publish" : "Save Draft"}
            </button>
            {editingBlog && (
              <button type="button" className="btn btn-outline-secondary" onClick={handleCancel}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default BlogForm;
