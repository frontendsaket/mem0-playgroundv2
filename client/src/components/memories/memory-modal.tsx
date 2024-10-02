import { useContext, useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { RxCross2 } from "react-icons/rx";
import { MemoryItemInterface } from "@/types/memory-types";
import MemoryContext from "@/context/MemoryContext";

const MemoryModal = (props: { handleShowModal: (value: boolean) => void, item: MemoryItemInterface }) => {

    const {  updateMemory, deleteMemory } = useContext(MemoryContext);
  const handleCloseModal = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    props.handleShowModal(false);
  };

  const textRef = useRef<HTMLInputElement>(null);

  const stopPropagation = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  useEffect(()=>{
    textRef.current!.value=props.item.memory;
  },[])

  const handleDeleteMemory = ()=>{
    deleteMemory(props.item.id);
    props.handleShowModal(false);
  }

  const handleUpdateMemory = ()=>{
    if(!textRef.current!.value){
        return;
    }
    updateMemory(props.item.id, textRef.current!.value);
    props.handleShowModal(false);
  }

  return (
    <div
      onClick={handleCloseModal}
      className="bg-black/50 fixed left-0 top-0 w-screen h-screen backdrop-blur-sm flex z-50 align-middle justify-center"
    >
      <div onClick={stopPropagation} className="bg-white flex flex-col max-h-72 w-96 my-auto rounded-lg z-[100] p-4">
        <div className="flex justify-end">
            <RxCross2 className="cursor-pointer" size={20} onClick={()=>props.handleShowModal(false)} />
        </div>
        <h1 className="font-semibold text-lg">Edit Memory</h1>
        <h1 className="text-gray-500 text-[14px]">Make changes to your memory here. Click save when you're done.</h1>
        <Input ref={textRef} placeholder="Name" className="mt-8" />
        <div className="mt-6 flex justify-end gap-3">
            <Button variant="destructive" onClick={handleDeleteMemory}>
                Delete
            </Button>
            <Button onClick={handleUpdateMemory}>
                Save changes
            </Button>
        </div>
      </div>
    </div>
  );
};

export default MemoryModal;
