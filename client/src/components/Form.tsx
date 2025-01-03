/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { useEffect, useState } from "react";
import { addMemory, updateMemory } from "../store/memoriesSlice";

interface FormProps {
  className: string;
  memoryToEdit?: any;
  onEdit: (memory: any) => void;
}

const Form: React.FC<FormProps> = ({ className, memoryToEdit, onEdit }) => {
  const [creator, setCreator] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (memoryToEdit) {
      setCreator(memoryToEdit.creator || "");
      setTitle(memoryToEdit.title || "");
      setMessage(memoryToEdit.message || "");
      setTags(memoryToEdit.tags || "");
      setImage(memoryToEdit.image || null);
    }
  }, [memoryToEdit]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const memoryData = {
      creator,
      title,
      message,
      tags,
      image: image || "",
      like: memoryToEdit?.like || 0,
      _id: memoryToEdit?._id,
    };

    if (memoryToEdit) {
      dispatch(updateMemory({ id: memoryData._id, memory: memoryData }));
      onEdit("");
    } else {
      dispatch(addMemory(memoryData));
    }

    setCreator("");
    setTitle("");
    setMessage("");
    setTags("");
    setImage(null);
  };

  console.log(memoryToEdit);
  return (
    <div className={className}>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col justify-center items-center rounded-md bg-white mx-auto p-1 gap-2">
          <h2 className="text-xl text-blue-400 outline-none">
            {memoryToEdit ? "Editing a Memory" : "Creating a Memory"}
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
              onEdit("");
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
