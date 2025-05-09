
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Award, Star, Users } from "lucide-react";
import { Link } from "react-router-dom";

interface CampaignCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  reward: number;
  rating: number;
  participants: number;
  image: string;
  className?: string;
}

const CampaignCard: React.FC<CampaignCardProps> = ({
  id,
  title,
  description,
  category,
  reward,
  rating,
  participants,
  image,
  className,
}) => {
  return (
    <Card className={cn("overflow-hidden card-hover bg-secondary border-border/40", className)}>
      <div className="relative h-40 w-full">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover" 
        />
        <Badge className="absolute top-2 right-2 bg-tellnearn-yellow text-black font-medium">
          {category}
        </Badge>
      </div>
      <CardHeader className="pb-2">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <div className="flex items-center gap-1 text-tellnearn-yellow">
          <Star size={16} fill="currentColor" />
          <span className="text-sm">{rating.toFixed(1)}</span>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-white/70 line-clamp-2">{description}</p>
        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center gap-1 text-white/70 text-xs">
            <Users size={14} />
            <span>{participants} participants</span>
          </div>
          <div className="flex items-center gap-1 text-tellnearn-yellow text-xs">
            <Award size={14} />
            <span>${reward} USDC</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Link to={`/product/${id}`} className="w-full">
          <Button 
            className="w-full bg-gradient-to-r from-tellnearn-yellow to-tellnearn-yellow-light hover:opacity-90 text-black font-medium"
          >
            Give Feedback
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CampaignCard;
