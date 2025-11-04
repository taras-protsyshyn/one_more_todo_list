import { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router";

import { TaskItem, NewTaskBtn } from "../../components";
import { useCallApi } from "../../../../shared/hooks";
import { getTasks } from "../../api";
import { routs } from "../../../../router";

import type { TTask } from "../../types";

import "./tasksList.css";

export const TasksList = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [callApi, { data, loading }] = useCallApi<Array<TTask>>(getTasks);

  useEffect(() => {
    // refetch tasks when returning to the tasks list
    if (pathname === routs.HOME) {
      callApi();
    }
  }, [callApi, pathname]);

  const handleDelete = (id: string) => {
    console.log("Delete task with id:", id);
  };

  const handleClick = (id: string) => {
    navigate(routs.taskPath(id));
  };

  return (
    <>
      <div className="tasksListWrapper">
        <h1>Task List</h1>

        <ul className="tasksList">
          {loading && <div>Loading...</div>}
          {data?.map(({ id, ...rest }) => (
            <TaskItem
              key={id}
              onDelete={() => handleDelete(id)}
              onClick={() => handleClick(id)}
              {...rest}
            />
          ))}
        </ul>
        <NewTaskBtn />
      </div>
      <Outlet />
    </>
  );
};
