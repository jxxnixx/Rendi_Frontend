import Header from "@/components/structure/header";

interface IProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: IProps) {
  return (
    <div className="relative flex flex-col">
      <Header />
      {children}
    </div>
  );
}
