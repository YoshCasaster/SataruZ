import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuthStore } from '../store/useAuthStore';
import { useProfileStore } from '../store/useProfileStore';
import { characters } from '../data/characters';
import { Button } from '../components/ui/Button';

export default function Profile() {
  const navigate = useNavigate();
  const { user, signOut } = useAuthStore();
  const { profile, fetchProfile } = useProfileStore();

  useEffect(() => {
    if (user) {
      fetchProfile(user.id).catch((error) => {
        toast.error(error.message);
      });
    }
  }, [user, fetchProfile]);

  const character = characters.find((c) => c.id === profile?.character_id);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  if (!profile || !character) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <img
              src={profile.avatar_url || '/default-avatar.png'}
              alt="Avatar"
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h1 className="text-2xl font-bold">{profile.username}</h1>
              <p className="text-gray-400">Level {profile.level}</p>
            </div>
          </div>
          <Button onClick={handleSignOut} variant="secondary">
            Sign Out
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Character</h2>
            <div className="flex items-center space-x-4">
              <img
                src={character.image}
                alt={character.name}
                className="w-32 h-32 object-cover rounded-lg"
              />
              <div>
                <h3 className="text-lg font-semibold">{character.name}</h3>
                <p className="text-gray-400">{character.role}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Currency</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <img
                    src="https://i.pinimg.com/736x/25/3c/3b/253c3bbfe33f8780a27f98a73d769a85.jpg"
                    alt="ZCash"
                    className="w-6 h-6"
                  />
                  <span>ZCash</span>
                </div>
                <span>{profile.zcash.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <img
                    src="https://i.pinimg.com/736x/44/f3/00/44f30082ef88e5fe76bdbf131f09525b.jpg"
                    alt="ZToken"
                    className="w-6 h-6"
                  />
                  <span>ZToken</span>
                </div>
                <span>{profile.ztoken.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Stats</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Strength:</span>
                <span>{character.stats.strength}</span>
              </div>
              <div className="flex justify-between">
                <span>Defense:</span>
                <span>{character.stats.defense}</span>
              </div>
              <div className="flex justify-between">
                <span>HP:</span>
                <span>{character.stats.hp}</span>
              </div>
              {character.stats.mana && (
                <div className="flex justify-between">
                  <span>Mana:</span>
                  <span>{character.stats.mana}</span>
                </div>
              )}
              {character.stats.speed && (
                <div className="flex justify-between">
                  <span>Speed:</span>
                  <span>{character.stats.speed}</span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Experience</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Level {profile.level}</span>
                  <span>{profile.exp} XP</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-500 rounded-full h-2"
                    style={{ width: `${(profile.exp % 1000) / 10}%` }}
                  />
                </div>
              </div>
              <p className="text-sm text-gray-400">
                Next level: {1000 - (profile.exp % 1000)} XP needed
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}