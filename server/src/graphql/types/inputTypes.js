export default `
  input RegisterInput {
    username: String
    email: String!
    password: String!
    addresses: [AddressInput]!
    phones: [PhoneInput]!
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
`;
