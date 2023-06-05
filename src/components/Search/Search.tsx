import React from 'react'
import { TextField, Grid, Button } from '@mui/material'
import './Search.css'

interface SearchProps {
  handleSearchCity: (search: string) => void;
  errorMessage: string;
  isError: boolean;
}

export default function Search(props: SearchProps) {
  const { handleSearchCity, errorMessage, isError } = props;
  const [search, setSearch] = React.useState<string>('');

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && search.trim() !== '') {
      handleSearchCity(search.trim().toLowerCase())
      if (search.trim().toLowerCase()) {
        setSearch('')
      }
      e.preventDefault()
    }
  }

  const handleSearchBtn = (text: string) => {
    if (text.trim() !== '') {
      handleSearchCity(text)
      if (search.trim().toLowerCase()) {
        setSearch('')
      }
    }
  }

  return (
    <Grid
      container
      className='searchContainer'
      direction="row"
      alignItems='flex-start'
      justifyContent="space-between"
      spacing={ 2 }
    >
      <Grid item className='searchInput'>
        <TextField
          id="outlined-basic"
          placeholder="Search for city..."
          variant="outlined"
          autoFocus
          fullWidth
          error={ isError }
          onKeyDown={ handleKeyDown }
          value={ search }
          onChange={ handleSearchInput }
          inputProps={ { style: { color: "white", fontWeight: 'bold', backgroundColor: '#202B3B' } } }
          helperText={ errorMessage }
        />
      </Grid>
      <Grid item className='searchBtn' >
        <Button disableRipple={ !search } variant="contained" color='warning' onClick={ () => handleSearchBtn(search) } sx={ { height: 56 } }>Search</Button>
      </Grid>
    </ Grid >
  )
}
