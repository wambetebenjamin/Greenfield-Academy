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
        <span className="h-1.5 w-1.5 rounded-full bg-sky shadow-[0_0_0_4px_rgba(255,93,115,0.12)]" />
        {eyebrow}
      </span>
      <h2
        className={`mt-5 font-display text-[2.15rem] font-bold leading-[1.08] tracking-[-0.03em] text-balance sm:text-[2.65rem] lg:text-[3.15rem] ${
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
        className={`mt-7 block h-1 w-20 rounded-full bg-grad-spectrum ${centered ? 'mx-auto' : ''}`}
      />
    </div>
  );
}
