import { gql, useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
type Props = {
  show: Boolean;
  setShow: (arg: boolean) => void;
  boardCategory: String;
  title: String;
  description: String;
  assign?: String;
};
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
const UpdateTaskModal: React.FC<Props> = ({
  show,
  setShow,
  boardCategory,
  description,
  title,
}) => {
  const [updateTask, { data, loading, error }] =
    useMutation(UpdateTaskMutation);

  const [formData, setFormData] = useState({
    title: title,
    description: description,
    assign: "",
  });

  console.log(formData);
  const handleSubmit = (event) => {
    event.preventDefault();
    updateTask({
      variables: {
        title: formData.title,
        description: formData.description,
        status: boardCategory,
      },
    });
    setShow(false);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      {show ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Add task</h3>
                </div>

                <div className="relative p-6 flex-auto">
                  <form className="flex text-center flex-col">
                    <label>Title</label>
                    <input
                      name="title"
                      type="text"
                      value={formData.title}
                      placeholder="Title"
                      onChange={handleChange}
                      className="border border-gray-300 p-2 rounded-md"
                    />

                    <label>Description</label>
                    <input
                      type="text"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Description"
                      className="border border-gray-300 p-2 rounded-md"
                    />
                    <label>Assign to</label>
                    <input
                      type="text"
                      name="assign"
                      value={formData.assign}
                      className="border border-gray-300 p-2 rounded-md"
                      onChange={handleChange}
                      placeholder="Assing to"
                    />
                  </form>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShow(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleSubmit}
                  >
                    Add task
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default UpdateTaskModal;
