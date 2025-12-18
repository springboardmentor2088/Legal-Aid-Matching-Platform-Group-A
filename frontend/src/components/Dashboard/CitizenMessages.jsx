import React from "react";

export default function CitizenMessages({
  lawyers,
  selectedRecipient,
  setSelectedRecipient,
  messages,
  messageText,
  setMessageText,
  handleSendMessage,
  profile,
}) {
  return (
    <div className="flex gap-6">
      <div className="w-72 bg-white rounded-lg p-4 shadow border">
        <div className="font-semibold mb-3">Contacts</div>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => {
              setSelectedRecipient({
                type: "lawyer",
                id: lawyers[0].id,
                name: lawyers[0].name,
              });
            }}
            className={`text-left p-2 rounded ${
              selectedRecipient.id === lawyers[0].id
                ? "bg-blue-50"
                : "hover:bg-gray-50"
            }`}
          >
            {lawyers[0].name}{" "}
            <div className="text-xs text-gray-500">{lawyers[0].expertise}</div>
          </button>

          <button
            onClick={() =>
              setSelectedRecipient({
                type: "ngo",
                id: 1,
                name: "Helping Hands NGO",
              })
            }
            className={`text-left p-2 rounded ${
              selectedRecipient.type === "ngo"
                ? "bg-blue-50"
                : "hover:bg-gray-50"
            }`}
          >
            Helping Hands NGO{" "}
            <div className="text-xs text-gray-500">NGO • Pune</div>
          </button>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-lg p-4 shadow border flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="font-semibold">{selectedRecipient.name}</div>
            <div className="text-xs text-gray-500">
              {selectedRecipient.type}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto mb-4 space-y-3">
          {messages
            .filter(
              (m) =>
                m.to === selectedRecipient.name ||
                m.from === selectedRecipient.name ||
                m.to === selectedRecipient.name
            )
            .map((m) => (
              <div
                key={m.id}
                className={`p-2 rounded ${
                  m.from === profile.shortName
                    ? "bg-teal-50 self-end"
                    : "bg-gray-100 self-start"
                }`}
              >
                <div className="text-sm">{m.text}</div>
                <div className="text-xs text-gray-500 mt-1">{m.time}</div>
              </div>
            ))}
        </div>

        <div className="mt-2">
          <textarea
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder={`Message to ${selectedRecipient.name}...`}
            className="w-full p-3 border rounded mb-2"
            rows={3}
          />
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              You are messaging: <b>{selectedRecipient.name}</b>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleSendMessage}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Send
              </button>
              <button
                onClick={() => setMessageText("")}
                className="px-3 py-2 border rounded"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

