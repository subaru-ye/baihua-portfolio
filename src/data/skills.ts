export type SkillItem = {
  name: string
  level: '掌握' | '熟悉' | '了解'
}

export type SkillGroup = {
  category: string
  items: SkillItem[]
}

export const skillGroups: SkillGroup[] = [
  {
    category: '后端',
    items: [
      { name: 'Java', level: '掌握' },
      { name: 'Spring Boot', level: '熟悉' },
      { name: 'MyBatis', level: '熟悉' },
      { name: 'MySQL', level: '熟悉' },
      { name: 'Redis', level: '了解' },
    ],
  },
  {
    category: '前端',
    items: [
      { name: 'HTML', level: '熟悉' },
      { name: 'CSS', level: '熟悉' },
      { name: 'JavaScript', level: '熟悉' },
      { name: 'TypeScript', level: '熟悉' },
      { name: 'React', level: '熟悉' },
    ],
  },
  {
    category: '工程化与工具',
    items: [
      { name: 'Git', level: '熟悉' },
      { name: 'Linux', level: '熟悉' },
      { name: 'Docker', level: '了解' },
      { name: 'Postman', level: '熟悉' },
      { name: 'Maven', level: '熟悉' },
    ],
  },
  {
    category: '其他语言与方向',
    items: [
      { name: 'Python', level: '了解' },
      { name: 'Go', level: '了解' },
      { name: 'Node.js', level: '了解' },
    ],
  },
]
