import userModel from '../models/User'
import { UserRepository } from './'
import { List, ListInput } from '../../graphql/types'
import {v4} from 'uuid'

export class ListRepository {
    userRepository: UserRepository
    constructor() {
        this.userRepository = new UserRepository()
    }

    async create(userId: string, item: ListInput): Promise<boolean> {
        const newList: List = {
            _id: v4(),
            name: item.name,
            todos: []
        }
        
        const successPromise = Promise.resolve(userModel.updateMany({_id: userId}, {
            $push: {
                lists: newList
            }
        }))

        const success = await successPromise
        return success.acknowledged
    }

    async update(userId: string, listId: string, newList: ListInput): Promise<boolean> {
        const getUser = await this.userRepository.getById(userId)
        let lists =  getUser.lists
        let listToEdit = lists.find(list => list._id == listId)
        if(!listToEdit){
            return false
        }
        lists = lists.filter(list => list._id != listId)
        const listEdited:List = {
            _id: listToEdit._id,
            name: newList.name,
            todos: newList.todos

        }
        lists.push(listEdited)
        const sucessPromise = Promise.resolve(userModel.updateOne({ _id: userId }, {
            $set: {
                lists: lists
            }
        }))
        const success = await sucessPromise
        return success.acknowledged
    }

    async delete(userId: string, listId: string): Promise<boolean>{
        const getUser = await this.userRepository.getById(userId)
        const lists =  getUser.lists
        let newLists = lists.filter(list => list._id != listId)
        const sucessPromise = Promise.resolve(userModel.updateOne({ _id: userId }, {
            $set: {
                lists: newLists
            }
        }))
        const success = await sucessPromise
        return success.acknowledged
    }
}