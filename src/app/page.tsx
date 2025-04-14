import { Sidebar } from "@/components/sidebar/sidebar";

export default function Home() {
  return (
    <div className="flex h-screen bg-background text-foreground transition-colors duration-300">
      <Sidebar />
      <main className="flex-1 p-8 ml-16 transition-all duration-300">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="mt-4 text-muted-foreground">
          Welcome to your dashboard. Toggle the sidebar using the button in the top left.
        </p>
        <div className="grid grid-cols-1 gap-4 mt-8 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="p-6 bg-card rounded-lg border border-border text-foreground transition-colors duration-300"
            >
              <h2 className="text-xl font-semibold">Card {i + 1}</h2>
              <p className="mt-2 text-muted-foreground">
                This is a sample card in the dashboard.
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}