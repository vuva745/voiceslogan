import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Send } from "lucide-react";
import { toast } from "sonner";

interface FeedItemProps {
  item: {
    id: string;
    name: string;
    uid: string;
    transcript: string;
    timestamp: string;
    sponsor: string;
    avatar: string;
  };
}

/**
 * FeedItem - Individual feed item component
 * 
 * Displays a slogan feed item with expand functionality
 */
const FeedItem = ({ item }: FeedItemProps) => {
  const [expanded, setExpanded] = useState(false);

  const handleSendToAI = () => {
    toast.success("Sent to AI Review");
  };

  return (
    <Card
      className="p-3 bg-card border border-border hover:bg-secondary/30 transition-colors cursor-pointer"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-start gap-3">
        <img
          src={item.avatar}
          alt={item.name}
          className="w-12 h-12 rounded-full"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-foreground">{item.name}</p>
              <p className="text-sm text-foreground mt-1">"{item.transcript}"</p>
            </div>
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {item.timestamp}
            </span>
          </div>
          
          {expanded && (
            <div className="mt-3 pt-3 border-t border-border space-y-3 animate-fade-in">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-muted-foreground">UID:</span>
                  <span className="ml-1 font-mono">{item.uid}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Sponsor:</span>
                  <span className="ml-1">{item.sponsor}</span>
                </div>
              </div>
              
              {/* Mock audio player */}
              <div className="bg-secondary/50 rounded p-2 flex items-center gap-2">
                <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                  <Play className="w-3 h-3" />
                </Button>
                <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
                  <div className="h-full w-1/3 bg-primary" />
                </div>
                <span className="text-xs text-muted-foreground">0:03</span>
              </div>

              <Button
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSendToAI();
                }}
                className="w-full"
              >
                <Send className="w-3 h-3 mr-2" />
                Send to AI Review
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default FeedItem;
