import { trpc } from '@/utils/trpc';
import { IWord } from '@/utils/types';
import { styled } from '@stitches/react';
import React from 'react';
import { toast } from 'react-toastify';

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
  const [idState, setIdState] = React.useState<string>('')
  const [formType, setFormType] = React.useState<'add' | 'update'>('add')

  const formState = {
    word,
    meaning,
    nfsw,
  }

  const serverStats = trpc.init.useQuery()

  const { isLoading: getLoading, data: getData } = trpc.getWords.useQuery()

  const { isLoading: createLoading, data: createData, mutate: addWord } = trpc.create.useMutation({
    onSuccess() {
      toast("Word created successfully", {
        type: "success",
        position: "top-right",
      });
    },
    onError() {
      toast("Error creating word", {
        type: "error",
        position: "top-right",
      });
    },
  })

  const { isLoading: updateLoading, data: updateData, mutate: updateWord } = trpc.update.useMutation({
    onSuccess() {
      toast("Word updated successfully", {
        type: "success",
        position: "top-right",
      });
    },
    onError() {
      toast("Error updating word", {
        type: "error",
        position: "top-right",
      });
    }
  })

  const { isLoading: deleteLoading, data: deleteData, mutate: deleteWord } = trpc.delete.useMutation({
    onSuccess() {
      toast("Word deleted successfully", {
        type: "success",
        position: "top-right",
      });
    },
    onError() {
      toast("Error deleting word", {
        type: "error",
        position: "top-right",
      });
    }
  })


  const handleSubmit = (id?: string | any) => {
    if (formType === 'add') {
      addWord({ word: word, meaning: meaning, nfsw: nfsw })
    }

    if (formType === 'update') {
      updateWord({ params: { wordId: id }, body: formState })
    }
  }

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure")) {
      deleteWord({ wordId: id })
    }
  }

  const handleFormType = () => {
    if (formType === 'add') {
      setFormType('update')
    } else {
      setFormType('add')
    }
  } 
  console.log(createData)
  console.log(updateData)
  console.log(deleteData)
  console.log(getData)

  return (
    <main>
      <Container>
        <Box css={{ position: 'absolute', bottom: 0, right: 0, margin: 40 }}>
          {serverStats.data?.message}...
        </Box>
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
        {/* <Box>
          <Text size="large">Find a word</Text>
          <Input type="text" placeholder="word" />
          <Button>Find</Button>

          <Box>
            <Text size="medium">Word</Text>
            <Text size="small">Meaning</Text>
            <Text size="small">NFSW</Text>
          </Box>
        </Box> */}
        <Box>
          <Text size="large">All words</Text>
          {getLoading ? (
              <Text>Loading...</Text>
            ) : (
              <>
                {getData?.data.length !== 0 ? (
                  <Box
                    css={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: '1rem',
                      marginTop: '4rem',
                    }}
                  >
                    {getData?.data.map((word: IWord) => (
                      <Box css={{ width: '100%', border: '1px solid black', padding: '1rem' }} key={word.id}>
                        <Text size="medium">{word.word}</Text>
                        <Text size="small" italic>{word.meaning}</Text>
                        <Text size="small" italic>{word.nfsw ? 'NFSW' : 'SFW'}</Text>
                        <Button css={{ background: 'red', marginTop: 20 }} onClick={() => handleDelete(word.id)}>Delete</Button>
                      </Box>
                    ))}
                  </Box>
                ) : (
                  <Text size="small">*No words found*</Text>
                )}
              </>
          )}
        </Box>
      </Container>
    </main>
  )
}

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '1440px',
  margin: '0 auto',
  padding: '2rem',
  position: 'relative',
})

const Box = styled('div', {
  marginBottom: '2rem',
})

const Text = styled('p', {
  fontSize: '1.5rem',

  variants: {
    size: {
      small: {
        fontSize: '0.8rem',
      },
      medium: {
        fontSize: '1.1rem',
      },
      large: {
        fontSize: '1.5rem',
        textDecoration: 'underline',
        textTransform: 'uppercase',
      },
    },
    italic: {
      true: {
        fontStyle: 'italic',
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
