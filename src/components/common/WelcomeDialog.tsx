import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent } from "../ui/dialog";
import { ObjectiveIcon } from "./ObjectiveIcon";
import {
  getVisibleObjectiveTypes,
  OBJECTIVE_LABELS,
  WELCOME_DIALOG_KEY,
} from "../../utils/constants";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const TOTAL_PAGES = 4;

export function WelcomeDialog() {
  const [hasSeenDialog, setHasSeenDialog] = useLocalStorage(
    WELCOME_DIALOG_KEY,
    false,
  );
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!hasSeenDialog) setOpen(true);
  }, [hasSeenDialog]);

  const handleClose = () => {
    setOpen(false);
    setHasSeenDialog(true);
    setCurrentPage(1);
  };

  const handleNext = () => {
    if (currentPage < TOTAL_PAGES) setCurrentPage(currentPage + 1);
    else handleClose();
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 1:
        return (
          <div className="space-y-3">
            <div className="text-center space-y-2">
              <div className="text-6xl">🎮</div>
              <h2 className="text-2xl sm:text-3xl font-bold">
                Welcome to Quest Tracker!
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base">
                Your ultimate tool to track your progress in Ragnarok Online
              </p>
            </div>
            <div className="space-y-2 pt-1">
              <div className="flex items-start gap-3 p-2.5 rounded-lg bg-muted/50">
                <span className="text-2xl">✨</span>
                <div>
                  <h3 className="font-semibold mb-0.5">Track everything</h3>
                  <p className="text-sm text-muted-foreground">
                    Track quests, chests, photo spots and much more on each map
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-2.5 rounded-lg bg-muted/50">
                <span className="text-2xl">💾</span>
                <div>
                  <h3 className="font-semibold mb-0.5">Automatic progress</h3>
                  <p className="text-sm text-muted-foreground">
                    Your progress is automatically saved in the browser
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-2.5 rounded-lg bg-muted/50">
                <span className="text-2xl">👤</span>
                <div>
                  <h3 className="font-semibold mb-0.5">Multiple profiles</h3>
                  <p className="text-sm text-muted-foreground">
                    Create multiple profiles to track different characters.
                    Everything is saved in the browser!
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-2.5 rounded-lg bg-muted/50">
                <span className="text-2xl">🔍</span>
                <div>
                  <h3 className="font-semibold mb-0.5">Powerful filters</h3>
                  <p className="text-sm text-muted-foreground">
                    Easily find what you're looking for with smart filters
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-3">
            <div className="text-center space-y-1.5">
              <div className="text-5xl">📍</div>
              <h2 className="text-2xl sm:text-3xl font-bold">
                Objective Types
              </h2>
              <p className="text-muted-foreground text-sm">
                Each map has different objectives you can complete
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2">
              {getVisibleObjectiveTypes().map((type) => (
                <div
                  key={type}
                  className="flex flex-col items-center gap-2 p-2.5 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <ObjectiveIcon objectiveType={type} size="md" />
                  <span className="text-xs sm:text-sm font-medium text-center leading-tight">
                    {OBJECTIVE_LABELS[type]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-3">
            <div className="text-center space-y-1.5">
              <div className="text-5xl">🔍</div>
              <h2 className="text-2xl sm:text-3xl font-bold">
                Smart Filters
              </h2>
              <p className="text-muted-foreground text-sm">
                Find exactly what you need
              </p>
            </div>
            <div className="space-y-2 pt-1">
              <div className="p-2.5 rounded-lg border-2 border-primary/20 bg-primary/5">
                <h3 className="font-semibold mb-1 flex items-center gap-2">
                  <span className="text-xl">🎯</span>
                  By objective type
                </h3>
                <p className="text-sm text-muted-foreground">
                  Filter maps that contain chests, quests, photo spots and more.
                  Perfect for when you're looking for something specific!
                </p>
              </div>
              <div className="p-2.5 rounded-lg border-2 border-primary/20 bg-primary/5">
                <h3 className="font-semibold mb-1 flex items-center gap-2">
                  <span className="text-xl">📊</span>
                  By level
                </h3>
                <p className="text-sm text-muted-foreground">
                  Find maps suitable for your character level. Avoid wasting
                  time in areas that are too easy or difficult!
                </p>
              </div>
              <div className="p-2.5 rounded-lg border-2 border-primary/20 bg-primary/5">
                <h3 className="font-semibold mb-1 flex items-center gap-2">
                  <span className="text-xl">✅</span>
                  By completion status
                </h3>
                <p className="text-sm text-muted-foreground">
                  View complete, incomplete or partially complete maps.
                  Focused on completing everything? Use this filter!
                </p>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-3">
            <div className="text-center space-y-1.5">
              <div className="text-5xl">🗺️</div>
              <h2 className="text-2xl sm:text-3xl font-bold">How to Navigate</h2>
              <p className="text-muted-foreground text-sm">
                It's simple and intuitive!
              </p>
            </div>
            <div className="space-y-2 pt-1">
              <div className="flex items-start gap-3 p-2.5 rounded-lg bg-muted/50">
                <span className="text-2xl font-bold text-primary">1</span>
                <div>
                  <h3 className="font-semibold mb-0.5">Explore the regions</h3>
                  <p className="text-sm text-muted-foreground">
                    Maps are organized by region. Scroll the page to see all
                    available areas.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-2.5 rounded-lg bg-muted/50">
                <span className="text-2xl font-bold text-primary">2</span>
                <div>
                  <h3 className="font-semibold mb-0.5">Click on a map</h3>
                  <p className="text-sm text-muted-foreground">
                    When you click on any map, you'll see all the objectives
                    available on it.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-2.5 rounded-lg bg-muted/50">
                <span className="text-2xl font-bold text-primary">3</span>
                <div>
                  <h3 className="font-semibold mb-0.5">Mark as complete</h3>
                  <p className="text-sm text-muted-foreground">
                    Click on objectives to mark them as complete. Your
                    progress is saved automatically!
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleClose()}>
      <DialogContent className="max-w-2xl w-[95vw] sm:w-full p-0 gap-0 max-h-[90vh] flex flex-col">
        <div className="flex-1 overflow-y-auto px-6 py-4">{renderPage()}</div>

        <div className="border-t p-6 space-y-4">
          <div className="flex items-center justify-center gap-3">
            {Array.from({ length: TOTAL_PAGES }).map((_, index) => {
              const pageNum = index + 1;
              const isActive = currentPage === pageNum;
              const isVisited = currentPage > pageNum;

              return (
                <div key={index} className="flex items-center gap-3">
                  <button
                    onClick={() => setCurrentPage(pageNum)}
                    className={`relative flex items-center justify-center w-8 h-8 rounded-full font-semibold text-sm transition-all ${
                      isActive
                        ? "bg-primary text-primary-foreground scale-110 shadow-md"
                        : isVisited
                          ? "bg-primary/20 text-primary hover:bg-primary/30"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                    aria-label={`Go to page ${pageNum}`}
                  >
                    {pageNum}
                    {isVisited && (
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                    )}
                  </button>
                  {index < TOTAL_PAGES - 1 && (
                    <div
                      className={`w-8 h-0.5 ${isVisited ? "bg-primary/40" : "bg-muted"}`}
                    />
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex gap-3">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </button>
            <button
              onClick={handleNext}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
            >
              {currentPage === TOTAL_PAGES ? "Get Started" : "Next"}
              {currentPage !== TOTAL_PAGES && (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
