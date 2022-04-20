export interface Problem {
    ID: number
    CreatedAt: string
    UpdatedAt: string
    DeletedAt: any
    title: string
    titleSlug: string
    content: string
    difficulty: string
    likes: number
    dislikes: number
    exampleTestCases: string
    hints: string

  }