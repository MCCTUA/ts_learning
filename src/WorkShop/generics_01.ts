/*
# โจทย์ที่ 1: Basic Generic Function

เขียนฟังก์ชัน identity ที่รับค่าอะไรก็ได้และคืนค่าแบบเดียวกัน
โดยใช้ generic <T>

expected
identity("hello") → "hello"
identity(123)     → 123
identity([1,2,3]) → [1,2,3]
*/

import { create } from 'domain'

function identity<T>(value: T): T {
  return value
}

const result = identity('Hello')
console.log(`1 : ${result}`)

/*
#โจทย์ที่ 2: Generic กับ Return Type ที่ต่างจาก Parameter

ฟังก์ชัน wrap รับค่าอะไรก็ได้ แล้วคืนเป็น object แบบ:
wrap("hello") → { value: "hello" }
wrap(10)      → { value: 10 }
ให้ type ของ return เป็น:
{ value: T }
*/

interface retrunValue<T> {
  value: T
}

function wrap<T>(param: T): retrunValue<T> {
  return {
    value: param,
  }
}

const result2 = wrap(15)
console.log(result2)

/*

# โจทย์ที่ 3: Generic Constraint (extends)

เขียนฟังก์ชัน getLength ที่รับเฉพาะค่า “ที่มี length ได้เท่านั้น”
รองรับ:
•   array
•   string
•   custom object ที่มี { length: number }
และต้อง return ความยาว
*/

function getLength<T extends { length: number }>(value: T) {
  return value.length
}

const objWithLength = {
  id: 1,

  category: 'tools',

  length: 20,
}

const result3_1 = getLength('abc')
const result3_2 = getLength([1, 2, 3, 4])
const result3_3 = getLength(objWithLength)
console.log(`
result3_1 : ${result3_1},
result3_2 : ${result3_2},
result3_3 : ${result3_3}`)

/*
# โจทย์ที่ 4: keyof + Generic

ให้เขียนฟังก์ชัน: getProperty<T, K extends keyof T>(obj: T, key: K) 
ต้อง return ค่า obj[key] อย่าง type-safe
*/

function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key]
}

const keyProp = {
  name: 'Jonh',
  age: 33,
  postCode: '11000',
}

const result4_1 = getProperty(keyProp, 'name')
console.log(`result4_1 : ${result4_1}`)

/*
# โจทย์ที่ 5: การใช้ Generic กับ Callback

เขียนฟังก์ชัน: mapArray<T, R>(arr: T[], callback: (item: T) => R): R[]
เหมือน Array.prototype.map
*/

function mapArray<T, R>(arr: T[], callback: (items: T) => R): R[] {
  const result: R[] = []

  for (const item of arr) {
    result.push(callback(item))
  }

  return result
}

const result5_1 = mapArray([1, 2, 3], (arr) => arr % 2)
console.log(`result5_1 : ${result5_1}`)

/*
# โจทย์ที่ 6: Generic + Constraint ที่ซับซ้อนขึ้น

เขียนฟังก์ชัน: pluck<T, K extends keyof T>(items: T[], key: K): T[K][]
Extract ค่า key เดียวจาก object array

ตัวอย่าง
const people = [{ name: "A", age: 10 }, { name: "B", age: 20 }];
pluck(people, "name") // ["A", "B"]
pluck(people, "age")  // [10, 20]
*/

function pluck<T, K extends keyof T>(items: T[], key: K): T[K][] {
  const result: T[K][] = []

  for (const item of items) {
    result.push(item[key])
  }

  return result
}

const user = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
]

const result6_1 = pluck(user, 'name')
const result6_2 = pluck(user, 'id')
console.log(`
result6_1 : ${result6_1}
result6_2 : ${result6_2}`)

/*

# โจทย์ที่ 7: ทำ Type Guard ของตัวเอง

ให้เขียน type guard:
function isString(value: unknown): value is string

ซึ่ง
isString("hello") → true
isString(123)     → false
และทำการ narrowing ค่าได้ เช่น:
if (isString(v)) {
v.toUpperCase(); // OK
}
*/

function isString(value: unknown): value is string {
  if (typeof value === 'string') {
    return true
  } else {
    return false
  }
}

function isString2(value: unknown): value is string {
  return typeof value === 'string'
}

const text1 = 'abc'
const num1 = 200
console.log(`isString : ${isString(text1)} and ${isString(num1)}`)
console.log(`isString2 : ${isString2(text1)} and ${isString2(num1)}`)

type Role = 'admin' | 'user' | 'super Admin'

function checkRole(value: unknown): value is Role {
  const result: Role[] = ['admin', 'user', 'super Admin']

  if (typeof value !== 'string') {
    return false
  }

  return result.includes(value as Role)
}

function checkRoleNoAs(value: unknown): value is Role {
  if (typeof value !== 'string') {
    return false
  }

  return ['admin', 'user', 'super Admin'].includes(value)
}

console.log(
  `checkRole : admin : ${checkRole('admin')}, student : ${checkRole(
    'student'
  )}, 123 : ${checkRole(123)}`
)

console.log(
  `checkRoleNoAs : admin : ${checkRoleNoAs('admin')}, student : ${checkRoleNoAs(
    'student'
  )}, 123 : ${checkRoleNoAs(123)}`
)

/*
# โจทย์ที่ 8: Generic + Type Guard

เขียน type guard ชื่อ hasId:
function hasId<T>(obj: T): obj is T & { id: number }
ให้ทำงานแบบนี้:
const a = { id: 10, name: "Alice" };
const b = { name: "Bob" };
hasId(a) → true
hasId(b) → false
และใน block ต้องสามารถใช้ obj.id ได้อย่างปลอดภัย
*/

function hasId<T>(obj: T): obj is T & { id: number } {
  let result = false

  if (typeof obj === 'object' && obj !== null && 'id' in obj) {
    result = typeof (obj as any).id === 'number'
  }

  return result
}

const a = { id: 10, name: 'Alice' }
const b = { name: 'Bob' }
console.log(`a : ${hasId(a)}`)
console.log(`a : ${hasId(b)}`)

/*
# โจทย์ที่ 9: Generic Default Type

ให้เขียนฟังก์ชัน:
function createSet<T = string>(): Set<T>
ซึ่ง:

•   ถ้าไม่ระบุ generic → default เป็น string
•   ถ้าระบุ → ใช้ type นั้น

Example:
const s1 = createSet();        // Set<string>
const s2 = createSet<number>(); // Set<number>
*/

function createSet<T = string>(): Set<T> {
  return new Set<T>()
}
const s1 = createSet()
const s2 = createSet<number>()

const result9_1 = s1.add('abc')
const result9_2 = s2.add(123)
console.log('result9_1 :', result9_1, 'result9_2 :', result9_2)
/*
# โจทย์ที่ 10: Challenge ระดับ Senior — Combine Generic, keyof, Constraint, Callback

เขียนฟังก์ชัน:
filterBy<T, K extends keyof T>(items: T[], key: K, predicate: (value: T[K]) => boolean): T[]

ฟังก์ชันนี้จะ:
•   เลือกเฉพาะ items ที่ key ตรงตามเงื่อนไข
•   predicate ต้องได้รับ type อย่างถูกต้อง

ตัวอย่าง:
const users = [
{ name: "A", age: 18 },
{ name: "B", age: 30 },
{ name: "C", age: 15 }
];

filterBy(users, "age", age => age >= 18);
→ [{ name: "A", age: 18 }, { name: "B", age: 30 }]

*/
/*
function filterBy<T, K extends keyof T>(
  items: T[],
  key: K,
  predicate: (value: T[K]) => boolean
): T[] {
  const result: T[] = []
  for (const item of items) {
    if (typeof item === 'object' && item !== null) {
      const keyList = Object.keys(item)
      if (typeof key === 'string' && keyList.includes(key)) {
        if (predicate(item[key])) {
          result.push(item)
        }
      }
    }
  }
  return result
}
*/

function filterBy<T, K extends keyof T>(
  items: T[],
  key: K,
  predicate: (value: T[K]) => boolean
): T[] {
  return items.filter((item) => predicate(item[key]))
}

const users = [
  { name: 'A', age: 18 },
  { name: 'B', age: 30 },
  { name: 'C', age: 15 },
]
const filtered = filterBy(users, 'age', (age) => age >= 18)
console.log(filtered)
