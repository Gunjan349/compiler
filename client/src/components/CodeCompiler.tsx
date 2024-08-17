import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

const CodeCompiler = () => {
  const code = useSelector((state: RootState) => state.compilerSlice.code);

  const fullCode = `
<html><style>${code.css}</style><body>${code.html}</body><script>${code.javascript}</script></html>`;

  const encodedCode = `data:text/html;charset=utf-8,${encodeURIComponent(
    fullCode
  )}`;

  return (
    <div className="bg-white h-[calc(100dvh-64px)]">
      <iframe className="h-full w-full" src={encodedCode} />
    </div>
  );
};

export default CodeCompiler;
