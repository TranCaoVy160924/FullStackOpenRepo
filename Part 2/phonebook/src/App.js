import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import DisplayPhoneNum from './components/DisplayPhoneNum'
import SearchByName from './components/SearchByName'
import AddPersonForm from './components/AddPersonForm'

const App = () => {
   const [persons, setPersons] = useState([])
   const [newName, setNewName] = useState('')
   const [newPhoneNum, setNewPhoneNum] = useState('')
   const [keyword, setKeyword] = useState('')
   const [renderPersons, setRenderPersons] = useState(persons)

   useEffect(() => {
      axios.get('http://localhost:3001/persons')
         .then(response => {
            console.log('fetch data complete')
            setPersons(response.data)
            setRenderPersons(response.data)
         })
   }, [])

   const isEmptyString = (string) =>
      string.trim() === '' || string === null

   const containInsensitive = (string, subString) =>
      string.trim().toLowerCase()
         .includes(subString.trim().toLowerCase())

   const searchPersons = () => {
      if (isEmptyString(keyword)) {
         setRenderPersons(persons)
      }
      else {
         let searchResult = persons.filter((x) =>
            containInsensitive(x.name, keyword))
         setRenderPersons(searchResult)
      }
   }

   const addName = (event) => {
      event.preventDefault()
      // console.log(event.target)

      const personObject = {
         name: newName,
         number: newPhoneNum
      }

      // add person to list if not exist or alert
      if (persons.findIndex(x => x.name === newName) === -1) {
         setPersons(persons.concat(personObject))
         setRenderPersons(persons.concat(personObject))
         setNewName('')
         setNewPhoneNum('')
      }
      else {
         alert(newName + " is already added to phone book")
      }
   }

   const handleStateChange = (stateSetter) => {
      return (event) => {
         stateSetter(event.target.value)
      }
   }

   const formState = { name: newName, phone: newPhoneNum }
   const formHandleFunc = {
      name: handleStateChange(setNewName),
      phone: handleStateChange(setNewPhoneNum)
   }

   return (
      <div>
         <h2>Phonebook</h2>

         <SearchByName keyword={keyword}
            handleChange={handleStateChange(setKeyword)}
            searchFunc={searchPersons} />

         <AddPersonForm handleSubmit={addName}
            states={formState}
            handleChange={formHandleFunc} />

         <DisplayPhoneNum persons={renderPersons} />
      </div>
   )
}


export default App