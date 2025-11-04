import { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router";

import { TaskItem, NewTaskBtn } from "../../components";
import { useCallApi } from "../../../../shared/hooks";
import { getTasks } from "../../api";
import { routs } from "../../../../router";
import { Loader } from "../../../../shared/components";

import type { TTask } from "../../types";

import "./tasksList.css";

export const TasksList = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [callApi, { data, loading, error }] = useCallApi<Array<TTask>>(getTasks);

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
        <Loader style={{ minHeight: "calc(100vh - 125px)" }} loading={loading}>
          <ul className="tasksList">
            {!loading && data?.length === 0 && <p>No tasks available.</p>}
            {!loading && error && <p>Error loading tasks: {error.message}</p>}
            {data?.map(({ id, ...rest }) => (
              <TaskItem
                key={id}
                onDelete={() => handleDelete(id)}
                onClick={() => handleClick(id)}
                {...rest}
              />
            ))}
          </ul>
        </Loader>
        <NewTaskBtn />
      </div>
      <Outlet />
    </>
  );
};
