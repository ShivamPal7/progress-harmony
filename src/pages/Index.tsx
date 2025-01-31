import { useState } from "react";
import { WorkoutForm } from "@/components/WorkoutTracker/WorkoutForm";
import { WorkoutList } from "@/components/WorkoutTracker/WorkoutList";
import { WorkoutChart } from "@/components/WorkoutTracker/WorkoutChart";
import type { Workout } from "@/components/WorkoutTracker/WorkoutTypes";

const Index = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  const handleAddWorkout = (workout: Workout) => {
    setWorkouts((prev) => [...prev, workout]);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
          Health Challenge Tracker
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <WorkoutForm onSubmit={handleAddWorkout} />
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Workout Progress</h2>
            <WorkoutChart workouts={workouts} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Workout History</h2>
          <WorkoutList workouts={workouts} />
        </div>
      </div>
    </div>
  );
};

export default Index;