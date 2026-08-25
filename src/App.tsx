import React, { useState } from "react";
import {
  LayoutDashboard,
  Layers,
  Receipt,
  Wallet,
  Bell,
  Search,
  ChevronRight,
  RefreshCw,
  FileText,
  Clock,
  AlertTriangle,
  X,
  Server,
  ShieldCheck,
  Zap,
  Activity,
  SlidersHorizontal,
  CloudUpload,
  Key,
  ExternalLink,
  CheckCircle2,
  Lock,
  Copy,
} from "lucide-react";

export default function GridnixDashboard() {
  // 核心狀態管理
  const [currentTab, setCurrentTab] = useState("overview"); // 'overview', 'products', 'billing', 'recharge', 'create-vps', 'cloud-selfservice', 'admin-monitor'
  const [isAdminView, setIsAdminView] = useState(false);
  const [userBalance, setUserBalance] = useState(68.45); // 使用者可用餘額

  // 充值狀態
  const [rechargeMethod, setRechargeMethod] = useState("usdt");
  const [usdtAmount, setUsdtAmount] = useState("50");
  const [customAmount, setCustomAmount] = useState("");

  // 💻 Create VPS 完整表單狀態
  const [billingMode, setBillingMode] = useState("pay-as-you-go");
  const [region, setRegion] = useState("hk");
  const [os, setOs] = useState("ubuntu");
  const [plan, setPlan] = useState("basic");
  const [bandwidth, setBandwidth] = useState("1mbps");
  const [disk, setDisk] = useState("40gb");
  const [isExclusiveVpc, setIsExclusiveVpc] = useState(false);

  // ☁️ 雲自助 (Cloud Self-Service) 狀態
  const [selectedCloudPlatform, setSelectedCloudPlatform] = useState("aws");
  const [cloudServiceRequests, setCloudServiceRequests] = useState([
    {
      id: "REQ-2026081101",
      platform: "AWS (Amazon Web Services)",
      amount: 50,
      status: "Completed",
      requestDate: "2026-08-10 14:20",
      account: "gridnix_aws_user01@aws-partner.com",
      password: "User#888999Pass",
      consoleUrl: "https://aws.amazon.com/console/",
    },
    {
      id: "REQ-2026081102",
      platform: "Aliyun 阿里雲",
      amount: 50,
      status: "Pending",
      requestDate: "2026-08-11 11:05",
      account: "-",
      password: "-",
      consoleUrl: "-",
    },
  ]);

  // 計算 VPS 預估月費
  const calculateVpsPrice = () => {
    let base = plan === "basic" ? 6.0 : plan === "standard" ? 12.0 : 24.0;
    if (bandwidth === "5mbps") base += 2.5;
    if (bandwidth === "10mbps") base += 5.0;
    if (bandwidth === "20mbps") base += 9.5;
    if (disk === "60gb") base += 1.2;
    if (disk === "80gb") base += 2.4;
    if (disk === "100gb") base += 3.6;
    if (isExclusiveVpc) base += 15.0; // 獨佔 VPC 模式 +$15/mo
    return base.toFixed(2);
  };

  // 雲自助預扣下單處理
  const handleCloudSelfServiceSubmit = () => {
    const requiredAmount = 50;
    if (userBalance < requiredAmount) {
      alert(
        `餘額不足！本次預扣需要 $${requiredAmount} USD，您當前餘額為 $${userBalance.toFixed(
          2
        )} USD。請先充值！`
      );
      return;
    }

    setUserBalance((prev) => prev - requiredAmount);

    const platformNames: Record<string, string> = {
      aws: "AWS (Amazon Web Services)",
      azure: "Microsoft Azure",
      aliyun: "Aliyun 阿里雲",
      tencent: "Tencent Cloud 騰訊雲",
      gcp: "Google Cloud Platform (GCP)",
      huawei: "Huawei Cloud 華為雲",
    };

    const newReq = {
      id: `REQ-${Date.now().toString().slice(-8)}`,
      platform: platformNames[selectedCloudPlatform],
      amount: 50,
      status: "Pending",
      requestDate: new Date().toLocaleString(),
      account: "-",
      password: "-",
      consoleUrl: "-",
    };

    setCloudServiceRequests([newReq, ...cloudServiceRequests]);
    alert(
      `已成功送出 ${platformNames[selectedCloudPlatform]} 開戶申請！已預扣 $50.00 USD，請等待管理員派發帳號。`
    );
  };

  // 管理員完成開單派發處理
  const handleAdminApproveRequest = (reqId: string) => {
    setCloudServiceRequests((prev) =>
      prev.map((req) => {
        if (req.id === reqId) {
          return {
            ...req,
            status: "Completed",
            account: `gridnix_${req.platform
              .split(" ")[0]
              .toLowerCase()}_sub@partner-cloud.com`,
            password: `CloudPass#${Math.floor(
              100000 + Math.random() * 900000
            )}`,
            consoleUrl: "https://console.cloud-provider.com/login",
          };
        }
        return req;
      })
    );
    alert(`訂單 ${reqId} 已完成帳號開通與派發！`);
  };

  return (
    <div className="flex h-screen bg-[#f8fafc] text-[#1e293b] font-sans antialiased overflow-hidden">
      {/* ==================== LEFT SIDEBAR ==================== */}
      <aside className="w-64 bg-white border-r border-[#e2e8f0] flex flex-col justify-between flex-shrink-0">
        <div>
          {/* Logo */}
          <div className="p-6 flex items-center gap-3">
            <div className="grid grid-cols-3 gap-1 w-8 h-8">
              {[...Array(9)].map((_, i) => (
                <div
                  key={i}
                  className={`rounded-sm ${
                    i % 2 === 0 ? "bg-[#2563eb]" : "bg-[#60a5fa]"
                  }`}
                ></div>
              ))}
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-[#0f172a]">
                Gridnix
              </h1>
              <p className="text-[10px] text-[#94a3b8] tracking-widest uppercase -mt-1">
                Smart · Powerful · Reliable
              </p>
            </div>
          </div>

          {/* Navigation Menus */}
          <nav className="px-4 space-y-1">
            <button
              onClick={() => setCurrentTab("overview")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                currentTab === "overview"
                  ? "bg-[#eff6ff] text-[#2563eb]"
                  : "text-[#64748b] hover:bg-[#f1f5f9]"
              }`}
            >
              <LayoutDashboard size={18} />
              <span>Overview 概覽</span>
            </button>
            <button
              onClick={() => setCurrentTab("products")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                currentTab === "products" || currentTab === "create-vps"
                  ? "bg-[#eff6ff] text-[#2563eb]"
                  : "text-[#64748b] hover:bg-[#f1f5f9]"
              }`}
            >
              <Layers size={18} />
              <span>Products 產品與服務</span>
            </button>

            {/* ☁️ 「雲自助」選單 */}
            <button
              onClick={() => setCurrentTab("cloud-selfservice")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                currentTab === "cloud-selfservice"
                  ? "bg-[#eff6ff] text-[#2563eb]"
                  : "text-[#64748b] hover:bg-[#f1f5f9]"
              }`}
            >
              <CloudUpload size={18} />
              <span>Cloud Self-Service 雲自助</span>
            </button>

            <button
              onClick={() => setCurrentTab("billing")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                currentTab === "billing"
                  ? "bg-[#eff6ff] text-[#2563eb]"
                  : "text-[#64748b] hover:bg-[#f1f5f9]"
              }`}
            >
              <Receipt size={18} />
              <span>Billing 帳單</span>
            </button>
            <button
              onClick={() => setCurrentTab("recharge")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                currentTab === "recharge"
                  ? "bg-[#eff6ff] text-[#2563eb]"
                  : "text-[#64748b] hover:bg-[#f1f5f9]"
              }`}
            >
              <Wallet size={18} />
              <span>Recharge 充值</span>
            </button>

            {/* 管理員後台選單按鈕 */}
            <button
              onClick={() => setCurrentTab("admin-monitor")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all mt-4 border border-[#e0e7ff] ${
                currentTab === "admin-monitor"
                  ? "bg-[#4338ca] text-white font-bold"
                  : "bg-[#f5f3ff] text-[#6d28d9] hover:bg-[#ede9fe]"
              }`}
            >
              <Activity size={18} />
              <span>Admin 水位與進件審核</span>
            </button>
          </nav>
        </div>

        {/* System Status Bottom Widget */}
        <div className="p-4 m-4 bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 bg-[#10b981] rounded-full animate-pulse"></span>
            <span className="text-xs font-semibold text-[#334155]">
              All Systems Operational
            </span>
          </div>
          <p className="text-[11px] text-[#94a3b8] mb-2">所有系統運行正常</p>
        </div>
      </aside>

      {/* ==================== MAIN CONTENT AREA ==================== */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-[#e2e8f0] flex items-center justify-between px-8 flex-shrink-0">
          <div className="relative w-80">
            <Search
              className="absolute left-3 top-2.5 text-[#94a3b8]"
              size={16}
            />
            <input
              type="text"
              placeholder="Search instances, IPs, cloud accounts..."
              className="w-full pl-9 pr-4 py-1.5 bg-[#f1f5f9] border-none rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#2563eb]"
            />
          </div>

          <div className="flex items-center gap-6">
            <button className="flex items-center gap-1 text-xs text-[#64748b] hover:text-[#334155]">
              <FileText size={16} /> Document Center 文檔中心
            </button>
            <div className="relative cursor-pointer text-[#64748b] hover:text-[#334155]">
              <Bell size={18} />
              <span className="absolute -top-1.5 -right-1.5 bg-[#ef4444] text-white text-[9px] font-bold px-1 rounded-full">
                2
              </span>
            </div>

            {/* 管理者視角開關 */}
            <button
              onClick={() => {
                const nextMode = !isAdminView;
                setIsAdminView(nextMode);
                if (nextMode) setCurrentTab("admin-monitor");
                else setCurrentTab("overview");
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                isAdminView
                  ? "bg-[#7c3aed] text-white"
                  : "bg-[#f1f5f9] text-[#64748b] hover:bg-[#e2e8f0]"
              }`}
            >
              <SlidersHorizontal size={14} />
              {isAdminView
                ? "視角: 系統管理者 (Admin)"
                : "視角: 一般用戶 (User)"}
            </button>

            <div className="flex items-center gap-2 border-l border-[#e2e8f0] pl-6 cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-[#2563eb] text-white text-xs font-bold flex items-center justify-center">
                M
              </div>
              <span className="text-xs font-medium text-[#334155]">
                may55787838@gmail.com
              </span>
            </div>
          </div>
        </header>

        {/* Global Announcement Notice */}
        <div className="bg-[#eff6ff] border-b border-[#bfdbfe] px-8 py-2.5 flex items-center justify-between text-xs text-[#1e40af] flex-shrink-0">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="bg-[#3b82f6] text-white text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider flex-shrink-0">
              System Notice
            </span>
            <span className="truncate">
              [Cloud Self-Service] 六大公有雲預扣開戶功能已上線！預扣固定額度
              $50 USD，完成審核後將派發專屬子帳密。
            </span>
          </div>
          <button className="text-[#64748b] hover:text-[#334155] ml-4">
            <X size={14} />
          </button>
        </div>

        {/* Scrollable Dashboard Body */}
        <main className="flex-1 overflow-y-auto p-8">
          {/* ==================== TAB 1: OVERVIEW 概覽 ==================== */}
          {currentTab === "overview" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-[#0f172a]">
                  Overview 概覽
                </h2>
                <p className="text-xs text-[#64748b] mt-1">
                  一目了然地查看基礎設施、餘額與活動。
                </p>
              </div>

              <div className="grid grid-cols-5 gap-4">
                <div className="bg-white p-5 border border-[#e2e8f0] rounded-2xl flex items-center gap-4">
                  <div className="p-3 bg-[#eff6ff] text-[#2563eb] rounded-xl">
                    <Server size={20} />
                  </div>
                  <div>
                    <p className="text-[11px] text-[#94a3b8] font-medium">
                      Active Instances / 畫躍實例
                    </p>
                    <p className="text-xl font-bold text-[#0f172a]">4</p>
                  </div>
                </div>
                <div className="bg-white p-5 border border-[#e2e8f0] rounded-2xl flex items-center gap-4">
                  <div className="p-3 bg-[#ecfdf5] text-[#10b981] rounded-xl">
                    ▶
                  </div>
                  <div>
                    <p className="text-[11px] text-[#94a3b8] font-medium">
                      Running / 運行中
                    </p>
                    <p className="text-xl font-bold text-[#0f172a]">3</p>
                  </div>
                </div>
                <div className="bg-white p-5 border border-[#e2e8f0] rounded-2xl flex items-center gap-4">
                  <div className="p-3 bg-[#fef2f2] text-[#ef4444] rounded-xl">
                    ■
                  </div>
                  <div>
                    <p className="text-[11px] text-[#94a3b8] font-medium">
                      Stopped / 已停止
                    </p>
                    <p className="text-xl font-bold text-[#0f172a]">1</p>
                  </div>
                </div>
                <div className="bg-white p-5 border border-[#e2e8f0] rounded-2xl flex items-center gap-4">
                  <div className="p-3 bg-[#faf5ff] text-[#7c3aed] rounded-xl">
                    <CloudUpload size={20} />
                  </div>
                  <div>
                    <p className="text-[11px] text-[#94a3b8] font-medium">
                      Cloud Accounts / 雲帳號
                    </p>
                    <p className="text-xl font-bold text-[#0f172a]">
                      {cloudServiceRequests.length}
                    </p>
                  </div>
                </div>
                <div className="bg-white p-5 border border-[#e2e8f0] rounded-2xl flex flex-col justify-between">
                  <div>
                    <p className="text-[11px] text-[#94a3b8] font-medium">
                      Account Balance / 帳戶餘額
                    </p>
                    <p className="text-xl font-bold text-[#2563eb] mt-1">
                      ${userBalance.toFixed(2)} USD
                    </p>
                  </div>
                  <button
                    onClick={() => setCurrentTab("recharge")}
                    className="w-full mt-3 bg-[#2563eb] text-white text-xs py-1.5 rounded-lg hover:bg-[#1d4ed8]"
                  >
                    Recharge 充值
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 2: PRODUCTS 產品與服務 ==================== */}
          {currentTab === "products" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-[#0f172a]">
                    Products 產品與服務
                  </h2>
                  <p className="text-xs text-[#64748b] mt-1">
                    在此創建和管理您的 VPS 實例與公有雲帳號。
                  </p>
                </div>
                <button
                  onClick={() => setCurrentTab("create-vps")}
                  className="bg-[#2563eb] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#1d4ed8]"
                >
                  + Create Instance 創建實例
                </button>
              </div>

              <div className="bg-white border border-[#e2e8f0] rounded-2xl overflow-hidden text-xs">
                <table className="w-full text-left">
                  <thead className="bg-[#f8fafc] border-b text-[#64748b]">
                    <tr>
                      <th className="p-4">實例名稱</th>
                      <th className="p-4">地區</th>
                      <th className="p-4">規格</th>
                      <th className="p-4">狀態</th>
                      <th className="p-4">IP</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr className="hover:bg-[#f8fafc]">
                      <td className="p-4 font-bold">hk-web-01</td>
                      <td className="p-4">Hong Kong 香港</td>
                      <td className="p-4">2 vCPU / 4 GB</td>
                      <td className="p-4">
                        <span className="bg-[#ecfdf5] text-[#10b981] px-2 py-0.5 rounded-full font-bold">
                          Running
                        </span>
                      </td>
                      <td className="p-4 font-mono">103.45.67.89</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ==================== ☁️ TAB 3: CLOUD SELF-SERVICE 雲自助 ==================== */}
          {currentTab === "cloud-selfservice" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-[#0f172a]">
                  Cloud Self-Service 雲自助開戶
                </h2>
                <p className="text-xs text-[#64748b] mt-1">
                  快速申請各大公有雲平台專屬帳號。採金額預扣模式（固定 $50
                  USD/次），送出後由管理端人工審核派發。
                </p>
              </div>

              {/* 雲自助開單區域 */}
              <div className="grid grid-cols-3 gap-6 items-start">
                {/* 1. 選擇平台與送出預扣 */}
                <div className="col-span-2 bg-white border border-[#e2e8f0] rounded-2xl p-6 space-y-6">
                  <div className="p-3 bg-[#eff6ff] border border-[#bfdbfe] text-[#1e40af] text-xs rounded-xl flex items-start gap-2">
                    <AlertTriangle size={16} className="mt-0.5 flex-shrink-0" />
                    <p>
                      預扣說明：選擇平台後，系統將先從您的可用餘額中預扣 $50.00
                      USD。開通完成後將在下方列表展示登入帳號、密碼與控制台連結。
                    </p>
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs font-bold text-[#334155]">
                      1. Select Cloud Platform 選擇雲平台 (預扣固定 $50 USD)
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        {
                          id: "aws",
                          name: "AWS",
                          desc: "Amazon Web Services",
                          icon: "☁️",
                        },
                        {
                          id: "azure",
                          name: "Microsoft Azure",
                          desc: "Azure Partner Account",
                          icon: "🔷",
                        },
                        {
                          id: "aliyun",
                          name: "Aliyun 阿里雲",
                          desc: "阿里雲企業專屬子帳戶",
                          icon: "🟠",
                        },
                        {
                          id: "tencent",
                          name: "Tencent 騰訊雲",
                          desc: "騰訊雲海外獨立帳號",
                          icon: "🐧",
                        },
                        {
                          id: "gcp",
                          name: "Google Cloud (GCP)",
                          desc: "GCP Project Console",
                          icon: "🌐",
                        },
                        {
                          id: "huawei",
                          name: "Huawei 華為雲",
                          desc: "華為雲國際站帳號",
                          icon: "🔴",
                        },
                      ].map((p) => (
                        <div
                          key={p.id}
                          onClick={() => setSelectedCloudPlatform(p.id)}
                          className={`p-4 border rounded-xl cursor-pointer transition text-xs flex flex-col justify-between ${
                            selectedCloudPlatform === p.id
                              ? "border-[#2563eb] bg-[#f8faff] ring-1 ring-[#2563eb]"
                              : "border-[#e2e8f0] hover:bg-[#f8fafc]"
                          }`}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <span className="text-lg">{p.icon}</span>
                            <span className="bg-[#eff6ff] text-[#2563eb] font-bold text-[10px] px-2 py-0.5 rounded">
                              $50 USD
                            </span>
                          </div>
                          <div>
                            <p className="font-bold text-[#0f172a]">{p.name}</p>
                            <p className="text-[10px] text-[#94a3b8] mt-0.5">
                              {p.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl flex justify-between items-center text-xs">
                    <div>
                      <p className="text-[#94a3b8]">當前可用餘額</p>
                      <p className="text-xl font-bold text-[#2563eb]">
                        ${userBalance.toFixed(2)} USD
                      </p>
                    </div>
                    <div>
                      <p className="text-[#94a3b8] text-right">預扣金額</p>
                      <p className="text-xl font-bold text-[#ef4444] text-right">
                        -$50.00 USD
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleCloudSelfServiceSubmit}
                    className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold py-3 rounded-xl text-xs transition shadow-sm"
                  >
                    🚀 預扣 $50.00 USD 並送出開戶申請
                  </button>
                </div>

                {/* 2. 雲自助條款說明卡片 */}
                <div className="bg-white border border-[#e2e8f0] rounded-2xl p-6 space-y-4 text-xs">
                  <h3 className="font-bold border-b pb-2 text-sm text-[#0f172a]">
                    雲自助開戶流程
                  </h3>
                  <div className="space-y-3 text-[#64748b]">
                    <div className="flex items-start gap-2">
                      <span className="bg-[#2563eb] text-white w-4 h-4 rounded-full flex items-center justify-center text-[10px] flex-shrink-0 font-bold">
                        1
                      </span>
                      <p>
                        前台選擇公有雲平台，系統預扣 <b>$50 USD</b> 額度。
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="bg-[#2563eb] text-white w-4 h-4 rounded-full flex items-center justify-center text-[10px] flex-shrink-0 font-bold">
                        2
                      </span>
                      <p>管理端人員收到進件申請，進行 API 或是人工派發帳號。</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="bg-[#2563eb] text-white w-4 h-4 rounded-full flex items-center justify-center text-[10px] flex-shrink-0 font-bold">
                        3
                      </span>
                      <p>
                        開通完成後，於「已開通雲帳號列表」直接取得登入帳密與連結。
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. 使用者的雲自助列表 (顯示廠商、帳密、連結) */}
              <div className="bg-white border border-[#e2e8f0] rounded-2xl overflow-hidden mt-8">
                <div className="p-4 bg-[#f8fafc] border-b border-[#e2e8f0] font-bold text-xs text-[#0f172a] flex justify-between items-center">
                  <span>
                    已申請/開通雲帳號列表 (Cloud Self-Service Accounts)
                  </span>
                  <span className="text-[10px] text-[#64748b]">
                    即時派發狀態查詢
                  </span>
                </div>
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#f8fafc] border-b text-[#64748b] font-semibold">
                      <th className="p-4">單號</th>
                      <th className="p-4">雲平台廠商</th>
                      <th className="p-4">預扣金額</th>
                      <th className="p-4">開通狀態</th>
                      <th className="p-4">登入帳號 (Console Account)</th>
                      <th className="p-4">登入密碼</th>
                      <th className="p-4">控制台連結</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e2e8f0]">
                    {cloudServiceRequests.map((req) => (
                      <tr
                        key={req.id}
                        className="hover:bg-[#f8fafc] transition"
                      >
                        <td className="p-4 font-mono font-bold text-[#0f172a]">
                          {req.id}
                        </td>
                        <td className="p-4 font-bold text-[#2563eb]">
                          {req.platform}
                        </td>
                        <td className="p-4 font-semibold text-[#ef4444]">
                          ${req.amount}.00 USD
                        </td>
                        <td className="p-4">
                          {req.status === "Completed" ? (
                            <span className="bg-[#ecfdf5] text-[#10b981] px-2.5 py-1 rounded-full font-bold text-[10px] inline-flex items-center gap-1">
                              <CheckCircle2 size={12} /> 開通成功
                            </span>
                          ) : (
                            <span className="bg-[#fffbeb] text-[#d97706] px-2.5 py-1 rounded-full font-bold text-[10px] inline-flex items-center gap-1">
                              <Clock size={12} /> 待管理端處理
                            </span>
                          )}
                        </td>
                        <td className="p-4 font-mono text-[#334155]">
                          {req.status === "Completed" ? (
                            req.account
                          ) : (
                            <span className="text-[#94a3b8] italic">
                              處理中生成...
                            </span>
                          )}
                        </td>
                        <td className="p-4 font-mono">
                          {req.status === "Completed" ? (
                            <span className="bg-[#f1f5f9] px-2 py-1 rounded border text-[#0f172a] font-bold tracking-wider">
                              {req.password}
                            </span>
                          ) : (
                            <span className="text-[#94a3b8] italic">-</span>
                          )}
                        </td>
                        <td className="p-4">
                          {req.status === "Completed" ? (
                            <a
                              href={req.consoleUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[#2563eb] font-bold flex items-center gap-1 hover:underline"
                            >
                              前往控制台 <ExternalLink size={12} />
                            </a>
                          ) : (
                            <span className="text-[#94a3b8] italic">-</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ==================== 💻 TAB 4: CREATE VPS 創建實例 (完整表單補齊) ==================== */}
          {currentTab === "create-vps" && (
            <div className="space-y-6">
              <button
                onClick={() => setCurrentTab("products")}
                className="text-xs text-[#2563eb] font-semibold flex items-center gap-1 hover:underline"
              >
                ← Back to Products 返回產品列表
              </button>

              <div>
                <h2 className="text-2xl font-bold text-[#0f172a]">
                  Create Instance 創建實例
                </h2>
                <p className="text-xs text-[#64748b] mt-1">
                  Configure and deploy your infrastructure in minutes.
                  只需幾分鐘即可配置並部署您的基礎架構。
                </p>
              </div>

              <div className="grid grid-cols-3 gap-6 items-start">
                {/* Left Fields Column */}
                <div className="col-span-2 bg-white border border-[#e2e8f0] rounded-2xl p-6 space-y-6">
                  {/* ⚡ 獨佔模式 VPC 隔離開關 */}
                  <div className="p-4 bg-[#f0fdf4] border border-[#bbf7d0] rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#16a34a] text-white rounded-lg">
                        <Zap size={18} />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-[#14532d]">
                          🛡️ 啟用企業級 VPC 內網獨立隔離模式 (Exclusive VPC)
                        </h4>
                        <p className="text-[10px] text-[#15803d] mt-0.5">
                          為您的主機配置獨佔獨立子帳號與專屬 Security Group
                          防火牆架構。
                        </p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isExclusiveVpc}
                        onChange={(e) => setIsExclusiveVpc(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#16a34a]"></div>
                    </label>
                  </div>

                  {/* Row 1: Billing Mode */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-[#334155]">
                      Billing Mode 計費方式
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <div
                        onClick={() => setBillingMode("pay-as-you-go")}
                        className={`p-4 border rounded-xl cursor-pointer transition flex items-center justify-between ${
                          billingMode === "pay-as-you-go"
                            ? "border-[#2563eb] bg-[#f8faff]"
                            : "border-[#e2e8f0]"
                        }`}
                      >
                        <div>
                          <p className="text-xs font-bold text-[#0f172a]">
                            Pay-as-you-go 按量計費
                          </p>
                          <p className="text-[10px] text-[#94a3b8] mt-1">
                            Billed hourly 按小時等比例計費
                          </p>
                        </div>
                        <input
                          type="radio"
                          checked={billingMode === "pay-as-you-go"}
                          onChange={() => {}}
                        />
                      </div>
                      <div
                        onClick={() => setBillingMode("subscription")}
                        className={`p-4 border rounded-xl cursor-pointer transition flex items-center justify-between opacity-60 ${
                          billingMode === "subscription"
                            ? "border-[#2563eb] bg-[#f8faff]"
                            : "border-[#e2e8f0]"
                        }`}
                      >
                        <div>
                          <p className="text-xs font-bold text-[#0f172a]">
                            Monthly Subscription 月付訂閱
                          </p>
                          <p className="text-[10px] text-[#10b981] mt-1">
                            Save up to 20% 最高可省 20%
                          </p>
                        </div>
                        <input
                          type="radio"
                          checked={billingMode === "subscription"}
                          onChange={() => {}}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 2: Region */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-[#334155]">
                      Region 地區
                    </label>
                    <div className="grid grid-cols-5 gap-2 text-center">
                      {[
                        { id: "hk", name: "Hong Kong", cn: "香港 (HK)" },
                        { id: "tokyo", name: "Tokyo", cn: "東京 (JP)" },
                        { id: "sg", name: "Singapore", cn: "新加坡 (SG)" },
                        { id: "tpe", name: "Taipei", cn: "台北 (TW)" },
                        { id: "seoul", name: "Seoul", cn: "首爾 (KR)" },
                      ].map((reg) => (
                        <div
                          key={reg.id}
                          onClick={() => setRegion(reg.id)}
                          className={`p-3 border rounded-xl cursor-pointer transition text-xs ${
                            region === reg.id
                              ? "border-[#2563eb] bg-[#f8faff] text-[#2563eb] font-bold"
                              : "border-[#e2e8f0]"
                          }`}
                        >
                          <p className="truncate font-semibold">{reg.name}</p>
                          <p className="text-[10px] text-[#94a3b8] mt-0.5">
                            {reg.cn}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Row 3: Operating System */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-[#334155]">
                      Image / OS 鏡像 / 操作系統
                    </label>
                    <div className="grid grid-cols-4 gap-3">
                      {[
                        { id: "ubuntu", name: "Ubuntu", ver: "22.04 LTS" },
                        { id: "debian", name: "Debian", ver: "12" },
                        { id: "alma", name: "AlmaLinux", ver: "9" },
                        { id: "windows", name: "Windows", ver: "2022" },
                      ].map((o) => (
                        <div
                          key={o.id}
                          onClick={() => setOs(o.id)}
                          className={`p-3 border rounded-xl cursor-pointer transition text-xs ${
                            os === o.id
                              ? "border-[#2563eb] bg-[#f8faff] text-[#2563eb] font-bold"
                              : "border-[#e2e8f0]"
                          }`}
                        >
                          <p className="font-semibold">{o.name}</p>
                          <p className="text-[10px] text-[#94a3b8] mt-0.5">
                            {o.ver}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Row 4: Specifications Plan */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-[#334155]">
                      Instance Plan 實例規格
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        {
                          id: "basic",
                          name: "Basic 基礎型",
                          spec: "1 vCPU · 1 GB RAM",
                          desc: "適合輕量工作負載",
                        },
                        {
                          id: "standard",
                          name: "Standard 標準型",
                          spec: "2 vCPU · 2 GB RAM",
                          desc: "適合一般網站應用",
                        },
                        {
                          id: "pro",
                          name: "Pro 高性能型",
                          spec: "4 vCPU · 4 GB RAM",
                          desc: "適合高負載應用程序",
                        },
                      ].map((p) => (
                        <div
                          key={p.id}
                          onClick={() => setPlan(p.id)}
                          className={`p-3 border rounded-xl cursor-pointer transition text-xs ${
                            plan === p.id
                              ? "border-[#2563eb] bg-[#f8faff] text-[#2563eb] font-bold"
                              : "border-[#e2e8f0]"
                          }`}
                        >
                          <p className="font-bold">{p.name}</p>
                          <p className="text-[10px] text-[#475569] mt-0.5">
                            {p.spec}
                          </p>
                          <p className="text-[10px] text-[#94a3b8] mt-2">
                            {p.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Row 5: Bandwidth options */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#334155]">
                      Bandwidth 頻寬
                    </label>
                    <div className="grid grid-cols-4 gap-2 text-center text-xs">
                      <button
                        onClick={() => setBandwidth("1mbps")}
                        className={`p-2 border rounded-lg ${
                          bandwidth === "1mbps"
                            ? "border-[#2563eb] bg-[#f8faff] text-[#2563eb] font-bold"
                            : "border-[#e2e8f0]"
                        }`}
                      >
                        1 Mbps{" "}
                        <span className="block text-[9px] text-[#94a3b8]">
                          Included 包含
                        </span>
                      </button>
                      <button
                        onClick={() => setBandwidth("5mbps")}
                        className={`p-2 border rounded-lg ${
                          bandwidth === "5mbps"
                            ? "border-[#2563eb] bg-[#f8faff] text-[#2563eb] font-bold"
                            : "border-[#e2e8f0]"
                        }`}
                      >
                        5 Mbps{" "}
                        <span className="block text-[9px] text-[#10b981]">
                          +$2.50/mo
                        </span>
                      </button>
                      <button
                        onClick={() => setBandwidth("10mbps")}
                        className={`p-2 border rounded-lg ${
                          bandwidth === "10mbps"
                            ? "border-[#2563eb] bg-[#f8faff] text-[#2563eb] font-bold"
                            : "border-[#e2e8f0]"
                        }`}
                      >
                        10 Mbps{" "}
                        <span className="block text-[9px] text-[#10b981]">
                          +$5.00/mo
                        </span>
                      </button>
                      <button
                        onClick={() => setBandwidth("20mbps")}
                        className={`p-2 border rounded-lg ${
                          bandwidth === "20mbps"
                            ? "border-[#2563eb] bg-[#f8faff] text-[#2563eb] font-bold"
                            : "border-[#e2e8f0]"
                        }`}
                      >
                        20 Mbps{" "}
                        <span className="block text-[9px] text-[#10b981]">
                          +$9.50/mo
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Row 6: System Disk */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#334155]">
                      System Disk 系統盤
                    </label>
                    <div className="grid grid-cols-4 gap-2 text-center text-xs">
                      <button
                        onClick={() => setDisk("40gb")}
                        className={`p-2 border rounded-lg ${
                          disk === "40gb"
                            ? "border-[#2563eb] bg-[#f8faff] text-[#2563eb] font-bold"
                            : "border-[#e2e8f0]"
                        }`}
                      >
                        40 GB{" "}
                        <span className="block text-[9px] text-[#94a3b8]">
                          Included 包含
                        </span>
                      </button>
                      <button
                        onClick={() => setDisk("60gb")}
                        className={`p-2 border rounded-lg ${
                          disk === "60gb"
                            ? "border-[#2563eb] bg-[#f8faff] text-[#2563eb] font-bold"
                            : "border-[#e2e8f0]"
                        }`}
                      >
                        60 GB{" "}
                        <span className="block text-[9px] text-[#10b981]">
                          +$1.20/mo
                        </span>
                      </button>
                      <button
                        onClick={() => setDisk("80gb")}
                        className={`p-2 border rounded-lg ${
                          disk === "80gb"
                            ? "border-[#2563eb] bg-[#f8faff] text-[#2563eb] font-bold"
                            : "border-[#e2e8f0]"
                        }`}
                      >
                        80 GB{" "}
                        <span className="block text-[9px] text-[#10b981]">
                          +$2.40/mo
                        </span>
                      </button>
                      <button
                        onClick={() => setDisk("100gb")}
                        className={`p-2 border rounded-lg ${
                          disk === "100gb"
                            ? "border-[#2563eb] bg-[#f8faff] text-[#2563eb] font-bold"
                            : "border-[#e2e8f0]"
                        }`}
                      >
                        100 GB{" "}
                        <span className="block text-[9px] text-[#10b981]">
                          +$3.60/mo
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Hostname */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#334155]">
                      Hostname 主機名
                    </label>
                    <input
                      type="text"
                      defaultValue="gridnix-instance-01"
                      className="w-full p-2 border border-[#e2e8f0] rounded-lg text-xs"
                    />
                  </div>
                </div>

                {/* Right Summary Column Order Widgets */}
                <div className="bg-white border border-[#e2e8f0] rounded-2xl p-6 space-y-6 shadow-sm text-xs">
                  <h3 className="text-sm font-bold text-[#0f172a] border-b border-[#f1f5f9] pb-3">
                    Order Summary 訂單摘要
                  </h3>

                  <div className="space-y-4 text-[#64748b]">
                    <div className="flex justify-between">
                      <span>Region 地區</span>
                      <span className="font-bold text-[#334155] uppercase">
                        {region}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>OS / 鏡像系統</span>
                      <span className="font-bold text-[#334155] uppercase">
                        {os}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Plan 規格方案</span>
                      <span className="font-bold text-[#334155] uppercase">
                        {plan}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Bandwidth 頻寬</span>
                      <span className="font-bold text-[#334155] uppercase">
                        {bandwidth}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>System Disk 系統盤</span>
                      <span className="font-bold text-[#334155] uppercase">
                        {disk}
                      </span>
                    </div>

                    {/* 獨佔 VPC 模式動態亮標 */}
                    <div className="flex justify-between items-center">
                      <span>VPC 架構類型</span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          isExclusiveVpc
                            ? "bg-[#dcfce7] text-[#15803d]"
                            : "bg-[#f1f5f9] text-[#64748b]"
                        }`}
                      >
                        {isExclusiveVpc
                          ? "🛡️ 獨佔 VPC (+$15.00)"
                          : "共享預設網絡"}
                      </span>
                    </div>

                    <div className="flex justify-between border-t border-[#f1f5f9] pt-4 items-baseline">
                      <span className="text-[#0f172a] font-bold">
                        Estimated Monthly
                      </span>
                      <p className="text-2xl font-bold text-[#2563eb]">
                        ${calculateVpsPrice()}{" "}
                        <span className="text-[10px] font-normal text-[#64748b]">
                          / mo
                        </span>
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      alert(
                        `成功部署！${
                          isExclusiveVpc ? "已為您自動綁定獨立 VPC 帳號。" : ""
                        }`
                      );
                      setCurrentTab("products");
                    }}
                    className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold py-3 rounded-xl text-xs transition mt-4 shadow-sm"
                  >
                    🚀 Deploy Now 立即部署
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 5: BILLING 帳單 ==================== */}
          {currentTab === "billing" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-[#0f172a]">
                Billing 帳單
              </h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white p-5 border border-[#e2e8f0] rounded-2xl">
                  <p className="text-[11px] text-[#94a3b8]">可用餘額</p>
                  <p className="text-2xl font-bold text-[#2563eb] mt-1">
                    ${userBalance.toFixed(2)} USD
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 6: RECHARGE 充值 ==================== */}
          {currentTab === "recharge" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-[#0f172a]">
                Recharge 充值
              </h2>
              <div className="bg-white p-6 border rounded-2xl space-y-4">
                <p className="text-xs text-[#64748b]">
                  充值可用餘額，用於 VPS 扣款與雲自助開戶預扣。
                </p>
                <button
                  onClick={() => setUserBalance((prev) => prev + 100)}
                  className="bg-[#10b981] text-white px-4 py-2 rounded-xl text-xs font-bold"
                >
                  + 模擬充值 $100 USD (測試用)
                </button>
              </div>
            </div>
          )}

          {/* ==================== 🛠️ TAB 7: ADMIN MONITOR & PROVISIONING 管理員後台 (含雲自助審核) ==================== */}
          {currentTab === "admin-monitor" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-[#0f172a]">
                    Admin 控制台 & 雲自助進件審核
                  </h2>
                  <p className="text-xs text-[#64748b] mt-1">
                    管理員處理「雲自助」開戶進件、派發帳密，以及查看多雲水位狀態。
                  </p>
                </div>
                <span className="bg-[#4338ca] text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                  <Activity size={14} /> 後台審核服務中
                </span>
              </div>

              {/* 雲自助進件審核管理卡片 */}
              <div className="bg-white border border-[#e2e8f0] rounded-2xl overflow-hidden">
                <div className="p-4 bg-[#f5f3ff] border-b border-[#e0e7ff] font-bold text-xs text-[#4338ca] flex justify-between items-center">
                  <span className="flex items-center gap-2">
                    <Key size={16} /> 雲自助開戶進件審核 (Cloud Provisioning
                    Requests)
                  </span>
                  <span className="text-[10px] bg-[#7c3aed] text-white px-2 py-0.5 rounded-full">
                    待開通數:{" "}
                    {
                      cloudServiceRequests.filter((r) => r.status === "Pending")
                        .length
                    }
                  </span>
                </div>

                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#f8fafc] border-b text-[#64748b]">
                      <th className="p-3">單號</th>
                      <th className="p-3">用戶</th>
                      <th className="p-3">申請平台</th>
                      <th className="p-3">預扣狀態</th>
                      <th className="p-3">申請時間</th>
                      <th className="p-3">操作派發</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e2e8f0]">
                    {cloudServiceRequests.map((req) => (
                      <tr key={req.id} className="hover:bg-[#f8fafc]">
                        <td className="p-3 font-mono font-bold">{req.id}</td>
                        <td className="p-3 font-medium text-[#334155]">
                          may55787838@gmail.com
                        </td>
                        <td className="p-3 font-bold text-[#2563eb]">
                          {req.platform}
                        </td>
                        <td className="p-3">
                          <span className="text-[#10b981] font-bold">
                            已預扣 ${req.amount}.00
                          </span>
                        </td>
                        <td className="p-3 text-[#64748b]">
                          {req.requestDate}
                        </td>
                        <td className="p-3">
                          {req.status === "Pending" ? (
                            <button
                              onClick={() => handleAdminApproveRequest(req.id)}
                              className="bg-[#10b981] hover:bg-[#059669] text-white px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1"
                            >
                              <CheckCircle2 size={12} /> 開通並派發帳密
                            </button>
                          ) : (
                            <span className="text-[#94a3b8] font-bold">
                              ✓ 已派發處理完成
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
