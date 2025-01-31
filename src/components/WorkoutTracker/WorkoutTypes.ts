export interface UserWorkout {
  type: string;
  minutes: number;
}

export interface UserData {
  id: string;
  name: string;
  workouts: UserWorkout[];
}

export const workoutTypes = [
  "Running",
  "Cycling",
  "Swimming",
  "Weight Training",
  "Yoga",
  "HIIT",
] as const;

export type WorkoutType = typeof workoutTypes[number];