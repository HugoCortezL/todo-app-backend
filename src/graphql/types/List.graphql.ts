import { ObjectType, InputType, Field } from "type-graphql";
import { Todo } from "./";

@ObjectType()
@InputType("ListInput")
export class List {
    @Field(() => String,
        {
            description: "The id of the list"
        })
    _id: string

    @Field(() => String,
        {
            description: "The name of the list"
        })
    name: string

    @Field(() => [Todo],
        {
            description: "The todos of the list",
            defaultValue: []
        })
    todos: Todo[]
}