# Simple Node.js App with TDD
## [Mongo](https://hub.docker.com/_/mongo)
### Mongoose
#### [Connections](https://mongoosejs.com/docs/connections.html)
```shell
mongoose.connect('mongodb://username:password@host:port/database?options...', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  authSource: 'admin',
  });
```
`authSource` - The database to use when authenticating with user and pass. In MongoDB, users are scoped to a database. If you are getting an unexpected login failure, you may need to set this option.
