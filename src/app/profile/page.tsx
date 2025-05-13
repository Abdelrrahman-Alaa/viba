import React from "react";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";

export default function Profile() {
  return (
    <ProtectedRoute>
      <div>Profile</div>
    </ProtectedRoute>
  );
}
