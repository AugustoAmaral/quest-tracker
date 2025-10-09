import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { useState, useEffect } from "react";
import { Header } from "../components/common/Header";
import { BottomNav } from "../components/common/BottomNav";
import { ProfileManager } from "../components/profile/ProfileManager";
import { useProgress } from "../hooks/useProgress";
import { Toaster } from "../components/ui/sonner";
import { gameData } from "../data/maps";
import { WELCOME_DIALOG_KEY } from "../utils/constants";

const RootLayout = () => {
  const {
    progress,
    isLoading,
    activeProfile,
    createProfile,
    switchProfile,
    updateProfile,
    deleteProfile,
  } = useProgress(gameData);

  const [profileDialog, setProfileDialog] = useState<{
    isOpen: boolean;
    mode: "create" | "edit" | "delete" | null;
    selectedProfileId?: string;
  }>({
    isOpen: false,
    mode: null,
  });
  useEffect(() => {
    if (!isLoading && progress.profiles.length === 0) {
      const hasSeenWelcome = localStorage.getItem(WELCOME_DIALOG_KEY);

      if (hasSeenWelcome === "true") {
        setProfileDialog({
          isOpen: true,
          mode: "create",
        });
      } else {
        const checkWelcomeDialog = setInterval(() => {
          const welcomeSeen = localStorage.getItem(WELCOME_DIALOG_KEY);
          if (welcomeSeen === "true") {
            setProfileDialog({
              isOpen: true,
              mode: "create",
            });
            clearInterval(checkWelcomeDialog);
          }
        }, 100);

        return () => clearInterval(checkWelcomeDialog);
      }
    }
  }, [isLoading, progress.profiles.length]);

  const handleCreateProfile = () => {
    setProfileDialog({
      isOpen: true,
      mode: "create",
    });
  };

  const handleEditProfile = (profileId: string) => {
    setProfileDialog({
      isOpen: true,
      mode: "edit",
      selectedProfileId: profileId,
    });
  };

  const handleDeleteProfile = (profileId: string) => {
    setProfileDialog({
      isOpen: true,
      mode: "delete",
      selectedProfileId: profileId,
    });
  };

  const handleCloseProfileDialog = () => {
    setProfileDialog({
      isOpen: false,
      mode: null,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header
        activeProfile={activeProfile}
        profiles={progress.profiles}
        onCreateProfile={handleCreateProfile}
        onSwitchProfile={switchProfile}
        onEditProfile={handleEditProfile}
        onDeleteProfile={handleDeleteProfile}
      />

      {/* Main Content */}
      <main className="container mx-auto px-0">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <BottomNav />

      {/* Profile Manager Dialog */}
      <ProfileManager
        profiles={progress.profiles}
        activeProfileId={progress.activeProfileId}
        onCreateProfile={createProfile}
        onUpdateProfile={updateProfile}
        onDeleteProfile={deleteProfile}
        isOpen={profileDialog.isOpen}
        onClose={handleCloseProfileDialog}
        mode={profileDialog.mode}
        selectedProfileId={profileDialog.selectedProfileId}
      />

      {/* Toast Notifications */}
      <Toaster />
      <TanStackRouterDevtools />
    </div>
  );
};

export const Route = createRootRoute({ component: RootLayout });
