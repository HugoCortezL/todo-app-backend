import { ObjectType, InputType, Field } from "type-graphql";


export enum PriorityEnum {
    Low = "Low",
    Mid = "Mid",
    High = "High"
}

export enum StatusEnum {
    Todo = "To-do",
    Progess = "In Progress",
    Review = "Review",
    Done = "Done"
}

@ObjectType()
@InputType("TodoInput")
export class Todo {
    @Field(() => String,
        {
            description: "The id of the to-do"
        })
    _id: string

    @Field(() => String,
        {
            description: "The title of the to-do"
        })
    title: string

    @Field(() => String,
        {
            description: "The priority of the to-do"
        })
    priority: PriorityEnum

    @Field(() => String,
        {
            description: "The status of the to-do",
            defaultValue: StatusEnum.Todo
        })
    status: StatusEnum

    @Field(() => Date,
        {
            description: "The status of the to-do",
            nullable: true
        })
    deadline: Date

}

@InputType()
export class TodoInput {
    @Field(() => String,
        {
            description: "The title of the to-do"
        })
    title: string

    @Field(() => String,
        {
            description: "The priority of the to-do"
        })
    priority: PriorityEnum

    @Field(() => String,
        {
            description: "The status of the to-do",
            defaultValue: StatusEnum.Todo
        })
    status: StatusEnum

    @Field(() => Date,
        {
            description: "The status of the to-do",
            nullable: true
        })
    deadline: Date

}