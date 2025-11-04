import { Outlet, useNavigate } from "react-router";

import { TaskItem, NewTaskBtn } from "../../components";
import { routs } from "../../../../router";
import { Loader } from "../../../../shared/components";
import { useTasksList } from "../../hooks";

import "./tasksList.css";

export const TasksList = () => {
  const navigate = useNavigate();
  const { tasks, loading, error } = useTasksList();

  const handleClick = (id: string) => {
    navigate(routs.taskPath(id));
  };

  return (
    <>
      <div className="tasksListWrapper">
        <h1>Task List</h1>
        <Loader style={{ minHeight: "calc(100vh - 125px)" }} loading={loading}>
          <ul className="tasksList">
            {!loading && tasks?.length === 0 && <p>No tasks available.</p>}
            {!loading && error && <p>Error loading tasks: {error.message}</p>}
            {tasks?.map(({ id, ...rest }) => (
              <TaskItem key={id} id={id} onClick={() => handleClick(id)} {...rest} />
            ))}
          </ul>
        </Loader>
        <NewTaskBtn />
      </div>
      <Outlet />
    </>
  );
};
