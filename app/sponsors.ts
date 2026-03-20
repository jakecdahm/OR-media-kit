export type PricingFeature = {
  text: string;
  note?: string;
};

export type PricingTierCard = {
  name: string;
  badge?: string;
  monthlyPrice: string;
  yearlyPrice: string;
  highlights: string[];
  sections: {
    label: string;
    features: PricingFeature[];
  }[];
};

export type PricingConfig = {
  tiers: PricingTierCard[];
};

export type SponsorConfig = {
  name: string;
  hiddenPartners?: string[];
  heroTagline?: string;
  hideSections?: string[];
  customAboutText?: string;
  pricing?: PricingConfig;
};

export const SPONSORS: Record<string, SponsorConfig> = {
  manychat: {
    name: "ManyChat",
    hiddenPartners: ["MANYCHAT"],
  },
  comcast: {
    name: "Comcast",
    hiddenPartners: ["COMCAST"],
  },
  beehiiv: {
    name: "Beehiiv",
    hiddenPartners: ["BEEHIIV"],
  },
  "poppy-ai": {
    name: "Poppy.ai",
    hiddenPartners: ["POPPY.AI"],
  },
  ketone: {
    name: "Ketone",
    pricing: {
      tiers: [
        {
          name: "Bronze",
          monthlyPrice: "$6,667",
          yearlyPrice: "$80,000",
          highlights: ["12 ad reads", "5 feed posts", "2 IG stories"],
          sections: [
            {
              label: "Distribution",
              features: [
                { text: "12 ad reads (long form)", note: "15\u201330 sec organic embeds" },
                { text: "5 hard feed posts", note: "All platforms incl. podcast content" },
                { text: "2 IG story posts" },
                { text: "Whitelisting / dark post", note: "Open Residency & Mark Brazil blend" },
                { text: "Website logo integration" },
                { text: "Metadata mention on all platforms" },
              ],
            },
            {
              label: "Production",
              features: [
                { text: "Bronze-tier partnership asset" },
                { text: "Mike as guest on the pod" },
              ],
            },
            {
              label: "Consulting",
              features: [
                { text: "Licensing consulting", note: "10 years of knowledge" },
              ],
            },
          ],
        },
        {
          name: "Silver",
          badge: "Recommended",
          monthlyPrice: "$10,000",
          yearlyPrice: "$120,000",
          highlights: ["18 ad reads", "6 feed posts", "4 IG stories"],
          sections: [
            {
              label: "Distribution",
              features: [
                { text: "18 ad reads (long form)", note: "15\u201330 sec organic embeds" },
                { text: "6 hard feed posts", note: "All platforms incl. podcast content" },
                { text: "4 IG story posts" },
                { text: "Whitelisting / dark post", note: "Open Residency & Mark Brazil blend" },
                { text: "Website logo integration" },
                { text: "Metadata mention on all platforms" },
              ],
            },
            {
              label: "Production",
              features: [
                { text: "Silver-tier partnership asset" },
                { text: "Mike as guest on the pod" },
                { text: "Extended production \u2014 shorts package", note: "Extra shorts cut from the episode" },
              ],
            },
            {
              label: "Consulting & Network",
              features: [
                { text: "Licensing consulting", note: "10 years of knowledge" },
                { text: "Influencer / guest product seeding", note: "Content, distribution, investor network" },
              ],
            },
          ],
        },
        {
          name: "Gold",
          badge: "Best Value",
          monthlyPrice: "$12,500",
          yearlyPrice: "$150,000",
          highlights: ["26 ad reads", "8 feed posts", "6 IG stories", "Email integration"],
          sections: [
            {
              label: "Distribution",
              features: [
                { text: "26 ad reads (long form)", note: "15\u201330 sec organic embeds" },
                { text: "8 hard feed posts", note: "All platforms incl. podcast content" },
                { text: "6 IG story posts" },
                { text: "Email integration" },
                { text: "Whitelisting / dark post", note: "Open Residency & Mark Brazil blend" },
                { text: "Website logo integration" },
                { text: "Metadata mention on all platforms" },
              ],
            },
            {
              label: "Production",
              features: [
                { text: "Gold-tier partnership asset" },
                { text: "Mike as guest on the pod" },
                { text: "Extended production \u2014 raw footage", note: "3 extra hours on set; we deliver the raw" },
                { text: "Extended production \u2014 shorts package", note: "Extra shorts cut from the episode" },
              ],
            },
            {
              label: "Consulting & Network",
              features: [
                { text: "Licensing consulting", note: "10 years of knowledge" },
                { text: "Licensing consulting \u2014 extended", note: "Walk the tradeshow together" },
                { text: "Influencer / guest product seeding", note: "Content, distribution, investor network" },
              ],
            },
          ],
        },
      ],
    },
  },
};
