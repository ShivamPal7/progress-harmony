import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { workoutTypes, type UserData } from "./WorkoutTypes";

interface WorkoutListProps {
  users: UserData[];
}

export const WorkoutList = ({ users }: WorkoutListProps) => {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // First filter users and their workouts
  const filteredWorkouts = users.flatMap(user => 
    user.workouts
      .filter(workout => typeFilter === "all" || workout.type === typeFilter)
      .map(workout => ({
        userId: user.id,
        userName: user.name,
        ...workout
      }))
  ).filter(entry => entry.userName.toLowerCase().includes(search.toLowerCase()));

  // Then handle pagination
  const totalPages = Math.ceil(filteredWorkouts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedWorkouts = filteredWorkouts.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Search by username..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 transition-all duration-200 hover:border-primary focus:border-primary"
        />
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full sm:w-[180px] transition-all duration-200 hover:border-primary">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {workoutTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-lg border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-semibold">User Name</TableHead>
              <TableHead className="font-semibold">Workout Type</TableHead>
              <TableHead className="font-semibold">Duration (min)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedWorkouts.map((workout, index) => (
              <TableRow 
                key={`${workout.userId}-${index}`}
                className="transition-colors hover:bg-gray-50"
              >
                <TableCell>{workout.userName}</TableCell>
                <TableCell>{workout.type}</TableCell>
                <TableCell>{workout.minutes}</TableCell>
              </TableRow>
            ))}
            {paginatedWorkouts.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-8 text-gray-500">
                  No workouts found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-4 mt-6">
          <Button
            variant="outline"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="transition-all duration-200 hover:bg-gray-100"
          >
            Previous
          </Button>
          <span className="py-2 px-4 bg-gray-50 rounded-md font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="transition-all duration-200 hover:bg-gray-100"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};