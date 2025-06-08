"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { X } from "lucide-react"
import type { TeamMember } from "@/lib/types"

interface TeamMemberModalProps {
  member: TeamMember | null
  isOpen: boolean
  onClose: () => void
}

export function TeamMemberModal({ member, isOpen, onClose }: TeamMemberModalProps) {
  if (!member) return null

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-[#0c2340] border-white/10 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center justify-between">
            {member.name}
            <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 text-gray-400 hover:text-white">
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
          <DialogDescription className="text-yellow-500">{member.role}</DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6 mt-4">
          <div className="relative h-64 w-full rounded-lg overflow-hidden">
            <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">About {member.name.split(" ")[0]}</h3>
            <p className="text-gray-300 mb-4">{member.bio}</p>

            {member.skills && (
              <>
                <h3 className="text-lg font-semibold mb-2">Skills</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {member.skills.map((skill, index) => (
                    <span key={index} className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </>
            )}

            {member.contact && (
              <>
                <h3 className="text-lg font-semibold mb-2">Contact</h3>
                <p className="text-gray-300">{member.contact}</p>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
