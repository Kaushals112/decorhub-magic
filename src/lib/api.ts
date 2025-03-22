
import axios from "axios";

// Base API URL - Change this to your Django backend URL
const BASE_URL = "http://localhost:8000/api";

// Create axios instance with default config
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth API endpoints
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await api.post("/auth/token/", { username: email, password });
    return response.data;
  },
  register: async (name: string, email: string, password: string) => {
    const [firstName, ...lastNameParts] = name.split(" ");
    const lastName = lastNameParts.join(" ");
    
    const response = await api.post("/auth/register/", {
      username: email,
      email,
      password,
      password2: password,
      first_name: firstName,
      last_name: lastName || " "
    });
    return response.data;
  },
  getProfile: async () => {
    const response = await api.get("/auth/profile/");
    return response.data;
  }
};

// Products API endpoints
export const productsAPI = {
  getAll: async () => {
    const response = await api.get("/products/");
    return response.data;
  },
  getById: async (id: string) => {
    const response = await api.get(`/products/${id}/`);
    return response.data;
  },
  getFeatured: async () => {
    const response = await api.get("/products/featured/");
    return response.data;
  },
  getCategories: async () => {
    const response = await api.get("/products/categories/");
    return response.data;
  },
  create: async (productData: FormData) => {
    const response = await api.post("/products/", productData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
  update: async (id: string, productData: FormData) => {
    const response = await api.put(`/products/${id}/`, productData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
  delete: async (id: string) => {
    await api.delete(`/products/${id}/`);
    return true;
  },
  uploadImages: async (id: string, images: FormData) => {
    const response = await api.post(`/products/${id}/upload_images/`, images, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }
};

// Orders API endpoints
export const ordersAPI = {
  getAll: async () => {
    const response = await api.get("/orders/");
    return response.data;
  },
  getById: async (id: string) => {
    const response = await api.get(`/orders/${id}/`);
    return response.data;
  },
  create: async (orderData: any) => {
    const response = await api.post("/orders/", orderData);
    return response.data;
  },
  updateStatus: async (id: string, status: string) => {
    const response = await api.patch(`/orders/${id}/`, { status });
    return response.data;
  }
};

// Gallery API endpoints
export const galleryAPI = {
  getAll: async () => {
    const response = await api.get("/gallery/");
    return response.data;
  },
  getFeatured: async () => {
    const response = await api.get("/gallery/featured/");
    return response.data;
  },
  getByCategory: async (categoryId: string) => {
    const response = await api.get(`/gallery/by_category/?category_id=${categoryId}`);
    return response.data;
  },
  create: async (imageData: FormData) => {
    const response = await api.post("/gallery/", imageData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
  delete: async (id: string) => {
    await api.delete(`/gallery/${id}/`);
    return true;
  }
};

export default api;
