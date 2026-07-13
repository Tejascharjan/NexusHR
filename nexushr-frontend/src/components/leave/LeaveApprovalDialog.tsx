import { useState } from "react";
import { CheckCircle2, CircleX } from "lucide-react";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { useAppDispatch, useAppSelector } from "@/state/store";
import { approveLeave, rejectLeave } from "@/state/leaveSlice";
import { toast } from "react-toastify";
import TextAreaField from "../common/TextAreaField";

interface Props {
  open: boolean;
  onClose: () => void;
  action: "APPROVE" | "REJECT";
  leaveId: Number;
}

const LeaveApprovalDialog = ({ open, onClose, action, leaveId }: Props) => {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);

  const [remark, setRemark] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!remark.trim()) {
      toast.error("Please enter remarks.");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        leaveId,
        approverId: user!.id,
        approverRemarks: remark,
      };

      if (action === "APPROVE") {
        await dispatch(approveLeave(payload)).unwrap();
        toast.success("Leave approved successfully.");
      } else {
        await dispatch(rejectLeave(payload)).unwrap();
        toast.success("Leave rejected successfully.");
      }

      setRemark("");
      onClose();
    } catch (error: any) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  const isApprove = action === "APPROVE";

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) {
          setRemark("");
          onClose();
        }
      }}>
      <DialogContent className="max-w-lg p-0 overflow-hidden rounded-2xl border border-slate-700 bg-card-bg">
        <div className={`px-6 py-5 border-b ${isApprove ? "border-green-700 bg-green-500/10" : "border-red-700 bg-red-500/10"}`}>
          <DialogHeader>
            <div className="flex items-center gap-4">
              <div className={`h-14 w-14 rounded-xl flex items-center justify-center ${isApprove ? "bg-green-500/20" : "bg-red-500/20"}`}>
                {isApprove ? <CheckCircle2 className="h-7 w-7 text-green-400" /> : <CircleX className="h-7 w-7 text-red-400" />}
              </div>

              <div>
                <DialogTitle className={`text-xl ${isApprove ? "text-green-400" : "text-red-400"}`}>
                  {isApprove ? "Approve Leave Request" : "Reject Leave Request"}
                </DialogTitle>

                <DialogDescription className="mt-1 text-slate-400">Please provide remarks before continuing.</DialogDescription>
              </div>
            </div>
          </DialogHeader>
        </div>

        {/* Body */}

        <div className="p-6">
          <TextAreaField
            label="Remarks"
            rows={5}
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
            placeholder={isApprove ? "Write approval remarks..." : "Write rejection remarks..."}
          />

          <div className="mt-2 flex justify-between text-xs">
            <span className="text-slate-500">Remarks will be visible to the employee.</span>

            <span className={remark.length > 300 ? "text-red-500" : "text-slate-500"}>{remark.length}/300</span>
          </div>
        </div>

        <DialogFooter className="border-t border-slate-800 bg-primary-bg px-6 py-7">
          <Button
            variant="outline"
            onClick={() => {
              setRemark("");
              onClose();
            }}
            className="border-slate-700 hover:bg-slate-800 text-white">
            Cancel
          </Button>

          <Button disabled={loading} onClick={handleSubmit} className={isApprove ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}>
            {loading ? "Please wait..." : isApprove ? "Approve Leave" : "Reject Leave"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LeaveApprovalDialog;
