export default `
  input RegisterInput {
    username: String
    email: String!
    password: String!
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
`;
