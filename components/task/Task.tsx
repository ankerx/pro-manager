import { gql, useMutation, useQuery } from "@apollo/client";

import UpdateTaskModal from "./UpdateTaskModal";

const UpdateTaskMutation = gql`
  mutation updateTask(
    $id: String
    $title: String!
    $description: String!
    $status: String
    $userId: String
  ) {
    updateTask(
      description: $description
      id: $id
      status: $status
      title: $title
      userId: $userId
    ) {
      id
      title
      description
      status
    }
  }
`;
const DeleteTaskMutation = gql`
  mutation deleteTask($id: String!) {
    deleteTask(id: $id) {
      id
    }
  }
`;
const Task: React.FC<Task> = ({
  title,
  description,
  id,
  status,
  show,
  setShow,
}) => {
  const [updateTask, { data, error, loading }] =
    useMutation(UpdateTaskMutation);
  const [deleteTask] = useMutation(DeleteTaskMutation);
  console.log(title);
  return (
    <div
      className="border border-grey-400 px-4 py-2 hover:bg-gray-200 cursor-pointer"
      onClick={() => setShow(!show)}
    >
      <h4>{title}</h4>
      <UpdateTaskModal
        show={show}
        setShow={setShow}
        status={status}
        title={title}
        description={description}
      />
    </div>
  );
};

export default Task;
