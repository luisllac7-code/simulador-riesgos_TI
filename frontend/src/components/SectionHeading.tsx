type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  text: string;
};

export function SectionHeading({ eyebrow, title, text }: SectionHeadingProps) {
  return <header className="section-heading">{eyebrow && <span>{eyebrow}</span>}<h2>{title}</h2><p>{text}</p></header>;
}
