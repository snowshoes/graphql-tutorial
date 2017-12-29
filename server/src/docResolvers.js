import uuidv1 from 'uuid/v1';
import UserModel from './models/user';

class User {
  constructor({ id, username, password }) {
    this.id = id;
    this.username = username;
    this.password = password;
  }
}

const resolvers = {
  Query: {
    loginUser: () => {}
  },
  Mutation: {
    singupUser: (root, { username, password }) => {
      if (!username) {
        return { error: 'username field should not be null' };
      }
      if (!password) {
        return { error: 'password field should not be null' };
      }
      const id = uuidv1();
      return UserModel.create({
        id,
        username,
        password
      }).then(user => new User(user));
    }
  }
};

export { resolvers };
