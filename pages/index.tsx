import React, { useState } from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import { theme, mixins}  from '../styles';
import Image from 'next/image'
const { colors, fonts } = theme;
import nh from '../public/nhlogo.svg'

const StyledContainer = styled.div`
  ${mixins.flexCenter};
  background-color: ${colors.black};
  background-image: linear-gradient(${colors.black} 0%, ${colors.darkGrey} 100%);
  color: ${colors.offWhite};
  height: 100vh;
  form {
    background-color: transparent;
    border-radius: 5px;
    padding: 2rem;
    margin-bottom: 20vh;
    max-width: 600px;
    text-align: center;
    svg {
      color: ${colors.blue};
    }
    label {
      display: block;
      font-size: 2.5rem;
      font-weight: 500;
      margin: 2rem;
    }
    input {
      background-color: #26303c;
      outline: 0;
      border: 0;
      border-radius: 0.25rem;
      width: 100%;
      max-width: 500px;
      margin: 0 auto;
      padding: 1rem;
      color: ${colors.lightblue};
      font-family: ${fonts.mono};
      font-size: 2rem;
      font-weight: 400;
      text-align: center;
    }
    .submit {
      ${mixins.blueButton};
      margin-top: 3rem;
      filter: none;
    }
  }
`;

const Home = () => {
  const [doujin, setDoujin] = useState('')
  const handleChange = (e: { target: { value: string }}) => setDoujin(e.target.value)

  return (
    <main>
      <StyledContainer>
        <form
          onSubmit={e => {
            e.preventDefault();
            Router.push({
              pathname: '/api/doujin',
              query: { code: doujin },
            })
          }}>
          <Image src={nh} alt="well" />
          <label htmlFor="doujin">Find Your Desire</label>
          <input name="doujin" type="text" onChange={handleChange} />
        </form>
      </StyledContainer>
    </main>
  )
}
export default Home