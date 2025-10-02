import { Progress } from "../ui/progress";
import { COMPLETION_COLORS } from "../../utils/constants";

interface ProgressBarProps {
  completed: number;
  total: number;
  showText?: boolean;
  className?: string;
}

export function ProgressBar({
  completed,
  total,
  showText = true,
  className = "",
}: ProgressBarProps) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  const getColor = () => {
    if (percentage === 0) return COMPLETION_COLORS.EMPTY;
    if (percentage === 100) return COMPLETION_COLORS.COMPLETE;
    return COMPLETION_COLORS.PARTIAL;
  };

  const getIcon = () => {
    if (percentage === 100) return "⭐";
    return "";
  };

  return (
    <div className={`space-y-1 ${className}`}>
      <Progress
        value={percentage}
        className="h-2"
        style={{
          ["--progress-background"]: getColor(),
        }}
      />
      {showText && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            {completed}/{total} completed
          </span>
          <div className="flex items-center gap-1">
            <span style={{ color: getColor() }}>{percentage}%</span>
            {getIcon() && <span>{getIcon()}</span>}
          </div>
        </div>
      )}
    </div>
  );
}
