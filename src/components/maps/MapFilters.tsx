import { Search } from "lucide-react";
import { type FilterOptions, ObjectiveType } from "../../types";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import { OBJECTIVE_LABELS, DEFAULT_LEVEL_RANGE } from "../../utils/constants";

interface MapFiltersProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
}

export function MapFilters({ filters, onFiltersChange }: MapFiltersProps) {
  const updateFilter = (key: keyof FilterOptions, value: any) => {
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
            onValueChange={(value) => updateFilter("completionStatus", value)}
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
            onValueChange={(value) => {
              if (value === "all") {
                updateFilter("levelRange", DEFAULT_LEVEL_RANGE);
              } else {
                const [min, max] = value.split("-").map(Number);
                updateFilter("levelRange", { min, max });
              }
            }}
          >
            <SelectTrigger id="level-filter">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="1-20">1-20</SelectItem>
              <SelectItem value="20-40">20-40</SelectItem>
              <SelectItem value="40-60">40-60</SelectItem>
              <SelectItem value="60-80">60-80</SelectItem>
              <SelectItem value="80-100">80-100</SelectItem>
              <SelectItem value="100-150">100-150</SelectItem>
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
            onValueChange={(value) => updateFilter("objectiveType", value)}
          >
            <SelectTrigger id="type-filter">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {Object.values(ObjectiveType).map((type) => (
                <SelectItem key={type} value={type}>
                  {OBJECTIVE_LABELS[type]}
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
        <div className="pt-2">
          <button
            onClick={() =>
              onFiltersChange({
                search: "",
                completionStatus: "all",
                levelRange: DEFAULT_LEVEL_RANGE,
                objectiveType: "all",
              })
            }
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
