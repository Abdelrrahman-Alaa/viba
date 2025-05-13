"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { State } from "@/app/_redux/store";
import Loading from "../../loading";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = useSelector((store: State) => store.authReducer.token);
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token]);

  if (!token) {
    return <Loading />;
  }

  return <>{children}</>;
}
