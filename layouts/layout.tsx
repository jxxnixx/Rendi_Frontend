export interface IProps {
  canGoBack?: boolean;
  children: React.ReactNode;

  title?: string;
}

export default function Layout({
  canGoBack,
  children,

  title,
}: IProps) {
  return (
    <>
      <div className="mx-auto w-full">{children}</div>
    </>
  );
}
