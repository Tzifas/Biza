export type ScamDetail = {
  slug: string;
  title: string;
  dangerLevel: "Medium" | "High" | "Critical";
  format: string;
  modusOperandi: string;
  redFlag: string;
};

export const scamDetails: ScamDetail[] = [
  {
    slug: "activation-fee-job",
    title: "Activation fee job scam",
    dangerLevel: "High",
    format: "Freelance portals or DMs offering transcription, writing, or data entry.",
    modusOperandi:
      "You must send KES 1,000–5,000 for 'account activation', 'software lease', or a 'security deposit' before receiving work.",
    redFlag:
      "Any job that requires you to pay money before you work is a scam. Legitimate employers pay you — you do not pay them.",
  },
  {
    slug: "telegram-escrow-bypass",
    title: "Telegram / WhatsApp escrow bypass",
    dangerLevel: "Critical",
    format: "Clients met on Upwork or Fiverr who want to move chats off-platform.",
    modusOperandi:
      "High pay rates are offered on Telegram. After you deliver work, they demand a 'processing fee' to release payment.",
    redFlag:
      "Never move off-platform before a funded contract. External payments are unsecured and almost always fraud.",
  },
  {
    slug: "mlm-masterclass",
    title: "MLM masterclass guru",
    dangerLevel: "Medium",
    format: "Instagram, TikTok, or YouTube ads showing luxury lifestyle and quick riches.",
    modusOperandi:
      "A KES 45,000+ masterclass whose real model is recruiting others to sell the same course.",
    redFlag:
      "Legitimate income requires skill-building hours. Avoid programs that pay primarily through recruitment.",
  },
  {
    slug: "forex-signals-scam",
    title: "Forex guaranteed signals",
    dangerLevel: "Critical",
    format: "Telegram groups and Instagram pages selling 'guaranteed' trading signals.",
    modusOperandi:
      "Pay an entry fee for signals from a 'pro trader' who promises consistent monthly returns.",
    redFlag: "No legitimate trader guarantees returns. 'Guaranteed profit' in forex is fraud.",
  },
  {
    slug: "fake-pod-store",
    title: "Fake POD / prebuilt store",
    dangerLevel: "High",
    format: "Ads selling 'done-for-you' print-on-demand stores for KES 20,000+.",
    modusOperandi:
      "You pay for a pre-built store with generic designs that never sell. The seller disappears after payment.",
    redFlag: "Real POD starts with your designs and free platform accounts — not upfront store fees.",
  },
  {
    slug: "fake-supplier-fee",
    title: "Fake dropshipping supplier fee",
    dangerLevel: "High",
    format: "WhatsApp 'suppliers' or Discord groups offering exclusive product lists.",
    modusOperandi:
      "Supplier demands membership or registration fees before you can access products or pricing.",
    redFlag: "Legitimate suppliers earn when you sell — they do not charge upfront membership fees.",
  },
  {
    slug: "crypto-doubling",
    title: "Crypto doubling scheme",
    dangerLevel: "Critical",
    format: "WhatsApp chains and Telegram bots promising to double your M-Pesa in 24 hours.",
    modusOperandi: "Send KES 1,000, receive KES 2,000 back — until the scheme collapses and you lose everything.",
    redFlag: "No legitimate investment doubles money overnight. This is always theft.",
  },
  {
    slug: "fake-platform-fee",
    title: "Fake freelance platform fee",
    dangerLevel: "High",
    format: "Websites mimicking Upwork or Fiverr asking for registration fees.",
    modusOperandi:
      "Platform charges workers to join, then never sends jobs or payouts after you pay.",
    redFlag: "Real freelance platforms do not charge workers to register. Clients pay platform fees, not you.",
  },
];
