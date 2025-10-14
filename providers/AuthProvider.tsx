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
      if (pathname !== "/login") router.replace("/login");
    } else {
      if (["/", "/login"].includes(pathname)) router.replace("/(tabs)");
    }
  }, [userDetails, pathname, router]);

  return children;
}
