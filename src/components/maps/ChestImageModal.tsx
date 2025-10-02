import { Dialog, DialogContent } from '../ui/dialog';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface ChestImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  mapName: string;
}

export function ChestImageModal({ isOpen, onClose, imageUrl, mapName }: ChestImageModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl w-full max-w-[95vw] max-h-[95vh] p-4 overflow-hidden">
        <div className="flex flex-col gap-3">
          <div className="text-center">
            <h3 className="font-medium text-lg">Chest Locations - {mapName}</h3>
            <p className="text-sm text-muted-foreground">Click outside to close</p>
          </div>
          
          <div className="flex justify-center">
            <ImageWithFallback
              src={imageUrl}
              alt={`Chest locations in ${mapName}`}
              className="max-w-full max-h-[75vh] object-contain rounded-lg border border-border"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}