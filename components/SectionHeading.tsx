type Props = {
  eyebrow: string;
  title: React.ReactNode;
  text?: string;
  align?: 'center' | 'left';
  light?: boolean;
  rule?: boolean;
};

export default function SectionHeading({
  eyebrow,
  title,
  text,
  align = 'center',
  light = false,
  rule = true,
}: Props) {
  const centered = align === 'center';
  return (
    <div
      className={`relative ${centered ? 'mx-auto max-w-2xl text-center' : 'max-w-xl text-left'} ${
        rule && centered ? 'heading-rule' : ''
      }`}
      data-aos="fade-up"
    >
      <span className={light ? 'eyebrow-light' : 'eyebrow'}>
        <span className="h-1.5 w-1.5 rounded-full bg-gold" />
        {eyebrow}
      </span>
      <h2
        className={`mt-5 font-heading text-[1.9rem] font-black leading-tight text-balance sm:text-[2.35rem] lg:text-[2.7rem] ${
          light ? 'text-white' : 'text-ink'
        }`}
      >
        {title}
      </h2>
      {text ? (
        <p className={`mt-4 text-[1rem] leading-relaxed ${light ? 'text-white/75' : 'text-ink-soft'}`}>
          {text}
        </p>
      ) : null}
      <span
        className={`mt-6 block h-1 w-16 rounded-full bg-grad-gold ${centered ? 'mx-auto' : ''}`}
      />
    </div>
  );
}
