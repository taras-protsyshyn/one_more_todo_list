import { formatDate } from "../../../../shared/utils";
import { Button, TrashIcon } from "../../../../shared/components";
import type { Priority, Status } from "../../constants";

import "./taskItem.css";

type TaskItemProps = {
  title: string;
  status: Status;
  priority: Priority;
  deadline: Date;
  onDelete: () => void;
  onClick: () => void;
  deleting?: boolean;
};

export const TaskItem = ({
  onDelete,
  onClick,
  title,
  status,
  priority,
  deadline,
  deleting,
}: TaskItemProps) => {
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onDelete();
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
