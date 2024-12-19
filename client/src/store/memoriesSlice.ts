import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Memory {
  _id: string;
  creator: string;
  title: string;
  message: string;
  tags: string;
  like: number;
  image: string;
}

interface MemoriesState {
  memories: Memory[];
  status: string | null;
  error: string | null;
}

// Initial state
const initialState: MemoriesState = {
  memories: [],
  status: null,
  error: null,
};

export const fetchMemories = createAsyncThunk<Memory[]>(
  "memories/fetchMemories",
  async () => {
    const response = await axios.get("http://localhost:3000/");
    return response.data;
  }
);

export const addMemory = createAsyncThunk<Memory, Memory>(
  "memories/addMemory",
  async (memory) => {
    const response = await axios.post("http://localhost:3000/", memory);
    return response.data;
  }
);

export const deleteMemory = createAsyncThunk<string, string>(
  "memories/deleteMemory",
  async (id) => {
    await axios.delete(`http://localhost:3000/${id}`);
    return id;
  }
);

export const updateMemory = createAsyncThunk<
  Memory,
  { id: string; memory: Partial<Memory> }
>("memories/updateMemory", async ({ id, memory }) => {
  const response = await axios.patch(`http://localhost:3000/${id}`, memory);
  return response.data;
});

// Create slice
export const memoriesSlice = createSlice({
  name: "memories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMemories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchMemories.fulfilled,
        (state, action: PayloadAction<Memory[]>) => {
          state.status = "succeeded";
          state.memories = action.payload;
        }
      )
      .addCase(fetchMemories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch memories";
      })
      .addCase(addMemory.fulfilled, (state, action: PayloadAction<Memory>) => {
        state.memories.push(action.payload);
      })
      .addCase(
        deleteMemory.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.memories = state.memories.filter(
            (memory) => memory._id !== action.payload
          );
        }
      )
      .addCase(
        updateMemory.fulfilled,
        (state, action: PayloadAction<Memory>) => {
          const index = state.memories.findIndex(
            (memory) => memory._id === action.payload._id
          );
          if (index !== -1) {
            state.memories[index] = action.payload;
          }
        }
      );
  },
});

export default memoriesSlice.reducer;
