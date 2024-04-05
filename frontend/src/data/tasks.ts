//example data
export enum Priority {
  Low = "low",
  Medium = 'medium',
  High = 'high'
}


export const TASKS = [
  {
    id: '1',
    name: "add real tasks from db",
    description: 'A task is a specific unit of work or activity that needs to be ' +
      'accomplished within a defined period or as part of a project or goal',
    status: 'in progress',
    dueDate: 'please pick a day',
    priority: Priority.Medium
  },
  {
    id: '2',
    name: "go to shop",
    description: 'A task is a specific unit of work or activity that needs to be ' +
      'accomplished within a defined period or as part of a project or goal',
    status: 'to do',
    dueDate: 'please pick a day',
    priority: Priority.Low
  },
  {
    id: '3',
    name: "do decomposition",
    description: 'A task is a specific unit of work or activity that needs to be ' +
      'accomplished within a defined period or as part of a project or goal',
    status: 'in progress',
    dueDate: 'please pick a day',
    priority: Priority.High
  }
]

