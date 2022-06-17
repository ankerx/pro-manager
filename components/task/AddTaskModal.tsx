import { gql, useMutation, useQuery } from "@apollo/client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { taskQuery } from "./Board";
type Props = {
  show: Boolean;
  setShow: (arg: boolean) => void;
  boardCategory: String;
};
const QueryAllUsers = gql`
  query queryUsers {
    users {
      name
    }
  }
`;
export const createTaskMutation = gql`
  mutation createTask(
    $id: String
    $title: String!
    $description: String!
    $status: String
    $userId: String
  ) {
    createTask(
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

const AddTaskModal: React.FC<Props> = ({ show, setShow, boardCategory }) => {
  const {
    data: usersData,
    loading: usersLoading,
    error: usersError,
  } = useQuery(QueryAllUsers);
  const [createTask, { data, loading, error }] =
    useMutation(createTaskMutation);
  const initialState = {
    title: "",
    description: "",
    assign: "",
  };
  console.log(usersData.users.map((el) => console.log(el.name)));
  const [formData, setFormData] = useState(initialState);

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    createTask({
      variables: {
        title: formData.title,
        description: formData.description,
        status: boardCategory,
      },
      refetchQueries: [{ query: taskQuery }, "taskQuery"],
    });
    setShow(false);
    setFormData(initialState);
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
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
          <div className="justify-center items-center flex flex-grow overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <button
                onClick={() => setShow(false)}
                className="absolute top-1 right-2 text-xl  text-red-500 z-50"
              >
                <FontAwesomeIcon icon={faClose} className="text-2xl" />
              </button>
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
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
                    <select>
                      {usersData &&
                        usersData.users.map((user) => {
                          return <option>{user.name}</option>;
                        })}
                    </select>
                    {/* <input
                      type="text"
                      name="assign"
                      value={formData.assign}
                      className="border border-gray-300 p-2 rounded-md"
                      onChange={handleChange}
                      placeholder="Assing to"
                    /> */}
                  </form>
                </div>
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

export default AddTaskModal;
