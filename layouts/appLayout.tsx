import NavBar from "@/components/structure/NavBar";
import Footer from "@/components/structure/footer";
import Header from "@/components/structure/header";
import { useScreenSize } from "@/libs/client/useScreen";

interface IProps {
  children: React.ReactNode;
}

// 전체적인 layout
// css 수정해서 중앙 정렬하기
// children( 모든 컴포넌트들 )이 표시되는 영역 설정하기 (중앙 정렬, px 추가)
export default function AppLayout({ children }: IProps) {
  return (
    <div className="relative flex flex-col items-center justify-center">
      <Header />
      <NavBar />
      {children}
      <Footer />
    </div>
  );
}
