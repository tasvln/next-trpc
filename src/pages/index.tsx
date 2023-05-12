import Head from 'next/head'
import Image from 'next/image'

import {styled} from '@stitches/react';
import React from 'react';

type Form = {
  word: string,
  setWord: (word: string) => void
  meaning: string
  setMeaning: (meaning: string) => void
  nfsw: boolean
  setNfsw: (nfsw: boolean) => void
  type: 'add' | 'update' | 'find'
  onClick: () => void
}

const Form = (props: Form) => {
  const { word, setWord, meaning, setMeaning, nfsw, setNfsw, type, onClick } = props
  
  return (
    <Box>
      <Input type="text" placeholder="word" value={word} onChange={(e) => setWord(e.target.value)} />
      <Input type="text" placeholder="meaning" value={meaning} onChange={(e) => setMeaning(e.target.value)} />
      <Checkbox css={{ background: nfsw ? 'red' : 'white', color: nfsw ? 'white' : 'black' }} onClick={() => setNfsw(!nfsw)}>{nfsw ? 'NFSW' : 'SFW'}</Checkbox>
      <Button onClick={onClick}>{type === 'add' ? 'create word': 'update word'}</Button>
    </Box>
  )
}

export default function Home() {
  const [word, setWord] = React.useState('')
  const [meaning, setMeaning] = React.useState('')
  const [nfsw, setNfsw] = React.useState(false)
  const [formType, setFormType] = React.useState<'add' | 'update'>('add')

  const handleSubmit = () => {
    console.log(word, meaning, nfsw)
  }

  const handleFormType = () => {
    if (formType === 'add') {
      setFormType('update')
    } else {
      setFormType('add')
    }
  } 

  return (
    <main>
      <Container>
        <Box>
          <Button onClick={handleFormType} css={{ background: formType === 'add' ? 'red' : 'white', color: formType === 'add' ? 'white' : 'black' }}>
            Add a word
          </Button>
          <Button onClick={handleFormType} css={{ background: formType === 'update' ? 'red' : 'white', color: formType === 'update' ? 'white' : 'black' }}>
            {'Update a word'}
          </Button>
          {formType === 'add' ? (
              <Form word={word} setWord={setWord} meaning={meaning} setMeaning={setMeaning} nfsw={nfsw} setNfsw={setNfsw} type="add" onClick={handleSubmit} />
            ) : (
              <Form word={word} setWord={setWord} meaning={meaning} setMeaning={setMeaning} nfsw={nfsw} setNfsw={setNfsw} type="update" onClick={handleSubmit} />
          )}
        </Box>
        <Box>
          <Text size="large">Find a word</Text>
          <Input type="text" placeholder="word" />
          <Button>Find</Button>

          <Box>
            <Text size="medium">Word</Text>
            <Text size="small">Meaning</Text>
            <Text size="small">NFSW</Text>
          </Box>
        </Box>
        <Box>
          <Text size="large">All words</Text>
          <Box
            css={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1rem',
            }}
          >
            <Box>
              <Text size="medium">Word</Text>
              <Text size="small">Meaning</Text>
              <Text size="small">NFSW</Text>
            </Box>
          </Box>
        </Box>
      </Container>
    </main>
  )
}

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  maxWidth: '1440px',
  margin: '0 auto',
  padding: '2rem',
})

const Box = styled('div', {
  marginBottom: '2rem',
})

const Text = styled('p', {
  fontSize: '1.5rem',

  variants: {
    size: {
      small: {
        fontSize: '1rem',
      },
      medium: {
        fontSize: '1.25rem',
      },
      large: {
        fontSize: '1.5rem',
        textDecoration: 'underline',
        textTransform: 'uppercase',
      },
    },
  },
})

const Button = styled('button', {
  padding: '.5rem 1rem',
  backgroundColor: 'black',
  color: 'white',
  fontSize: '1rem',
  cursor: 'pointer',
})

const Input = styled('input', {
  padding: '.5rem 1rem',
  border: '1px solid black',
  backgroundColor: 'Aquamarine',
  color: 'black',
  fontSize: '1rem',
})

const Checkbox = styled('button', {
  padding: '.5rem 1rem',
  border: '1px solid black',
  background: 'white',
  color: 'white',
  fontSize: '1rem',
  cursor: 'pointer',
})
