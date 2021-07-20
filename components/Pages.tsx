/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import ImageStyles from './styles/ImageStyles'
import { Section } from '../styles'
import axios from 'axios'

const Pages: React.FC<{ pages: string[]}> = ({ pages }) => {
  const images = (pages: string[]) => pages.map((page) => {
    // eslint-disable-next-line react/jsx-key
  return (<img src={`${page}?${Math.random().toString(36)}`} alt='image' className='center'/>)
  })

  return (
    <Section>
      <ImageStyles>
        <header>
          <h2>Pages</h2>
        </header>

        <div className="image-list">
          {pages.length > 0 ? (images(pages)) : (
            <p>No available Pages!</p>
          )}
        </div>
      </ImageStyles>
    </Section>
  );
};


export default Pages;
