export type SkillItem = {
  name: string
  level: '\u638c\u63e1' | '\u719f\u6089' | '\u4e86\u89e3'
}

export type SkillGroup = {
  category: string
  items: SkillItem[]
}

export const skillGroups: SkillGroup[] = [
  {
    category: '\u540e\u7aef',
    items: [
      { name: 'Java', level: '\u638c\u63e1' },
      { name: 'Spring Boot', level: '\u719f\u6089' },
      { name: 'MyBatis', level: '\u719f\u6089' },
      { name: 'MySQL', level: '\u719f\u6089' },
      { name: 'Redis', level: '\u4e86\u89e3' },
    ],
  },
  {
    category: '\u524d\u7aef',
    items: [
      { name: 'HTML', level: '\u719f\u6089' },
      { name: 'CSS', level: '\u719f\u6089' },
      { name: 'JavaScript', level: '\u719f\u6089' },
      { name: 'TypeScript', level: '\u719f\u6089' },
      { name: 'React', level: '\u719f\u6089' },
    ],
  },
  {
    category: '\u5de5\u7a0b\u5316 / \u5de5\u5177',
    items: [
      { name: 'Git', level: '\u719f\u6089' },
      { name: 'Linux', level: '\u719f\u6089' },
      { name: 'Docker', level: '\u4e86\u89e3' },
      { name: 'Postman', level: '\u719f\u6089' },
      { name: 'Maven', level: '\u719f\u6089' },
    ],
  },
  {
    category: '\u5176\u4ed6\u8bed\u8a00 / \u6269\u5c55\u65b9\u5411',
    items: [
      { name: 'Python', level: '\u4e86\u89e3' },
      { name: 'Go', level: '\u4e86\u89e3' },
      { name: 'Node.js', level: '\u4e86\u89e3' },
    ],
  },
]
