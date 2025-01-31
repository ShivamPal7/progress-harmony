import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { type Workout } from './WorkoutTypes';

interface WorkoutChartProps {
  workouts: Workout[];
}

export const WorkoutChart = ({ workouts }: WorkoutChartProps) => {
  const workoutsByType = workouts.reduce((acc, workout) => {
    const existing = acc.find(item => item.type === workout.type);
    if (existing) {
      existing.totalMinutes += workout.minutes;
      existing.count += 1;
    } else {
      acc.push({
        type: workout.type,
        totalMinutes: workout.minutes,
        count: 1,
      });
    }
    return acc;
  }, [] as Array<{ type: string; totalMinutes: number; count: number; }>);

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={workoutsByType}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="type" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="totalMinutes" fill="#0EA5E9" name="Total Minutes" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};