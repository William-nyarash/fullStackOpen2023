const { ApolloServer} = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const {GraphQLError} = require('graphql')
const {v1: uuid} = require('uuid');
// const  Library = require('./models/library')

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
require('dotenv').config()
const Book = require('./models/Book')
const Author = require('./models/Author')

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting')

mongoose.connect(MONGODB_URI)
      .then(() => {
        console.log('connected to MongoDB')
      })
      .catch((error) => {
        console.log('error connection to MongoDB:', error.message)
      })

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'Demons',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]


const typeDefs = `
  type Book {
    id: ID!
    title: String!
    published: Int!
    author: Author!
    genres: [String!]
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }
  type Mutation {
  addBook(
  title:String!
  author:String!
  published:Int!
  genres: [String!]  
  ): Book!

  editAuthor(
  name:String!
  born: Int!
  ): Author!

  }
  type Query {
    authorCount: Int!
    bookCount: Int!
    allBooks(author: String, genres: String!): [Book !]!
    allAuthors: [Author]!
    unFilteredBooks: [Book!]!
  }
`


const resolvers = {
  Query:{
    bookCount:  async () => await Book.countDocuments(),
    authorCount: async () => await Author.countDocuments(),
    allBooks: async (root) =>{
       return await Book.find({ });

       },
    allAuthors: async () => {
        const AuthorCollection = await Author.find({})
        const result  = await Promise.all( AuthorCollection.map( async (author ) => {
        const bookCount = await  Book.countDocuments({author: author._id })
                return {
          name: author.name,
          born: author.born,
          bookCount
        }
      })
    )
    return result 
  },
    unFilteredBooks: async () => {
      return  await Book.find({ })
    }
  },
  Mutation: {
    addBook: async (root,args) => {
        if(!args.title || args.title.length < 5) {
          throw new GraphQLError("Title field must be longer than 5 characters", {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs:args.title
            }
          })
        }  
      const exitstingBook = await  Book.findOne({ title: args.title})
        if(exitstingBook) {
          throw new GraphQLError("title must be unique", {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.title
            }
          })
        }
        let author  = await Author.findOne({name: args.author})

        if(!author) {
          author = new Author({name: args.author})
          await author.save()
        }
        const book = new Book( {... args, author: author._id} )
        const savedBook = await book.save()
        return  savedBook
    },
    editAuthor: async (root,args) => {
      const author = await Author.find({name: args.name })
      if (!author) {
        throw new GraphQLError("Author not found", {
          extensions: { code: 'BAD_USER_INPUT'}
        });
      }
    }
  }

}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4001 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})








