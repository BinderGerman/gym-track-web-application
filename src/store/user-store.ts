import { create } from "zustand";

// Components and utils
import { IUser } from '@/interfaces/user-interface';
import { getDocument } from "@/services/auth";

interface IUserStore {
  user: IUser | null;
  fetchUser: (uid: string) => Promise<void>;
  setUser: (user: IUser | null) => void;
}

export const useUserStore = create<IUserStore>((set) => ({
  user: null,

  fetchUser: async (uid: string) => {
    try {
      // Verificamos si el usuario ya está en localStorage
      const localUser = localStorage.getItem('user');
      if (localUser) {
        // Si existe en localStorage, lo seteamos en el estado
        set({ user: JSON.parse(localUser) });
      } else {
        // Si no existe, lo traemos de Firestore
        const userData = await getDocument(`users/${uid}`);
        if (userData) {
          set({ user: userData as IUser });
          // Guardamos en localStorage
          localStorage.setItem('user', JSON.stringify(userData));
        }
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  },

  setUser: (user: IUser | null) => {
    // Actualizamos el estado y guardamos en localStorage
    set({ user });
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user'); // Si se elimina el usuario, limpiamos el localStorage
    }
  },
}));

