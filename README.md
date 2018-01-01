# iQuizz-Graphql

Simple Register and Login Demo using GraphQL with Apollo, Mongoose and Express

### Functionalities

1. User register
2. User login

### Tech Stack

#### client:

* React (not implemented)
* Apollo

#### server:

* Express (Graphql-Express)
* Graphql
* MongoDB
* Mongoose

#### Graphql API

* Query and Mutation typeDefs

```js
type Query {
    login(input: LoginInput!): User
}

type Mutation {
  register(input: RegisterInput!): User!
}
```

* Types Definition

```
enum PhoneNumberType {
  WORK
  HOME
}

enum AddressType {
  MAIN
  SUBS
}

schema {
  query: Query
  mutation: Mutation
}

type Query {
  login(input: LoginInput!): User
}

type Mutation {
  register(input: RegisterInput!): User! # 返回值不为空
}

# Basic Types
type User {
  id: ID! # unique & required
  username: String
  password: String!
  addresses: [Address]!
  emails: [String]! # required at least one
  phones: [Phone]!
  profile: Profile!
}

type Phone {
  countryCode: String!
  number: String!
  type: PhoneNumberType!
}

type Profile {
  title: String!
  firstName: String!
  lastName: String!
  avatar: String
  gender: String
}

type Address {
  atype: AddressType!
  streetName: String
  streetNumber: String
  floor: String
  city: String!
  country: String!
  postCode: String!
}

# Input Types
input LoginInput {
  email: Email!
  password: String!
}

input RegisterInput {
  username: String
  email: String!
  password: String!
  phones: [PhoneInput]!
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
```

All Types' definition can be found in `src/graphql/query/types.graphql`

* Register Input using Graphiql

```
mutation {
  register(
    input: {
      username: "t6",
      email: "t6@gmail.com",
      password: "12345",
      phones: [
        { countryCode: "+33",
          number: "0612345678",
          phonetype: WORK
        }
        { countryCode: "+34",
          number: "0634567890",
          phonetype: HOME
        }
      ],
      addresses: [
        { atype: MAIN,
          streetName: "Tronchet",
          streetNumber: "3",
          floor: "2nd",
          city: "Paris",
          country: "France",
          postCode: "75008"
        },
        { atype: SUBS,
          city: "Beijing",
          country: "China",
          postCode: "100085"
        }
      ],
      profile: {
        title: "M.",
        firstName: "Bruce",
        lastName: "Lee",
        avatar:"http://api.cloud.com/avatar?id=12345"
        gender: "Male"
      }
    }
  ) {
    id
    username
    email
  }
}
```

mutation input could be found in `src/graphql/query/mutation.graphql`

* Query Input using Graphiql

```
query {
  login(input: { email: "t6@gmail.com", password: "12345" }) {
    id
    email
    username
    phones {
      countryCode
      number
      phonetype
    }
    addresses {
      atype
      streetName
      streetNumber
      floor
      city
      country
      postCode
    }
    profile {
      title
      firstName
      lastName
      avatar
      gender
    }
  }
}
```

query input could be found in `src/graphql/query/query.graphql`

#### Constraints

##### register

* field `email` could not be null and empty\
  `email`字段不能为空
* field `password` could not be null and empty\
  `password`字段不能为空
* `email` should be unique, an email could only be registered once\
  一个 email 只能注册一次，不能重复注册
* 其余 fields 是否为空，是否为必填字段，根据 types 中每个 field 定义判断

##### login

通过输入 email 和 password 登陆，email 唯一且不为空

* unknown email could not be logged in\
  未注册 email 无法登陆
* password error could not be logged in\
  密码错误无法登陆
