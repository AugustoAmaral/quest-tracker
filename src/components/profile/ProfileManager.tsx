import { useState, useEffect } from "react";
import { User } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
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
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import type { Profile } from "../../types";

interface ProfileManagerProps {
  profiles: Profile[];
  activeProfileId: string;
  onCreateProfile: (name: string) => void;
  onUpdateProfile: (profileId: string, updates: Partial<Profile>) => void;
  onDeleteProfile: (profileId: string) => void;
  isOpen: boolean;
  onClose: () => void;
  mode: "create" | "edit" | "delete" | null;
  selectedProfileId?: string;
}

export function ProfileManager({
  profiles,
  activeProfileId,
  onCreateProfile,
  onUpdateProfile,
  onDeleteProfile,
  isOpen,
  onClose,
  mode,
  selectedProfileId,
}: ProfileManagerProps) {
  const [profileName, setProfileName] = useState("");
  const [error, setError] = useState("");

  const selectedProfile = selectedProfileId
    ? profiles.find((p) => p.id === selectedProfileId)
    : null;

  const handleCreate = () => {
    const trimmedName = profileName.trim();

    if (!trimmedName) {
      setError("Profile name is required");
      return;
    }

    if (trimmedName.length > 50) {
      setError("Profile name must be 50 characters or less");
      return;
    }

    if (
      profiles.some((p) => p.name.toLowerCase() === trimmedName.toLowerCase())
    ) {
      setError("A profile with this name already exists");
      return;
    }

    onCreateProfile(trimmedName);
    handleClose();
  };

  const handleEdit = () => {
    if (!selectedProfile) return;

    const trimmedName = profileName.trim();

    if (!trimmedName) {
      setError("Profile name is required");
      return;
    }

    if (trimmedName.length > 50) {
      setError("Profile name must be 50 characters or less");
      return;
    }

    if (
      profiles.some(
        (p) =>
          p.id !== selectedProfile.id &&
          p.name.toLowerCase() === trimmedName.toLowerCase(),
      )
    ) {
      setError("A profile with this name already exists");
      return;
    }

    onUpdateProfile(selectedProfile.id, { name: trimmedName });
    handleClose();
  };

  const handleDelete = () => {
    if (!selectedProfile) return;
    onDeleteProfile(selectedProfile.id);
    handleClose();
  };

  const handleClose = () => {
    setProfileName("");
    setError("");
    onClose();
  };

  const handleDialogOpenChange = (open: boolean) => {
    if (!open) {
      handleClose();
    }
  };

  // Set initial name when editing
  useEffect(() => {
    if (mode === "edit" && selectedProfile) {
      setProfileName(selectedProfile.name);
    } else {
      setProfileName("");
    }
    setError("");
  }, [mode, selectedProfile]);

  if (mode === "delete") {
    return (
      <AlertDialog open={isOpen} onOpenChange={handleDialogOpenChange}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Profile</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the profile "
              {selectedProfile?.name}"? This action cannot be undone and all
              progress data will be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleClose}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete Profile
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            {mode === "create" ? "Create New Profile" : "Edit Profile"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Create a new character profile to track your progress."
              : "Update your profile name."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="profile-name">Profile Name</Label>
            <Input
              id="profile-name"
              placeholder="Enter profile name..."
              value={profileName}
              onChange={(e) => {
                setProfileName(e.target.value);
                setError("");
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (mode === "create") handleCreate();
                  else handleEdit();
                }
              }}
              maxLength={50}
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>

          {profiles.length > 0 && mode === "create" && (
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">
                Existing Profiles
              </Label>
              <div className="max-h-32 overflow-y-auto space-y-1 border rounded-md p-2">
                {profiles.map((profile) => (
                  <div
                    key={profile.id}
                    className={`text-sm px-2 py-1 rounded ${
                      profile.id === activeProfileId
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {profile.name}{" "}
                    {profile.id === activeProfileId && "(Active)"}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={mode === "create" ? handleCreate : handleEdit}>
            {mode === "create" ? "Create Profile" : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
