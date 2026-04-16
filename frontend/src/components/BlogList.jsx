function BlogList({ blogs, onEdit, onDelete, onTogglePublish, showAdminActions }) {
  if (!blogs.length) {
    return (
      <div className="alert alert-info">
        {showAdminActions ? "No posts yet. Add a new blog post above." : "No published posts yet."}
      </div>
    );
  }

  return (
    <div className="row g-3">
      {blogs.map((blog) => (
        <div className="col-12" key={blog._id}>
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <div>
                  <h5 className="card-title">{blog.title}</h5>
                  <p className="text-muted mb-1">By {blog.author}</p>
                  {showAdminActions && (
                    <span className={`badge ${blog.published ? "bg-success" : "bg-secondary"}`}>
                      {blog.published ? "Published" : "Draft"}
                    </span>
                  )}
                </div>
                {showAdminActions && (
                  <div className="btn-group">
                    <button className="btn btn-sm btn-outline-primary" onClick={() => onEdit(blog)}>
                      Edit
                    </button>
                    <button className="btn btn-sm btn-outline-secondary" onClick={() => onTogglePublish(blog)}>
                      {blog.published ? "Unpublish" : "Publish"}
                    </button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(blog._id)}>
                      Delete
                    </button>
                  </div>
                )}
              </div>
              <p className="card-text">{blog.content}</p>
            </div>
            <div className="card-footer text-muted">
              {blog.published ? "Published" : "Created"} {new Date(blog.createdAt).toLocaleString()}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BlogList;
