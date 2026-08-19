import type { LucideIcon } from "lucide-react";
import { BookOpen, HeartHandshake, Leaf, Sparkles, Users } from "lucide-react";

export type Program = {
  number: string;
  title: string;
  text: string;
  icon: LucideIcon;
};

export const programs: Program[] = [
  {
    number: "01",
    title: "Homemaker’s Institute",
    text: "Free practical learning in yoga, meditation, acupressure, computer basics, fashion design, beauty therapy, cooking, nutrition, flower arrangement, interiors and handicrafts.",
    icon: Sparkles,
  },
  {
    number: "02",
    title: "Education for all",
    text: "Talent tests, adult literacy, support for school dropouts, value-based education, science exhibitions, seminars and workshops that make learning accessible.",
    icon: BookOpen,
  },
  {
    number: "03",
    title: "Women’s helpline",
    text: "Advice, information, guidance and counselling for women facing harassment or difficult circumstances.",
    icon: HeartHandshake,
  },
  {
    number: "04",
    title: "Healthy communities",
    text: "Health camps, preventive awareness, Chetana courses for prisoners, and programmes on health, legal rights and personal wellbeing.",
    icon: Users,
  },
  {
    number: "05",
    title: "Happy Villages",
    text: "Rural and slum outreach through environmental education, zero-budget farming, square-foot gardening, seed distribution and community-led renewal.",
    icon: Leaf,
  },
];

export const objectives = [
  "Advance and spread education, science, art, technology and literature.",
  "Provide medical relief and maintenance for the sick.",
  "Relieve hardship among people who are poor, aged, disabled, orphaned or affected by natural calamities.",
  "Undertake, promote and support rural development programmes.",
  "Organise lectures, debates, discussions, seminars and excursions to diffuse knowledge and carry forward traditional values.",
  "Develop agriculture, irrigation and animal husbandry through modern methods for small farmers and rural empowerment.",
  "Help students from every community continue their studies.",
  "Collaborate with and support people, societies and institutions working toward similar aims.",
];
