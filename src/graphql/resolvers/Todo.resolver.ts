import { TodoRepository } from '../../database/repository'
import { Arg, Mutation, Resolver } from 'type-graphql'
import { Todo, TodoInput } from '../types'

@Resolver(() => Todo)
export class TodoResolver {
    repository: TodoRepository
    constructor() {
        this.repository = new TodoRepository()
    }

    @Mutation(() => Boolean,
        {
            description: "Create a list"
        })
    async createTodo(
        @Arg("userId",
            {
                description: "The id of the user"
            })
        userId: string,
        @Arg("listId",
            {
                description: "The id of the list"
            })
        listId: string,
        @Arg("todo",
            {
                description: "The object of the todo"
            })
        todo: TodoInput
    ): Promise<boolean> {
        const success = await this.repository.create(userId, listId, todo)
        return success
    }

    @Mutation(() => Boolean,
        {
            description: "Edit a list"
        })
    async editTodo(
        @Arg("userId",
            {
                description: "The id of the user"
            })
        userId: string,
        @Arg("listId",
            {
                description: "The id of the list"
            })
        listId: string,
        @Arg("todoId",
            {
                description: "The id of the todo"
            })
        todoId: string,
        @Arg("todo",
            {
                description: "The object of the todo"
            })
        todo: TodoInput
    ): Promise<boolean> {
        const success = await this.repository.update(userId, listId, todoId, todo)
        return success
    }
    
    @Mutation(() => Boolean,
        {
            description: "Delete a list"
        })
    async deleteTodo(
        @Arg("userId",
            {
                description: "The id of the user"
            })
        userId: string,
        @Arg("listId",
            {
                description: "The id of the list"
            })
        listId: string,
        @Arg("todoId",
            {
                description: "The id of the todo"
            })
        todoId: string
    ): Promise<boolean> {
        const success = await this.repository.delete(userId, listId, todoId)
        return success
    }

}