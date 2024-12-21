/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Form from "./Form";
import Posts from "./Posts";

const Home = () => {
  const [memoryToEdit, setMemoryToEdit] = useState<any | null>(null); // State for the memory to edit

  return (
    <div className="relative">
      <div className="flex justify-center items-center rounded-md bg-white lg:w-[930px] mx-auto mt-5 p-1 gap-2">
        <h1 className="uppercase text-blue-400 text-3xl">Memories</h1>
        <img src="./src/assets/memories.png" className="w-7" alt="" />
      </div>
      <div className="flex justify-center rounded-md lg:w-[930px] mx-auto mt-2 gap-14">
        {/* Pass setMemoryToEdit as a prop to Posts */}
        <Posts
          className="basis-[550px] grid grid-cols-2 gap-4"
          onEdit={(memory) => setMemoryToEdit(memory)} // Callback to set memoryToEdit
        />
        {/* Pass memoryToEdit as a prop to Form */}
        <Form
          className="basis-[290px]"
          memoryToEdit={memoryToEdit} // Pass memory to edit
        />
      </div>
    </div>
  );
};

export default Home;
