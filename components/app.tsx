'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { QuestionsTable } from './questions-table'
import { ExternalLink } from 'lucide-react'

// Import the SuggestedModifications component
import { SuggestedModifications } from './suggested-modifications'

export default function SecurityReviewApp() {
  const router = useRouter()
  const [integrations, setIntegrations] = useState([
    { name: "Prior security design review docs", link: "#" },
    { name: "Slack #ask-security channel questions and responses", link: "#" },
    { name: "Security policy docs", link: "#" },
    { name: "Design review meeting notes and transcripts", link: "#" },
    { name: "Release approval checklists and associated docs", link: "#" },
    { name: "Security ticket threads and associated docs", link: "#" }
  ])
  const [newIntegration, setNewIntegration] = useState('')
  const [newFile, setNewFile] = useState<File | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [showModifications, setShowModifications] = useState(false)

  const addIntegration = () => {
    if (newIntegration) {
      setIntegrations([...integrations, { name: newIntegration, link: "#" }])
      setNewIntegration('')
      setIsAddDialogOpen(false)
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return
    const file = files[0]
    if (file) {
      setNewFile(file)
      setIntegrations([...integrations, { name: `Uploaded: ${file.name}`, link: "#" }])
      setIsAddDialogOpen(false)
    }
  }

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Engineering Security Review Agent</h1>
        <Button onClick={() => setShowModifications(!showModifications)}>
          {showModifications ? 'Back to Review' : 'View Suggested Modifications'}
        </Button>
      </div>
      
      {showModifications ? (
        <SuggestedModifications onBack={() => setShowModifications(false)} />
      ) : (
        <>
          <div className="bg-gray-100 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Integrations and Data Sources</h2>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button>Add New</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Integration or Upload File</DialogTitle>
                    <DialogDescription>Choose to add a new integration app or upload a file.</DialogDescription>
                  </DialogHeader>
                  <Tabs defaultValue="integration">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="integration">New Integration</TabsTrigger>
                      <TabsTrigger value="file">Upload File</TabsTrigger>
                    </TabsList>
                    <TabsContent value="integration">
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="new-integration" className="text-right">
                            Integration Name
                          </Label>
                          <Input
                            id="new-integration"
                            value={newIntegration}
                            onChange={(e) => setNewIntegration(e.target.value)}
                            className="col-span-3"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button onClick={addIntegration}>Add Integration</Button>
                      </DialogFooter>
                    </TabsContent>
                    <TabsContent value="file">
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="file-upload" className="text-right">
                            Choose File
                          </Label>
                          <Input
                            id="file-upload"
                            type="file"
                            onChange={handleFileUpload}
                            className="col-span-3"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button onClick={() => setIsAddDialogOpen(false)}>Upload File</Button>
                      </DialogFooter>
                    </TabsContent>
                  </Tabs>
                </DialogContent>
              </Dialog>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {integrations.map((integration, index) => (
                <div key={index} className="flex items-center justify-between bg-white p-2 rounded">
                  <span>{integration.name}</span>
                  <a href={integration.link} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-5 w-5 text-gray-500 hover:text-gray-700" />
                  </a>
                </div>
              ))}
            </div>
          </div>
          <QuestionsTable />
        </>
      )}
    </div>
  )
}
