import { css } from 'styled-components';

const sizes = {
  bp900: 900,
  bp600: 600,
  bp400: 400,
}

export const media: any = Object.keys(sizes).reduce((accumulator, label) => {
  const emSize = sizes[label as keyof typeof sizes] / 16;
  (accumulator as any)[label] = (...args: Parameters<typeof css>) => css`
    @media (max-width: ${emSize}em) {
      ${css(...args)};
    }
  `;
  return accumulator
}, {});

export default media