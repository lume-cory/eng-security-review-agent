'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function Integrations() {
  const [integrations, setIntegrations] = useState([
    "Prior security design review docs",
    "Security chat channel questions and responses from Slack",
    "Security policy docs",
    "Transcripts from design review meetings",
    "Release approval checklists and associated docs",
    "Security ticket threads and associated docs"
  ])
  const [newIntegration, setNewIntegration] = useState('')

  const addIntegration = () => {
    if (newIntegration) {
      setIntegrations([...integrations, newIntegration])
      setNewIntegration('')
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Integrations and Data Sources</h2>
      <ul className="list-disc pl-5 space-y-2">
        {integrations.map((integration, index) => (
          <li key={index}>{integration}</li>
        ))}
      </ul>
      <div className="flex items-end space-x-2">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="new-integration">Add New Integration</Label>
          <Input
            type="text"
            id="new-integration"
            value={newIntegration}
            onChange={(e) => setNewIntegration(e.target.value)}
            placeholder="Enter new integration or document"
          />
        </div>
        <Button onClick={addIntegration}>Add</Button>
      </div>
    </div>
  )
}