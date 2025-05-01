
import { useParams, useNavigate } from 'react-router-dom';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Album } from '@/types/album';
import AlbumView from '@/components/AlbumView';
import { generateId } from '@/lib/utils';


const AlbumPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [albums, setAlbums] = useLocalStorage<Album[]>('photo-albums', []);
  
  const album = albums.find(album => album.id === id);

  if (!album) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Альбом не найден</h1>
          <button 
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
            onClick={() => navigate('/')}
          >
            Вернуться на главную
          </button>
        </div>
      </div>
    );
  }

  const handleAddPhoto = (albumId: string, photoUrl: string) => {
    setAlbums(albums.map(album => {
      if (album.id === albumId) {
        return {
          ...album,
          photos: [
            ...album.photos,
            { id: uuidv4(), url: photoUrl, title: '' }
          ]
        };
      }
      return album;
    }));
  };

  const handleDeletePhoto = (albumId: string, photoId: string) => {
    setAlbums(albums.map(album => {
      if (album.id === albumId) {
        return {
          ...album,
          photos: album.photos.filter(photo => photo.id !== photoId)
        };
      }
      return album;
    }));
  };

  return (
    <AlbumView 
      album={album}
      onAddPhoto={handleAddPhoto}
      onDeletePhoto={handleDeletePhoto}
      onBack={() => navigate('/')}
    />
  );
};

export default AlbumPage;
