import { useNavigate } from "react-router-dom";

import { PlusIcon } from "../../../../shared/components";
import { routs } from "../../../../router";

import "./newTaskBtn.css";

export const NewTaskBtn = () => {
  const navigate = useNavigate();

  const setOpen = () => {
    navigate(routs.NEW_TASK);
  };

  return (
    <button onClick={setOpen} className="newTaskBtn" type="button">
      <PlusIcon />
    </button>
  );
};
