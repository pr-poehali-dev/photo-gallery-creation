
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Album } from '@/types/album';
import AlbumList from '@/components/AlbumList';
import { generateId } from '@/lib/utils';


const Index = () => {
  const [albums, setAlbums] = useLocalStorage<Album[]>('photo-albums', []);

  const handleAddAlbum = () => {
    const newAlbum: Album = {
      id: uuidv4(),
      title: 'new',
      photos: []
    };
    setAlbums([...albums, newAlbum]);
  };

  const handleDeleteAlbum = (id: string) => {
    setAlbums(albums.filter(album => album.id !== id));
  };

  const handleDeleteAllAlbums = () => {
    setAlbums([]);
  };

  const handleRenameAlbum = (id: string, newTitle: string) => {
    setAlbums(albums.map(album => 
      album.id === id ? { ...album, title: newTitle } : album
    ));
  };

  return (
    <AlbumList 
      albums={albums}
      onAddAlbum={handleAddAlbum}
      onDeleteAlbum={handleDeleteAlbum}
      onDeleteAllAlbums={handleDeleteAllAlbums}
      onRenameAlbum={handleRenameAlbum}
    />
  );
};

export default Index;
