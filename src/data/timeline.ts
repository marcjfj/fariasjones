import vmlLogo from "../images/vml-logo.svg";
import llLogo from "../images/ll-logo.svg";

export interface TimelineItem {
  date: string;
  image: string;
  imageAlt: string;
  title: string;
  description: string;
  tags: string[];
}

export default [
  {
    date: "2023",
    image: vmlLogo,
    imageAlt: "VMLY&R",
    title: "Development Lead, Innovations",
    description:
      "Rapid development of prototypes and proof of concepts for creative new ideas and products. Writing documentation for handoff to other teams.",
    tags: ["Typescript", "Vue", "Python", "AWS", "MongoDB", "Node.js"],
  },
  {
    date: "2022",
    image: vmlLogo,
    imageAlt: "VMLY&R",
    title: "Development Lead, Cloud Services",
    description:
      "Development of cloud-based solutions for clients, including serverless applications, microservices, and data pipelines to be consumed by web and mobile platforms.",
    tags: ["AWS", "Laravel", "PHP", "MongoDB", "Node.js", "Salesforce"],
  },
  {
    date: "2020-2021",
    image: vmlLogo,
    imageAlt: "VMLY&R",
    title: "Software Developer, E-Commerce",
    description:
      "Development and maintenance of a custom enterprise e-commerce platform. Supporting junior developers and reviewing code.",
    tags: ["TypeScript", "Vue", "Drupal", "PHP", "MySQL", "Node.js"],
  },
  {
    date: "2019-2020",
    image: llLogo,
    imageAlt: "Lifted Logic",
    title: "Web Developer",
    description:
      "Development of custom marketing and e-commerce websites for businesses in a variety of industries.",
    tags: ["WordPress", "Laravel", "PHP", "MySQL", "JavaScript", "Node.js"],
  },
] as TimelineItem[];
