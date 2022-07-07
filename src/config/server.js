
const { PORT, mongoURL, jwtPrivateKey } = process.env
const server = {
    port: PORT || 4000,
    mongoose: {
      url: mongoURL,
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    },
    jwt: {
      key: jwtPrivateKey
    },
}

export default server;