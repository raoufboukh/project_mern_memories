import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { useEffect, useState } from "react";
import { addMemory } from "../store/memoriesSlice";

interface FormProps {
  className: string;
}

const Form: React.FC<FormProps> = ({ className }) => {
  const [creator, setCreator] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const dispatch: AppDispatch = useDispatch();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string); // Convert file to base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      addMemory({
        creator,
        title,
        message,
        tags,
        image: image || "", // Ensure image is a string
        like: 0,
      })
    );
    // Clear form fields after submission
    setCreator("");
    setTitle("");
    setMessage("");
    setTags("");
    setImage("");
  };
  useEffect(() => {
    if (localStorage.getItem("currentMemory")) {
      const memory = JSON.parse(localStorage.getItem("currentMemory") || "");
      console.log(memory);
      setCreator(memory.creator);
      setTitle(memory.title);
      setMessage(memory.message);
      setTags(memory.tags);
      setImage(memory.image);
    }
  }, []);

  return (
    <div className={className}>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col justify-center items-center rounded-md bg-white mx-auto p-1 gap-2">
          <h2 className="text-xl text-blue-400 outline-none">
            Creating a Memory
          </h2>
          <input
            type="text"
            placeholder="Creator"
            value={creator}
            className="border border-blue-400 outline-none p-2 w-[90%]"
            required
            onChange={(e) => setCreator(e.target.value)}
          />
          <input
            type="text"
            placeholder="Title"
            value={title}
            className="border border-blue-400 outline-none p-2 w-[90%]"
            required
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Message"
            value={message}
            className="border resize-none border-blue-400 outline-none p-2 w-[90%] h-[100px]"
            required
            onChange={(e) => setMessage(e.target.value)}
          />
          <input
            type="text"
            value={tags}
            placeholder="Tags"
            className="border border-blue-400 outline-none p-2 w-[90%]"
            required
            onChange={(e) => setTags(e.target.value)}
          />
          <input
            type="file"
            className="p-2 w-[90%]"
            // value={image || ""}
            onChange={handleFileChange}
          />
          <button type="submit" className="bg-blue-400 text-white p-2 w-[90%]">
            Submit
          </button>
          <button
            type="button"
            onClick={() => {
              setCreator("");
              setTitle("");
              setMessage("");
              setTags("");
              setImage(null);
            }}
            className="bg-red-400 text-white p-2 w-[90%]"
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
