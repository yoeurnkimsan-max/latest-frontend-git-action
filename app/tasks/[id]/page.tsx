import { getTask } from "@/lib/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Paperclip } from "lucide-react"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { notFound } from "next/navigation"

export default async function TaskDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const task = await getTask(id)
  if (!task) {
    notFound()
  }

  const projectNames: { [key: string]: string } = {
    "1": "Marketing Campaign",
    "2": "Product Launch",
    "3": "Engineering",
  }

  return (
    <div className="p-8">
      <Link href="/tasks">
        <Button variant="ghost" className="mb-6 gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Tasks
        </Button>
      </Link>

      <div className="max-w-4xl">
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">{task.title}</h1>
              <p className="text-muted-foreground mt-1">
                Created {formatDistanceToNow(new Date(task.dueDate), { addSuffix: true })}
              </p>
            </div>
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                task.status === "done"
                  ? "bg-emerald-100 text-emerald-700"
                  : task.status === "in-progress"
                    ? "bg-orange-100 text-orange-700"
                    : "bg-gray-100 text-gray-700"
              }`}
            >
              {task.status === "in-progress" ? "In Progress" : task.status === "done" ? "Done" : "To Do"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground leading-relaxed">{task.description}</p>
              </CardContent>
            </Card>

            {/* Subtasks */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Subtasks{" "}
                  <span className="text-sm text-muted-foreground font-normal">
                    ({task.subtasks.filter((s) => s.completed).length} of {task.subtasks.length} completed)
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {task.subtasks.map((subtask) => (
                    <div key={subtask.id} className="flex items-center gap-3">
                      <Checkbox checked={subtask.completed} />
                      <span className={subtask.completed ? "line-through text-muted-foreground" : "text-foreground"}>
                        {subtask.title}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Comments */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Comments ({task.comments.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {task.comments.length === 0 ? (
                  <p className="text-muted-foreground">No comments yet</p>
                ) : (
                  <div className="space-y-4">
                    {task.comments.map((comment) => (
                      <div key={comment.id} className="border-t border-border pt-4 first:border-t-0 first:pt-0">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold">
                            {comment.author.charAt(0)}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-foreground">{comment.author}</div>
                            <p className="text-xs text-muted-foreground mt-1">
                              {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                            </p>
                            <p className="text-foreground mt-2">{comment.content}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">STATUS</CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  {task.status === "in-progress" ? "In Progress" : task.status === "done" ? "Done" : "To Do"}
                </Button>
              </CardContent>
            </Card>

            {/* Priority */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">PRIORITY</CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className={`px-3 py-2 rounded text-sm font-medium text-center ${
                    task.priority === "high"
                      ? "bg-red-100 text-red-700"
                      : task.priority === "medium"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                </div>
              </CardContent>
            </Card>

            {/* Assignee */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">ASSIGNEE</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center text-xs font-bold">
                    {task.assignee.charAt(0)}
                  </div>
                  <span className="text-foreground">{task.assignee}</span>
                </div>
              </CardContent>
            </Card>

            {/* Due Date */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">DUE DATE</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground">
                  {new Date(task.dueDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </CardContent>
            </Card>

            {/* Project */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">PROJECT</CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  {projectNames[task.projectId]}
                </Button>
              </CardContent>
            </Card>

            {/* Attachments */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">ATTACHMENTS</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Paperclip className="w-4 h-4" />
                  design-tokens.json
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Paperclip className="w-4 h-4" />
                  color-palette.png
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
