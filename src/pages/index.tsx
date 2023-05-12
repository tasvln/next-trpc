import Head from 'next/head'
import Image from 'next/image'

import {styled} from '@stitches/react';

export default function Home() {
  return (
    <main>
      <Container>

      </Container>
    </main>
  )
}

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  maxWidth: '1440px',
  margin: '0 auto',
})

const Box = styled('div', {})

const Text = styled('p', {
  fontSize: '1.5rem',

  variants: {
    size: {
      small: {
        fontSize: '1rem',
      },
      medium: {
        fontSize: '1.5rem',
      },
      large: {
        fontSize: '2rem',
      },
    },
  },
})

const Button = styled('button', {
  padding: '1rem 2rem',
  borderRadius: '0.5rem',
  border: 'none',
  backgroundColor: 'black',
  color: 'white',
  fontSize: '1.5rem',
  cursor: 'pointer',
})

const Input = styled('input', {
  padding: '1rem 2rem',
  borderRadius: '0.5rem',
  border: '1px soild black',
  backgroundColor: 'White',
  color: 'black',
  fontSize: '1.5rem',
  cursor: 'pointer',
})

