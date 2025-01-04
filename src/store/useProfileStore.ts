import { create } from 'zustand';
import { UserProfile } from '../types';
import { supabase } from '../lib/supabase';

interface ProfileState {
  profile: UserProfile | null;
  setProfile: (profile: UserProfile | null) => void;
  hasProfile: (userId: string) => Promise<boolean>;
  createProfile: (userId: string, username: string, characterId: string, avatarUrl: string) => Promise<void>;
  fetchProfile: (userId: string) => Promise<void>;
}

export const useProfileStore = create<ProfileState>((set) => ({
  profile: null,
  setProfile: (profile) => set({ profile }),
  
  hasProfile: async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', userId)
        .single();
      
      if (error && error.code !== 'PGRST116') {
        throw error;
      }
      
      return !!data;
    } catch (error) {
      console.error('Error checking profile:', error);
      return false;
    }
  },

  createProfile: async (userId, username, characterId, avatarUrl) => {
    try {
      // Check if profile already exists
      const exists = await useProfileStore.getState().hasProfile(userId);
      if (exists) {
        throw new Error('Profile already exists for this user');
      }

      const { data, error } = await supabase
        .from('profiles')
        .insert([
          {
            user_id: userId,
            username,
            character_id: characterId,
            avatar_url: avatarUrl,
            level: 1,
            exp: 0,
            zcash: 10000,
            ztoken: 5000,
          },
        ])
        .select()
        .single();

      if (error) throw error;
      set({ profile: data });
    } catch (error) {
      console.error('Error creating profile:', error);
      throw error;
    }
  },

  fetchProfile: async (userId) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) throw error;
      set({ profile: data });
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw error;
    }
  },
}));