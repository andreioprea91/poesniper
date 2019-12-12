let query = {
  query: {
    status: {
      option: "online"
    },
    stats: [
      {
        type: "and",
        filters: []
      }
    ]
  },
  sort: {
    price: "asc"
  }
};

export default query;
