'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function Associations() {
  const [associations, setAssociations] = useState([
    {
      id: 1,
      title: "User Authentication Flow",
      items: [
        "Design Review Doc #AUTH-001",
        "Security Ticket #SEC-123",
        "Slack Thread #auth-discussion-20230601",
        "Release Approval #RA-456"
      ]
    },
    {
      id: 2,
      title: "Data Encryption Implementation",
      items: [
        "Design Review Doc #ENC-002",
        "Security Ticket #SEC-234",
        "Meeting Transcript #MT-20230615-encryption",
        "Slack Thread #encryption-review-20230620"
      ]
    }
  ])

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Associations</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {associations.map((association) => (
          <Card key={association.id}>
            <CardHeader>
              <CardTitle>{association.title}</CardTitle>
              <CardDescription>Associated items:</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-1">
                {association.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
      <Button>Review More Associations</Button>
    </div>
  )
}