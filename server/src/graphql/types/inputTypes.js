export default `
  input RegisterInput {
    username: String
    email: String!
    password: String!
    addresses: [AddressInput]!
    phones: [PhoneInput]!
    profile: ProfileInput!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input PhoneInput {
    countryCode: String!
    number: String!
    phonetype: PhoneNumberType!
  }

  input AddressInput {
    atype: AddressType!
    streetName: String
    streetNumber: String
    floor: String
    city: String!
    country: String!
    postCode: String!
  }

  input ProfileInput {
    title: String!
    firstName: String!
    lastName: String!
    avatar: String
    gender: String
  }
`;
