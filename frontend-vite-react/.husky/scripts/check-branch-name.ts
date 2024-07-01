import { execSync } from 'child_process'

function checkBranchName() {
  if (isInteractiveRebase()) process.exit(0)

  const branchName = getCurrentBranchName()
  const forbiddenBranches = ['main', 'master']
  const allowedPrefixes = ['backend/', 'frontend/', 'dev/', 'fix/']

  const isValidPrefix = allowedPrefixes.some((prefix) =>
    branchName.startsWith(prefix),
  )
  if (!isValidPrefix) {
    console.error(
      `Error: Branch name '${branchName}' is not allowed.\nBranch names must start with a prefix: ${allowedPrefixes.join(', ')}.`,
    )
    process.exit(1)
  }

  if (forbiddenBranches.includes(branchName)) {
    console.error(
      `Error: It is forbidden to commit on following branches: ${forbiddenBranches.join(', ')}.`,
    )
    process.exit(1)
  }

  console.log(
    `You will commit on branch '${branchName}'. Perfect, you follow our best practises!`,
  )
  process.exit(0)
}

function getCurrentBranchName(): string {
  try {
    return execSync('git rev-parse --abbrev-ref HEAD', {
      encoding: 'utf8',
    }).trim()
  } catch (error) {
    console.error(
      'Error: Unable to determine the current branch name.\n',
      error,
    )
    process.exit(1)
  }
}

function isInteractiveRebase(): boolean {
  return (
    execSync('git rev-parse --abbrev-ref HEAD', {
      encoding: 'utf8',
    }).trim() === 'HEAD'
  )
}

checkBranchName()
