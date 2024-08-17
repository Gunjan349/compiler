import CodeCompiler from "@/components/CodeCompiler";
import CodeEdior from "@/components/CodeEdior";
import SubHeader from "@/components/SubHeader";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { updateCodeBody } from "@/redux/slices/compilerSlice";
import { handleError } from "@/utils/handleError";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const Compiler = () => {

  const dispatch = useDispatch();
  const {id} = useParams();

  const getCode = async () => {
    try{
       const response = await axios.post("http://localhost:4000/compiler/load", {id})
       dispatch(updateCodeBody(response.data.code))
    }
    catch(error){
      if(axios?.isAxiosError(error)){
        if(error.response?.status === 500){
          toast("Invalid URL. Default code loaded!!")
        }
        throw error;
      }
      handleError(error)
    }
  }
  useEffect(() => {
    if(id){
       getCode();
    }
  },[id])
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel
        className="h-[calc(100dvh-64px)] min-w-[350px]"
        defaultSize={50}
      >
        <SubHeader />
        <CodeEdior />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel
        className="h-[calc(100dvh-64px)] min-w-[350px]"
        defaultSize={50}
      >
        <CodeCompiler />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default Compiler;
