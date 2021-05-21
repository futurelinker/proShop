import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Futurelink',
    email: 'hola@futurelink.me',
    password: bcrypt.hashSync('321654', 10),
    isAdmin: true,
  },
  {
    name: 'Stephen Hawking',
    email: 'stephen@nasa.com',
    password: bcrypt.hashSync('321654', 10),
  },
  {
    name: 'Gallileo Galilei',
    email: 'gallileo@nasa.com',
    password: bcrypt.hashSync('321654', 10),
  },
]

export default users