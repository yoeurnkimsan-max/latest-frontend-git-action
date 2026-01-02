"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useTasks } from "@/hooks/use-queries";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertCircle, MessageSquare, Flag, Plus } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

type FilterStatus = "all" | "todo" | "in-progress" | "done";

export default function TasksPage() {
  const { data: tasks, isLoading, error } = useTasks();
  const [filter, setFilter] = useState<FilterStatus>("all");

  if (isLoading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Failed to load tasks</AlertDescription>
        </Alert>
      </div>
    );
  }

  const filtered = tasks.filter((task) => {
    if (filter === "all") return true;
    return task.status === filter;
  });

  const stats = {
    all: tasks.length,
    todo: tasks.filter((t) => t.status === "todo").length,
    "in-progress": tasks.filter((t) => t.status === "in-progress").length,
    done: tasks.filter((t) => t.status === "done").length,
  };

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Tasks</h1>
          <p className="text-muted-foreground">{stats[filter]} total tasks</p>
        </div>
        <Link href="/tasks/new">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            New Task
          </Button>
        </Link>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-2">
            {(["all", "todo", "in-progress", "done"] as const).map((status) => (
              <Button
                key={status}
                variant={filter === status ? "default" : "outline"}
                onClick={() => setFilter(status)}
              >
                {status === "in-progress"
                  ? "In Progress"
                  : status.charAt(0).toUpperCase() + status.slice(1)}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {filtered.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              No tasks found in this filter
            </CardContent>
          </Card>
        ) : (
          filtered.map((task) => (
            <Link key={task.id} href={`/tasks/${task.id}`}>
              <Card className="hover:bg-muted/50 cursor-pointer transition">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <Checkbox className="mt-1" />
                    <div className="flex-1">
                      <div className="flex items-start gap-3 mb-2">
                        <h3 className="font-medium text-foreground">
                          {task.title}
                        </h3>
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${
                            task.status === "done"
                              ? "bg-emerald-100 text-emerald-700"
                              : task.status === "in-progress"
                              ? "bg-orange-100 text-orange-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {task.status === "in-progress"
                            ? "In Progress"
                            : task.status === "done"
                            ? "Done"
                            : "To Do"}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {task.description.substring(0, 80)}...
                      </p>
                      <div className="flex items-center gap-4 flex-wrap text-xs text-muted-foreground">
                        <span className="px-2 py-1 bg-muted rounded">
                          {task.projectId === "1"
                            ? "Marketing"
                            : task.projectId === "2"
                            ? "Product Launch"
                            : "Engineering"}
                        </span>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="w-4 h-4" />
                          {task.comments.length}
                        </div>
                        <div className="flex items-center gap-1">
                          <Flag
                            className={
                              task.priority === "high"
                                ? "text-red-500 w-4 h-4"
                                : "w-4 h-4"
                            }
                          />
                          {task.priority.charAt(0).toUpperCase() +
                            task.priority.slice(1)}{" "}
                          Priority
                        </div>
                        <span>
                          {formatDistanceToNow(new Date(task.dueDate), {
                            addSuffix: true,
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
