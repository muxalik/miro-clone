import { v } from 'convex/values'
import { query } from './_generated/server'
import { getAllOrThrow } from 'convex-helpers/server/relationships'

export const get = query({
  args: {
    orgId: v.string(),
    search: v.optional(v.string()),
    favorites: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()

    if (!identity) {
      throw new Error('Unauthorized')
    }

    const userId = identity.subject
    const search = args.search

    if (args.favorites) {
      const favoritedBoards = await ctx.db
        .query('userFavorites')
        .withIndex('by_user_org', (q) =>
          q.eq('userId', userId).eq('orgId', args.orgId)
        )
        .order('desc')
        .collect()

      const favoritedIds = favoritedBoards.map((row) => row.boardId)

      let boards = await getAllOrThrow(ctx.db, favoritedIds)

      if (search) {
        boards = boards.filter((board) =>
          board.title.toLowerCase().includes(search)
        )
      }

      return boards.map((board) => ({
        ...board,
        isFavorite: true,
      }))
    }

    let boards

    if (search) {
      boards = await ctx.db
        .query('boards')
        .withSearchIndex('search_title', (q) =>
          q.search('title', search).eq('orgId', args.orgId)
        )
        .collect()
    } else {
      boards = await ctx.db
        .query('boards')
        .withIndex('by_org', (q) => q.eq('orgId', args.orgId))
        .order('desc')
        .collect()
    }

    const boardsWithFavoriteRelation = boards.map((board) => {
      return ctx.db
        .query('userFavorites')
        .withIndex('by_user_board', (q) =>
          q.eq('userId', userId).eq('boardId', board._id)
        )
        .unique()
        .then((favorite) => ({
          ...board,
          isFavorite: !!favorite,
        }))
    })

    const boardWithFavoriteBoolean = Promise.all(boardsWithFavoriteRelation)

    return boardWithFavoriteBoolean
  },
})
