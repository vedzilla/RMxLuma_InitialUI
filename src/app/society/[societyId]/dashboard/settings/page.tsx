"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSocietyAuth } from "@/hooks/useSocietyAuth";
import { createAuthBrowserClient } from "@/supabase_lib/auth/browser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Instagram, LogOut } from "lucide-react";
import { toast } from "sonner";

const approvalStatusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  approved: "bg-green-100 text-green-800",
  trusted: "bg-blue-100 text-blue-800",
  rejected: "bg-red-100 text-red-800",
};

export default function SettingsPage() {
  const router = useRouter();
  const { society, account, profile, loading } =
    useSocietyAuth();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (profile) {
      setName(profile.name ?? "");
      setDescription(profile.description ?? "");
    }
  }, [profile]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await new Promise((r) => setTimeout(r, 500));
    toast.success("Profile updated successfully.");
    setSaving(false);
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setSaving(true);
    await new Promise((r) => setTimeout(r, 500));
    setNewPassword("");
    setConfirmPassword("");
    toast.success("Password updated successfully.");
    setSaving(false);
  };

  const handleSignOut = async () => {
    const supabase = createAuthBrowserClient();
    await supabase.auth.signOut();
    router.push("/auth");
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Loading your profile...</p>
        </div>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-24 animate-pulse rounded bg-muted" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your society profile and account settings
        </p>
      </div>

      {/* Account status */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Account Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-muted-foreground">
              Approval Status
            </span>
            <Badge
              variant="secondary"
              className={
                approvalStatusColors[account?.approval_status ?? "pending"] ??
                "bg-muted"
              }
            >
              {account?.approval_status ?? "pending"}
            </Badge>
          </div>
          {society?.instagram_handle && (
            <div className="flex items-center gap-3">
              <Instagram className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Linked Instagram:
              </span>
              <span className="text-sm font-medium">
                @{society.instagram_handle}
              </span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Profile settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Society Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Society Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your society name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Tell people about your society"
                rows={4}
              />
            </div>
            <Button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Change password */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Change Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
              />
            </div>
            <Button type="submit" disabled={saving}>
              {saving ? "Updating..." : "Update Password"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Separator />

      {/* Sign out */}
      <div className="flex justify-end">
        <Button variant="outline" onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}
