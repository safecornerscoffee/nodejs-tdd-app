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

### Schema and Model
#### Schema 
A document schema is a JSON object that allows you to define the shape and content of documents and embedded documents in a collection.
#### Model
Instance of the schema.
#### Data Modeling
- [Data Models](https://docs.mongodb.com/manual/data-modeling/)
- [MongoDB Schema 디자인 하기](https://blog.outsider.ne.kr/655)

#### [mongoose.Schema](https://mongoosejs.com/docs/guide.html)
```javascript
import mongoose from 'mongoose';
  const { Schema } = mongoose;

  const blogSchema = new Schema({
    title:  String, // String is shorthand for {type: String}
    author: String,
    body:   String,
    comments: [{ body: String, date: Date }],
    date: { type: Date, default: Date.now },
    hidden: Boolean,
    meta: {
      votes: Number,
      favs:  Number
    }
  });
```
#### [mongoose.model](https://mongoosejs.com/docs/models.html)
```javascript
const Blog = mongoose.model('Blog', blogSchema);
```
The first argument is the singular name of the collection your model is for. Mongoose automatically looks for the plural, lowercased version of your model name. Thus, for the example above, the model `Blog` is for the `blogs` collection in the database.

## Jest
### describe(name, fn)
### it(name, fn, timeout)
### expect
### matcher
### jest.fn()
#### Create mock function
```javascript
const mockFunction = jest.fn()
```
#### Call mock function
```javascript
mockFunction()
mockFunction('hello')
```
#### Set return value
```javascript
mockFunction.mockReturnValue("hello, mock")
console.log(mockFunction())
```
#### Validate
```javascript
mockFunction('hello')
mockFunction()

expect(mockFunction).toBeCalledWith('hello')
expect(mockFunction).toBeCalledTimes(2)
```