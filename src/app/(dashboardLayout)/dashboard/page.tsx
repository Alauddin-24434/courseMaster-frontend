"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Card } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function DashboardNotice() {
  const { user } = useSelector((state: RootState) => state.cmAuth);
  const role = user?.role || "student";

  // Optional: dynamic message based on role
  const noticeMessage =
    role === "admin"
      ? "⚠️ Admin Dashboard is under development. Some analytics may be missing."
      : "⚠️ Student Dashboard is under development. Some features may not work.";

  return (
    <Card className="bg-yellow-50 border-yellow-200 p-4 flex items-center gap-3">
      <AlertCircle className="w-6 h-6 text-yellow-600" />
      <p className="text-yellow-800 font-medium">{noticeMessage}</p>
    </Card>
  );
}
