import { NotToDoApp } from "@/components/not-todo/NotToDoApp";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto py-8">
        <NotToDoApp />
      </main>
    </div>
  );
}
