"use client";
import { AppState } from "@/store";
import { usePathname, useRouter } from "expo-router";
import { PropsWithChildren, useEffect } from "react";
import { useSelector } from "react-redux";

export function AuthProvider({ children }: PropsWithChildren) {
  const { userDetails } = useSelector((state: AppState) => state.user);
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if (userDetails === null) {
      if (pathname === "/home") router.replace("/");
    } else {
      if (["/"].includes(pathname)) router.replace("/home");
    }
  }, [userDetails, pathname, router]);

  return children;
}
