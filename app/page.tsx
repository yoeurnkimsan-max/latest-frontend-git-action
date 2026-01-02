"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useTasks } from "@/hooks/use-queries";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { AlertCircle } from "lucide-react";

export default function DashboardPage() {
  const { data: tasks, isLoading, error } = useTasks();

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
          <AlertDescription>Failed to load dashboard data</AlertDescription>
        </Alert>
      </div>
    );
  }

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.status === "done").length;
  const inProgressTasks = tasks.filter(
    (task) => task.status === "in-progress"
  ).length;
  const overdueTasks = tasks.filter(
    (task) => new Date(task.dueDate) < new Date() && task.status !== "done"
  ).length;

  const recentTasks = tasks
    .sort(
      (a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime()
    )
    .slice(0, 4);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, Rothana</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalTasks}</div>
            <p className="text-xs text-muted-foreground mt-2">
              ↑12% from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-emerald-600">
              {completedTasks}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              ↑8% from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              In Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-500">
              {inProgressTasks}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              ↑5% from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Overdue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">
              {overdueTasks}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              ↓2% from last week
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Tasks */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Tasks</CardTitle>
            <Link href="/tasks">
              <Button variant="outline" size="sm">
                View all
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTasks.map((task) => (
              <Link key={task.id} href={`/tasks/${task.id}`}>
                <div className="flex items-start gap-4 p-4 rounded-lg border border-border hover:bg-muted/50 cursor-pointer transition">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-foreground">
                        {task.title}
                      </h3>
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
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
                    <p className="text-sm text-muted-foreground">
                      {task.description.substring(0, 100)}...
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(task.dueDate), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
