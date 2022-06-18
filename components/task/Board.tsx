import { gql, useQuery } from "@apollo/client";

import BoardSection from "./BoardSection";

export const taskQuery = gql`
  query {
    tasks {
      id
      createdAt
      title
      description
      status
      userId
      user {
        name
      }
    }
  }
`;
const Board: React.FC = () => {
  const { loading, error, data } = useQuery(taskQuery);
  console.log(data);

  const sections: Array<String> = ["Backlog", "In-Progress", "Review", "Done"];
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 align-middle gap-3 lg:gap-10">
      {sections.map((section, index) => {
        let filteredData: Array<Task> = data
          ? data.tasks.filter((task: Task) => {
              return task.status === section;
            })
          : [];
        return (
          <BoardSection
            title={section}
            key={index}
            tasks={filteredData}
            sections={sections}
          />
        );
      })}
    </div>
  );
};

export default Board;
