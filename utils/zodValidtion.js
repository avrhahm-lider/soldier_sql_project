import z from 'zod'


export const Soldier = z.object({
    name: z.string().min(2).max(30),
    role : z.string().default(""),
    rank : z.string().default(""),
    unit : z.string().default(""),
})

export const UpdateSoldier = z.object({
    name: z.string().min(2).max(30),
    role : z.string().default(""),
    rank : z.string().default(""),
    unit : z.string().default(""),
    status : z.enum(["active", "deactive"])
})