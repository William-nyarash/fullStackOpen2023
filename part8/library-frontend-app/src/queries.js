import { gql } from '@apollo/client'


export const ALL_AUTHORS = gql `
    query {
        allAuthors {
        name 
        born 
        bookCount
        }
    }

`

export const  CREATE_BOOK = gql `
    mutation addBook (
        $title: String!,
        $author: String!,
        $published: String!,
        $genres: [String!]!
    ) {
        addBook (
        title: $title,
        author:$author,
        published: $published,
        genres:$genres
        )    
        {
        id 
        title
        author
        published
        genres
        }
    }
`
export const  ALL_BOOKS = gql ` 
    query {
        unFilteredBooks {
        title 
        author 
        published
        }
    }
`

export const ADD_AUTHOR_BIRTH = gql    `
    mutation editAuthor (
        $name:String!,
        $born: Int!
    ) {
        editAuthor(
            name:$name,
            born: $born
        ){
            name
            id
            born
            bookCount
        }
    }
`