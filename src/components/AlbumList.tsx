
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Album } from '@/types/album';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Card, CardContent, CardFooter } from '@/components/ui/card';


interface AlbumListProps {
  albums: Album[];
  onAddAlbum: () => void;
  onDeleteAlbum: (id: string) => void;
  onDeleteAllAlbums: () => void;
  onRenameAlbum: (id: string, newTitle: string) => void;
}

const AlbumList = ({ 
  albums, 
  onAddAlbum, 
  onDeleteAlbum, 
  onDeleteAllAlbums,
  onRenameAlbum 
}: AlbumListProps) => {
  const navigate = useNavigate();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');

  const handleCardClick = (albumId: string) => {
    navigate(`/album/${albumId}`);
  };

  const handleDoubleClick = (album: Album) => {
    setEditingId(album.id);
    setEditTitle(album.title);
  };

  const handleRenameSubmit = (id: string) => {
    onRenameAlbum(id, editTitle);
    setEditingId(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Фотогалерея</h1>
        <div className="flex gap-2">
          <Button onClick={onAddAlbum} className="flex items-center gap-2">
            <Icon name="Plus" />
            Добавить альбом
          </Button>
          <Button variant="destructive" onClick={onDeleteAllAlbums} className="flex items-center gap-2">
            <Icon name="Trash2" />
            Удалить все альбомы
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {albums.map(album => (
          <Card key={album.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent 
              className="p-4 pt-6" 
              onClick={() => handleCardClick(album.id)}
            >
              <div className="bg-gray-100 aspect-square rounded-md flex items-center justify-center relative">
                {album.photos.length > 0 ? (
                  <img 
                    src={album.photos[0].url} 
                    alt={album.title} 
                    className="object-cover w-full h-full rounded-md"
                  />
                ) : (
                  <Icon name="Camera" size={48} className="text-gray-400" />
                )}
                <button 
                  className="absolute top-2 right-2 p-1 bg-white rounded-full shadow hover:bg-gray-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteAlbum(album.id);
                  }}
                >
                  <Icon name="Trash2" size={16} className="text-red-500" />
                </button>
              </div>
            </CardContent>
            <CardFooter className="px-4 pb-4 pt-0">
              {editingId === album.id ? (
                <div className="w-full">
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    onBlur={() => handleRenameSubmit(album.id)}
                    onKeyDown={(e) => e.key === 'Enter' && handleRenameSubmit(album.id)}
                    className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    autoFocus
                  />
                </div>
              ) : (
                <div 
                  className="w-full text-center font-medium truncate" 
                  onDoubleClick={() => handleDoubleClick(album)}
                >
                  {album.title}
                </div>
              )}
            </CardFooter>
          </Card>
        ))}
        
        <Card className="border-dashed cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-4 flex flex-col items-center justify-center h-full min-h-[200px]" onClick={onAddAlbum}>
            <Icon name="Plus" size={48} className="text-gray-400 mb-2" />
            <p className="text-gray-500 text-sm">Добавить альбом</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AlbumList;
