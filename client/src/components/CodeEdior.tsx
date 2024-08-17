import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { materialInit } from "@uiw/codemirror-theme-material";
import { loadLanguage } from "@uiw/codemirror-extensions-langs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { updateCode } from "@/redux/slices/compilerSlice";

const CodeEdior = () => {
  const currentLanguage = useSelector(
    (state: RootState) => state.compilerSlice.selectedLanguage
  );
  const code = useSelector(
    (state: RootState) => state.compilerSlice.code
  );
  const dispatch = useDispatch();
  const onChange = React.useCallback((value: string) => {
    // console.log("val:", val);
    // setValue(val);
    dispatch(updateCode(value))
  }, []);
  return (
    <CodeMirror
      value={code[currentLanguage]}
      height="calc(100vh - 108px)"
      extensions={[loadLanguage(currentLanguage)!]}
      onChange={onChange}
      theme={materialInit({
        settings: {
          caret: "#c6c6c6",
          fontFamily: "monospace",
        },
      })}
    />
  );
};

export default CodeEdior;
