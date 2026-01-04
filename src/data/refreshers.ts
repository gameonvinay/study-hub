import {
  module1,
  module2,
  module3,
  module4,
  module5,
  module6,
  module7,
  module8,
  module9,
  module10,
  module11,
  module12,
  module13,
  module14,
  module15,
  module16
} from './c-programming'

export interface RefresherSubject {
  id: string
  name: string
  content: string
}

const programmingInC = `
# Programming in C - Refresher

A quick revision guide for C programming concepts.

---

${module1}

---

${module2}

---

${module3}

---

${module4}

---

${module5}

---

${module6}

---

${module7}

---

${module8}

---

${module9}

---

${module10}

---

${module11}

---

${module12}

---

${module13}

---

${module14}

---

${module15}

---

${module16}
`

export const refresherSubjects: RefresherSubject[] = [
  {
    id: 'programming-in-c',
    name: 'Programming in C',
    content: programmingInC
  }
]

export type { RefresherSubject as RefresherSubjectType }
