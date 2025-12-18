import React, { useState } from "react";

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    notifications: true,
    emailAlerts: true,
    darkMode: false,
    autoApprove: false,
  });

  const handleToggle = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-6">Settings</h2>

        <div className="space-y-4">
          <SettingItem
            title="Email Notifications"
            description="Receive email alerts for new verifications"
            enabled={settings.notifications}
            onToggle={() => handleToggle("notifications")}
          />
          <SettingItem
            title="Email Alerts"
            description="Get notified about system updates"
            enabled={settings.emailAlerts}
            onToggle={() => handleToggle("emailAlerts")}
          />
          <SettingItem
            title="Dark Mode"
            description="Switch to dark theme"
            enabled={settings.darkMode}
            onToggle={() => handleToggle("darkMode")}
          />
          <SettingItem
            title="Auto Approve Verified Users"
            description="Automatically approve users with verified documents"
            enabled={settings.autoApprove}
            onToggle={() => handleToggle("autoApprove")}
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-lg font-semibold mb-4">System Information</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Platform Version</span>
            <span className="font-medium">v1.0.0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Last Updated</span>
            <span className="font-medium">2025-12-17</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const SettingItem = ({ title, description, enabled, onToggle }) => (
  <div className="flex items-center justify-between py-4 border-b border-[#AAAAAA] last:border-0">
    <div className="flex-1">
      <h4 className="font-medium mb-1">{title}</h4>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
    <button
      onClick={onToggle}
      className={`relative w-14 h-7 rounded-full transition-colors cursor-pointer ${
        enabled ? "bg-[#4B227A]" : "bg-[#AAAAAA]"
      }`}
    >
      <span
        className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
          enabled ? "translate-x-7" : "translate-x-0"
        }`}
      />
    </button>
  </div>
);
