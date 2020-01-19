import {
    ObjectType,
    Field,
    ID,
    Ctx,
    Authorized,
    Query
} from "type-graphql"
import { Inject } from "typedi"
import { AuthorizedContext } from "../graphql"
import TweetService from "../services/tweet-service"

@ObjectType()
class Tweet {
    @Field(_ => ID) id: string
    @Field() authorName: string
    @Field() publishedAt: Date
    @Field() text: string
}

export class TweetResolver {

    @Inject()
    private readonly service: TweetService

    @Query(_ => [Tweet])
    @Authorized()
    tweets(@Ctx() context: AuthorizedContext): Promise<Tweet[]> {
        return this.service.get(context)
    }
}
