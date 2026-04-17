import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? "http://localhost:5000/api/blogs" : "/api/blogs");

const apiConfig = (role) => ({
  headers: role ? { "x-user-role": role } : {},
});

export const fetchBlogs = async (role) => {
  const response = await axios.get(API_URL, apiConfig(role));
  return response.data;
};

export const fetchPublishedBlogs = async (role) => {
  const response = await axios.get(`${API_URL}?published=true`, apiConfig(role));
  return response.data;
};

export const createBlog = async (blogData, role) => {
  const response = await axios.post(API_URL, blogData, apiConfig(role));
  return response.data;
};

export const updateBlog = async (id, blogData, role) => {
  const response = await axios.put(`${API_URL}/${id}`, blogData, apiConfig(role));
  return response.data;
};

export const publishBlog = async (id, published, role) => {
  const response = await axios.patch(`${API_URL}/${id}/publish`, { published }, apiConfig(role));
  return response.data;
};

export const deleteBlog = async (id, role) => {
  await axios.delete(`${API_URL}/${id}`, apiConfig(role));
};
