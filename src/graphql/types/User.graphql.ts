import { ObjectType, InputType, Field, ID } from "type-graphql";
import { List } from "./";

@ObjectType()
export class User {
    @Field(() => ID,
        {
            description: "The id of the user"
        })
    id: string

    @Field(() => String,
        {
            description: "The name of the user"
        })
    name: string

    @Field(() => String,
        {
            description: "The email of the user"
        })
    email: string

    @Field(() => String,
        {
            description: "The password of the user"
        })
    password: string

    @Field(() => [List],
        {
            description: "The lists of the user",
            defaultValue: []
        })
    lists: List[]

}

@InputType()
export class UserInput {

    @Field(() => String,
        {
            description: "The name of the user"
        })
    name: string

    @Field(() => String,
        {
            description: "The email of the user"
        })
    email: string

    @Field(() => String,
        {
            description: "The password of the user"
        })
    password: string

}


@InputType()
export class UserLogin {

    @Field(() => String,
        {
            description: "The email of the user"
        })
    email: string

    @Field(() => String,
        {
            description: "The password of the user"
        })
    password: string

}