import React, { ReactNode } from 'react';

type SectionProps = {
  title?: string;
  children: ReactNode;
};

const Section = ({ title = 'my Section', children }: SectionProps) => {
  return (
    <section>
      <h2>{title}</h2>
      <p>{children}</p>
    </section>
  );
};

export default Section;
