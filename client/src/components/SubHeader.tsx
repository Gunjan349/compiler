import { Button } from "./ui/button";
import { IoIosSave } from "react-icons/io";
import { FaShareFromSquare } from "react-icons/fa6";
import { MdContentCopy } from "react-icons/md";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import {
  CompilerSliceStateType,
  updateSelectedLanguage,
} from "@/redux/slices/compilerSlice";
import { RootState } from "@/redux/store";
import { handleError } from "@/utils/handleError";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

const SubHeader = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [shareBtn, setShareBtn] = useState<boolean>(false);
  const dispatch = useDispatch();
  const currentLanguage = useSelector(
    (state: RootState) => state.compilerSlice.selectedLanguage
  );

  const { id } = useParams();

  const code = useSelector((state: RootState) => state.compilerSlice.code);

  useEffect(() => {
    if (id) {
      setShareBtn(true);
    }
  }, [id]);

  const handleSaveCode = async () => {
    setLoading(true);
    try {
      const response = await axios.post("https://compiler-n0js.onrender.com/compiler/save", {
        code: code,
      });
      console.log(response)
      navigate(`/compiler/${response.data.url}`, { replace: true });
      toast("Code has been saved!!")
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-slate-950 text-white h-11 px-2 flex items-center justify-between">
      <div className="flex gap-x-2 items-center">
        <Button variant="secondary" onClick={handleSaveCode} disabled={loading}>
          {loading ? (
            <div className="flex items-center gap-x-2">
              <AiOutlineLoading3Quarters className="animate-spin" />
              Saving
            </div>
          ) : (
            <>
              <IoIosSave className="pr-1 text-xl" />
              Save
            </>
          )}
        </Button>
        {shareBtn && (
          <Dialog>
            <DialogTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground text-lg h-9 px-4 py-2">
              <FaShareFromSquare className="pr-1" />
              Share
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  <div className="flex items-center gap-x-2 justify-center">
                    <FaShareFromSquare />
                    Share Code!!
                  </div>
                  <p className="text-center text-sm my-2 ">
                    Copy given url to share your code!
                  </p>
                </DialogTitle>
                <DialogDescription className="flex items-center gap-x-2">
                  <input
                    type="text"
                    disabled
                    value={window.location.href}
                    className="w-full p-1.5 rounded-md bg-slate-800 text-white text-base"
                  />
                  <Button
                    variant="secondary"
                    onClick={() => {
                      window.navigator.clipboard.writeText(
                        window.location.href
                      );
                      toast("Copied to clipboard!");
                    }}
                  >
                    <MdContentCopy />
                  </Button>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        )}
      </div>
      <div>
        <Select
          defaultValue={currentLanguage}
          onValueChange={(value) =>
            dispatch(
              updateSelectedLanguage(
                value as CompilerSliceStateType["selectedLanguage"]
              )
            )
          }
        >
          <SelectTrigger className="w-[130px] focus:ring-0 bg-slate-800">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="html">HTML</SelectItem>
            <SelectItem value="css">CSS</SelectItem>
            <SelectItem value="javascript">JavaScript</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SubHeader;
