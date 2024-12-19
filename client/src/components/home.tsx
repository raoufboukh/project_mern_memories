import Form from "./Form";
import Posts from "./Posts";

const Home = () => {
  return (
    <div className="relative ">
      <div className="flex justify-center items-center rounded-md bg-white lg:w-[930px] mx-auto mt-5 p-1 gap-2">
        <h1 className="uppercase text-blue-400 text-3xl">Memories</h1>
        <img src="./src/assets/memories.png" className="w-7" alt="" />
      </div>
      <div className="flex justify-center rounded-md lg:w-[930px] mx-auto mt-2 gap-14">
        <Posts className="basis-[550px] grid grid-cols-2 gap-4" />
        <Form className="basis-[290px]" />
      </div>
    </div>
  );
};

export default Home;
