import z from 'zod'


export const Soldier = z.object({
    name: z.string().min(2).max(30),
    role : z.string().nullable().default(null),
    rank : z.string().nullable().default(null),
    unit: z.string().nullable().default(null),
    age: z.number().int().positive()
})

export const UpdateSoldier = z.object({
    name: z.string().min(2).max(30),
    role : z.string().nullable().default(null),
    rank : z.string().nullable().default(null),
    unit: z.string().nullable().default(null),
    age: z.number().int().positive(),
    status : z.enum(["active", "deactive"])
})

export const QueryParmas = z.object({
    unit: z.string().nullable().default(null),
    role : z.string().nullable().default(null),
    rank : z.string().nullable().default(null),
    status : z.enum(["active", "deactive"]).nullable().default(null)
})