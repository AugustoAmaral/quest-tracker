import { ChevronDown, User } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import type { Profile } from "../../types";

interface HeaderProps {
  activeProfile: Profile | null;
  profiles: Profile[];
  onCreateProfile: () => void;
  onSwitchProfile: (profileId: string) => void;
  onEditProfile: (profileId: string) => void;
  onDeleteProfile: (profileId: string) => void;
}

export function Header({
  activeProfile,
  profiles,
  onCreateProfile,
  onSwitchProfile,
  onEditProfile,
  onDeleteProfile,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between gap-3 px-4">
        <h1 className="font-semibold text-sm truncate flex-1 min-w-0">
          Ragnarok M: Classic Quest Tracker
        </h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="justify-between min-w-[140px] shrink-0"
            >
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="truncate">
                  {activeProfile?.name || "No Profile"}
                </span>
              </div>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="px-2 py-1.5">
              <p className="text-sm font-medium">Switch Profile</p>
            </div>
            <DropdownMenuSeparator />
            {profiles.map((profile) => (
              <DropdownMenuItem
                key={profile.id}
                onClick={() => onSwitchProfile(profile.id)}
                className="flex items-center justify-between"
              >
                <span
                  className={
                    profile.id === activeProfile?.id ? "font-medium" : ""
                  }
                >
                  {profile.name}
                </span>
                {profile.id === activeProfile?.id && (
                  <span className="text-xs text-muted-foreground">
                    Active
                  </span>
                )}
              </DropdownMenuItem>
            ))}
            {profiles.length > 0 && <DropdownMenuSeparator />}
            <DropdownMenuItem onClick={onCreateProfile}>
              Create New Profile
            </DropdownMenuItem>
            {activeProfile && (
              <>
                <DropdownMenuItem
                  onClick={() => onEditProfile(activeProfile.id)}
                >
                  Edit Current Profile
                </DropdownMenuItem>
                {profiles.length > 1 && (
                  <DropdownMenuItem
                    onClick={() => onDeleteProfile(activeProfile.id)}
                    className="text-destructive focus:text-destructive"
                  >
                    Delete Current Profile
                  </DropdownMenuItem>
                )}
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
