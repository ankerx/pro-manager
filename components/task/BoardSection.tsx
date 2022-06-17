import { useState } from "react";
import Task from "./Task";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import AddTaskModal from "./AddTaskModal";
interface BoardSectionProps {
  title: String;
  tasks: Array<Task>;
  sections: String[];
}

const BoardSection: React.FC<BoardSectionProps> = ({
  title,
  tasks,
  sections,
}) => {
  const [show, setShow] = useState(false);
  return (
    <div className="max-w-sm m-4">
      <div className="flex justify-between">
        <h3>{title}</h3>
        <button onClick={() => setShow(!show)} className="mr-2">
          <FontAwesomeIcon icon={faPlus} />
        </button>
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
                sections={sections}
              />
            );
          })}
        {tasks.length > 0 && (
          <button
            onClick={() => setShow(!show)}
            className="bg-blue-500 text-white py-2 px-4 w-full hover:bg-blue-600 "
          >
            <FontAwesomeIcon icon={faPlus} /> Add task
          </button>
        )}
        {tasks.length === 0 && (
          <div>
            <button
              onClick={() => setShow(!show)}
              className="hover:bg-gray-200 w-full py-2"
            >
              Add task <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        )}
      </div>
      <AddTaskModal
        show={show}
        setShow={setShow}
        boardCategory={title}
        sections={sections}
      />
    </div>
  );
};

export default BoardSection;
