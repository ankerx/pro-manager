import { useState } from "react";
import Task from "./Task";
import AddTaskModal from "./AddTaskModal";
interface BoardSectionProps {
  title: String;
  tasks: Array<Task>;
}

const BoardSection: React.FC<BoardSectionProps> = ({ title, tasks }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="w-full m-4 ">
      <div className="flex justify-between mx-2">
        <h3>{title}</h3>
        <button className="mr-2">+</button>
      </div>
      <div className=" p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md ">
        {tasks &&
          tasks.map((task: Task) => {
            return (
              <Task
                key={task.id}
                status={task.status}
                title={task.title}
                description={task.description}
                id={task.id}
                setShow={setShow}
                show={show}
              />
            );
          })}
        {tasks.length > 0 && (
          <button
            onClick={() => setShow(!show)}
            className="bg-blue-500 text-white py-2 px-4 w-full "
          >
            + Add task
          </button>
        )}
        {tasks.length === 0 && (
          <div>
            <button onClick={() => setShow(!show)}>Add task+</button>
          </div>
        )}
      </div>
      <AddTaskModal show={show} setShow={setShow} boardCategory={title} />
    </div>
  );
};

export default BoardSection;
