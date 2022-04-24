import { Memory } from "../constants/models/Memory";
import { MEMORY } from "../constants/routes";
import { API } from "./api";

export const getAllPublicMemories = async () => {
  try {
    const res = await API.get<{ success: true; data: Memory[]; count: number }>(
      `/${MEMORY}`
    );
    return res.data.data;
  } catch (error) {
    throw error;
  }
};

export const getMyMemories = async () => {
  try {
    const res = await API.get<{ success: true; data: Memory[]; count: number }>(
      `/${MEMORY}/my-memory`
    );
    return res.data.data;
  } catch (error) {
    throw error;
  }
};

export const getMemoryById = async (id: string) => {
  try {
    const res = await API.get<{ success: true; data: Memory }>(
      `/${MEMORY}/${id}`
    );
    return res.data.data;
  } catch (error) {
    throw error;
  }
};

export const createMemory = async (
  name: string,
  url: string,
  memoryType: string,
  privacy: string
) => {
  try {
    const res = await API.post<{ success: true; data: Memory }>(`/${MEMORY}`, {
      name,
      url,
      memoryType,
      privacy,
    });
    return res.data.data;
  } catch (error) {
    throw error;
  }
};

export const updateMemory = async (
  id: string,
  name: string,
  url: string,
  memoryType: string,
  privacy: string
) => {
  try {
    const res = await API.put<{ success: true; data: Memory }>(
      `/${MEMORY}/${id}`,
      {
        name,
        url,
        memoryType,
        privacy,
      }
    );
    return res.data.data;
  } catch (error) {
    throw error;
  }
};

export const deleteMemory = async (id: string) => {
  try {
    const res = await API.delete<{ success: true; data: string }>(
      `/${MEMORY}/${id}`
    );
    return res.data.data;
  } catch (error) {
    throw error;
  }
};
