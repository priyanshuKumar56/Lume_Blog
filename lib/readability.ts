export interface ReadabilityScore {
  score: number // 0-100
  grade: string // Easy, Medium, Difficult, Very Difficult
  estimatedReadTime: number // minutes
  sentenceCount: number
  wordCount: number
  averageWordLength: number
  averageSentenceLength: number
}

export function calculateReadabilityScore(text: string): ReadabilityScore {
  const words = text.match(/\b\w+\b/g) || []
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0)
  const characters = text.replace(/\s/g, "")

  const wordCount = words.length
  const sentenceCount = sentences.length
  const averageWordLength = characters.length / wordCount
  const averageSentenceLength = wordCount / sentenceCount

  // Flesch Kincaid Grade Level calculation
  const gradeLevel = 0.39 * averageSentenceLength + 11.8 * (characters.length / wordCount / 100) - 15.59

  // Convert to score (0-100)
  let score = 100 - gradeLevel * 10
  score = Math.max(0, Math.min(100, score))

  let grade = "Very Difficult"
  if (score > 80) grade = "Easy"
  else if (score > 60) grade = "Medium"
  else if (score > 40) grade = "Difficult"

  const estimatedReadTime = Math.ceil(wordCount / 200) // Average reading speed is 200 WPM

  return {
    score: Math.round(score),
    grade,
    estimatedReadTime,
    sentenceCount,
    wordCount,
    averageWordLength: Math.round(averageWordLength * 10) / 10,
    averageSentenceLength: Math.round(averageSentenceLength),
  }
}
