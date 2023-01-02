export interface ITask {
  id: number
  name: string
  done: boolean | null
  todo_id: number
  created_at: string
  updated_at: string
  progress_percentage: number | null
}
