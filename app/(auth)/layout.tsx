const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" flex justify-center items-center min-h-screen w-full bg-primary-50">
      {children}
    </div>
  );
};

export default Layout;
