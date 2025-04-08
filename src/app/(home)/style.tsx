import { pxToRem } from '@/utils';
import styled, { css } from 'styled-components';

export const Title = styled.h2`
    color: ${props => props.theme._colors.primary}
`;

export const ListWrapper = styled.ul`
  counter-reset: song-counter; // inicia o contador
`;

export const Item = styled.li`
  counter-increment: song-counter; // incrementa o contador

  > div::before {
    content: counter(song-counter);
    font-weight: bold;
    color: ${(props) => props.theme._colors.primary};
    font-size: ${pxToRem(32)};
  }
`;

export const SongTitle = styled.h3`
`;

export const Views = styled.small`
`;

export const Sorter = styled.button`
`;