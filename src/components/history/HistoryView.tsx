import { useState, useMemo } from "react";
import { Calendar, Clock, Filter } from "lucide-react";
import {
  type CompletedObjective,
  type Region,
  ObjectiveType,
} from "../../types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { OBJECTIVE_LABELS, getVisibleObjectiveTypes } from "../../utils/constants";
import { ObjectiveIcon } from "../common/ObjectiveIcon";

interface HistoryViewProps {
  completedObjectives: CompletedObjective[];
  regions: Region[];
}

interface HistoryFilters {
  objectiveType: ObjectiveType | "all";
  timeRange: "all" | "today" | "week" | "month";
  region: string;
}

export function HistoryView({
  completedObjectives,
  regions,
}: HistoryViewProps) {
  const [filters, setFilters] = useState<HistoryFilters>({
    objectiveType: "all",
    timeRange: "all",
    region: "all",
  });

  const filteredHistory = useMemo(() => {
    let filtered = [...completedObjectives];

    // Filter by objective type
    if (filters.objectiveType !== "all") {
      filtered = filtered.filter(
        (obj) => obj.objectiveType === filters.objectiveType,
      );
    }

    // Filter by time range
    if (filters.timeRange !== "all") {
      const now = new Date();
      const startOfToday = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
      );
      const startOfWeek = new Date(startOfToday);
      startOfWeek.setDate(startOfToday.getDate() - startOfToday.getDay());
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

      filtered = filtered.filter((obj) => {
        const completedDate = new Date(obj.completedAt);
        switch (filters.timeRange) {
          case "today":
            return completedDate >= startOfToday;
          case "week":
            return completedDate >= startOfWeek;
          case "month":
            return completedDate >= startOfMonth;
          default:
            return true;
        }
      });
    }

    // Filter by region
    if (filters.region !== "all") {
      const regionMaps =
        regions.find((r) => r.id === filters.region)?.maps || [];
      const mapIds = regionMaps.map((m) => m.id);
      filtered = filtered.filter((obj) => mapIds.includes(obj.mapId));
    }

    // Sort by completion time (newest first)
    return filtered.sort((a, b) => b.completedAt - a.completedAt);
  }, [completedObjectives, filters, regions]);

  const getObjectiveName = (objective: CompletedObjective): string => {
    return OBJECTIVE_LABELS[objective.objectiveType];
  };

  const getMapName = (mapId: string): string => {
    for (const region of regions) {
      const map = region.maps.find((m) => m.id === mapId);
      if (map) {
        return map.name;
      }
    }
    return "Unknown Map";
  };

  const getRegionName = (mapId: string): string => {
    for (const region of regions) {
      if (region.maps.some((m) => m.id === mapId)) {
        return region.name;
      }
    }
    return "Unknown Region";
  };

  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else if (diffInHours < 24 * 7) {
      return `${Math.floor(diffInHours / 24)}d ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const updateFilter = <K extends keyof HistoryFilters>(
    key: K,
    value: HistoryFilters[K],
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-4 pb-20">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Objective Type Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Objective Type</label>
              <Select
                value={filters.objectiveType}
                onValueChange={(value: HistoryFilters["objectiveType"]) =>
                  updateFilter("objectiveType", value)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {getVisibleObjectiveTypes().map((type) => (
                    <SelectItem key={type} value={type}>
                      <div className="flex items-center gap-2">
                        <ObjectiveIcon objectiveType={type} size="sm" />
                        {OBJECTIVE_LABELS[type]}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Time Range Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Time Range</label>
              <Select
                value={filters.timeRange}
                onValueChange={(value: string) =>
                  updateFilter(
                    "timeRange",
                    value as HistoryFilters["timeRange"],
                  )
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Region Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Region</label>
              <Select
                value={filters.region}
                onValueChange={(value: string) => updateFilter("region", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  {regions.map((region) => (
                    <SelectItem key={region.id} value={region.id}>
                      {region.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* History List */}
      <div className="space-y-3">
        {filteredHistory.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8 text-muted-foreground">
              <Clock className="h-8 w-8 mx-auto mb-2" />
              <p>No completed objectives found for the selected filters.</p>
            </CardContent>
          </Card>
        ) : (
          filteredHistory.map((objective, index) => (
            <Card
              key={`${objective.mapId}-${objective.objectiveType}-${objective.completedAt}-${index}`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <ObjectiveIcon objectiveType={objective.objectiveType} size="lg" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate">
                      {getObjectiveName(objective)}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {getMapName(objective.mapId)} •{" "}
                      {getRegionName(objective.mapId)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {OBJECTIVE_LABELS[objective.objectiveType]}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {formatDate(objective.completedAt)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {filteredHistory.length > 0 && (
        <div className="text-center text-sm text-muted-foreground">
          Showing {filteredHistory.length} completed objective
          {filteredHistory.length !== 1 ? "s" : ""}
        </div>
      )}
    </div>
  );
}
