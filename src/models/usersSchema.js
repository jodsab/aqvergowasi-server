import bcryptjs from 'bcryptjs'
import mongoose from 'mongoose'

const usersSchema = new mongoose.Schema(
    {
        name: {type: String, default: 'Anonymous'},
        rol: {type: String, default: 'user'},
        profilePicture: {type: String, default: ''},
        email: {type: String, default: 'anonymous@hotmail.com'},
        password: {type: String, default: 'ADMINadmin1'},
        celNumber: {type: String},
        company: {type: String, default: 'Anonymous Corp'},
        ocupation: {type: String, default: ''},
        country: {type: String, default: 'Perú'},
        createdAt: {type: Date, default: Date.now},
    }
)

usersSchema.pre('save', async function (next) {
    const user = this;

    if(!user.isModified('password')) return next()

    try {
        const salt = await bcryptjs.genSalt(10)
        user.password = await bcryptjs.hash(user.password, salt)
        next()
    } catch(error) {
        console.log(error)
        throw new Error('Fallo el hash de contraseña')
    }
})

usersSchema.methods.comparePassword = async function (canditatePassword) {
    return await bcryptjs.compare(canditatePassword, this.password)
}

const User = mongoose.model('User', usersSchema)

export default User
