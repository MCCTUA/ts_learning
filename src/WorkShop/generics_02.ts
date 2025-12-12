/*
Workshop รอบถัดไป (ทดสอบว่า “เข้าใจจริง”)

ให้คุณตอบกลับมาด้วย “โค้ดล้วน ๆ” (ไม่ต้องอธิบาย) สำหรับ 5 ข้อนี้:

1. เขียน safeParseJSON<T>(text: string): T | null
    - ถ้า parse ไม่ได้ return null
    - ถ้า parse ได้ return เป็น T (แต่ต้องใช้ unknown ภายใน ห้ามใช้ any)
2. เขียน getOrDefault<T, K extends keyof T>(obj: T, key: K, fallback: T[K]): T[K]
3. เขียน groupBy<T, K extends keyof T & string>(items: T[], key: K): Record<string, T[]>
4. เขียน type guard: function isNonEmptyArray<T>(value: unknown): value is T[]
    ต้อง return true เฉพาะ array ที่ length > 0
5. เขียน pipe<T, R>(value: T, ...fns: Array<(x: any) => any>): R แล้วปรับให้ “ไม่ใช้ any” (นี่แหละข้อยาก)
*/
