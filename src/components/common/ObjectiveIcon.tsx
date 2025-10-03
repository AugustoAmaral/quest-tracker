import { ObjectiveType } from "../../types";
import { OBJECTIVE_ICONS } from "../../utils/constants";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface ObjectiveIconProps {
  objectiveType: ObjectiveType;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function ObjectiveIcon({
  objectiveType,
  size = "md",
  className = "",
}: ObjectiveIconProps) {
  const iconSrc = OBJECTIVE_ICONS[objectiveType];

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  return (
    <ImageWithFallback
      src={iconSrc}
      alt={`${objectiveType} icon`}
      className={`${sizeClasses[size]} ${className}`}
    />
  );
}