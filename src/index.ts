import {PrismaClient} from "@prisma/client";


const prisma = new PrismaClient({
  log: [{emit: 'stdout', level: 'query'}],
});


// @ts-ignore
prisma.$on('query', (e: { query: any; params: any }) => {
  console.log('Query', e.query)
  console.log('Params', e.params)
})


const cupId = new Array(32).fill("1").join("");

console.log("Upserting record into DB")
await prisma.cup.upsert({
  where: {
    id: cupId
  },
  create: {
    id: cupId
  },
  update: {}
})

console.log("____________________ \n\n")
const attempt = await prisma.cup.findUnique({where: {id: cupId}});
/** There we can see that value is presented in  DB */
console.log("There we can see that value is presented in  DB")
console.log(attempt)


console.log("____________________ \n\n")
const responses = await Promise.all([
  prisma.cup.findUnique({where: {id: cupId}}),
  prisma.cup.findUnique({where: {id: cupId}})
])
/** But there is nulls */
console.log("But there is nulls")
console.log(responses)


console.log("____________________ \n\n")
const responses_2 = await Promise.all([
  prisma.cup.findUnique({where: {id: cupId.replace(/(.{8})(.{4})(.{4})(.{4})(.+)/, '$1-$2-$3-$4-$5')}}),
  prisma.cup.findUnique({where: {id: cupId.replace(/(.{8})(.{4})(.{4})(.{4})(.+)/, '$1-$2-$3-$4-$5')}})
])

/** But there it works */
console.log("But there is works")
console.log(responses_2)
