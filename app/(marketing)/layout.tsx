import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  return (
    <div className='relative flex min-h-screen flex-col'>
      <SiteHeader />
      <div className='flex-1'>{children}</div>
      <SiteFooter />
    </div>
  );
}