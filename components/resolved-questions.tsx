'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const resolvedQuestions = [
  {
    id: 1,
    question: "What is our policy on password complexity?",
    response: "Our password policy requires a minimum of 12 characters, including uppercase and lowercase letters, numbers, and special characters.",
    decision: "Implemented in User Authentication Module",
    documentationLink: "/security/policies/password-policy"
  },
  {
    id: 2,
    question: "How often should we conduct security audits?",
    response: "We conduct comprehensive security audits on a quarterly basis, with continuous monitoring and smaller checks performed weekly.",
    decision: "Added to Security Operations Calendar",
    documentationLink: "/security/operations/audit-schedule"
  },
  {
    id: 3,
    question: "What is our process for handling security vulnerabilities reported by users?",
    response: "We have a dedicated bug bounty program and a process for triaging, validating, and addressing reported vulnerabilities within 48 hours of submission.",
    decision: "Implemented Vulnerability Response Workflow",
    documentationLink: "/security/incident-response/vulnerability-handling"
  },
  {
    id: 4,
    question: "How do we secure API endpoints?",
    response: "All API endpoints are secured using OAuth 2.0 for authentication, rate limiting to prevent abuse, and input validation to mitigate injection attacks.",
    decision: "Updated API Security Guidelines",
    documentationLink: "/development/api/security-guidelines"
  },
  {
    id: 5,
    question: "What is our data retention policy?",
    response: "We retain user data for a maximum of 2 years after account closure, with options for users to request earlier deletion in compliance with GDPR and CCPA.",
    decision: "Implemented in Data Management System",
    documentationLink: "/legal/data-retention-policy"
  }
]

export function ResolvedQuestions() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Resolved Security Questions</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {resolvedQuestions.map((question) => (
          <Card key={question.id}>
            <CardHeader>
              <CardTitle>{question.question}</CardTitle>
              <CardDescription>Resolved</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-2"><strong>Response:</strong> {question.response}</p>
              <p className="mb-2"><strong>Decision:</strong> {question.decision}</p>
              <p><strong>Documentation:</strong> <a href={question.documentationLink} className="text-blue-500 hover:underline">{question.documentationLink}</a></p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}