import { db } from '@/db'
import { getSession } from './auth'
import { eq } from 'drizzle-orm'
import { issues, users } from '@/db/schema'
import { mockDelay } from './utils'

// Current user
export const getCurrentUser = async () => {
  await mockDelay(3000)
  const session = await getSession()
  if (!session) return null

  try {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.id, session.userId))

    return result[0] || null
  } catch (error) {
    console.error('Error getting user by ID:', error)
    return null
  }
}

// Get user by email
export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    })

    return user || null
  } catch (error) {
    console.error('Error getting user by email:', error)
    return null
  }
}

export async function getIssues() {
  try {
    const session = await getSession()
    if (!session) return []
    // Fetch issues for the current user
    const result = await db.query.issues.findMany({
      where: eq(issues.userId, session.userId),
      with: {
        user: true,
      },
      orderBy: (issues, { desc }) => [desc(issues.createdAt)],
    })
    return result
  } catch (error) {
    console.error('Error fetching issues:', error)
    throw new Error('Failed to fetch issues')
  }
}

export async function getIssue(issueId: number) {
  try {
    const issue = await db.query.issues.findFirst({
      where: eq(issues.id, issueId),
      with: {
        user: true,
      },
    })
    return issue || null
  } catch (error) {
    console.error('Error fetching issue by ID:', error)
    return null
  }
}
