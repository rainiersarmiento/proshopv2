import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@email.com",
    // bcrypt.hashSync(PASSWORD, SALT 1-20)
    // Salt value goes up to 20
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "John Doe",
    email: "john@email.com",
    // bcrypt.hashSync(PASSWORD, SALT 1-20)
    // Salt value goes up to 20
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
  },
  {
    name: "Jane Doe",
    email: "jane@email.com",
    // bcrypt.hashSync(PASSWORD, SALT 1-20)
    // Salt value goes up to 20
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
  },
];
export default users;
