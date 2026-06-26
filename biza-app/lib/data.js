export const categories = [
  {
    id: "content-creation",
    name: "Content Creation",
    slug: "content-creation",
    description: "Build an audience and monetize through views, sponsorships, and digital assets.",
    color: "#1A3A2A",
    badge: "Beginner-friendly",
  },
  {
    id: "freelancing-services",
    name: "Freelancing & Services",
    slug: "freelancing-services",
    description: "Sell your digital skills to global clients on top platforms.",
    color: "#2E6644",
    badge: "Beginner-friendly",
  },
  {
    id: "ecommerce-selling",
    name: "E-Commerce & Selling",
    slug: "ecommerce-selling",
    description: "Set up shop and sell physical or digital products globally.",
    color: "#F5C842",
    badge: "Intermediate",
  },
  {
    id: "marketing-traffic",
    name: "Marketing & Traffic",
    slug: "marketing-traffic",
    description: "Master traffic generation, advertising, and online promotions.",
    color: "#1A6B8A",
    badge: "Intermediate",
  },
  {
    id: "software-tech",
    name: "Software & Tech",
    slug: "software-tech",
    description: "Build apps, software, or technical integrations for businesses.",
    color: "#4A3E3D",
    badge: "Advanced",
  },
  {
    id: "data-ai-ops",
    name: "Data & AI Operations",
    slug: "data-ai-ops",
    description: "Handle labeling, prompting, and operations for modern AI systems.",
    color: "#6B5B95",
    badge: "Beginner-friendly",
  }
];

export const courses = [
  // Affiliate Marketing (Free)
  {
    id: "affiliate-marketing-roadmap",
    categoryId: "marketing-traffic",
    title: "Affiliate Marketing — Complete Roadmap",
    slug: "affiliate-marketing",
    description: "Learn how to earn commissions by recommending products other companies create.",
    tier: "free",
    priceKes: 0,
    timeToIncome: "3–6 months",
    capitalRequired: "KES 0 to start",
    deviceRequired: "Phone or laptop",
    steps: [
      {
        stepNumber: 1,
        title: "Understand the Model",
        bodyText: "Affiliate marketing works by sharing a unique link tracking your referrals. When someone buys through your link, the vendor pays you a percentage. To succeed, you must build trust and provide value, rather than spamming links.",
        platforms: ["Fiverr Affiliates", "Amazon Associates", "Hostinger Partners"],
        video: {
          youtubeUrl: "https://www.youtube.com/watch?v=Wz3m9CgZrcY",
          youtubeId: "Wz3m9CgZrcY",
          note: "Core overview of the affiliate commission flow.",
          isPrimary: true
        }
      },
      {
        stepNumber: 2,
        title: "Requirements & Setup",
        bodyText: "You will need a social media account (TikTok, Instagram, or YouTube) or a simple blog. You also need an email account, a mobile phone or computer, and a payment gateway (like PayPal or bank transfer) to receive payouts.",
        platforms: ["PayPal", "Local Bank Account"],
        video: {
          youtubeUrl: "https://www.youtube.com/watch?v=d_k8S7gO7H0",
          youtubeId: "d_k8S7gO7H0",
          note: "Setting up your tax documents and affiliate accounts.",
          isPrimary: true
        }
      },
      {
        stepNumber: 3,
        title: "How Money Flows",
        bodyText: "A buyer clicks your link -> Cookie is saved on their device (usually 30-90 days) -> Buyer purchases product -> Vendor processes commission -> Payout is sent to your account monthly once the refund window closes.",
        platforms: ["Impact.com", "ShareASale"],
        video: {
          youtubeUrl: "https://www.youtube.com/watch?v=Jny86w7Xg_o",
          youtubeId: "Jny86w7Xg_o",
          note: "Understanding affiliate cookies and attribution.",
          isPrimary: true
        }
      },
      {
        stepNumber: 4,
        title: "The Action Process",
        bodyText: "1. Pick a niche (e.g. tech, budgeting, fitness). 2. Find high-paying affiliate programs in that niche. 3. Create helpful content (reviews, tutorial guides, lists). 4. Place your links inside contextually relevant sections.",
        platforms: ["Canva", "CapCut"],
        video: {
          youtubeUrl: "https://www.youtube.com/watch?v=2r7dTLGZlH8",
          youtubeId: "2r7dTLGZlH8",
          note: "Content marketing execution strategy.",
          isPrimary: true
        }
      },
      {
        stepNumber: 5,
        title: "Top Affiliate Platforms",
        bodyText: "For Kenyans, focus on programs that support direct payouts or pay through standard payment methods. Fiverr Affiliates is highly recommended because digital service needs are booming.",
        platforms: ["Fiverr Affiliates", "Jumia Affiliate Program"],
        video: {
          youtubeUrl: "https://www.youtube.com/watch?v=QZ8V_L_QkO0",
          youtubeId: "QZ8V_L_QkO0",
          note: "Best affiliate programs for African creators.",
          isPrimary: true
        }
      },
      {
        stepNumber: 6,
        title: "Curated Video Resources",
        bodyText: "Review these selected tutorial walk-throughs showcasing case studies of successful zero-capital affiliate setups operating from within East Africa.",
        platforms: ["YouTube Creator Studio"],
        video: {
          youtubeUrl: "https://www.youtube.com/watch?v=vV7Y_5BqHk0",
          youtubeId: "vV7Y_5BqHk0",
          note: "Real-life case study of $1,000/mo affiliate setup.",
          isPrimary: true
        }
      },
      {
        stepNumber: 7,
        title: "Scam Warnings & Pitfalls",
        bodyText: "WARNING: Avoid programs that force you to pay an 'entry fee' or purchase stock to start promoting. Legitimate affiliate marketing is always free to join. Watch out for fake gurus selling KES 50,000 masterclasses promising instant wealth.",
        platforms: ["ScamDetector"],
        video: {
          youtubeUrl: "https://www.youtube.com/watch?v=0kF41E_oJ10",
          youtubeId: "0kF41E_oJ10",
          note: "How to identify affiliate pyramid schemes.",
          isPrimary: true
        }
      }
    ]
  },
  // Dropshipping (Pro)
  {
    id: "dropshipping-roadmap",
    categoryId: "ecommerce-selling",
    title: "Dropshipping — Full Setup Roadmap",
    slug: "dropshipping",
    description: "Launch a global e-commerce business without holding inventory or shipping items yourself.",
    tier: "pro",
    priceKes: 1500,
    timeToIncome: "2–4 months",
    capitalRequired: "KES 15,000+ for ads & hosting",
    deviceRequired: "Laptop or computer recommended",
    steps: [
      {
        stepNumber: 1,
        title: "Understand the Model",
        bodyText: "Dropshipping means acting as the retail storefront. When a client buys from your site, you order the product directly from a third-party supplier (often in China) at wholesale, who ships it straight to the client. Your profit is the margin.",
        platforms: ["Shopify", "AliExpress"],
        video: {
          youtubeUrl: "https://www.youtube.com/watch?v=Nn1R1K3_79g",
          youtubeId: "Nn1R1K3_79g",
          note: "The complete dropshipping business model explained.",
          isPrimary: true
        }
      },
      {
        stepNumber: 2,
        title: "Requirements & Setup",
        bodyText: "You will need a Shopify subscription, a domain name, and capital for testing Facebook/TikTok ads. You also need an international payment processor (like Stripe via UK company registration, or Flutterwave/Paystack).",
        platforms: ["Shopify", "Stripe", "Payoneer"],
        video: {
          youtubeUrl: "https://www.youtube.com/watch?v=34d74mXGvJ4",
          youtubeId: "34d74mXGvJ4",
          note: "How to open a Stripe account from Kenya legally.",
          isPrimary: true
        }
      },
      {
        stepNumber: 3,
        title: "How Money Flows",
        bodyText: "Customer buys product for $30 -> Customer money clears in your payment processor -> You pay supplier $10 to ship the product -> Supplier ships to customer -> You keep the remaining $20 (minus advertising costs).",
        platforms: ["Dsers", "AliExpress"],
        video: {
          youtubeUrl: "https://www.youtube.com/watch?v=LqUv_6B1KzM",
          youtubeId: "LqUv_6B1KzM",
          note: "Payment flows, margins, and refund processing mechanics.",
          isPrimary: true
        }
      },
      {
        stepNumber: 4,
        title: "The Action Process",
        bodyText: "1. Perform product research to find viral, problem-solving items. 2. Design a clean Shopify website. 3. Import product details via DSers. 4. Run creative marketing campaigns on TikTok or Facebook to drive visitors.",
        platforms: ["TikTok Ads", "Facebook Ads Manager"],
        video: {
          youtubeUrl: "https://www.youtube.com/watch?v=9_fJ4V_p70Q",
          youtubeId: "9_fJ4V_p70Q",
          note: "Running your first dropshipping advertising campaign.",
          isPrimary: true
        }
      },
      {
        stepNumber: 5,
        title: "Suppliers & Platforms",
        bodyText: "While AliExpress is the default starter supplier, professional dropshippers move to private agents, CJ Dropshipping, or Zendrop to ensure faster delivery (7-12 days instead of 30+ days).",
        platforms: ["CJ Dropshipping", "Zendrop"],
        video: {
          youtubeUrl: "https://www.youtube.com/watch?v=qfM6S1_kXvI",
          youtubeId: "qfM6S1_kXvI",
          note: "Comparing CJ Dropshipping vs AliExpress delivery speeds.",
          isPrimary: true
        }
      },
      {
        stepNumber: 6,
        title: "Curated Video Resources",
        bodyText: "Access over 10 hours of step-by-step videos detailing how to scale stores to $5,000/month, optimize product description copy, and handle bulk customer disputes.",
        platforms: ["Shopify Admin"],
        video: {
          youtubeUrl: "https://www.youtube.com/watch?v=gT8YfP7mI0A",
          youtubeId: "gT8YfP7mI0A",
          note: "Complete store build tutorial from scratch.",
          isPrimary: true
        }
      },
      {
        stepNumber: 7,
        title: "Scam Warnings & Pitfalls",
        bodyText: "WARNING: Be prepared for high ad costs. Gurus claim dropshipping is 'zero investment', but you will spend money on ads. Do not pay for 'hot product lists' or buy pre-made generic stores, they are almost always saturated scams.",
        platforms: ["Shopify Community"],
        video: {
          youtubeUrl: "https://www.youtube.com/watch?v=842813D10K0",
          youtubeId: "842813D10K0",
          note: "Why 99% of dropshipping beginners fail and lose ad capital.",
          isPrimary: true
        }
      }
    ]
  },
  // Writing & Transcription (Free)
  {
    id: "writing-transcription-roadmap",
    categoryId: "freelancing-services",
    title: "Writing & Transcription Roadmap",
    slug: "writing-transcription",
    description: "Translate your language skills and typing speeds into active freelance earnings on Upwork and Fiverr.",
    tier: "free",
    priceKes: 0,
    timeToIncome: "1–2 months",
    capitalRequired: "KES 0 to start",
    deviceRequired: "Laptop or computer required",
    steps: [
      {
        stepNumber: 1,
        title: "Understand the Model",
        bodyText: "Clients globally require articles, blog posts, audio transcripts, and editing services. You pitch your rates on freelance platforms, complete tasks to their specifications, and get paid hourly or per project milestones.",
        platforms: ["Upwork", "Fiverr"],
        video: {
          youtubeUrl: "https://www.youtube.com/watch?v=2Tz8D116a4o",
          youtubeId: "2Tz8D116a4o",
          note: "Introduction to digital copywriting and freelancing.",
          isPrimary: true
        }
      },
      {
        stepNumber: 2,
        title: "Requirements & Setup",
        bodyText: "A laptop with stable internet, typing speeds of 40+ WPM, and good grammar. You will set up profiles highlighting specific portfolios (e.g. finance writing, podcast transcripts) rather than a general layout.",
        platforms: ["Upwork Profile", "Grammarly"],
        video: {
          youtubeUrl: "https://www.youtube.com/watch?v=Gk5gS5p7524",
          youtubeId: "Gk5gS5p7524",
          note: "Writing proposals that win jobs on Upwork.",
          isPrimary: true
        }
      },
      {
        stepNumber: 3,
        title: "How Money Flows",
        bodyText: "Client posts a job -> You submit a proposal -> Client hires you -> Client deposits funds into platform Escrow -> You complete the task -> Client approves -> Escrow releases money -> Payout clears in 5-14 days.",
        platforms: ["Upwork Escrow", "Payoneer"],
        video: {
          youtubeUrl: "https://www.youtube.com/watch?v=H7mY2rQe2jM",
          youtubeId: "H7mY2rQe2jM",
          note: "Freelance fees, payment cycles, and withdrawing to M-Pesa.",
          isPrimary: true
        }
      },
      {
        stepNumber: 4,
        title: "The Action Process",
        bodyText: "1. Sign up on Upwork or Fiverr. 2. Build 3 clean writing samples in Google Docs. 3. Apply to low-tier jobs ($10-$15) to build initial ratings. 4. Gradually increase rates as feedback history increases.",
        platforms: ["Google Docs", "Fiverr Gig Builder"],
        video: {
          youtubeUrl: "https://www.youtube.com/watch?v=vV7Y_5BqHk0",
          youtubeId: "vV7Y_5BqHk0",
          note: "How to draft your first freelancer portfolio.",
          isPrimary: true
        }
      },
      {
        stepNumber: 5,
        title: "Platforms & Payouts",
        bodyText: "Upwork directly integrates with M-Pesa for Kenyan accounts, charging a flat $0.99 fee per withdrawal. Fiverr supports Payoneer which can be linked to your local bank account.",
        platforms: ["Upwork M-Pesa", "Payoneer M-Pesa"],
        video: {
          youtubeUrl: "https://www.youtube.com/watch?v=34d74mXGvJ4",
          youtubeId: "34d74mXGvJ4",
          note: "Setting up bank and M-Pesa integrations on freelance portals.",
          isPrimary: true
        }
      },
      {
        stepNumber: 6,
        title: "Curated Video Resources",
        bodyText: "Watch detailed walkthrough tutorials detailing how to optimize gig descriptions and proposal headlines to stand out from automated bot applications.",
        platforms: ["Google Docs"],
        video: {
          youtubeUrl: "https://www.youtube.com/watch?v=q2S7134-220",
          youtubeId: "q2S7134-220",
          note: "Proposal templates that convert.",
          isPrimary: true
        }
      },
      {
        stepNumber: 7,
        title: "Scam Warnings & Pitfalls",
        bodyText: "CRITICAL: Never pay a client money to write a test article or secure a project. Never communicate or accept payments outside Upwork/Fiverr before contract starts. Client requests to pay via Telegram are 100% deposit scams.",
        platforms: ["Freelancers Guild"],
        video: {
          youtubeUrl: "https://www.youtube.com/watch?v=0kF41E_oJ10",
          youtubeId: "0kF41E_oJ10",
          note: "Exposing common freelancer Telegram & WhatsApp deposit scams.",
          isPrimary: true
        }
      }
    ]
  }
];
