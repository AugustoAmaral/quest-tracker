import { ArrowLeft, Image as ImageIcon, ExternalLink, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { type GameMap, ObjectiveType } from "../../types";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { ProgressBar } from "../common/ProgressBar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { OBJECTIVE_LABELS } from "../../utils/constants";
import { ChestImageModal } from "./ChestImageModal";
import { ObjectiveIcon } from "../common/ObjectiveIcon";

interface MapDetailProps {
  map: GameMap;
  progress: { completed: number; percentage: number };
  isObjectiveCompleted: (objectiveType: ObjectiveType) => boolean;
  onToggleObjective: (objectiveType: ObjectiveType) => void;
  onBack: () => void;
}

export function MapDetail({
  map,
  progress,
  isObjectiveCompleted,
  onToggleObjective,
  onBack,
}: MapDetailProps) {
  const [showChestModal, setShowChestModal] = useState(false);

  const handleChestImageClick = () => {
    if (map.chestImage) {
      setShowChestModal(true);
    }
  };

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="sticky top-14 z-40 bg-background/95 backdrop-blur border-b p-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className="font-semibold">{map.name}</h2>
              {map.verified && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>This map has been reviewed recently</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              Level {map.levelRange.min}-{map.levelRange.max}
            </p>
          </div>
        </div>

        <div className="mt-3">
          <ProgressBar
            completed={progress.completed}
            total={map.availableObjectiveTypes.length}
          />
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Chest Image Section */}
        {map.chestImage && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5" />
                Chest Locations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div 
                className="bg-muted rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity flex items-center justify-center"
                onClick={handleChestImageClick}
              >
                <img
                  src={map.chestImage}
                  alt={`Chest locations in ${map.name}`}
                  className="max-w-full h-auto"
                />
              </div>
              <p className="text-xs text-muted-foreground text-center mt-2">
                Click to view full size
              </p>
            </CardContent>
          </Card>
        )}

        {/* Objective Types */}
        <div className="space-y-3">
          {map.availableObjectiveTypes.map((objectiveType) => {
            const isCompleted = isObjectiveCompleted(objectiveType);
            return (
              <Card key={objectiveType}>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id={`${map.id}-${objectiveType}`}
                      checked={isCompleted}
                      onCheckedChange={() => onToggleObjective(objectiveType)}
                    />
                    <label
                      htmlFor={`${map.id}-${objectiveType}`}
                      className={`flex-1 cursor-pointer ${
                        isCompleted ? "line-through text-muted-foreground" : ""
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <ObjectiveIcon objectiveType={objectiveType} />
                        <span className="flex-1">
                          {OBJECTIVE_LABELS[objectiveType]}
                        </span>

                        {/* Ícone de link para imagem de baú */}
                        {objectiveType === ObjectiveType.CHEST &&
                          map.chestImage && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-6 w-6 p-0 hover:bg-accent/50"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      handleChestImageClick();
                                    }}
                                  >
                                    <ExternalLink className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>View chest locations</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}

                        {isCompleted && (
                          <span className="text-yellow-500">⭐</span>
                        )}
                      </div>
                    </label>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {map.availableObjectiveTypes.length === 0 && (
          <Card>
            <CardContent className="text-center py-8 text-muted-foreground">
              <p>No objectives available for this map.</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Modal de imagem do baú */}
      {map.chestImage && (
        <ChestImageModal
          isOpen={showChestModal}
          onClose={() => setShowChestModal(false)}
          imageUrl={map.chestImage}
          mapName={map.name}
        />
      )}
    </div>
  );
}
