import Mongoose from "mongoose"

const {mongoose} = Mongoose

const URI = 'mongodb://localhost:27017/aqvergowasi_mongodb'

mongoose.connect(URI)
    .then(db => console.log('DB is connected'))
    .catch(err => console.log(err))

export default mongoose