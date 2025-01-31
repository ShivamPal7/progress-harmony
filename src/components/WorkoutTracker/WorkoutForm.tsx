import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { workoutTypes, type Workout } from "./WorkoutTypes";
import { useToast } from "@/components/ui/use-toast";

interface WorkoutFormProps {
  onSubmit: (workout: Workout) => void;
}

export const WorkoutForm = ({ onSubmit }: WorkoutFormProps) => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [type, setType] = useState<string>("");
  const [minutes, setMinutes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !type || !minutes) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const workout: Workout = {
      id: crypto.randomUUID(),
      name,
      type,
      minutes: parseInt(minutes),
      date: new Date().toISOString(),
    };

    onSubmit(workout);
    toast({
      title: "Success",
      description: "Workout added successfully!",
    });

    // Reset form
    setName("");
    setType("");
    setMinutes("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white rounded-lg shadow-md">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium">Name</label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="type" className="text-sm font-medium">Workout Type</label>
        <Select value={type} onValueChange={setType}>
          <SelectTrigger>
            <SelectValue placeholder="Select workout type" />
          </SelectTrigger>
          <SelectContent>
            {workoutTypes.map((workoutType) => (
              <SelectItem key={workoutType} value={workoutType}>
                {workoutType}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label htmlFor="minutes" className="text-sm font-medium">Duration (minutes)</label>
        <Input
          id="minutes"
          type="number"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
          placeholder="Enter duration in minutes"
          min="1"
          className="w-full"
        />
      </div>

      <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">
        Add Workout
      </Button>
    </form>
  );
};