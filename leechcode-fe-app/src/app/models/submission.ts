export interface Submission {
    ID: number
    CreatedAt: string
    UpdatedAt: string
    DeletedAt: any
    userId: string
    problemSlug: string
    language: string
    version: string
    code: string
    status: boolean

  }