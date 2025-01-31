export interface Workout {
  id: string;
  name: string;
  type: string;
  minutes: number;
  date: string;
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