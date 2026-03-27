import axios from 'axios';
import { API_BASE_URL } from '../constants/config';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

export type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock: number;
  rating: number;
  reviewCount: number;
  createdAt: string;
};

export type OrderItem = {
  productId: string;
  quantity: number;
};

export type CustomerInfo = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
};

export type Order = {
  _id: string;
  orderNumber: string;
  items: Array<{ product: Product; name: string; image: string; price: number; quantity: number }>;
  totalAmount: number;
  customerInfo: CustomerInfo;
  status: string;
  createdAt: string;
};

export const productService = {
  getAll: (params?: { search?: string; category?: string; sort?: string }) =>
    api.get<{ success: boolean; data: Product[] }>('/products', { params }),

  getById: (id: string) =>
    api.get<{ success: boolean; data: Product }>(`/products/${id}`),

  getCategories: () =>
    api.get<{ success: boolean; data: string[] }>('/products/categories'),
};

export const orderService = {
  create: (data: { items: OrderItem[]; customerInfo: CustomerInfo }) =>
    api.post<{ success: boolean; data: Order }>('/orders', data),
};

export default api;
