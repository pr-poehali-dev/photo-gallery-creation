
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Album, Photo } from '@/types/album';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Card, CardContent } from '@/components/ui/card';

interface AlbumViewProps {
  album: Album;
  onAddPhoto: (albumId: string, photoUrl: string) => void;
  onDeletePhoto: (albumId: string, photoId: string) => void;
  onBack: () => void;
}

const AlbumView = ({ album, onAddPhoto, onDeletePhoto, onBack }: AlbumViewProps) => {
  const [url, setUrl] = useState('');
  const navigate = useNavigate();

  const handleAddPhoto = () => {
    if (url.trim()) {
      onAddPhoto(album.id, url);
      setUrl('');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
            <Icon name="ArrowLeft" />
            Назад
          </Button>
          <h1 className="text-3xl font-bold">{album.title}</h1>
        </div>
        <div className="flex gap-4 items-center">
          <div className="flex w-full max-w-xs items-center gap-2">
            <input
              type="text"
              placeholder="URL изображения"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              onKeyDown={(e) => e.key === 'Enter' && handleAddPhoto()}
            />
            <Button onClick={handleAddPhoto} className="flex items-center gap-2">
              <Icon name="Plus" />
              Добавить фото
            </Button>
          </div>
        </div>
      </div>

      {album.photos.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-gray-500">
          <Icon name="Image" size={64} className="mb-4" />
          <p className="text-lg">Этот альбом пуст. Добавьте фотографии!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {album.photos.map(photo => (
            <Card key={photo.id} className="overflow-hidden">
              <CardContent className="p-0 relative">
                <img 
                  src={photo.url} 
                  alt={photo.title} 
                  className="w-full aspect-square object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x400?text=Ошибка';
                  }}
                />
                <button 
                  className="absolute top-2 right-2 p-1 bg-white rounded-full shadow hover:bg-gray-100"
                  onClick={() => onDeletePhoto(album.id, photo.id)}
                >
                  <Icon name="Trash2" size={16} className="text-red-500" />
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AlbumView;
