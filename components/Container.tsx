export default function Container({ children }: any) {
  return (
    <div className="min-h-screen flex justify-center">
      <div className="w-full max-w-md px-4 py-4">
        {children}
      </div>
    </div>
  );
}