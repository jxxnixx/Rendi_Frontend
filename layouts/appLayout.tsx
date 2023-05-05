import Header from "@/components/header";
import NavBar from "@/components/NavBar";

interface IProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: IProps) {
  return (
    <div className="flex flex-col">
      <Header />

      {children}
    </div>
  );
}
