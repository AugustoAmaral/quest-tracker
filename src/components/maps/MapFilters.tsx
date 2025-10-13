import { Search, X } from "lucide-react";
import { type FilterOptions } from "../../types";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import { OBJECTIVE_LABELS, DEFAULT_LEVEL_RANGE, getVisibleObjectiveTypes } from "../../utils/constants";
import { ObjectiveIcon } from "../common/ObjectiveIcon";
import { Button } from "../ui/button";

interface MapFiltersProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
}

export function MapFilters({ filters, onFiltersChange }: MapFiltersProps) {
  const updateFilter = <K extends keyof FilterOptions>(
    key: K,
    value: FilterOptions[K],
  ) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  return (
    <div className="space-y-4 p-4 border-b bg-muted/30">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search regions and maps..."
          value={filters.search}
          onChange={(e) => updateFilter("search", e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Filter Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Completion Status Filter */}
        <div className="space-y-2">
          <Label htmlFor="completion-filter" className="text-sm font-medium">
            Status
          </Label>
          <Select
            value={filters.completionStatus}
            onValueChange={(value: FilterOptions["completionStatus"]) =>
              updateFilter("completionStatus", value)
            }
          >
            <SelectTrigger id="completion-filter">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="complete">Complete</SelectItem>
              <SelectItem value="incomplete">Incomplete</SelectItem>
              <SelectItem value="partial">Partial</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Level Range Filter */}
        <div className="space-y-2">
          <Label htmlFor="level-filter" className="text-sm font-medium">
            Level Range
          </Label>
          <Select
            value={`${filters.levelRange.min}-${filters.levelRange.max}`}
            onValueChange={(value: string) => {
              if (value === "all")
                updateFilter("levelRange", DEFAULT_LEVEL_RANGE);
              else {
                const [min, max] = value.split("-").map(Number);
                updateFilter("levelRange", { min, max });
              }
            }}
          >
            <SelectTrigger id="level-filter">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0-150">All Levels</SelectItem>
              <SelectItem value="0-20">0-20</SelectItem>
              <SelectItem value="20-40">20-40</SelectItem>
              <SelectItem value="40-60">40-60</SelectItem>
              <SelectItem value="60-80">60-80</SelectItem>
              <SelectItem value="80-90">80-90</SelectItem>
              <SelectItem value="90-100">90-100</SelectItem>
              <SelectItem value="100-110">100-110</SelectItem>
              <SelectItem value="110-120">110-120</SelectItem>
              <SelectItem value="120-130">120-130</SelectItem>
              <SelectItem value="130-140">130-140</SelectItem>
              <SelectItem value="140-150">140-150</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Objective Type Filter */}
        <div className="space-y-2">
          <Label htmlFor="type-filter" className="text-sm font-medium">
            Objective Type
          </Label>
          <Select
            value={filters.objectiveType}
            onValueChange={(value: FilterOptions["objectiveType"]) =>
              updateFilter("objectiveType", value)
            }
          >
            <SelectTrigger id="type-filter">
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
      </div>

      {/* Clear Filters */}
      {(filters.search ||
        filters.completionStatus !== "all" ||
        filters.levelRange.min !== DEFAULT_LEVEL_RANGE.min ||
        filters.levelRange.max !== DEFAULT_LEVEL_RANGE.max ||
        filters.objectiveType !== "all") && (
        <div className="pt-2 flex justify-between items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              onFiltersChange({
                search: "",
                completionStatus: "all",
                levelRange: DEFAULT_LEVEL_RANGE,
                objectiveType: "all",
              })
            }
            className="text-sm"
          >
            <X className="h-4 w-4 mr-2" />
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  );
}
