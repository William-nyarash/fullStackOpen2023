import {gql } from '@apollo/client'

export const FIND_PERSON = gql `
    query findPersonByName($nameToSearch: String! ){
        findPerson( name: $nameToSearch) {
         name
         phone
         id 
         address {
         street,
         city
         }
        }
    }
`

export const ALL_PERSONS = gql `
query {
    allPersons {
        name
        phone 
        id
    }
}
` 
export const query =  gql`

    query {
    allPersons{
        name, 
        phone,
        address {
        street,
        city
        }
        id
    }
    }
`