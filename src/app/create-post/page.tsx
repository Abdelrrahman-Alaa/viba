import React from "react";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";

export default function CreatePost() {
  return (
    <ProtectedRoute>
      <div>CreatePost</div>
    </ProtectedRoute>
  );
}
