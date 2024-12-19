/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface NewMemory {
  creator: string;
  title: string;
  message: string;
  tags: string;
  like: number;
  image: string;
}

interface Memory extends NewMemory {
  _id: string;
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
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:3000/");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch memories");
    }
  }
);

export const addMemory = createAsyncThunk<Memory, NewMemory>(
  "memories/addMemory",
  async (memory, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:3000/", memory);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to add memory");
    }
  }
);

export const deleteMemory = createAsyncThunk<string, string>(
  "memories/deleteMemory",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:3000/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to delete memory");
    }
  }
);

export const likeMemory = createAsyncThunk<Memory, string>(
  "memories/likeMemory",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`http://localhost:3000/${id}/like`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to like memory");
    }
  }
);

export const updateMemory = createAsyncThunk<
  Memory,
  { id: string; memory: Partial<Memory> }
>("memories/updateMemory", async ({ id, memory }, { rejectWithValue }) => {
  try {
    const response = await axios.patch(`http://localhost:3000/${id}`, memory);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message || "Failed to update memory");
  }
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
        state.error = action.payload as string;
      })
      .addCase(addMemory.fulfilled, (state, action: PayloadAction<Memory>) => {
        state.memories.push(action.payload);
      })
      .addCase(addMemory.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(
        deleteMemory.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.memories = state.memories.filter(
            (memory) => memory._id !== action.payload
          );
        }
      )
      .addCase(deleteMemory.rejected, (state, action) => {
        state.error = action.payload as string;
      })
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
      )
      .addCase(likeMemory.fulfilled, (state, action: PayloadAction<Memory>) => {
        const index = state.memories.findIndex(
          (memory) => memory._id === action.payload._id
        );
        if (index !== -1) {
          state.memories[index] = action.payload;
        }
      });
  },
});

export default memoriesSlice.reducer;
