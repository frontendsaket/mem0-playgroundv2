/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useState } from "react";
const MemoryContext = createContext<any>({});
const url = import.meta.env.VITE_URL;

const MemoryState = (props: any) => {
  const [memories, setMemories] = useState([]);
  const [loadingMemories, setLoadingMemories] = useState(false);

  const getMemories = async () => {
    try {
      setMemories([]);
      setLoadingMemories(true);
      const response = await fetch(`${url}/api/memory`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token") || "",
          },
        }
      );
      const data = await response.json();

      if (data.success) {
        setMemories(data.memories);
        setLoadingMemories(false);
        return true;
      } else {
        setMemories([]);
        setLoadingMemories(false);
        return false;
      }
    } catch (error) {
      console.log(error);
      setMemories([]);
      setLoadingMemories(false);
      return false;
    }
  };

  const updateMemory = async (memoryid: string, text: string) => {
    try {
      const response = await fetch(`${url}/api/memory`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token") || "",
        },
        body: JSON.stringify({
          memoryid: memoryid,
          text: text,
        }),
      });
      const data = await response.json();

      if (data.success) {
        await getMemories();
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const deleteMemory = async (memoryid: string) => {
    try {
      const response = await fetch(`${url}/api/memory?memoryid=${memoryid}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token") || "",
        },
      });
      const data = await response.json();

      if (data.success) {
        await getMemories();
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const deleteMemories = async () => {
    try {
      setLoadingMemories(true);
      const response = await fetch(`${url}/api/memories`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token") || "",
        },
      });
      const data = await response.json();

      if (data.success) {
        await getMemories();
        return true;
      } else {
        setLoadingMemories(false);
        return false;
      }
    } catch (error) {
      setLoadingMemories(false);
      console.log(error);
      return false;
    }
  };

  return (
    <MemoryContext.Provider value={{ getMemories, memories, updateMemory, deleteMemory,deleteMemories, loadingMemories }}>
      {props.children}
    </MemoryContext.Provider>
  );
};

export default MemoryContext;
export { MemoryState };
