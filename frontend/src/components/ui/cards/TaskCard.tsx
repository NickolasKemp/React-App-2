import Date from '../icons/Date';
import { EnumTaskPriority } from '../../../types/task.types';
import '../../../App.css'
import '../../../index.css'


interface TaskCardProps {
  name?: string
  priority?: EnumTaskPriority
  description?: string
  dueDate?: string
  taskActions?: any
  taskMoveAction?: any
}

const TaskCard = ({name, priority, description, dueDate, taskActions, taskMoveAction }: TaskCardProps) => {
  return (
    <div className="task">
      <div className="task__name-container">
        <h4 className="task__name">{name}</h4>
        <span>{taskActions}</span>
      </div>
      <p className='task__description'>
        {description}
      </p>
      <p className="task__date _calendar">
        <Date/>
        {dueDate ? dueDate : "not defined" }
      </p>
      <div>
        <div className="task__priority">{priority ? priority : 'not defined'}</div>
      </div>
      {taskMoveAction}
    </div>
  )};

export default TaskCard;