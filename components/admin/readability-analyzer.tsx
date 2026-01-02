"use client"

import { Card } from "@/components/ui/card"
import { calculateReadabilityScore } from "@/lib/readability"
import { BookOpen } from "lucide-react"

interface ReadabilityAnalyzerProps {
  content: string
}

export function ReadabilityAnalyzer({ content }: ReadabilityAnalyzerProps) {
  const score = calculateReadabilityScore(content)

  const getScoreColor = (s: number) => {
    if (s > 80) return "text-green-500"
    if (s > 60) return "text-yellow-500"
    return "text-red-500"
  }

  return (
    <Card className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold flex items-center gap-2">
          <BookOpen className="w-4 h-4" />
          Readability Score
        </h3>
        <div className={`text-3xl font-bold ${getScoreColor(score.score)}`}>{score.score}</div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Difficulty</p>
          <p className="font-semibold">{score.grade}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Read Time</p>
          <p className="font-semibold">{score.estimatedReadTime} min</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Words</p>
          <p className="font-semibold">{score.wordCount}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Sentences</p>
          <p className="font-semibold">{score.sentenceCount}</p>
        </div>
      </div>

      <div className="pt-2 border-t space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Avg Word Length</span>
          <span>{score.averageWordLength} chars</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Avg Sentence Length</span>
          <span>{score.averageSentenceLength} words</span>
        </div>
      </div>
    </Card>
  )
}
