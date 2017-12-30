export default {
  Query: {
    allCats: async (parent, args, { Cat }) => {
      const cats = await Cat.find();
      // return cats.map((cat) => {
      //   cat.id = cat.id.toString();
      //   return cat;
      // });
      return cats;
    }
  },

  Mutation: {
    createCat: async (parent, { input }, { Cat }) => {
      console.log(input);
      const kitty = await new Cat(input).save();
      // kitty.id = kitty.id.toString();
      return kitty;
    }
  }
};
