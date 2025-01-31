import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { workoutTypes, type UserData, type UserWorkout } from "./WorkoutTypes";
import { useToast } from "@/components/ui/use-toast";

interface WorkoutFormProps {
  onSubmit: (userData: UserData) => void;
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

    const workout: UserWorkout = {
      type,
      minutes: parseInt(minutes),
    };

    const userData: UserData = {
      id: crypto.randomUUID(),
      name,
      workouts: [workout],
    };

    onSubmit(userData);
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
    <form onSubmit={handleSubmit} className="space-y-6 p-8 bg-white rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Add New Workout</h2>
      
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium text-gray-700">User Name</label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter user name"
          className="w-full transition-all duration-200 hover:border-primary focus:border-primary"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="type" className="text-sm font-medium text-gray-700">Workout Type</label>
        <Select value={type} onValueChange={setType}>
          <SelectTrigger className="w-full transition-all duration-200 hover:border-primary">
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
        <label htmlFor="minutes" className="text-sm font-medium text-gray-700">Duration (minutes)</label>
        <Input
          id="minutes"
          type="number"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
          placeholder="Enter duration in minutes"
          min="1"
          className="w-full transition-all duration-200 hover:border-primary focus:border-primary"
        />
      </div>

      <Button type="submit" className="w-full transition-all duration-300 hover:scale-[1.02]">
        Add Workout
      </Button>
    </form>
  );
};