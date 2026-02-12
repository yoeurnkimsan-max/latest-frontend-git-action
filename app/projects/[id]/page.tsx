import { getProject, getTasksByProject } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { AlertCircle, ArrowLeft, Settings } from 'lucide-react';
import Link from 'next/link';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';

const projectTeamMembers: {
  [key: string]: Array<{
    initials: string;
    name: string;
    role: string;
    color: string;
  }>;
} = {
  '1': [
    {
      initials: 'JD',
      name: 'Phorn Rothana',
      role: 'Lead Fullstack Developer',
      color: 'bg-purple-500',
    },
    {
      initials: 'AK',
      name: 'yeourn kimsan',
      role: 'Fullstack Developer',
      color: 'bg-blue-500',
    },
    {
      initials: 'SL',
      name: 'So Bunleng',
      role: 'Fullstack Developer',
      color: 'bg-green-500',
    },
    {
      initials: 'TK',
      name: 'chory Chanrady',
      role: 'Fullstack Developer',
      color: 'bg-green-500',
    },
  ],
  '2': [
    {
      initials: 'JD',
      name: 'Phorn Rothana',
      role: 'Lead Fullstack Developer',
      color: 'bg-purple-500',
    },
    {
      initials: 'AK',
      name: 'yeourn kimsan',
      role: 'Fullstack Developer',
      color: 'bg-blue-500',
    },
    {
      initials: 'SL',
      name: 'So Bunleng',
      role: 'Fullstack Developer',
      color: 'bg-green-500',
    },
    {
      initials: 'TK',
      name: 'chory Chanrady',
      role: 'Fullstack Developer',
      color: 'bg-green-500',
    },
  ],
  '3': [
    {
      initials: 'JD',
      name: 'Phorn Rothana',
      role: 'Lead Fullstack Developer',
      color: 'bg-purple-500',
    },
    {
      initials: 'AK',
      name: 'yeourn kimsan',
      role: 'Fullstack Developer',
      color: 'bg-blue-500',
    },
    {
      initials: 'SL',
      name: 'So Bunleng',
      role: 'Fullstack Developer',
      color: 'bg-green-500',
    },
    {
      initials: 'TK',
      name: 'chory Chanrady',
      role: 'Fullstack Developer',
      color: 'bg-green-500',
    },
  ],
};

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = getProject(id);
  const tasks = getTasksByProject(id);

  if (!project) {
    return (
      <div className="p-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Failed to load project</AlertDescription>
        </Alert>
      </div>
    );
  }

  const stats = {
    total: project.tasksTotal,
    completed: project.tasksCompleted,
    inProgress: tasks.filter((t) => t.status === 'in-progress').length,
    todo: tasks.filter((t) => t.status === 'todo').length,
  };

  const progressPercent = (project.tasksCompleted / project.tasksTotal) * 100;
  const teamMembers = projectTeamMembers[id] || [];

  return (
    <div className="p-8">
      <Link href="/projects">
        <Button variant="ghost" className="mb-6 gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Projects
        </Button>
      </Link>

      <div className="max-w-5xl">
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-start gap-4">
            <div
              className={`w-16 h-16 rounded-lg ${project.color} flex-shrink-0`}
            />
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                {project.name}
              </h1>
              <p className="text-muted-foreground mt-2">
                {project.description}
              </p>
            </div>
          </div>
          <Button variant="outline" size="icon">
            <Settings className="w-4 h-4" />
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-emerald-600">
                Completed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-600">
                {stats.completed}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-orange-500">
                In Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-500">
                {stats.inProgress}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">To Do</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.todo}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Tasks */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {tasks.map((task) => (
                    <Link key={task.id} href={`/tasks/${task.id}`}>
                      <div className="flex items-start gap-3 p-3 rounded border border-border hover:bg-muted/50 cursor-pointer transition">
                        <Checkbox checked={task.status === 'done'} />
                        <div className="flex-1">
                          <p
                            className={`font-medium ${
                              task.status === 'done'
                                ? 'line-through text-muted-foreground'
                                : 'text-foreground'
                            }`}
                          >
                            {task.title}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {task.assignee}
                          </p>
                        </div>
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${
                            task.status === 'done'
                              ? 'bg-emerald-100 text-emerald-700'
                              : task.status === 'in-progress'
                                ? 'bg-orange-100 text-orange-700'
                                : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {task.status === 'in-progress'
                            ? 'In Progress'
                            : task.status === 'done'
                              ? 'Done'
                              : 'To Do'}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Progress value={progressPercent} className="h-2" />
                  <p className="text-sm text-muted-foreground">
                    {project.tasksCompleted} of {project.tasksTotal} tasks
                    completed
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Team Members */}
            <Card>
              <CardHeader>
                <CardTitle>{teamMembers.length} members</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {teamMembers.map((member) => (
                  <div
                    key={member.initials}
                    className="flex items-center gap-3"
                  >
                    <div
                      className={`w-8 h-8 rounded-full ${member.color} text-white text-xs flex items-center justify-center font-bold`}
                    >
                      {member.initials}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {member.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {member.role}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Due Date */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">DUE DATE</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground">
                  {new Date(project.dueDate).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
