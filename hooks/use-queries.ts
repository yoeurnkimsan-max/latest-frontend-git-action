"use client"

import { useQuery } from "@tanstack/react-query"
import * as api  from "@/lib/api"

export function useProjects() {
   const {
    data = [],
    isLoading,
    error,
   }  = useQuery({
    queryKey: ["projects"],
    queryFn: api.fetchProjects,
   })

   return { data, isLoading, error }
}

export function useProject(id: string) {
   const {
    data,
    isLoading,
    error,
   }  = useQuery({
    queryKey: ["project", id],
    queryFn: () => api.fetchProject(id),
    enabled: !!id,
   })   
    return { data, isLoading, error }
}

export function useTasks(){
    const {
    data = [],
    isLoading,
    error,
    } = useQuery({
    queryKey: ["tasks"],
    queryFn: api.fetchTasks,
    })
    return { data, isLoading, error }
}
export function useTask(id: string) {
   const {
    data,
    isLoading,
    error,
   }  = useQuery({
    queryKey: ["task", id],
    queryFn: () => api.fetchTask(id),
    enabled: !!id,
   })   
    return { data, isLoading, error }
}
export function useTasksByProject(projectId: string) {
    const {
        data= [],
        isLoading,
        error,
    } = useQuery({
        queryKey :["tasks", "byProject", projectId],
        queryFn: () => api.fetchTasksByProject(projectId),
        enabled: !!projectId,
    })

    return { data, isLoading, error }
}
