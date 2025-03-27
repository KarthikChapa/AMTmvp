"use client"

import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

const exercises = [
  {
    id: "squat",
    name: "Squat",
    difficulty: "Beginner",
    muscle: "Legs",
    duration: "10 min",
  },
  {
    id: "deadlift",
    name: "Deadlift",
    difficulty: "Intermediate",
    muscle: "Back",
    duration: "15 min",
  },
  {
    id: "bench-press",
    name: "Bench Press",
    difficulty: "Beginner",
    muscle: "Chest",
    duration: "12 min",
  },
  {
    id: "shoulder-press",
    name: "Shoulder Press",
    difficulty: "Intermediate",
    muscle: "Shoulders",
    duration: "10 min",
  },
  {
    id: "rows",
    name: "Barbell Rows",
    difficulty: "Intermediate",
    muscle: "Back",
    duration: "12 min",
  },
  {
    id: "lunges",
    name: "Lunges",
    difficulty: "Beginner",
    muscle: "Legs",
    duration: "8 min",
  },
  {
    id: "pull-ups",
    name: "Pull-ups",
    difficulty: "Advanced",
    muscle: "Back",
    duration: "10 min",
  },
  {
    id: "push-ups",
    name: "Push-ups",
    difficulty: "Beginner",
    muscle: "Chest",
    duration: "8 min",
  },
]

interface ExerciseListProps {
  onSelectExercise: (id: string) => void
  selectedExercise: string
}

export function ExerciseList({ onSelectExercise, selectedExercise }: ExerciseListProps) {
  return (
    <ScrollArea className="h-[400px] pr-4">
      <div className="space-y-2">
        {exercises.map((exercise) => (
          <div
            key={exercise.id}
            className={`p-3 rounded-lg cursor-pointer transition-colors ${
              selectedExercise === exercise.id
                ? "bg-blue-100 dark:bg-blue-900"
                : "hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
            onClick={() => onSelectExercise(exercise.id)}
          >
            <div className="font-medium">{exercise.name}</div>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline">{exercise.difficulty}</Badge>
              <Badge variant="secondary">{exercise.muscle}</Badge>
              <span className="text-xs text-muted-foreground">{exercise.duration}</span>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
} 