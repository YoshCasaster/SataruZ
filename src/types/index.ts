export type Character = {
  id: string;
  name: string;
  image: string;
  gender: string;
  role: string;
  description: string;
  personality: string;
  stats: {
    strength: number;
    defense: number;
    hp: number;
    mana?: number;
    speed?: number;
  };
};

export type UserProfile = {
  id: string;
  user_id: string;
  username: string;
  avatar_url: string;
  character_id: string;
  level: number;
  exp: number;
  zcash: number;
  ztoken: number;
  created_at: string;
};