// User profile editor
"use client"

import type React from "react"

import { useState, useEffect } from "react"
import useSWR from "swr"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { AnimatedSkeleton } from "@/components/ui/enhanced-loading"
import { User, Mail, Calendar, Edit3, Camera, Settings } from "lucide-react"

export default function ProfilePage() {
  const {
    data: profile,
    isLoading,
    mutate,
  } = useSWR("/api/user/profile", (url) => fetch(url).then((res) => res.json()))

  const [name, setName] = useState("")
  const [bio, setBio] = useState("")
  const [profileImage, setProfileImage] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState("")
  const [isEditing, setIsEditing] = useState(false)

  // Initialize form when profile loads
  useEffect(() => {
    if (profile?.user) {
      setName(profile.user.name)
      setBio(profile.user.bio || "")
      setProfileImage(profile.user.profile_image || "")
    }
  }, [profile])

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setIsSaving(true)
    setMessage("")

    try {
      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          bio,
          profile_image: profileImage,
        }),
      })

      if (!response.ok) throw new Error("Failed to update profile")

      const data = await response.json()
      mutate({ user: data.user })
      setMessage("Profile updated successfully!")
      setIsEditing(false)
    } catch (error: any) {
      setMessage(error.message || "Failed to update profile")
    } finally {
      setIsSaving(false)
    }
  }

  function handleCancel() {
    if (profile?.user) {
      setName(profile.user.name)
      setBio(profile.user.bio || "")
      setProfileImage(profile.user.profile_image || "")
    }
    setIsEditing(false)
    setMessage("")
  }

  if (isLoading) {
    return (
      <DashboardLayout title="Profile" subtitle="Manage your account settings">
        <div className="p-8 max-w-4xl">
          <Card>
            <CardHeader>
              <AnimatedSkeleton className="w-32 h-6" />
              <AnimatedSkeleton className="w-64 h-4" />
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <AnimatedSkeleton className="w-24 h-24 rounded-full" />
                <div className="space-y-2">
                  <AnimatedSkeleton className="w-48 h-6" />
                  <AnimatedSkeleton className="w-32 h-4" />
                </div>
              </div>
              <Separator />
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <AnimatedSkeleton className="w-24 h-4" />
                  <AnimatedSkeleton className="w-full h-10" />
                </div>
                <div className="space-y-4">
                  <AnimatedSkeleton className="w-20 h-4" />
                  <AnimatedSkeleton className="w-full h-10" />
                </div>
              </div>
              <div className="space-y-4">
                <AnimatedSkeleton className="w-16 h-4" />
                <AnimatedSkeleton className="w-full h-24" />
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    )
  }

  const user = profile?.user

  return (
    <DashboardLayout
      title="Profile"
      subtitle="Manage your account settings and personal information"
      actions={
        !isEditing && (
          <Button onClick={() => setIsEditing(true)}>
            <Edit3 className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        )
      }
    >
      <div className="p-8 max-w-4xl">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Profile Information
            </CardTitle>
            <CardDescription>
              Manage your personal information and how others see you
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <form onSubmit={handleSave} className="space-y-6">
                {message && (
                  <div
                    className={`p-3 rounded text-sm ${
                      message.includes("success") ? "bg-green-100 text-green-800" : "bg-destructive/10 text-destructive"
                    }`}
                  >
                    {message}
                  </div>
                )}

                {/* Profile Picture Section */}
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src={profileImage} alt={name} />
                      <AvatarFallback className="text-lg">
                        {name?.charAt(0)?.toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-2 -right-2">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground">
                        <Camera className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium mb-1">Profile Picture</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Upload a new avatar or update your profile image URL
                    </p>
                    <div className="space-y-2">
                      <Input
                        value={profileImage}
                        onChange={(e) => setProfileImage(e.target.value)}
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Basic Information */}
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Full Name
                    </label>
                    <Input value={name} onChange={(e) => setName(e.target.value)} required />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email Address
                    </label>
                    <Input value={user?.email || ""} disabled className="bg-muted" />
                    <p className="text-xs text-muted-foreground">
                      Email cannot be changed. Contact support if needed.
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Bio</label>
                  <Textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell us about yourself..."
                    rows={4}
                  />
                  <p className="text-xs text-muted-foreground">
                    Brief description for your profile. Maximum 200 characters.
                  </p>
                </div>

                {/* Account Info */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Account Information
                  </h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="p-4 border rounded-lg">
                      <p className="text-sm font-medium mb-1">Account Type</p>
                      <Badge variant="secondary">{user?.role || 'USER'}</Badge>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <p className="text-sm font-medium mb-1">Member Since</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'Unknown'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button type="submit" disabled={isSaving}>
                    {isSaving ? "Saving..." : "Save Changes"}
                  </Button>
                  <Button type="button" variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                {/* Profile View */}
                <div className="flex items-center gap-6">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={profileImage} alt={name} />
                    <AvatarFallback className="text-xl">
                      {name?.charAt(0)?.toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-2xl font-bold">{name}</h2>
                    <p className="text-muted-foreground flex items-center gap-1">
                      <Mail className="w-4 h-4" />
                      {user?.email}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="secondary">{user?.role || 'USER'}</Badge>
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Joined {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'Unknown'}
                      </span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-2">About</h3>
                  <p className="text-muted-foreground">
                    {bio || "No bio provided. Click 'Edit Profile' to add your bio."}
                  </p>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-4">Account Statistics</h3>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="p-4 border rounded-lg">
                      <p className="text-2xl font-bold">0</p>
                      <p className="text-sm text-muted-foreground">Posts Published</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <p className="text-2xl font-bold">0</p>
                      <p className="text-sm text-muted-foreground">Total Views</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <p className="text-2xl font-bold">0</p>
                      <p className="text-sm text-muted-foreground">Comments</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
