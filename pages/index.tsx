import type { NextPage } from "next";
import Head from "next/head";
import Board from "../components/task/Board";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Task manager</title>
        <meta name="description" content="App for managing tasks" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="grid items-center mx-6 lg:mx-10">
        <h2 className="text-center text-2xl my-8">
          The best project management app on the internet
        </h2>
        <Board />
      </main>
    </div>
  );
};

export default Home;
