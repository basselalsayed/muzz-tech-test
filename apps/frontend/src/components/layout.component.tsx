export const Layout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div className='relative h-full w-full overflow-hidden rounded-lg border-[#cfcfcf]'>
    {children}
  </div>
);
