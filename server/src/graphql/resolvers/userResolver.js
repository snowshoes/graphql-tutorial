import bcrypt from 'bcrypt';

const resolvers = {
  Query: {
    login: async (root, { input }, { User, Phone, Address, Profile }) => {
      const { email, password } = input;
      const user = await User.findOne({ email })
        .populate({
          path: 'phones',
          model: Phone
        })
        .populate({
          path: 'addresses',
          model: Address
        })
        .populate({
          path: 'profile',
          model: Profile
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
    register: async (root, { input }, { User, Phone, Address, Profile }) => {
      const { username, email, phones, addresses, profile } = input;
      let { password } = input;
      password = await bcrypt.hash(password, 12);
      // save phones
      // prettier-ignore
      const phoneIds = await Promise.all(phones.map(async ({
        countryCode,
        number,
        phonetype
      }) => {
        const phone = await new Phone({
          countryCode,
          number,
          phonetype
        }).save();
        return phone.id;
      }));

      // save addresses
      // prettier-ignore
      const addrIds = await Promise.all(addresses.map(async ({
        atype,
        streetName,
        streetNumber,
        floor,
        city,
        country,
        postCode
      }) => {
        const address = await new Address({
          atype,
          streetName,
          streetNumber,
          floor,
          city,
          country,
          postCode
        }).save();
        return address.id;
      }));

      // save profile
      const { title, firstName, lastName, avatar, gender } = profile;
      const aProfile = await new Profile({
        title,
        firstName,
        lastName,
        avatar,
        gender
      }).save();

      // save user
      const registered = await new User({
        username,
        email,
        password,
        phones: phoneIds,
        addresses: addrIds,
        profile: aProfile.id
      }).save();
      return registered;
    }
  }
};

export default resolvers;
