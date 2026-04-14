function BlogList({ blogs, onEdit, onDelete }) {
  if (!blogs.length) {
    return <div className="alert alert-info">No posts yet. Add a new blog post above.</div>;
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
                </div>
                <div className="btn-group">
                  <button className="btn btn-sm btn-outline-primary" onClick={() => onEdit(blog)}>
                    Edit
                  </button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(blog._id)}>
                    Delete
                  </button>
                </div>
              </div>
              <p className="card-text">{blog.content}</p>
            </div>
            <div className="card-footer text-muted">
              Published {new Date(blog.createdAt).toLocaleString()}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BlogList;
