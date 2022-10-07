import { ListRepository } from '../../database/repository'
import { Arg, Mutation, Resolver } from 'type-graphql'
import { List, ListInput } from '../types'

@Resolver(() => List)
export class ListResolver {
    repository: ListRepository
    constructor() {
        this.repository = new ListRepository()
    }

    @Mutation(() => Boolean,
        {
            description: "Create a list"
        })
    async createList(
        @Arg("userId",
            {
                description: "The id of the user"
            })
        userId: string,
        @Arg("list",
            {
                description: "The object of the list"
            })
        list: ListInput
    ): Promise<boolean> {
        const success = await this.repository.create(userId, list)
        return success
    }

    @Mutation(() => Boolean,
        {
            description: "Edit a list"
        })
    async editList(
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
        @Arg("list",
            {
                description: "The object of the list"
            })
        list: ListInput
    ): Promise<boolean> {
        const success = await this.repository.update(userId, listId, list)
        return success
    }

    @Mutation(() => Boolean,
        {
            description: "Delete a list"
        })
    async deleteList(
        @Arg("userId",
            {
                description: "The id of the user"
            })
        userId: string,
        @Arg("listId",
            {
                description: "The id of the list"
            })
        listId: string
    ): Promise<boolean> {
        const success = await this.repository.delete(userId, listId)
        return success
    }
}