import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import _ from 'lodash';

const resolvers = {
  Query: {
    loginUser: async (root, { input }, { User }) => {
      if (!input.username) {
        return { error: 'username field should not be null' };
      }
      if (!input.password) {
        return { error: 'password field should not be null' };
      }
      const user = await User.find({ username: input.username }).exec();
      return user;
    }
  },
  Mutation: {
    // signupUser: async (root, { input }, { User }) => {
    //   if (!input.username) {
    //     return { error: 'username field should not be null' };
    //   }
    //   if (!input.password) {
    //     return { error: 'password field should not be null' };
    //   }
    //   const user = await new User(input).save();
    //   return user;
    // },
    register: async (root, { input }, { UserModel }) => {
      const user = input;
      console.log(user);
      user.password = await bcrypt.hash(user.password, 12);
      const registered = await new UserModel(user).save();
      return registered;
    },
    login: async (root, { input }, { UserModel, SECRET }) => {
      const { email, password } = input;
      const user = await UserModel.findOne({ email });
      console.log(user);
      if (!user) {
        throw new Error('No regiestered user with that email');
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw new Error('Incorrect password');
      }

      // const token = jwt.sign(
      //   {
      //     user: _.pick(user, ['id', 'username'])
      //   },
      //   SECRET,
      //   {
      //     expiresIn: '20s'
      //   }
      // );

      return user;
    }
  }
};

export default resolvers;
