
import { api } from "./api";

// User type
export interface User {
  id: number;
  name: string;
  email: string;
}

// Registration request type
export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

// Login request type
export interface LoginRequest {
  email: string;
  password: string;
}

// API response types
interface RegisterResponse {
  success: boolean;
  message: string;
  data: User;
}

interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Registration API
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (body) => ({
        url: "/auth/registration",
        method: "POST",
        body,
      }),
    }),

    // Login API
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
} = authApi;
