import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { workoutTypes, type Workout } from "./WorkoutTypes";

interface WorkoutListProps {
  workouts: Workout[];
}

export const WorkoutList = ({ workouts }: WorkoutListProps) => {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredWorkouts = workouts.filter((workout) => {
    const matchesSearch = workout.name.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter ? workout.type === typeFilter : true;
    return matchesSearch && matchesType;
  });

  const totalPages = Math.ceil(filteredWorkouts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedWorkouts = filteredWorkouts.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="space-y-4">
      <div className="flex gap-4 mb-4">
        <Input
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1"
        />
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Types</SelectItem>
            {workoutTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Duration (min)</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedWorkouts.map((workout) => (
              <TableRow key={workout.id}>
                <TableCell>{workout.name}</TableCell>
                <TableCell>{workout.type}</TableCell>
                <TableCell>{workout.minutes}</TableCell>
                <TableCell>{new Date(workout.date).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          <Button
            variant="outline"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="py-2 px-4">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};