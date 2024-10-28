'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const questions = [
  {
    id: 1,
    question: "What are the security implications of using a third-party authentication service?",
    user: "John Doe",
    stage: "Architecture Review",
    dueDate: "2023-07-15",
    suggestedResponse: "Using a third-party authentication service can have both benefits and risks. Benefits include...",
    supportingDocs: ["Security Policy #AUTH-001", "Prior Review #PR-789"],
    relatedAssociations: ["User Authentication Flow"]
  },
  {
    id: 2,
    question: "How should we implement data encryption for user data at rest?",
    user: "Jane Smith",
    stage: "Development",
    dueDate: "2023-07-20",
    suggestedResponse: "For data encryption at rest, we recommend using AES-256 encryption. The implementation should...",
    supportingDocs: ["Encryption Guidelines #ENC-002", "Security Ticket #SEC-234"],
    relatedAssociations: ["Data Encryption Implementation"]
  },
  // Add 8 more example questions here
]

export function OutstandingQuestions() {
  const [selectedQuestion, setSelectedQuestion] = useState<typeof questions[0] | null>(null)
  const [response, setResponse] = useState('')

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Outstanding Security Review Questions</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {questions.map((question) => (
          <Card key={question.id}>
            <CardHeader>
              <CardTitle>{question.question}</CardTitle>
              <CardDescription>From: {question.user} | Stage: {question.stage}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Dialog>
                <DialogTrigger asChild>
                  <Button onClick={() => setSelectedQuestion(question)}>View Details</Button>
                </DialogTrigger>
                <DialogContent className="max-w-[800px]">
                  <DialogHeader>
                    <DialogTitle>{question.question}</DialogTitle>
                    <DialogDescription>Review and respond to this security question</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Submitted by:</Label>
                      <span className="col-span-3">{question.user}</span>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Stage:</Label>
                      <span className="col-span-3">{question.stage}</span>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Due by:</Label>
                      <span className="col-span-3">{question.dueDate}</span>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Suggested Response:</Label>
                      <span className="col-span-3">{question.suggestedResponse}</span>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Supporting Docs:</Label>
                      <ul className="col-span-3 list-disc pl-5">
                        {question.supportingDocs.map((doc, index) => (
                          <li key={index}>{doc}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Related Associations:</Label>
                      <ul className="col-span-3 list-disc pl-5">
                        {question.relatedAssociations.map((association, index) => (
                          <li key={index}>{association}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="response">Your Response:</Label>
                      <Textarea
                        id="response"
                        value={response}
                        onChange={(e) => setResponse(e.target.value)}
                        placeholder="Enter your response here..."
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Approve Response</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
