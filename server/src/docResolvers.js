import bcrypt from 'bcrypt';

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
    }
  }
};

export default resolvers;
