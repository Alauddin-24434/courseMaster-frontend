"use client";

import {
  BarChart,
  Calendar,
  FileText,
  HelpCircle,
  Home,
  Inbox,
  Settings,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

// -------- COMMON MENU FOR ALL ROLES --------
const commonItems = [{ title: "Settings", url: "#", icon: Settings }];

// -------- MENU BY ROLE --------
export const studentItems = [
  { title: "Home", url: "/dashboard", icon: Home },
  { title: "My Courses", url: "/dashboard/student/my-courses", icon: Inbox },
  

];

export const adminItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  {
    title: "Manage Courses",
    url: "/dashboard/admin/manage-courses",
    icon: Inbox,
  },
  {
    title: "Manage Categories",
    url: "/dashboard/admin/mange-categories",
    icon: Inbox,
  },
  { title: "Manage Enrollments", url: "/admin/enrollments", icon: Calendar },
  { title: "Review Assignments", url: "/admin/assignments", icon: FileText },
  { title: "Quiz Results", url: "/admin/quizzes", icon: BarChart },
];

export function AppSidebar() {
  const { user } = useSelector((state: RootState) => state.cmAuth);
  const role = user?.role || "student";

  const getMenuByRole = () => {
    switch (role) {
      case "admin":
        return [...adminItems, ...commonItems];
      default:
        return [...studentItems, ...commonItems];
    }
  };

  const menuItems = getMenuByRole();

  return (
    <Sidebar>
      <SidebarContent>
        {/* PROFILE HEADER */}
        <div className="p-4 border-b flex items-center gap-3">
          <img
            src={user?.avatar || "/default-avatar.png"}
            alt="profile"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold text-sm">{user?.name || "User Name"}</p>
            <p className="text-xs text-gray-500 capitalize">{role}</p>
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>
            {role === "admin"
              ? "Admin Panel"
              : role === "instructor"
              ? "Instructor Panel"
              : "Student Panel"}
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
