interface FormProps {
  className: string;
}

const Form: React.FC<FormProps> = ({ className }) => {
  return (
    <div className={className}>
      <form action="">
        <div className="flex flex-col justify-center items-center rounded-md bg-white mx-auto p-1 gap-2">
          <h2 className="text-xl text-blue-400 outline-none">
            Creating a Memory
          </h2>
          <input
            type="text"
            placeholder="Creator"
            className="border border-blue-400 outline-none p-2 w-[90%]"
          />
          <input
            type="text"
            placeholder="Title"
            className="border border-blue-400 outline-none p-2 w-[90%]"
          />
          <textarea
            placeholder="Message"
            className="border resize-none border-blue-400 outline-none p-2 w-[90%] h-[100px]"
          />
          <input
            type="text"
            placeholder="Tags"
            className="border border-blue-400 outline-none p-2 w-[90%]"
          />
          <input type="file" placeholder="File" className=" p-2 w-[90%]" />
          <button className="bg-blue-400 text-white p-2 w-[90%]">Submit</button>
          <button className="bg-red-400 text-white p-2 w-[90%]">Close</button>
        </div>
      </form>
    </div>
  );
};

export default Form;
