import { formatDate } from "../../../../shared/utils";
import { Button, TrashIcon } from "../../../../shared/components";
import { useDeleteTask } from "../../hooks";

import type { Priority, Status } from "../../constants";

import "./taskItem.css";

type TaskItemProps = {
  id: string;
  title: string;
  status: Status;
  priority: Priority;
  deadline: Date;
  onClick: () => void;
};

export const TaskItem = ({ onClick, id, title, status, priority, deadline }: TaskItemProps) => {
  const { onDelete, loading: deleting } = useDeleteTask();

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onDelete(id);
  };

  return (
    <li className="taskItem" onClick={onClick}>
      <div className="taskItem--info">
        <span>{title}</span>
        <div className="taskItem--sub-info">
          <span>Status: {status}</span>
          <span>Priority: {priority}</span>
          <span>Deadline: {formatDate(deadline)}</span>
        </div>
      </div>
      <Button loading={deleting} onClick={handleDelete}>
        <TrashIcon />
      </Button>
    </li>
  );
};
