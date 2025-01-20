import BudgetForm from "@/components/BudgetForm";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen items-center justify-center p-24">
        <Navbar />
      <BudgetForm />
    </main>
  );
}