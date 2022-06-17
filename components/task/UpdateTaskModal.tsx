import { gql, useMutation, useQuery } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import React, { ChangeEvent, useState } from "react";
import { taskQuery } from "./Board";
type FormData = {
  title: String;
  description: String;
  assign: String;
};
type Props = {
  show: Boolean;
  id: String;
  setShow: (arg: boolean) => void;
  setFormData: () => void;
  formData: FormData;
  stauts: String;
  title: String;
  description: String;
  assign?: String;
  sections: String[];
};
const UpdateTaskMutation = gql`
  mutation updateTask(
    $id: String!
    $title: String!
    $description: String
    $status: String
  ) {
    updateTask(
      description: $description
      id: $id
      status: $status
      title: $title
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
const UpdateTaskModal: React.FC<Props> = ({
  showEditModal,
  setShowEditModal,
  boardCategory,
  id,
  formData,
  setFormData,
  sections,
  status,
}) => {
  const [updateTask, { data, loading, error }] =
    useMutation(UpdateTaskMutation);
  // console.log(JSON.stringify(error, null, 2));
  const [selectValue, setSelectValue] = useState(boardCategory);
  const [deleteTask] = useMutation(DeleteTaskMutation);
  const handleDelete = () => {
    deleteTask({
      variables: { id: id },
      refetchQueries: [{ query: taskQuery }, "taskQuery"],
    });
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(event.target.value);
    console.log(selectValue);
  };
  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    updateTask({
      variables: {
        id: id,
        title: formData.title,
        description: formData.description,
        status: selectValue,
      },
      refetchQueries: [{ query: taskQuery }, "taskQuery"],
    });
    setShowEditModal(false);
  };

  return (
    <>
      {showEditModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <button
                onClick={() => setShowEditModal(false)}
                className="absolute top-1 right-2  text-red-500 z-50"
              >
                <FontAwesomeIcon icon={faClose} className="text-2xl" />
              </button>
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    <FontAwesomeIcon icon={faPenToSquare} className="mx-2" />
                    Edit task
                  </h3>
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
                    <label>Category</label>
                    <select
                      className="block appearance-none w-full bg-white border border-gray-200 hover:border-gray-300 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                      onChange={handleSelectChange}
                      defaultValue={status}
                    >
                      {sections.map((section, index) => {
                        return (
                          <option value={section} key={index}>
                            {section}
                          </option>
                        );
                      })}
                    </select>
                  </form>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleSubmit}
                  >
                    Edit task
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
