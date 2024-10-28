'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, CheckCircle2, XCircle, Edit } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export function SuggestedModifications({ onBack }: { onBack: () => void }) {
  const [lackOfDocumentation, setLackOfDocumentation] = useState([
    {
      id: 1,
      question: "What are the security requirements for IoT devices?",
      suggestedUpdate: "Add a new section to the Security Policy document covering IoT device security, including encryption requirements, update procedures, and network isolation guidelines.",
      status: 'pending',
      modifiedContent: ''
    },
    {
      id: 2,
      question: "How should we handle security for containerized applications?",
      suggestedUpdate: "Create a new design review document for containerized applications, covering image security, runtime protection, and orchestration security considerations.",
      status: 'pending',
      modifiedContent: ''
    }
  ])

  const [conflictingRequirements, setConflictingRequirements] = useState([
    {
      id: 1,
      requirement: "Password complexity",
      doc1: { name: "User Authentication Policy", content: "Passwords must be at least 8 characters long." },
      doc2: { name: "Security Baseline 2023", content: "Passwords must be at least 12 characters long." },
      selectedDoc: undefined as string | undefined,  // Update this type
      status: 'pending',
      suggestedModification: "Update all password requirements to enforce a minimum of 12 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character.",
      modifiedContent: ''
    },
    {
      id: 2,
      requirement: "Data retention period",
      doc1: { name: "Data Governance Policy", content: "Customer data must be retained for 5 years." },
      doc2: { name: "GDPR Compliance Guide", content: "Personal data should not be kept for longer than necessary." },
      selectedDoc: undefined as string | undefined,  // Change null to undefined
      status: 'pending',
      suggestedModification: "Update the Data Governance Policy to state: 'Customer data must be retained for the minimum period necessary to fulfill the purpose for which it was collected, not exceeding 5 years unless legally required.'",
      modifiedContent: ''
    }
  ])

  const [outdatedDocs, setOutdatedDocs] = useState([
    {
      id: 1,
      name: "Legacy Firewall Configuration Guide",
      lastUpdated: "2018-05-15",
      replacementDoc: "Next-Gen Firewall Best Practices",
      suggestedHeaderText: "NOTICE: This document is outdated. Please refer to the 'Next-Gen Firewall Best Practices' for current guidelines.",
      note: "",
      status: 'pending',
      modifiedContent: ''
    },
    {
      id: 2,
      name: "Windows Server 2012 Hardening Checklist",
      lastUpdated: "2016-11-30",
      replacementDoc: "Windows Server 2022 Security Baseline",
      suggestedHeaderText: "WARNING: This checklist is for an outdated version of Windows Server. For current security practices, consult the 'Windows Server 2022 Security Baseline'.",
      note: "",
      status: 'pending',
      modifiedContent: ''
    }
  ])

  const [bestPracticeImprovements, setBestPracticeImprovements] = useState([
    {
      id: 1,
      currentPractice: "Annual penetration testing",
      suggestedImprovement: "Implement continuous penetration testing using automated tools, supplemented by quarterly manual penetration tests.",
      framework: "NIST Cybersecurity Framework",
      status: 'pending',
      modifiedContent: ''
    },
    {
      id: 2,
      currentPractice: "Static application security testing (SAST) during the build phase",
      suggestedImprovement: "Integrate SAST into the development process with IDE plugins and pre-commit hooks, in addition to build-time scans.",
      framework: "OWASP SAMM",
      status: 'pending',
      modifiedContent: ''
    }
  ])

  const handleAction = (
    id: number,
    action: 'accepted' | 'rejected' | 'modified' | 'selected',
    category: 'lackOfDocumentation' | 'conflictingRequirements' | 'outdatedDocs' | 'bestPracticeImprovements',
    modifiedContent = ''
  ) => {
    switch (category) {
      case 'lackOfDocumentation':
        setLackOfDocumentation(prev => prev.map(item => 
          item.id === id ? { ...item, status: action, modifiedContent: modifiedContent || item.modifiedContent } : item
        ))
        break
      case 'conflictingRequirements':
        setConflictingRequirements(prev => prev.map(item => 
          item.id === id ? { ...item, status: action, modifiedContent: modifiedContent || item.modifiedContent } : item
        ))
        break
      case 'outdatedDocs':
        setOutdatedDocs(prev => prev.map(item => 
          item.id === id ? { ...item, status: action, modifiedContent: modifiedContent || item.modifiedContent } : item
        ))
        break
      case 'bestPracticeImprovements':
        setBestPracticeImprovements(prev => prev.map(item => 
          item.id === id ? { ...item, status: action, modifiedContent: modifiedContent || item.modifiedContent } : item
        ))
        break
    }
  }

  const renderActionButtons = (
    item: any, 
    category: 'lackOfDocumentation' | 'conflictingRequirements' | 'outdatedDocs' | 'bestPracticeImprovements'
  ) => (
    <div className="flex space-x-2 mt-2">
      <Button 
        size="sm" 
        variant={item.status === 'accepted' ? 'default' : 'outline'}
        onClick={() => handleAction(item.id, 'accepted', category)}
      >
        <CheckCircle2 className="mr-2 h-4 w-4" />
        Accept
      </Button>
      <Dialog>
        <DialogTrigger asChild>
          <Button size="sm" variant="outline">
            <Edit className="mr-2 h-4 w-4" />
            Modify
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modify Suggestion</DialogTitle>
            <DialogDescription>Make changes to the suggested update.</DialogDescription>
          </DialogHeader>
          <Textarea 
            value={item.modifiedContent || item.suggestedHeaderText || item.suggestedModification || item.suggestedUpdate || item.note} 
            onChange={(e) => handleAction(item.id, 'modified', category, e.target.value)}
          />
          <DialogFooter>
            <Button onClick={() => handleAction(item.id, 'modified', category)}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Button 
        size="sm" 
        variant={item.status === 'rejected' ? 'default' : 'outline'}
        onClick={() => handleAction(item.id, 'rejected', category)}
      >
        <XCircle className="mr-2 h-4 w-4" />
        Reject
      </Button>
    </div>
  )

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Suggested Modifications to Security Documentation</h1>
        <Button onClick={onBack}>Back to Main Dashboard</Button>
      </div>
      
      <Tabs defaultValue="lack-of-documentation">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="lack-of-documentation">Lack of Documentation</TabsTrigger>
          <TabsTrigger value="conflicting-requirements">Conflicting Requirements</TabsTrigger>
          <TabsTrigger value="outdated-docs">Outdated Documentation</TabsTrigger>
          <TabsTrigger value="best-practices">Best Practice Improvements</TabsTrigger>
        </TabsList>
        
        <TabsContent value="lack-of-documentation">
          <Card>
            <CardHeader>
              <CardTitle>Lack of Documentation</CardTitle>
              <CardDescription>Suggestions for updates to security policies or design review docs to fill gaps.</CardDescription>
            </CardHeader>
            <CardContent>
              {lackOfDocumentation.map((item) => (
                <div key={item.id} className="mb-4 p-4 border rounded">
                  <h3 className="font-semibold mb-2">{item.question}</h3>
                  <p className="mb-2">{item.suggestedUpdate}</p>
                  {renderActionButtons(item, 'lackOfDocumentation')}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="conflicting-requirements">
          <Card>
            <CardHeader>
              <CardTitle>Conflicting Requirements</CardTitle>
              <CardDescription>Resolve conflicts between different documentation and suggest modifications.</CardDescription>
            </CardHeader>
            <CardContent>
              {conflictingRequirements.map((item) => (
                <div key={item.id} className="mb-4 p-4 border rounded">
                  <h3 className="font-semibold mb-2">{item.requirement}</h3>
                  <RadioGroup 
                    onValueChange={(value) => handleAction(item.id, 'selected', 'conflictingRequirements', value)}
                    value={item.selectedDoc}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <RadioGroupItem value={item.doc1.name} id={`${item.id}-doc1`} />
                      <Label htmlFor={`${item.id}-doc1`}>{item.doc1.name}: {item.doc1.content}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value={item.doc2.name} id={`${item.id}-doc2`} />
                      <Label htmlFor={`${item.id}-doc2`}>{item.doc2.name}: {item.doc2.content}</Label>
                    </div>
                  </RadioGroup>
                  {item.selectedDoc && (
                    <p className="mt-2 text-sm text-green-600">Selected: {item.selectedDoc}</p>
                  )}
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">Suggested Modification:</h4>
                    <p className="mb-2">{item.suggestedModification}</p>
                    {renderActionButtons(item, 'conflictingRequirements')}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="outdated-docs">
          <Card>
            <CardHeader>
              <CardTitle>Outdated Documentation</CardTitle>
              <CardDescription>Add header text to outdated documents and notes pointing to the correct documentation.</CardDescription>
            </CardHeader>
            <CardContent>
              {outdatedDocs.map((item) => (
                <div key={item.id} className="mb-4 p-4 border rounded">
                  <h3 className="font-semibold mb-2">{item.name}</h3>
                  <p className="mb-2">Last Updated: {item.lastUpdated}</p>
                  <p className="mb-2">Replacement: {item.replacementDoc}</p>
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Suggested Header Text:</h4>
                    <p className="mb-2 p-2 bg-yellow-100 border border-yellow-300 rounded">{item.suggestedHeaderText}</p>
                    {renderActionButtons(item, 'outdatedDocs')}
                  </div>
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">Additional Note:</h4>
                    <Textarea
                      placeholder="Add a note for users of this document..."
                      value={item.note}
                      onChange={(e) => handleAction(item.id, 'modified', 'outdatedDocs', e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="best-practices">
          <Card>
            <CardHeader>
              <CardTitle>Best Practice Improvements</CardTitle>
              <CardDescription>Suggestions for aligning with industry best practices.</CardDescription>
            </CardHeader>
            <CardContent>
              {bestPracticeImprovements.map((item) => (
                <div key={item.id} className="mb-4 p-4 border rounded">
                  <h3 className="font-semibold mb-2">{item.currentPractice}</h3>
                  <p className="mb-2">{item.suggestedImprovement}</p>
                  <p className="mb-2 text-sm text-gray-600">Framework: {item.framework}</p>
                  {renderActionButtons(item, 'bestPracticeImprovements')}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
