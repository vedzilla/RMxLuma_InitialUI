'use client';

import { useState } from 'react';
import Link from 'next/link';

const faqGroups = [
  {
    title: 'Getting Started',
    faqs: [
      {
        question: 'What is Redefine Me?',
        answer:
          'Redefine Me is a discovery platform for university society events across the UK. We aggregate events from societies at universities nationwide so you can find what\u2019s happening near you \u2014 all in one place.',
      },
      {
        question: 'How do I find events?',
        answer:
          'Head to the Discover page to browse all upcoming events. You can filter by category, search by name, or browse by university and city. Each event card shows the key details at a glance.',
      },
      {
        question: 'Is Redefine Me free?',
        answer:
          'Yes, Redefine Me is completely free to use. Browse events on the web or download the app at no cost.',
      },
      {
        question: 'How do I register for an event?',
        answer:
          'We don\u2019t handle ticketing or registration directly. Each event links to the society\u2019s own registration page \u2014 whether that\u2019s Fixr, Eventbrite, a Google Form, or their own website. Just tap the event and follow the link.',
      },
    ],
  },
  {
    title: 'Account & Data',
    faqs: [
      {
        question: 'Do I need an account to browse events?',
        answer:
          'No. You can browse all events on the web without creating an account. An account is only needed if you use the mobile app and want to save preferences.',
      },
      {
        question: 'How do I delete my account?',
        answer:
          'You can delete your account from within the app under Settings \u2192 Delete Account, or visit our account deletion page. If you need further help, contact us at admin@redefine-me.com.',
      },
      {
        question: 'What data do you collect?',
        answer:
          'We collect minimal data needed to run the platform. For full details, see our privacy policy. Event data is sourced from public society Instagram profiles.',
      },
    ],
  },
  {
    title: 'For Societies',
    faqs: [
      {
        question: 'How do I list my society\u2019s events?',
        answer:
          'Get in touch with us at admin@redefine-me.com with your society name, university, and social media or website links. We\u2019ll be in touch about getting your events on the platform.',
      },
      {
        question: 'Why can\u2019t I find my university?',
        answer:
          'We\u2019re still growing our network of universities. If your university isn\u2019t listed yet, email us at admin@redefine-me.com and we\u2019ll look into adding it.',
      },
      {
        question: 'Can I manage my society\u2019s events directly?',
        answer:
          'Not yet \u2014 but we\u2019re working on a society dashboard where you\u2019ll be able to post and manage events natively. For now, we pull events from your public Instagram posts automatically.',
      },
    ],
  },
  {
    title: 'Troubleshooting',
    faqs: [
      {
        question: 'The event details are wrong \u2014 what should I do?',
        answer:
          'Event details are extracted from society posts and may occasionally be inaccurate. If something looks wrong, let us know via our support page or email admin@redefine-me.com and we\u2019ll get it corrected.',
      },
      {
        question: 'An event is missing \u2014 why?',
        answer:
          'We scrape public Instagram profiles on a regular schedule. If an event was posted very recently, it may not have been picked up yet. If it\u2019s been more than a day, contact us and we\u2019ll investigate.',
      },
      {
        question: 'The app isn\u2019t loading or something looks broken',
        answer:
          'Try refreshing the page or clearing your browser cache. If the issue persists, email us at admin@redefine-me.com with a description of the problem and any screenshots \u2014 we\u2019ll look into it.',
      },
    ],
  },
];

export default function HelpPageClient() {
  const [openKey, setOpenKey] = useState<string | null>(null);

  function toggle(key: string) {
    setOpenKey(openKey === key ? null : key);
  }

  return (
    <div className="py-12 px-[18px]">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/discover"
          className="inline-flex items-center text-sm text-subtle hover:text-brand mb-6 transition-colors"
        >
          &larr; Back to Discover
        </Link>

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-text mb-2">Help Centre</h1>
          <p className="text-subtle">
            Find answers to common questions about using Redefine Me.
          </p>
        </div>

        {/* FAQ Groups */}
        {faqGroups.map((group) => (
          <section key={group.title} className="mb-10">
            <h2 className="text-xl font-semibold text-text mb-4 pb-2 border-b border-border">
              {group.title}
            </h2>
            <div className="space-y-2">
              {group.faqs.map((faq) => {
                const key = `${group.title}-${faq.question}`;
                return (
                  <div
                    key={key}
                    className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm border border-border overflow-hidden"
                  >
                    <button
                      onClick={() => toggle(key)}
                      className="w-full flex items-center justify-between px-6 py-4 text-left"
                    >
                      <span className="font-medium text-text">{faq.question}</span>
                      <span className="text-subtle ml-4 flex-shrink-0 text-lg leading-none">
                        {openKey === key ? '\u2212' : '+'}
                      </span>
                    </button>
                    {openKey === key && (
                      <div className="px-6 pb-5 text-subtle leading-relaxed border-t border-border pt-4">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        ))}

        {/* Still need help */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-text mb-4 pb-2 border-b border-border">
            Still need help?
          </h2>
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm border border-border px-6 py-5 flex items-start gap-4">
            <div className="w-9 h-9 rounded-full bg-bg border border-border flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-subtle"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-subtle mb-1">
                Can&apos;t find what you&apos;re looking for? Reach out to us at
              </p>
              <a
                href="mailto:admin@redefine-me.com"
                className="text-brand hover:text-brand-hover font-medium transition-colors"
              >
                admin@redefine-me.com
              </a>
              <p className="text-sm text-subtle mt-3">
                You can also{' '}
                <Link href="/support" className="text-brand hover:text-brand-hover underline transition-colors">
                  visit our support page
                </Link>
                {' '}to send a message, or manage your data via{' '}
                <Link href="/delete-account" className="text-brand hover:text-brand-hover underline transition-colors">
                  account deletion
                </Link>
                {' '}and our{' '}
                <Link href="/privacy-policy" className="text-brand hover:text-brand-hover underline transition-colors">
                  privacy policy
                </Link>
                .
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
