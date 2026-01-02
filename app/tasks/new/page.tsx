"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function CreateTaskPage() {
  return (
    <div className="p-8">
      <Link href="/tasks">
        <Button variant="ghost" className="mb-6 gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Tasks
        </Button>
      </Link>

      <div className="max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Create New Task</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Task Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="title" className="text-base font-medium">
                Task Title
              </Label>
              <Input id="title" placeholder="Enter task title" className="mt-2" />
            </div>

            <div>
              <Label htmlFor="description" className="text-base font-medium">
                Description
              </Label>
              <textarea
                id="description"
                placeholder="Enter task description"
                className="mt-2 w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="project" className="text-base font-medium">
                Project
              </Label>
              <Select>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select a project" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Marketing Campaign</SelectItem>
                  <SelectItem value="2">Product Launch</SelectItem>
                  <SelectItem value="3">Engineering</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="priority" className="text-base font-medium">
                Priority
              </Label>
              <Select>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="dueDate" className="text-base font-medium">
                Due Date
              </Label>
              <Input id="dueDate" type="date" className="mt-2" />
            </div>

            <div className="flex gap-3 pt-4">
              <Button>Create Task</Button>
              <Link href="/tasks">
                <Button variant="outline">Cancel</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}