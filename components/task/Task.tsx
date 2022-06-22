import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import UpdateTaskModal from "./UpdateTaskModal";

type FormData = {
  title: String;
  description: String;
  assign: String;
};
const Task: React.FC<Task> = ({
  title,
  description,
  id,
  status,
  sections,
  userId,
}) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({
    title: title,
    description: description,
    assign: "",
  });

  return (
    <div className="border border-grey-400 px-4 py-2 hover:bg-gray-200  my-4 flex justify-between items-center">
      <h4>{title}</h4>
      <button
        className="p-2 flex items-center"
        onClick={() => setShowEditModal(!showEditModal)}
      >
        <FontAwesomeIcon icon={faPenToSquare} className="mx-2" />
        Edit
      </button>
      <UpdateTaskModal
        setFormData={setFormData}
        formData={formData}
        title={title}
        description={description}
        setShowEditModal={setShowEditModal}
        showEditModal={showEditModal}
        id={id}
        userId={userId}
        sections={sections}
        status={status}
      />
    </div>
  );
};

export default Task;
