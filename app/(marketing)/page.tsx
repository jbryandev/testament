import Link from 'next/link';
import Balancer from 'react-wrap-balancer';

import { Icons } from '@/components/icons';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

export default function IndexPage() {
  return (
    <>
      <section className='space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32'>
        <div className='container flex max-w-[64rem] flex-col items-center gap-4 text-center'>
          <Link
            href='/waitlist'
            className='rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium'
          >
            Coming Soon. Join the waitlist now.
          </Link>
          <h1 className='font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl'>
            <Balancer>
              Dive Deeper into the Scriptures with {siteConfig.name}
            </Balancer>
          </h1>
          <p className='max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8'>
            <Balancer>
              Your AI-powered Companion for an Enriching Bible Study Experience.
            </Balancer>
          </p>
          <div className='flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0'>
            <Link
              href='/waitlist'
              className={cn(buttonVariants({ size: 'lg' }))}
            >
              Join the Waitlist
            </Link>
            <Link
              href='#features'
              className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
      <section
        id='features'
        className='container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24'
      >
        <div className='mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center'>
          <h2 className='font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl'>
            Features
          </h2>
          <p className='max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7'>
            <Balancer>
              Uncover the richness of the Holy Scriptures like never before with{' '}
              {siteConfig.name}, your intelligent companion for a profound Bible
              reading journey. Whether you&apos;re exploring the sacred texts
              for the first time or seeking new insights into old favorites,{' '}
              {siteConfig.name} is here to guide you.
            </Balancer>
          </p>
        </div>
        <div className='mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3'>
          <div className='relative overflow-hidden rounded-lg border bg-background p-2'>
            <div className='flex h-[230px] flex-col justify-between rounded-md p-6'>
              <Icons.brainCircuit className='h-12 w-12' />
              <div className='space-y-2'>
                <h3 className='font-bold'>Deep Learning</h3>
                <p className='text-sm text-muted-foreground'>
                  Our AI delves into the depths of the Bible, offering a rich
                  tapestry of insights and facilitating a more meaningful
                  engagement with the scriptures.
                </p>
              </div>
            </div>
          </div>
          <div className='relative overflow-hidden rounded-lg border bg-background p-2'>
            <div className='flex h-[230px] flex-col justify-between rounded-md p-6'>
              <Icons.heartHand className='h-12 w-12' />
              <div className='space-y-2'>
                <h3 className='font-bold'>Intuitive AI Guidance</h3>
                <p className='text-sm text-muted-foreground'>
                  Harness the power of artificial intelligence to explore
                  interpretations, historical context, and the intricacies of
                  biblical language.
                </p>
              </div>
            </div>
          </div>
          <div className='relative overflow-hidden rounded-lg border bg-background p-2'>
            <div className='flex h-[230px] flex-col justify-between rounded-md p-6'>
              <Icons.upload className='h-12 w-12' />
              <div className='space-y-2'>
                <h3 className='font-bold'>Upload Your Own Resources</h3>
                <p className='text-sm text-muted-foreground'>
                  Upload your biblical notes to {siteConfig.name}. Our AI
                  adapts, providing tailored insights from the materials you
                  trust and prefer.
                </p>
              </div>
            </div>
          </div>
          <div className='relative overflow-hidden rounded-lg border bg-background p-2'>
            <div className='flex h-[230px] flex-col justify-between rounded-md p-6'>
              <Icons.bookmark className='h-12 w-12' />
              <div className='space-y-2'>
                <h3 className='font-bold'>Grounded in Biblical Canon</h3>
                <p className='text-sm text-muted-foreground'>
                  {siteConfig.name}, rooted in biblical canon, offers reliable
                  insights. Upholding scriptures as truth, we curb bias for
                  dependable spiritual guidance.
                </p>
              </div>
            </div>
          </div>
          <div className='relative overflow-hidden rounded-lg border bg-background p-2'>
            <div className='flex h-[230px] flex-col justify-between rounded-md p-6'>
              <Icons.responsive className='h-12 w-12' />
              <div className='space-y-2'>
                <h3 className='font-bold'>
                  Seamless Cross-Platform Experience
                </h3>
                <p className='text-sm text-muted-foreground'>
                  Whether on your desktop or mobile, your journey through the
                  scriptures is always within reach.
                </p>
              </div>
            </div>
          </div>
          <div className='relative overflow-hidden rounded-lg border bg-background p-2'>
            <div className='flex h-[230px] flex-col justify-between rounded-md p-6'>
              <Icons.lock className='h-12 w-12' />
              <div className='space-y-2'>
                <h3 className='font-bold'>Privacy-Centric</h3>
                <p className='text-sm text-muted-foreground'>
                  Your spiritual journey is personal. {siteConfig.name} respects
                  your privacy and ensures your data remains secure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id='open-source' className='container py-8 md:py-12 lg:py-24'>
        <div className='mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center'>
          <h2 className='font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl'>
            Get started with {siteConfig.name}
          </h2>
          <p className='max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7'>
            <Balancer>
              Whether you&apos;re a seasoned theologian or a curious seeker,
              {siteConfig.name} extends a warm invitation to explore the
              boundless wisdom contained within the Bible. Your quest for
              spiritual understanding just got a smart, reliable companion.
            </Balancer>
          </p>
        </div>
      </section>
    </>
  );
}
