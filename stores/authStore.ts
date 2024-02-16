import {create} from 'zustand';
import axios from 'axios';

// Define a type for the store's state
type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  initializeState: () => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  clearTokens: () => void;
  refreshAccessToken: () => Promise<void>;
};


const useAuthStore = create<AuthState>((set, get) => ({
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  initializeState: () => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    if (accessToken && refreshToken) {
      set({ accessToken, refreshToken, isAuthenticated: true });
    }
  },
  setTokens: (accessToken: string, refreshToken: string) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    set({ accessToken, refreshToken, isAuthenticated: true });
  },
  clearTokens: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    set({ accessToken: null, refreshToken: null, isAuthenticated: false });
  },
  refreshAccessToken: async () => {
    try {
      console.log('Refreshing access token...');
      const response = await axios.post(`${process.env.NEXT_PUBLIC_USER_URL}/refresh`, {
        refreshToken: get().refreshToken,
      });
      const { accessToken, refreshToken } = response.data;
      get().setTokens(accessToken, refreshToken);
      console.log('Access token refreshed');
      return accessToken; // Return the new access token
    } catch (error) {
      console.error('Error refreshing access token:', error);
      get().clearTokens();
      throw error; // Ensure to throw the error to be caught in the interceptor
    }
  },
}));

export default useAuthStore;