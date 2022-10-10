import userModel from '../models/User'
import { UserRepository } from './'
import { Todo, TodoInput } from '../../graphql/types'
import { v4 } from 'uuid'

export class TodoRepository {
    userRepository: UserRepository
    constructor() {
        this.userRepository = new UserRepository()
    }


    async create(userId: string, listId: string, item: TodoInput): Promise<boolean> {
        const lists = await this.userRepository.getListsById(userId)
        const newTodo: Todo = {
            _id: v4(),
            title: item.title,
            priority: item.priority,
            status: item.status,
            deadline: item.deadline,
            favorite: item.favorite
        }
        
        const newLists = lists.map(list => {
            if(list._id == listId){
                list.todos.push(newTodo)
            }
            return list
        })
        
        const successPromise = Promise.resolve(userModel.updateOne({_id: userId}, {
            $set: {
                lists: newLists
            }
        }))

        const success = await successPromise
        return success.acknowledged
    }

    async update(userId: string, listId: string, todoId: string, newTodo: TodoInput): Promise<boolean> {
        let lists = await this.userRepository.getListsById(userId)
        let listToEdit = lists.find(list => list._id === listId)
        if (!listToEdit) {
            return false
        }
        lists = lists.filter(list => list._id != listId)

        const newTodos = listToEdit.todos.map(todo => {
            if(todo._id == todoId){
                return {_id: todo._id, title: newTodo.title, deadline: newTodo.deadline, priority: newTodo.priority, status: newTodo.status, favorite: newTodo.favorite}
            }
            return todo
        })

        listToEdit = {
            _id: listToEdit._id,
            name: listToEdit.name,
            todos: newTodos
        }

        lists.push(listToEdit)

        const sucessPromise = Promise.resolve(userModel.updateOne({ _id: userId }, {
            $set: {
                lists: lists
            }
        }))
        const success = await sucessPromise
        return success.acknowledged
    }

    async delete(userId: string, listId: string, todoId: string): Promise<boolean>{
        const getUser = await this.userRepository.getById(userId)
        let lists =  getUser.lists

        let listToEdit = lists.find(list => list._id === listId)
        if (!listToEdit) {
            return false
        }
        lists = lists.filter(list => list._id != listId)

        const newTodos = listToEdit.todos.filter(todo => todo._id != todoId)

        listToEdit = {
            _id: listToEdit._id,
            name: listToEdit.name,
            todos: newTodos
        }

        lists.push(listToEdit)

        const sucessPromise = Promise.resolve(userModel.updateOne({ _id: userId }, {
            $set: {
                lists: lists
            }
        }))
        const success = await sucessPromise
        return success.acknowledged
    }

    async favorite(userId: string, listId: string, todoId: string): Promise<boolean> {
        let lists = await this.userRepository.getListsById(userId)
        let listToEdit = lists.find(list => list._id === listId)
        if (!listToEdit) {
            return false
        }
        lists = lists.filter(list => list._id != listId)

        const newTodos = listToEdit.todos.map(todo => {
            if(todo._id == todoId){
                const todoFavorite = todo.favorite
                return {_id: todo._id, title: todo.title, deadline: todo.deadline, priority: todo.priority, status: todo.status, favorite: !todoFavorite}
            }
            return todo
        })

        listToEdit = {
            _id: listToEdit._id,
            name: listToEdit.name,
            todos: newTodos
        }

        lists.push(listToEdit)

        const sucessPromise = Promise.resolve(userModel.updateOne({ _id: userId }, {
            $set: {
                lists: lists
            }
        }))
        const success = await sucessPromise
        return success.acknowledged
    }



}