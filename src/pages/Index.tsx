import { useState, useEffect } from "react";
import { WorkoutForm } from "@/components/WorkoutTracker/WorkoutForm";
import { WorkoutList } from "@/components/WorkoutTracker/WorkoutList";
import { WorkoutChart } from "@/components/WorkoutTracker/WorkoutChart";
import type { UserData } from "@/components/WorkoutTracker/WorkoutTypes";

const STORAGE_KEY = "healthChallengeUsers";

const initialUsers: UserData[] = [
  {
    id: "1",
    name: "John Doe",
    workouts: [
      { type: "Running", minutes: 30 },
      { type: "Cycling", minutes: 45 }
    ]
  },
  {
    id: "2",
    name: "Jane Smith",
    workouts: [
      { type: "Swimming", minutes: 60 },
      { type: "Running", minutes: 20 }
    ]
  },
  {
    id: "3",
    name: "Mike Johnson",
    workouts: [
      { type: "Yoga", minutes: 50 },
      { type: "Weight Training", minutes: 40 }
    ]
  }
];

const Index = () => {
  const [users, setUsers] = useState<UserData[]>(() => {
    const savedUsers = localStorage.getItem(STORAGE_KEY);
    return savedUsers ? JSON.parse(savedUsers) : initialUsers;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  }, [users]);

  const handleAddWorkout = (userData: UserData) => {
    setUsers((prevUsers) => {
      const existingUserIndex = prevUsers.findIndex(user => user.name === userData.name);
      
      if (existingUserIndex >= 0) {
        // Add workout to existing user
        const updatedUsers = [...prevUsers];
        updatedUsers[existingUserIndex] = {
          ...updatedUsers[existingUserIndex],
          workouts: [...updatedUsers[existingUserIndex].workouts, ...userData.workouts]
        };
        return updatedUsers;
      } else {
        // Add new user with workout
        return [...prevUsers, userData];
      }
    });
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
            <WorkoutChart workouts={users.flatMap(user => 
              user.workouts.map(w => ({
                id: user.id,
                name: user.name,
                type: w.type,
                minutes: w.minutes,
                date: new Date().toISOString()
              }))
            )} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Workout History</h2>
          <WorkoutList users={users} />
        </div>
      </div>
    </div>
  );
};

export default Index;