import { useState, useMemo } from "react";
import {
  Download,
  Upload,
  Trash2,
  User,
  Database,
  AlertTriangle,
  ExternalLink,
  Heart,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { toast } from "sonner";
import type { Profile } from "../../types";

interface SettingsViewProps {
  profiles: Profile[];
  activeProfile: Profile | null;
  onExportData: () => string;
  onImportData: (jsonData: string) => { success: boolean; error?: string };
  onClearAllData: () => void;
}

export function SettingsView({
  profiles,
  activeProfile,
  onExportData,
  onImportData,
  onClearAllData,
}: SettingsViewProps) {
  const [showClearDialog, setShowClearDialog] = useState(false);
  const [isImporting, setIsImporting] = useState(false);

  const handleExport = () => {
    try {
      const data = onExportData();
      const blob = new Blob([data], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `ragnarok-progress-${
        new Date().toISOString().split("T")[0]
      }.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success("Data exported successfully");
    } catch {
      toast.error("Failed to export data");
    }
  };

  const handleImport = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      setIsImporting(true);
      try {
        const text = await file.text();
        const result = onImportData(text);

        if (result.success) {
          toast.success("Data imported successfully");
        } else {
          toast.error(result.error || "Failed to import data");
        }
      } catch {
        toast.error("Failed to read file");
      } finally {
        setIsImporting(false);
      }
    };
    input.click();
  };

  const handleClearData = () => {
    onClearAllData();
    setShowClearDialog(false);
    toast.success("All data cleared");
  };

  const totalObjectives = useMemo(() => {
    return profiles.reduce((total, profile) => {
      return total + profile.completedObjectives.length;
    }, 0);
  }, [profiles]);

  const storageInfo = useMemo(() => {
    try {
      let totalSize = 0;
      for (const key in localStorage) {
        if (Object.prototype.hasOwnProperty.call(localStorage, key)) {
          totalSize += localStorage[key].length + key.length;
        }
      }

      const usedMB = (totalSize / 1024 / 1024).toFixed(2);
      const maxMB = 5; // Approximate localStorage limit
      const percentage = Math.min(
        (totalSize / (maxMB * 1024 * 1024)) * 100,
        100,
      );

      return { used: `${usedMB} MB`, percentage: Math.round(percentage) };
    } catch {
      return { used: "Unknown", percentage: 0 };
    }
  }, []);

  return (
    <div className="space-y-6 pb-20">
      {/* Profile Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Profile Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {activeProfile ? (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Active Profile:</span>
                <Badge variant="default">{activeProfile.name}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Created:</span>
                <span className="text-sm text-muted-foreground">
                  {new Date(activeProfile.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Total Completed:</span>
                <Badge variant="secondary">
                  {activeProfile.completedObjectives.length}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Last Activity:</span>
                <span className="text-sm text-muted-foreground">
                  {new Date(
                    activeProfile.statistics.lastActivity,
                  ).toLocaleDateString()}
                </span>
              </div>
            </div>
          ) : (
            <div className="text-center py-4 text-muted-foreground">
              <User className="h-8 w-8 mx-auto mb-2" />
              <p>No active profile selected</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Data Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Important Notice */}
          <div className="bg-muted/50 border border-border rounded-lg p-3">
            <div className="flex gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium">Important: Data Storage</p>
                <p className="text-xs text-muted-foreground">
                  Your data is stored locally in your browser. If you clear
                  browser data, switch browsers, or use a different device, your
                  progress may be lost. I recommend exporting your data
                  regularly as a backup.
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Export Data */}
          <div className="space-y-2">
            <h4 className="font-medium">Export Data</h4>
            <p className="text-sm text-muted-foreground">
              Download all your progress data as a JSON file for backup or
              transfer.
            </p>
            <Button onClick={handleExport} className="w-full" variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export All Data
            </Button>
          </div>

          <Separator />

          {/* Import Data */}
          <div className="space-y-2">
            <h4 className="font-medium">Import Data</h4>
            <p className="text-sm text-muted-foreground">
              Restore your progress from a previously exported JSON file. This
              will replace your current data.
            </p>
            <Button
              onClick={handleImport}
              className="w-full"
              variant="outline"
              disabled={isImporting}
            >
              <Upload className="h-4 w-4 mr-2" />
              {isImporting ? "Importing..." : "Import Data"}
            </Button>
          </div>

          <Separator />

          {/* Clear All Data */}
          <div className="space-y-2">
            <h4 className="font-medium text-destructive">Clear All Data</h4>
            <p className="text-sm text-muted-foreground">
              Permanently delete all profiles and progress data. This action
              cannot be undone.
            </p>
            <Button
              onClick={() => setShowClearDialog(true)}
              className="w-full"
              variant="destructive"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear All Data
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Storage Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Storage Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm font-medium">Total Profiles</p>
              <p className="text-2xl font-bold">{profiles.length}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Total Objectives</p>
              <p className="text-2xl font-bold">{totalObjectives}</p>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Storage Used:</span>
              <span className="text-sm">{storageInfo.used}</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${storageInfo.percentage}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              {storageInfo.percentage}% of estimated browser storage limit
            </p>
          </div>
        </CardContent>
      </Card>

      {/* App Information */}
      <Card>
        <CardHeader>
          <CardTitle>App Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Version:</span>
            <Badge variant="outline">1.0.0</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Data Format:</span>
            <Badge variant="outline">v1.0</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Author:</span>
            <Badge variant="outline">
              <a
                href="https://github.com/AugustoAmaral"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline flex items-center gap-1"
              >
                Augusto Amaral
                <ExternalLink className="h-3 w-3" />
              </a>
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Credits & Contributions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5" />
            Credits & Contributions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {/* Disclaimer */}
            <div className="bg-muted/50 border border-border rounded-lg p-3">
              <div className="space-y-2">
                <p className="text-sm font-medium">About the Data</p>
                <p className="text-xs text-muted-foreground">
                  All game information in this tracker is manually curated and
                  is <strong>unofficial</strong>. If you'd like to help improve
                  the data, report issues, or contribute in any way, feel free
                  to reach out! Contributors will be credited in this section.
                </p>
                <a
                  href="https://discord.com/users/108515087936950272"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-1.5 text-xs border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md transition-colors w-fit"
                >
                  <ExternalLink className="h-3 w-3" />
                  Contact me on Discord
                </a>
                <a
                  href="https://github.com/AugustoAmaral/quest-tracker"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-1.5 text-xs border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md transition-colors w-fit"
                >
                  <ExternalLink className="h-3 w-3" />
                  Check this project on GitHub
                </a>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="font-medium mb-2">Chest Location Maps</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Special thanks to <strong>MrSho</strong> for creating and
                sharing the chest location maps with the community.
              </p>
              <div className="flex flex-col gap-2">
                <a
                  href="https://www.facebook.com/groups/612294166492760/posts/1279519659770204/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 text-sm border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  Chest Locations - Part 1
                </a>
                <a
                  href="https://www.facebook.com/groups/612294166492760/posts/1279518519770318/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 text-sm border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  Chest Locations - Part 2
                </a>
                <a
                  href="https://www.youtube.com/watch?v=rL4Lmz2SZj8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 text-sm border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  Additional Locations by @BlueBerries_YT
                </a>
                <a
                  href="https://www.youtube.com/shorts/0XsOi5myqhU"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 text-sm border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  The plain of ida chest locations by @SaikouYomiPlays
                </a>
                <a
                  href="https://www.youtube.com/shorts/WTil5kTpVVU"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 text-sm border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  Sunset beach chest locations by @SaikouYomiPlays
                </a>
                <a
                  href="https://www.youtube.com/shorts/ZsmMJe3Xcnk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 text-sm border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  Holy Ice Cave chest locations by @SaikouYomiPlays
                </a>
                <a
                  href="https://www.youtube.com/shorts/vx0J-844X8s"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 text-sm border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  Holy Ground Underground chest locations by @SaikouYomiPlays
                </a>
                <a
                  href="https://www.youtube.com/shorts/4V639uTjdgE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 text-sm border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  Whitelake Bait chest locations by @SaikouYomiPlays
                </a>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="font-medium mb-2">UI Components</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Built with <strong>shadcn/ui</strong> components.
              </p>
              <a
                href="https://ui.shadcn.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 text-sm border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md transition-colors w-full"
              >
                <ExternalLink className="h-4 w-4" />
                Visit shadcn/ui
              </a>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Clear Data Confirmation Dialog */}
      <AlertDialog open={showClearDialog} onOpenChange={setShowClearDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Clear All Data
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete all profiles, progress data, and
              settings. This action cannot be undone. Are you sure you want to
              continue?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleClearData}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Yes, Clear All Data
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
