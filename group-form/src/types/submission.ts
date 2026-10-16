export interface Member {
  name: string
  sid: string
}

export interface Submission {
  id: string
  className: string
  mode: 'solo' | 'group'
  leaderName: string
  leaderSid: string
  members: Member[] // 组员1-3
  githubUrl: string // GitHub 仓库地址
  groupSize: number // 1-4
  coefficient: number // 小组系数
  createdAt: string
}

// 小组系数（用于成绩折算：小组得分 = 项目分 × 系数，单人按项目分计）：
// 2人 0.95，3人 0.90，4人 0.85；单人 1.0
export function coefficientFor(size: number): number {
  switch (size) {
    case 2: return 0.95
    case 3: return 0.9
    case 4: return 0.85
    default: return 1.0
  }
}
