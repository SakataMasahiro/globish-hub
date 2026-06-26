"use client";
import { useState, useEffect } from "react";

type Prospect = {
  id: string;
  clinic_name: string;
  prefecture: string;
  status: string;
  email: string | null;
  rating: number | null;
  email_sent_at: string | null;
  created_at: string;
};

const STATUS_BADGE: Record<string, string> = {
  new: "bg-gray-100 text-gray-600",
  emailed: "bg-blue-100 text-blue-700",
  replied: "bg-green-100 text-green-700",
};

const STATUS_LABEL: Record<string, string> = {
  new: "new",
  emailed: "emailed",
  replied: "replied",
};

export default function ManabiProspectsPage() {
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [loading, setLoading] = useState(true);
  const [collecting, setCollecting] = useState(false);
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState("");

  const fetchProspects = () => {
    setLoading(true);
    fetch("/api/admin/manabi/prospects")
      .then((r) => r.json())
      .then((data) => {
        setProspects(data.prospects ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchProspects();
  }, []);

  const handleCollect = async () => {
    setCollecting(true);
    setMessage("");
    try {
      const prefectures = ["大阪府", "兵庫県"];
      let totalCollected = 0;
      for (const prefecture of prefectures) {
        const res = await fetch("/api/agent/manabi/collect", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prefecture }),
        });
        const data = await res.json();
        totalCollected += data.collected ?? 0;
      }
      setMessage(`収集完了: ${totalCollected}件`);
      fetchProspects();
    } catch {
      setMessage("収集に失敗しました");
    } finally {
      setCollecting(false);
    }
  };

  const handleSendEmail = async () => {
    setSending(true);
    setMessage("");
    try {
      const res = await fetch("/api/agent/send-email", { method: "POST" });
      const data = await res.json();
      setMessage(`送信完了: ${data.sent ?? 0}件`);
      fetchProspects();
    } catch {
      setMessage("送信に失敗しました");
    } finally {
      setSending(false);
    }
  };

  const fmt = (iso: string | null) =>
    iso ? new Date(iso).toLocaleDateString("ja-JP") : "—";

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">学習塾プロスペクト管理</h1>

        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={handleCollect}
            disabled={collecting}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {collecting ? "収集中..." : "🔍 学習塾収集"}
          </button>
          <button
            onClick={handleSendEmail}
            disabled={sending}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg text-sm font-medium hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {sending ? "送信中..." : "📧 メール送信"}
          </button>
          {message && (
            <span className="text-sm text-gray-600">{message}</span>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {loading ? (
            <div className="text-center py-16 text-gray-400">読み込み中...</div>
          ) : prospects.length === 0 ? (
            <div className="text-center py-16 text-gray-400">データがありません</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    {["塾名", "都道府県", "ステータス", "メール", "評価", "送信日", "登録日"].map((h) => (
                      <th
                        key={h}
                        className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {prospects.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-800">{p.clinic_name}</td>
                      <td className="px-4 py-3 text-gray-600">{p.prefecture ?? "—"}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_BADGE[p.status] ?? "bg-gray-100 text-gray-600"}`}
                        >
                          {STATUS_LABEL[p.status] ?? p.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{p.email ?? "—"}</td>
                      <td className="px-4 py-3 text-gray-600">{p.rating ?? "—"}</td>
                      <td className="px-4 py-3 text-gray-500">{fmt(p.email_sent_at)}</td>
                      <td className="px-4 py-3 text-gray-500">{fmt(p.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
