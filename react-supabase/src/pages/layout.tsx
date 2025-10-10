import { Outlet } from "react-router";
import { AppFooter, AppHeader } from "../components/common";
import UseAuthListener from "@/hooks/use-auth";

export default function RootLayout() {

  UseAuthListener();

  return (
    <div className="page">
        <AppHeader />
        <div className="container">
            <Outlet />
        </div>
        <AppFooter />
      </div>
  )
}
