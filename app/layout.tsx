import { Metadata } from "next";
import { ClerkProvider } from "@clerk/clerk-react";

export const metadata: Metadata = {
  title: "Kanban Task Management App",
  description: "A task management app built with Next.js and Tailwind CSS",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
