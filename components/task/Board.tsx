import { gql, useQuery } from "@apollo/client";
import { Box, Grid } from "@mui/material";
import BoardSection from "./BoardSection";

const taskQuery = gql`
  query {
    tasks {
      id
      createdAt
      title
      description
      status
    }
  }
`;
const Board: React.FC = () => {
  const { loading, error, data } = useQuery(taskQuery);

  const sections: Array<String> = ["Backlog", "In-Progress", "Review", "Done"];
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div className=" flex justify-between">
      {sections.map((section, index) => {
        let filteredData: Array<Task> = data
          ? data.tasks.filter((task: Task) => {
              return task.status === section;
            })
          : [];
        return (
          <BoardSection title={section} key={index} tasks={filteredData} />
        );
      })}
    </div>
  );
};

export default Board;
