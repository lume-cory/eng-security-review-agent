'use client'

import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ExternalLink, Check, X, MessageSquare, Mail, Ticket } from 'lucide-react'

interface Question {
  id: number;
  question: string;
  user: string;
  stage: string;
  source: string;
  sourceLink: string;
}

interface OutstandingQuestion extends Question {
  dueDate: string;
  suggestedResponse: string;
  supportingDocs: Array<{ name: string; link: string }>;
  otherDocs: Array<{ name: string; link: string }>;
}

interface ResolvedQuestion extends Question {
  resolvedDate: string;
  response: string;
  decision: string;
  documentationLink: string;
}

const outstandingQuestions: OutstandingQuestion[] = [
  {
    id: 1,
    question: "What are the security implications of using a third-party authentication service?",
    user: "John Doe",
    stage: "Architecture Review",
    dueDate: "2023-07-15",
    suggestedResponse: "Using a third-party authentication service can have both benefits and risks. Benefits include reduced development time and potentially more robust security measures. However, risks include potential data breaches at the third-party provider, loss of control over the authentication process, and potential service outages. It's crucial to thoroughly vet the provider, understand their security measures, and have contingency plans in place.",
    supportingDocs: [
      { name: "Security Policy #AUTH-001", link: "https://docs.company.com/security/AUTH-001" },
      { name: "Prior Review #PR-789", link: "https://reviews.company.com/PR-789" }
    ],
    otherDocs: [
      { name: "User Authentication Flow", link: "https://docs.company.com/auth/flow" },
      { name: "Third-Party Integration Guidelines", link: "https://docs.company.com/integration/guidelines" }
    ],
    source: "Slack #ask-security channel",
    sourceLink: "https://slack.com/archives/C01234567/p1623456789000200"
  },
  {
    id: 2,
    question: "How should we implement data encryption for user data at rest?",
    user: "Jane Smith",
    stage: "Development",
    dueDate: "2023-07-20",
    suggestedResponse: "For data encryption at rest, we recommend using AES-256 encryption. The implementation should include: 1) Use of a secure key management system to generate, store, and rotate encryption keys. 2) Encryption of data before it's written to disk. 3) Proper access controls to limit who can access the encrypted data and decryption keys. 4) Regular audits of the encryption process and key management. 5) Consideration of hardware-based encryption for additional security.",
    supportingDocs: [
      { name: "Encryption Guidelines #ENC-002", link: "https://docs.company.com/security/ENC-002" },
      { name: "Security Ticket #SEC-234", link: "https://jira.company.com/browse/SEC-234" }
    ],
    otherDocs: [
      { name: "Data Encryption Implementation", link: "https://docs.company.com/implementation/encryption" },
      { name: "Key Management Best Practices", link: "https://docs.company.com/security/key-management" }
    ],
    source: "Email to security-review alias",
    sourceLink: "mailto:security-review@company.com?subject=Data%20Encryption%20Question"
  },
  // Add more outstanding questions here
]

const resolvedQuestions: ResolvedQuestion[] = [
  {
    id: 1,
    question: "What is our policy on password complexity?",
    user: "Alice Johnson",
    stage: "Implementation",
    resolvedDate: "2023-06-30",
    response: "Our password policy requires a minimum of 12 characters, including uppercase and lowercase letters, numbers, and special characters. We also implement a password strength meter to encourage even stronger passwords.",
    decision: "Implemented in User Authentication Module",
    documentationLink: "/security/policies/password-policy",
    source: "Security review ticket",
    sourceLink: "https://jira.company.com/browse/SEC-001"
  },
  {
    id: 2,
    question: "How often should we conduct security audits?",
    user: "Bob Williams",
    stage: "Operations",
    resolvedDate: "2023-06-25",
    response: "We conduct comprehensive security audits on a quarterly basis, with continuous monitoring and smaller checks performed weekly. This schedule balances thorough review with operational efficiency.",
    decision: "Added to Security Operations Calendar",
    documentationLink: "/security/operations/audit-schedule",
    source: "Slack #ask-security channel",
    sourceLink: "https://slack.com/archives/C01234567/p1623456789000300"
  },
  // Add more resolved questions here
]

interface ConfirmedAssociations {
  [questionId: number]: {
    [docName: string]: boolean;
  };
}

export function QuestionsTable() {
  const [showResolved, setShowResolved] = useState(false)
  const [selectedQuestion, setSelectedQuestion] = useState<OutstandingQuestion | ResolvedQuestion | null>(null)
  const [response, setResponse] = useState('')
  const [confirmedAssociations, setConfirmedAssociations] = useState<ConfirmedAssociations>({})

  const questions = showResolved ? resolvedQuestions : outstandingQuestions

  const handleUseResponse = () => {
    if (selectedQuestion && 'suggestedResponse' in selectedQuestion) {
      setResponse(selectedQuestion.suggestedResponse)
    }
  }

  const handleModifyResponse = () => {
    if (selectedQuestion && 'suggestedResponse' in selectedQuestion) {
      setResponse(selectedQuestion.suggestedResponse)
    }
  }

  const handleConfirmAssociation = (questionId: number, docName: string, isAssociated: boolean) => {
    setConfirmedAssociations(prev => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        [docName]: isAssociated
      }
    }))
    // Here you would typically send this information back to your AI model or backend
    console.log(`Document "${docName}" is ${isAssociated ? '' : 'not '}associated with question ${questionId}`)
  }

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'Slack #ask-security channel':
        return <MessageSquare className="h-4 w-4 mr-2" />
      case 'Email to security-review alias':
        return <Mail className="h-4 w-4 mr-2" />
      case 'Security review ticket':
        return <Ticket className="h-4 w-4 mr-2" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Security Review Questions</h2>
        <div className="flex rounded-md shadow-sm" role="group">
          <Button
            variant={!showResolved ? "default" : "outline"}
            className="rounded-l-md"
            onClick={() => setShowResolved(false)}
          >
            Outstanding
          </Button>
          <Button
            variant={showResolved ? "default" : "outline"}
            className="rounded-r-md"
            onClick={() => setShowResolved(true)}
          >
            Resolved
          </Button>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Question</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Stage</TableHead>
            <TableHead>{showResolved ? 'Resolved Date' : 'Due Date'}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {questions.map((question) => (
            <TableRow key={question.id} className="cursor-pointer hover:bg-muted" onClick={() => setSelectedQuestion(question)}>
              <TableCell>{question.question}</TableCell>
              <TableCell>{question.user}</TableCell>
              <TableCell>{question.stage}</TableCell>
              <TableCell>
                {'resolvedDate' in question ? question.resolvedDate : question.dueDate}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {selectedQuestion && (
        <Dialog open={!!selectedQuestion} onOpenChange={() => setSelectedQuestion(null)}>
          <DialogContent className="max-w-[800px]">
            <DialogHeader>
              <DialogTitle>{selectedQuestion.question}</DialogTitle>
              <DialogDescription>Review and respond to this security question</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Submitted by:</Label>
                <span className="col-span-3">{selectedQuestion.user}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Stage:</Label>
                <span className="col-span-3">{selectedQuestion.stage}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">{showResolved ? 'Resolved on:' : 'Due by:'}</Label>
                <span className="col-span-3">
                  {showResolved ? 
                    ('resolvedDate' in selectedQuestion ? selectedQuestion.resolvedDate : '') : 
                    ('dueDate' in selectedQuestion ? selectedQuestion.dueDate : '')}
                </span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Source:</Label>
                <div className="col-span-3 flex items-center">
                  {getSourceIcon(selectedQuestion.source)}
                  <a href={selectedQuestion.sourceLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline flex items-center">
                    {selectedQuestion.source}
                    <ExternalLink className="h-4 w-4 ml-1" />
                  </a>
                </div>
              </div>
              {!showResolved && (
                <>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Suggested Response:</Label>
                    <div className="col-span-3 space-y-2">
                      {'suggestedResponse' in selectedQuestion && (
                        <>
                          <p>{selectedQuestion.suggestedResponse}</p>
                          <div className="flex space-x-2">
                            <Button onClick={handleUseResponse}>Use This Response</Button>
                            <Button variant="outline" onClick={handleModifyResponse}>Modify Response</Button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-start gap-4">
                    <Label className="text-right">
                      <span className="font-semibold">Supporting Content:</span>
                      <span className="block text-sm text-gray-500">Content that was referenced to create this response</span>
                    </Label>
                    <div className="col-span-3">
                      {'supportingDocs' in selectedQuestion && selectedQuestion.supportingDocs.map((doc, index) => (
                        <div key={index} className="flex items-center space-x-2 mb-2">
                          <a href={doc.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline flex items-center">
                            {doc.name}
                            <ExternalLink className="h-4 w-4 ml-1" />
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-start gap-4">
                    <Label className="text-right">
                      <span className="font-semibold">Other Content:</span>
                      <span className="block text-sm text-gray-500">This content may be related, but was not used. Should it be referenced for topics like this in the future?</span>
                    </Label>
                    <div className="col-span-3">
                      {'otherDocs' in selectedQuestion && selectedQuestion.otherDocs.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between mb-2">
                          <a href={doc.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline flex items-center">
                            {doc.name}
                            <ExternalLink className="h-4 w-4 ml-1" />
                          </a>
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant={confirmedAssociations[selectedQuestion.id]?.[doc.name] === true ? "default" : "outline"}
                              onClick={() => handleConfirmAssociation(selectedQuestion.id, doc.name, true)}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant={confirmedAssociations[selectedQuestion.id]?.[doc.name] === false ? "default" : "outline"}
                              onClick={() => handleConfirmAssociation(selectedQuestion.id, doc.name, false)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
              {showResolved ? (
                <>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Response:</Label>
                    <span className="col-span-3">{'response' in selectedQuestion ? selectedQuestion.response : ''}</span>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Decision:</Label>
                    <span className="col-span-3">{'decision' in selectedQuestion ? selectedQuestion.decision : ''}</span>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Documentation:</Label>
                    {'documentationLink' in selectedQuestion && (
                      <a href={selectedQuestion.documentationLink} className="col-span-3 text-blue-500 hover:underline flex items-center">
                        {selectedQuestion.documentationLink}
                        <ExternalLink className="h-4 w-4 ml-1" />
                      </a>
                    )}
                  </div>
                </>
              ) : (
                <div className="grid gap-2">
                  <Label htmlFor="response">Your Response:</Label>
                  <Textarea
                    id="response"
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                    placeholder="Enter your response here..."
                  />
                </div>
              )}
            </div>
            <DialogFooter>
              {!showResolved && <Button type="submit">Approve Response</Button>}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
