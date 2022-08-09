import { User as UserModel, UserDto } from "../model/user"
import { User } from "../schema/user"

export const get = async () => {
    return User.find()
}

export const getOne = async (email: string) => {
    return User.findOne({ email: email }).select('+password')
}

export const set = async (userDto: UserModel) => {
    return new User(userDto).save()
}

export const update = async (userDto: UserDto) => {
    return User.findOneAndUpdate({ email: userDto.email }, userDto, { new: true });
}

export const remove = async (userDto: UserDto) => {
    if(userDto.isAdmin) {
        throw Error('Cannot delete Admin')
    }
    return User.deleteOne({ email: userDto.email });
}