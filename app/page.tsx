import Link from "next/link";

export default function HomePage() {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", color: "#1A1A1A" }}>

      {/* ヒーローセクション */}
      <div style={{ background: "linear-gradient(135deg, #0D2137, #185FA5)", padding: "80px 40px", textAlign: "center" as const, color: "white" }}>
        <div style={{ marginBottom: "32px" }}>
          <div style={{ fontSize: "42px", fontWeight: "bold", letterSpacing: "2px", marginBottom: "6px" }}>
            ライフ・ポータル
          </div>
          <div style={{ fontSize: "13px", opacity: 0.7, letterSpacing: "3px" }}>
            Tascalでたすかる — Powered by Globish International
          </div>
        </div>
        <h1 style={{ fontSize: "28px", fontWeight: "bold", margin: "0 0 16px", lineHeight: "1.6", opacity: 0.95 }}>
          生命保険営業の仕事を、<br />AIが丸ごとサポートする
        </h1>
        <p style={{ fontSize: "16px", opacity: 0.85, margin: "0 0 16px", lineHeight: "1.8" }}>
          顧客管理・感情スコア・AI提案書・紹介ネットワーク・コミッション管理まで<br />
          すべてひとつの画面で。使えば使うほど、あなただけの武器になる。
        </p>
        <p style={{ fontSize: "14px", opacity: 0.75, margin: "0 0 32px" }}>
          ✅ マレーシア法人運営につき消費税不要（10%お得）
        </p>
        <Link href="/auth/register" style={{ display: "inline-block", padding: "18px 48px", background: "#00B900", color: "white", borderRadius: "12px", textDecoration: "none", fontWeight: "bold", fontSize: "18px", boxShadow: "0 4px 16px rgba(0,185,0,0.4)" }}>
          🚀 14日間無料で試す
        </Link>
        <p style={{ marginTop: "20px", fontSize: "13px", opacity: 0.75 }}>
          クレジットカード不要・いつでもキャンセル可能
        </p>
      </div>

      {/* 数字で見る効果 */}
      <div style={{ background: "#F8F9FA", padding: "60px 40px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <h2 style={{ textAlign: "center" as const, fontSize: "24px", color: "#0D2137", marginBottom: "40px" }}>ライフ・ポータルを使うと変わること</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px" }}>
            {[
              { value: "64%", label: "紹介経由の成約率", icon: "🤝" },
              { value: "3倍", label: "提案書作成スピード", icon: "⚡" },
              { value: "0件", label: "更新失効を目指す", icon: "🔔" },
              { value: "14日", label: "無料トライアル", icon: "🎁" },
            ].map((stat, i) => (
              <div key={i} style={{ background: "white", borderRadius: "16px", padding: "28px 20px", textAlign: "center" as const, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                <div style={{ fontSize: "32px", marginBottom: "8px" }}>{stat.icon}</div>
                <div style={{ fontSize: "36px", fontWeight: "bold", color: "#185FA5", marginBottom: "8px" }}>{stat.value}</div>
                <div style={{ fontSize: "13px", color: "#888" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 機能紹介 */}
      <div style={{ padding: "60px 40px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <h2 style={{ textAlign: "center" as const, fontSize: "24px", color: "#0D2137", marginBottom: "8px" }}>ライフ・ポータルでできること</h2>
          <p style={{ textAlign: "center" as const, color: "#888", marginBottom: "40px", fontSize: "15px" }}>
            お客様との感情的な絆を育て、契約が自然に増える仕組みを作る。
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
            {[
              { icon: "❤️", title: "感情温度スコア", desc: "顧客との関係を0〜100でAIが数値化。今日誰に連絡すべきかが一目でわかる。" },
              { icon: "✨", title: "AI提案書生成", desc: "顧客の情報を入れるだけで、その人専用の保険提案書が30秒で完成。" },
              { icon: "🌐", title: "紹介ネットワーク", desc: "誰が誰を紹介してくれたかをツリー表示。紹介依頼の最適タイミングをAIが教える。" },
              { icon: "🔔", title: "フォローアップアラート", desc: "定期更新・払込終了・ライフイベントなど全イベントを一元管理。失効ゼロへ。" },
              { icon: "💰", title: "コミッション管理", desc: "今月・今年の収入をリアルタイム表示。あと何件で目標達成かが毎朝わかる。" },
              { icon: "🤖", title: "AIメッセージ生成", desc: "誕生日・お礼・フォロー文章をAIが30秒で作成。送るだけでいい。" },
            ].map((feature, i) => (
              <div key={i} style={{ background: "white", borderRadius: "16px", padding: "28px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", border: "1px solid #EEE" }}>
                <div style={{ fontSize: "36px", marginBottom: "12px" }}>{feature.icon}</div>
                <h3 style={{ fontSize: "16px", color: "#0D2137", margin: "0 0 8px" }}>{feature.title}</h3>
                <p style={{ fontSize: "13px", color: "#666", margin: 0, lineHeight: "1.7" }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 料金プラン */}
      <div style={{ background: "#F8F9FA", padding: "60px 40px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <h2 style={{ textAlign: "center" as const, fontSize: "24px", color: "#0D2137", marginBottom: "8px" }}>シンプルな料金プラン</h2>
          <p style={{ textAlign: "center" as const, color: "#888", marginBottom: "8px", fontSize: "15px" }}>
            機能はすごい。価格は驚くほど安い。
          </p>
          <p style={{ textAlign: "center" as const, color: "#185FA5", marginBottom: "40px", fontSize: "14px", fontWeight: "bold" }}>
            ✅ マレーシア法人運営につき消費税不要。日本の競合より常に10%お得。
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "24px" }}>
            {/* スタンダード */}
            <div style={{ background: "white", borderRadius: "20px", padding: "32px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", border: "1px solid #EEE" }}>
              <h3 style={{ fontSize: "20px", color: "#185FA5", margin: "0 0 8px" }}>スタンダード</h3>
              <div style={{ fontSize: "36px", fontWeight: "bold", color: "#0D2137", marginBottom: "4px" }}>
                ¥1,000<span style={{ fontSize: "14px", color: "#888" }}>/月</span>
              </div>
              <p style={{ fontSize: "12px", color: "#888", margin: "0 0 20px" }}>14日間無料トライアル付き</p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px" }}>
                {["顧客・契約一元管理", "フォローアップアラート", "ライフイベント登録", "パイプライン管理", "コミッション計算", "音声メモ入力"].map((f, j) => (
                  <li key={j} style={{ fontSize: "14px", color: "#333", marginBottom: "10px", display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ color: "#00B900" }}>✅</span>{f}
                  </li>
                ))}
              </ul>
              <Link href="/auth/register?plan=standard" style={{ display: "block", padding: "14px", background: "#185FA5", color: "white", borderRadius: "8px", textDecoration: "none", fontWeight: "bold", fontSize: "15px", textAlign: "center" as const }}>
                14日間無料で始める
              </Link>
            </div>

            {/* プレミアム */}
            <div style={{ background: "white", borderRadius: "20px", padding: "32px", boxShadow: "0 8px 32px rgba(24,95,165,0.2)", border: "2px solid #185FA5", position: "relative" as const }}>
              <div style={{ position: "absolute" as const, top: "-14px", left: "50%", transform: "translateX(-50%)", background: "#185FA5", color: "white", padding: "4px 20px", borderRadius: "20px", fontSize: "12px", fontWeight: "bold" }}>
                最も選ばれています
              </div>
              <h3 style={{ fontSize: "20px", color: "#185FA5", margin: "0 0 8px" }}>プレミアム</h3>
              <div style={{ fontSize: "36px", fontWeight: "bold", color: "#0D2137", marginBottom: "4px" }}>
                ¥2,500<span style={{ fontSize: "14px", color: "#888" }}>/月</span>
              </div>
              <p style={{ fontSize: "12px", color: "#888", margin: "0 0 20px" }}>14日間無料トライアル付き</p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px" }}>
                {["スタンダードの全機能", "感情温度AI分析", "AI提案書生成", "家族マップ＋AIインサイト", "紹介依頼タイミングAI", "紹介ネットワーク可視化", "AIメッセージ自動生成"].map((f, j) => (
                  <li key={j} style={{ fontSize: "14px", color: "#333", marginBottom: "10px", display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ color: "#00B900" }}>✅</span>{f}
                  </li>
                ))}
              </ul>
              <Link href="/auth/register?plan=premium" style={{ display: "block", padding: "14px", background: "#185FA5", color: "white", borderRadius: "8px", textDecoration: "none", fontWeight: "bold", fontSize: "15px", textAlign: "center" as const }}>
                14日間無料で始める
              </Link>
            </div>

            {/* チーム */}
            <div style={{ background: "white", borderRadius: "20px", padding: "32px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", border: "1px solid #EEE" }}>
              <h3 style={{ fontSize: "20px", color: "#185FA5", margin: "0 0 8px" }}>チーム</h3>
              <div style={{ fontSize: "36px", fontWeight: "bold", color: "#0D2137", marginBottom: "4px" }}>
                ¥1,000<span style={{ fontSize: "14px", color: "#888" }}>/人・月</span>
              </div>
              <p style={{ fontSize: "12px", color: "#888", margin: "0 0 20px" }}>14日間無料・最低5名から</p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px" }}>
                {["プレミアムの全機能", "管理者ダッシュボード", "顧客引き継ぎ機能", "チーム成約率レポート", "優秀事例の共有", "専任サポート担当"].map((f, j) => (
                  <li key={j} style={{ fontSize: "14px", color: "#333", marginBottom: "10px", display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ color: "#00B900" }}>✅</span>{f}
                  </li>
                ))}
              </ul>
              <Link href="/auth/register?plan=team" style={{ display: "block", padding: "14px", background: "#185FA5", color: "white", borderRadius: "8px", textDecoration: "none", fontWeight: "bold", fontSize: "15px", textAlign: "center" as const }}>
                チームで相談する
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: "linear-gradient(135deg, #0D2137, #185FA5)", padding: "60px 40px", textAlign: "center" as const, color: "white" }}>
        <h2 style={{ fontSize: "28px", margin: "0 0 16px" }}>今すぐ無料で始めましょう</h2>
        <p style={{ fontSize: "16px", opacity: 0.9, margin: "0 0 32px", lineHeight: "1.8" }}>
          使えば使うほど、あなただけの武器になる。<br />
          お客様との感情的な絆を育て、契約が自然に増える仕組みを。
        </p>
        <Link href="/auth/register" style={{ display: "inline-block", padding: "20px 48px", background: "#00B900", color: "white", borderRadius: "12px", textDecoration: "none", fontWeight: "bold", fontSize: "20px", boxShadow: "0 4px 16px rgba(0,185,0,0.4)" }}>
          🚀 14日間無料トライアルを始める
        </Link>
        <p style={{ marginTop: "16px", fontSize: "13px", opacity: 0.7 }}>
          クレジットカード不要・いつでもキャンセル可能・消費税不要
        </p>
      </div>

    </div>
  );
}

