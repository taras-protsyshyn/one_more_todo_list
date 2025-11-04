import { useEffect } from "react";
import { Outlet } from "react-router";

import { TaskItem, NewTaskBtn } from "../../components";
import { useCallApi } from "../../../../shared/hooks";
import { getTasks } from "../../api";

import type { TTask } from "../../types";

import "./tasksList.css";

export const TasksList = () => {
  const [callApi, { data, loading }] = useCallApi<Array<TTask>>(getTasks);

  useEffect(() => {
    callApi();
  }, [callApi]);

  const handleDelete = (id: string) => {
    console.log("Delete task with id:", id);
  };

  const handleClick = (id: string) => {
    console.log("Click task with id:", id);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="tasksListWrapper">
        <h1>Task List</h1>
        <ul className="tasksList">
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
