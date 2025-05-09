
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Award, Star } from "lucide-react";

interface FeedbackFormProps {
  productId: string;
  productTitle: string;
  onFeedbackSubmit?: () => void;
}

const feedbackSchema = z.object({
  rating: z.number().min(1).max(5),
  feedback: z.string().min(10, "Feedback must be at least 10 characters").max(500, "Feedback must be less than 500 characters"),
});

type FeedbackValues = z.infer<typeof feedbackSchema>;

const FeedbackForm: React.FC<FeedbackFormProps> = ({ productId, productTitle, onFeedbackSubmit }) => {
  const { toast } = useToast();
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FeedbackValues>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      rating: 0,
      feedback: "",
    },
  });

  const handleStarClick = (value: number) => {
    setRating(value);
    form.setValue("rating", value);
  };

  const onSubmit = (values: FeedbackValues) => {
    setIsSubmitting(true);
    console.log("Submitting feedback:", { productId, ...values });
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Feedback submitted!",
        description: `You received 5 USDC for your valuable feedback.`,
        variant: "default",
      });
      
      form.reset();
      setRating(0);
      
      if (onFeedbackSubmit) {
        onFeedbackSubmit();
      }
    }, 1500);
  };

  return (
    <div className="glass p-6">
      <h3 className="text-xl font-semibold mb-4">Submit Feedback for {productTitle}</h3>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormItem>
            <FormLabel>Rating</FormLabel>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleStarClick(star)}
                  className="focus:outline-none"
                >
                  <Star
                    size={24}
                    className={`${
                      star <= rating
                        ? "text-tellnearn-yellow fill-tellnearn-yellow"
                        : "text-gray-400"
                    }`}
                  />
                </button>
              ))}
            </div>
            {form.formState.errors.rating && (
              <p className="text-sm text-destructive">Please provide a rating</p>
            )}
          </FormItem>

          <FormField
            control={form.control}
            name="feedback"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Feedback</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Share your thoughts on this product..." 
                    className="h-32 resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center gap-2 text-tellnearn-yellow">
              <Award size={18} />
              <span className="text-sm font-semibold">Earn 5 USDC for quality feedback</span>
            </div>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-tellnearn-yellow hover:bg-tellnearn-yellow/90 text-black"
            >
              {isSubmitting ? "Submitting..." : "Submit Feedback & Earn"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default FeedbackForm;
