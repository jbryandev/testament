import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { dashboardConfig } from '@/config/dashboard';
import { checkAuth } from '@/lib/auth/utils';

interface ReadLayoutProps {
  children: React.ReactNode;
}

export default async function ReadLayout({ children }: ReadLayoutProps) {
  await checkAuth();
  return (
    <div className='grid min-h-screen grid-rows-[auto,1fr,auto] space-y-6'>
      <SiteHeader items={dashboardConfig.mainNav} />
      {/* <ScriptureNav /> */}
      <div className='flex-1'>{children}</div>
      <SiteFooter />
    </div>
  );
}
