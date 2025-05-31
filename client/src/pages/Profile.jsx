import React from "react";
import {
  User,
  FileText,
  Globe,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Profile() {
  return (
    <div className="flex h-screen bg-gradient-to-r from-blue-100 to-purple-200">
      {/* Sidebar */}
      <aside className="w-20 bg-white shadow-md flex flex-col items-center py-6 space-y-6">
        <ShieldCheck className="w-6 h-6 text-blue-600" />
        <User className="w-6 h-6 text-gray-500" />
        <FileText className="w-6 h-6 text-gray-500" />
        <Globe className="w-6 h-6 text-gray-500" />
        <Mail className="w-6 h-6 text-gray-500" />
      </aside>

      {/* Main */}
      <main className="flex-1 p-10 overflow-auto">
        {/* Top Bar (bell and avatar removed) */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-semibold">Welcome, Anukrati</h2>
            <p className="text-gray-500 text-sm">Sat, 31 May 2025</p>
          </div>
        </div>

        {/* Profile Card */}
        <Card className="rounded-2xl">
          <CardContent className="p-8">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-4">
                <img
                  src="https://i.pravatar.cc/100"
                  alt="profile"
                  className="rounded-full w-20 h-20"
                />
                <div>
                  <h3 className="text-xl font-semibold">Anukrati Pandey</h3>
                  <p className="text-gray-500 text-sm">anukrati240@gmail.com</p>
                </div>
              </div>
              <Button>Edit</Button>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <Input placeholder="Full Name" />
              <Input placeholder="Nick Name" />
              <Input placeholder="Gender" />
              <Input placeholder="Country" />
              <Input placeholder="Language" />
              <Input placeholder="Time Zone" />
            </div>

            {/* Legal Info */}
            <div className="mt-8">
              <h4 className="text-lg font-semibold mb-2 text-gray-700">Legal Document Stats</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <p className="text-sm text-gray-500">Documents Uploaded</p>
                  <p className="text-xl font-bold">12</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <p className="text-sm text-gray-500">Preferred Type</p>
                  <p className="text-xl font-bold">NDA</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <p className="text-sm text-gray-500">Last Analyzed</p>
                  <p className="text-sm text-gray-700">28 May 2025</p>
                </div>
              </div>
            </div>

            {/* Email Section */}
            <div className="mt-8">
              <p className="text-sm text-gray-500 mb-1">My email address</p>
              <div className="flex items-center space-x-4">
                <Mail className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-sm">alexarawles@gmail.com</p>
                  <p className="text-xs text-gray-400">1 month ago</p>
                </div>
              </div>
              <Button variant="outline" className="mt-3 text-blue-600 border-blue-200">
                + Add Email Address
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
