/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Form from "./Form";
import Posts from "./Posts";

const Home = () => {
  const [memoryToEdit, setMemoryToEdit] = useState<any | null>(null);

  return (
    <div className="relative container">
      <div className="flex justify-center items-center rounded-md bg-white lg:w-[930px] mx-auto mt-5 p-1 gap-2">
        <h1 className="uppercase text-blue-400 text-3xl">Memories</h1>
        <img src="./src/assets/memories.png" className="w-7" alt="" />
      </div>
      <div className="flex justify-center rounded-md lg:w-[930px] flex-wrap mx-auto mt-2 gap-14">
        <Posts
          className="lg:basis-[550px] lg:order-3 grid md:grid-cols-2 gap-4"
          onEdit={(memory) => setMemoryToEdit(memory)}
        />
        <Form
          className="lg:basis-[290px] lg:order-7 -order-1"
          memoryToEdit={memoryToEdit}
        />
      </div>
    </div>
  );
};

export default Home;
