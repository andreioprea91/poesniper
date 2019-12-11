let query = {
  "query": {
    "filters": {
      "trade_filters": {
        "disabled": false,
        "filters": {
          "price": {
            "min": 1,
            "max": 999
          }
        }
      }
    },
    "status": {
      "option": "online"
    },
    "stats": [
      {
        "type": "and",
        "filters": []
      }
    ],
    
  },
  "sort": {
    "indexed": "des"
  }
}

export default query;
