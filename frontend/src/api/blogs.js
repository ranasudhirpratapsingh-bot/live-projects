import axios from "axios";

const API_URL = "http://localhost:5000/api/blogs";

export const fetchBlogs = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createBlog = async (blogData) => {
  const response = await axios.post(API_URL, blogData);
  return response.data;
};

export const updateBlog = async (id, blogData) => {
  const response = await axios.put(`${API_URL}/${id}`, blogData);
  return response.data;
};

export const deleteBlog = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
