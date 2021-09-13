import React, { ComponentProps } from 'react';
import styled from 'styled-components';
import { dimensions } from '../util/theme';

export const MediaGrid = styled.div`
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  overflow: visible;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
`;

export const Medium = styled.a`
  display: block;
  overflow: hidden;
  border-radius: ${dimensions.borderRadius.normal};
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  position: relative;
  transform: translateZ(0);

  min-width: 150px;
  flex-grow: 1;

  transition: box-shadow 0.5s;

  &:hover {
    opacity: 1;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  }
`;

export const MediumTitle = styled.div`
  display: flex;
  position: absolute;
  flex-direction: column;
  justify-content: flex-end;
  bottom: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0.5rem;

  opacity: 0;
  transition: opacity 0.2s;

  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6));
  color: white;

  span {
    width: 100%;
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    &.faded {
      opacity: 0.7;
    }
  }

  ${Medium as any}:hover & {
    opacity: 1;
  }
`;
