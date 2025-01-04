import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { characters } from '../data/characters';
import { useAuthStore } from '../store/useAuthStore';
import { useProfileStore } from '../store/useProfileStore';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export default function CharacterSelect() {
  const [selectedCharacter, setSelectedCharacter] = useState(characters[0]);
  const [username, setUsername] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { createProfile, hasProfile } = useProfileStore();

  useEffect(() => {
    const checkExistingProfile = async () => {
      if (!user) {
        navigate('/login');
        return;
      }

      try {
        const profileExists = await hasProfile(user.id);
        if (profileExists) {
          navigate('/profile');
        }
      } catch (error) {
        toast.error('Error checking profile status');
      } finally {
        setIsLoading(false);
      }
    };

    checkExistingProfile();
  }, [user, navigate, hasProfile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      await createProfile(user.id, username, selectedCharacter.id, avatarUrl);
      toast.success('Profile created successfully!');
      navigate('/profile');
    } catch (error: any) {
      if (error.message === 'Profile already exists for this user') {
        navigate('/profile');
      } else {
        toast.error(error.message || 'Error creating profile');
      }
    }
  };

  if (isLoading) {
    return <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      Loading...
    </div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Choose Your Character</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {characters.map((character) => (
          <div
            key={character.id}
            className={`bg-gray-800 rounded-lg p-6 cursor-pointer transition-all ${
              selectedCharacter.id === character.id
                ? 'ring-4 ring-blue-500'
                : 'hover:ring-2 hover:ring-blue-300'
            }`}
            onClick={() => setSelectedCharacter(character)}
          >
            <img
              src={character.image}
              alt={character.name}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <h2 className="text-2xl font-bold mb-2">{character.name}</h2>
            <p className="text-gray-400 mb-2">{character.role}</p>
            <p className="mb-4">{character.description}</p>
            
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
        ))}
      </div>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 space-y-4">
        <Input
          type="text"
          placeholder="Choose your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="bg-gray-800 text-white"
        />
        <Input
          type="url"
          placeholder="Avatar URL (optional)"
          value={avatarUrl}
          onChange={(e) => setAvatarUrl(e.target.value)}
          className="bg-gray-800 text-white"
        />
        <Button type="submit" className="w-full">
          Start Adventure
        </Button>
      </form>
    </div>
  );
}