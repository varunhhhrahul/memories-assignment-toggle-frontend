import { NavigateFunction } from "react-router-dom";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Memory } from "../constants/models/Memory";
import { AppThunk } from "../app/store";
import * as REQUESTS from "../api/memoryRequests";
import { setErrorMsg, setSuccessMsg } from "./alertSlice";
import { DASHBOARD } from "../constants/routes";

export interface memoryState {
  allMemories: Memory[];
  privateMemories: Memory[];
  publicMemories: Memory[];
  memory: Memory | null;
  loading: boolean;
}

export const initialState: memoryState = {
  allMemories: [],
  privateMemories: [],
  publicMemories: [],
  memory: null,
  loading: false,
};

const memorySlice = createSlice({
  name: "memory",
  initialState,
  reducers: {
    memoryStart(state) {
      state.loading = true;
    },
    memoryComplete(state) {
      state.loading = false;
    },
    setAllMemories(state, action: PayloadAction<Memory[]>) {
      state.allMemories = action.payload;
    },
    setPrivateMemories(state, action: PayloadAction<Memory[]>) {
      state.privateMemories = action.payload;
    },
    setPublicMemories(state, action: PayloadAction<Memory[]>) {
      state.publicMemories = action.payload;
    },
    setMemory(state, action: PayloadAction<Memory | null>) {
      state.memory = action.payload;
    },

    setLoading(state) {
      state.loading = !state.loading;
    },
  },
});

export const {
  memoryComplete,
  memoryStart,
  setAllMemories,
  setMemory,
  setPrivateMemories,
  setPublicMemories,
  setLoading,
} = memorySlice.actions;

export default memorySlice.reducer;

// thunks

// get all memories which are public
export const getAllPublicMemories = (): AppThunk => async (dispatch) => {
  try {
    dispatch(memoryStart());
    const data = await REQUESTS.getAllPublicMemories();
    dispatch(setAllMemories(data));
    dispatch(memoryComplete());
  } catch (err: any) {
    dispatch(setErrorMsg(err.response.data.error));
  }
};

// My memories
export const getMyMemories = (): AppThunk => async (dispatch) => {
  try {
    dispatch(memoryStart());
    const data = await REQUESTS.getMyMemories();
    dispatch(
      setPrivateMemories(data.filter((memory) => memory.privacy === "private"))
    );
    dispatch(
      setPublicMemories(data.filter((memory) => memory.privacy === "public"))
    );
    dispatch(memoryComplete());
  } catch (err: any) {
    dispatch(setErrorMsg(err.response.data.error));
  }
};

// add memory
export const addMemory =
  (
    name: string,
    url: string,
    memoryType: string,
    privacy: string,
    navigate: NavigateFunction
  ): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(memoryStart());
      const data = await REQUESTS.createMemory(name, url, memoryType, privacy);
      // dispatch(setMemory(data));
      dispatch(setSuccessMsg("Memory added successfully"));
      dispatch(getMyMemories());
      dispatch(getAllPublicMemories());
      navigate(DASHBOARD);
      dispatch(memoryComplete());
    } catch (err: any) {
      dispatch(setErrorMsg(err.response.data.error));
    }
  };

// update memory
export const updateMemory =
  (
    id: string,
    name: string,
    url: string,
    memoryType: string,
    privacy: string,
    navigate: NavigateFunction
  ): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(memoryStart());
      const data = await REQUESTS.updateMemory(
        id,
        name,
        url,
        memoryType,
        privacy
      );
      dispatch(setMemory(null));
      dispatch(getMyMemories());
      dispatch(getAllPublicMemories());
      dispatch(setSuccessMsg("Memory updated successfully"));
      navigate(DASHBOARD);
      dispatch(memoryComplete());
    } catch (err: any) {
      dispatch(setErrorMsg(err.response.data.error));
    }
  };

// delete memory
export const deleteMemory =
  (id: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(memoryStart());
      const data = await REQUESTS.deleteMemory(id);
      dispatch(setMemory(null));
      dispatch(setSuccessMsg("Memory deleted successfully"));
      dispatch(getMyMemories());
      dispatch(getAllPublicMemories());
      dispatch(memoryComplete());
    } catch (err: any) {
      dispatch(setErrorMsg(err.response.data.error));
    }
  };

// get memory
export const getMemory =
  (id: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(memoryStart());
      const data = await REQUESTS.getMemoryById(id);
      dispatch(setMemory(data));
      dispatch(memoryComplete());
    } catch (err: any) {
      dispatch(setErrorMsg(err.response.data.error));
    }
  };
