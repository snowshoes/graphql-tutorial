import bcrypt from 'bcrypt';

const resolvers = {
  Query: {
    login: async (root, { input }, { User, Phone }) => {
      const { email, password } = input;
      const user = await User.findOne({ email }).populate({
        path: 'phones',
        model: Phone
      });
      console.log(user);
      if (!user) {
        throw new Error('No regiestered user with that email');
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw new Error('Incorrect password');
      }

      return user;
    }
  },
  Mutation: {
    register: async (root, { input }, { User, Phone }) => {
      const { username, email, phones } = input;
      let { password } = input;

      // save phones
      // prettier-ignore
      const phoneIds = await Promise.all(phones.map(async ({ countryCode, number, phonetype }) => {
        const phone = await new Phone({
          countryCode,
          number,
          phonetype
        }).save();
        return phone.id;
      }));

      // save user
      password = await bcrypt.hash(password, 12);
      const registered = await new User({
        username,
        email,
        password,
        phones: phoneIds
      }).save();
      return registered;
    }
  }
};

export default resolvers;
