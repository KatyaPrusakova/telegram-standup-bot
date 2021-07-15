import React from 'react';
import Image from 'next/image';
import { Text, Link, useTheme } from '@geist-ui/react';

const Footer: React.FC = () => {
  const theme = useTheme();

  return (
    <>
      <footer>
        <div>
          <div style={{ display: 'inline-block' }}>
            <Text>Powered by </Text>
          </div>
          <div style={{ display: 'inline-block' }}>
            <Link
              href="https://vercel.com?utm_source=alwaysbegrowing&utm_campaign=oss"
              target="_blank"
              rel="noopener"
              underline
            >
              <Image
                height={15}
                width={70}
                src={`/logos/vercel-logotype-${
                  theme.type === 'dark' ? 'light' : 'dark'
                }.svg`}
              />
            </Link>
          </div>
        </div>
      </footer>
      <style jsx>{`
        footer {
          border-top: 1px solid ${theme.palette.border};
          padding: ${theme.layout.gapQuarter} ${theme.layout.gap};
          text-align: center;
        }
      `}</style>
    </>
  );
};

export default Footer;
