import dbData from "@/db.json"

export async function fetchProjects() {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return dbData.projects
}

export async function fetchProject(id: string) {
  await new Promise((resolve) => setTimeout(resolve, 300))
  const project = dbData.projects.find((p) => p.id === id)
  if (!project) throw new Error("Project not found")
  return project
}

export async function fetchTasks() {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return dbData.tasks
}

export async function fetchTask(id: string) {
  await new Promise((resolve) => setTimeout(resolve, 300))
  const task = dbData.tasks.find((t) => t.id === id)
  if (!task) throw new Error("Task not found")
  return task
}

export async function fetchTasksByProject(projectId: string) {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return dbData.tasks.filter((t) => t.projectId === projectId)
}

export function getProject(id: string) {
  return dbData.projects.find((p) => p.id === id) || null
}

export function getTask(id: string) {
  return dbData.tasks.find((t) => t.id === id) || null
}

export function getTasksByProject(projectId: string) {
  return dbData.tasks.filter((t) => t.projectId === projectId)
}