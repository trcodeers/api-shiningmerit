
const { PORT, mongoURL, jwtPrivateKey, 
  seedAdminEmail, seedAdminPassword, seedAdminName, seedAdminUserName } = process.env
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
    seedData:{
      email: seedAdminEmail,
      password: seedAdminPassword,
      name: seedAdminName,
      userName: seedAdminUserName
    }
}

export default server;