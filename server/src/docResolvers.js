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
    signupUser: async (root, { input }, { User }) => {
      if (!input.username) {
        return { error: 'username field should not be null' };
      }
      if (!input.password) {
        return { error: 'password field should not be null' };
      }
      const user = await new User(input).save();
      return user;
    }
  }
};

export default resolvers;
