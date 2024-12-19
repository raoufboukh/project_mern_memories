import { BsThreeDots } from "react-icons/bs";
import { BiSolidLike } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchMemories } from "../store/memoriesSlice";
import { AppDispatch, RootState } from "../store/store";

interface PostsProps {
  className: string;
}

const Posts: React.FC<PostsProps> = ({ className }) => {
  const memories = useSelector((state: RootState) => state.memories.memories);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMemories());
  }, [dispatch]);
  console.log(memories);
  return (
    <div className={className}>
      <div className="bg-white rounded-xl overflow-hidden h-[400px]">
        <div className="relative h-40">
          <img src="./src/assets/bg.webp" className="w-full h-full" alt="" />
          <div className="absolute w-full  text-white text-sm top-0 left-0 p-2">
            <div className="flex justify-between items-center">
              <h3>Raouf</h3>
              <BsThreeDots className="cursor-pointer" />
            </div>
            <p>3 Hours ago</p>
          </div>
        </div>
        <div className="flex flex-col justify-between h-[240px]">
          <div className="p-3">
            <p className="text-gray-400">#fun</p>
            <h2 className="text-2xl my-3">Title</h2>
            <p className="text-gray-400">description of this memory</p>
          </div>
          <div className="flex justify-between p-3 items-end">
            <button className="flex items-center gap-2 text-blue-400">
              <BiSolidLike /> Like
            </button>
            <button className="flex items-center gap-2 text-red-400">
              <MdDelete /> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;
