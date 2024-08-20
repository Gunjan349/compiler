import CodeCompiler from "@/components/CodeCompiler";
import CodeEditor from "@/components/CodeEditor";
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
import { useMediaQuery } from "react-responsive";
import API_URL from "@/constants";

const Compiler = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const isSmallScreen = useMediaQuery({ query: "(max-width:768px)" });

  const getCode = async () => {
    try {
      const response = await axios.post(API_URL + "/compiler/load", {
        id,
      });
      dispatch(updateCodeBody(response.data.code));
    } catch (error) {
      if (axios?.isAxiosError(error)) {
        if (error.response?.status === 500) {
          toast("Invalid URL. Default code loaded!!");
        }
        throw error;
      }
      handleError(error);
    }
  };
  useEffect(() => {
    if (id) {
      getCode();
    }
  }, [id]);
  return (
    <ResizablePanelGroup
      direction={isSmallScreen ? "vertical" : "horizontal"}
      className={`${
        isSmallScreen ? "min-h-[calc(100dvh-64px)] max-w-100px" : ""
      }`}
    >
      <ResizablePanel
        className={`${
          isSmallScreen ? "max-h-20px" : "h-[calc(100dvh-64px)] min-w-[350px]"
        } `}
      >
        <SubHeader />
        <CodeEditor />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel  className={`${
          isSmallScreen ? "max-h-20px" : "h-[calc(100dvh-64px)] min-w-[350px]"
        } `}>
        <CodeCompiler />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default Compiler;
