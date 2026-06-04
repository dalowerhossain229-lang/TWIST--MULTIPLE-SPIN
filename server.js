const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const axios = require('axios');
const path = require('path');

const app = express();
const server = http.createServer(app);

// 🎯 [উইনগো কালার ট্রেড সিঙ্ক - গ্লোবাল গেটওয়ে সকেট প্রোটকল লক ভাই ভাই]
const io = socketIo(server, { cors: { origin: "*", methods: ["GET", "POST"] } });

app.use(express.json());
app.use(express.static(path.join(__dirname, './')));

app.use((req, res, next) => {
    res.setHeader("X-Frame-Options", "ALLOWALL");
    res.setHeader("Content-Security-Policy", "frame-ancestors *; default-src * 'unsafe-inline' 'unsafe-eval'; script-src * 'unsafe-inline' 'unsafe-eval'; connect-src * 'unsafe-inline'; img-src * data: blob:; style-src * 'unsafe-inline'; font-src * data:;");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

// 🎰 [উইনগো কালার ট্রেড ওরিজিনাল ডোমেইন সিঙ্ক ভাই ভাই]
const MAIN_SITE_URL = "https://betlover247.onrender.com"; 

// 🎡 ৩টি লেয়ারের ওরিজিনাল স্লট ভ্যালু সিকোয়েন্স ডিরেক্টরি (আপনার স্ক্রিনশটের হুবху রিঙ্গো সিঙ্ক!)
const ring1ValuesPool = ["200X", "3.9X", "27.5X", "52X", "85X", "133X"];
const ring2ValuesPool = ["24X", "12.5X", "52X", "2.5X", "16X", "16X"];
const ring3ValuesPool = ["10X", "1.55X", "4.85X", "2.5X", "7.7X", "24X"];

// 💰 ১. লাইভ অ্যাকাউন্ট ব্যালেন্স ইন্টারসেপ্টর গেটওয়ে (১ শতভাগ টাইমআউট ও জ্যাম ব্লকার বর্ম ওস্তাদ)
app.get('/api/twist-balance', async (req, res) => {
    const { userId, wallet } = req.query;
    const targetWallet = wallet || "main";
    try {
        const response = await axios.post(`${MAIN_SITE_URL}/api_callback.php`, {
            action: "balance", // 🔒 বাজি ট্র্যাপ ও টাইমআউট এড়াতে সরাসরি পিওর ব্যালেন্স কি-নেম পাস লক ভাই ভাই
            username: userId,
            amount: 0,
            wallet: targetWallet,
            game: "twistspin"
        }, { timeout: 15000 });

        if (response.data && (response.data.status === "ok" || response.data.success === true)) {
            return res.json({ success: true, balance: response.data.balance });
        }
        return res.json({ success: false, balance: 0 });
    } catch (e) { 
        console.log("Twist Spin Balance Stream Reconnected.");
        return res.json({ success: false, balance: 0 }); 
    }
});

// 🛫 ২. ৩-লেয়ার টুইস্ট স্পিন কোর ট্রানজেকশন রোটেশন রাউট (POST Route - আন্তর্জাতিক ক্যাসিনো আরটিপি বর্ম)
app.post('/api/twist-deal', async (req, res) => {
    const { userId, amount, wallet, prediction } = req.body; // prediction: 'RING1', 'RING2', 'RING3'
    const reqAmount = parseFloat(amount) || 50;
    const userPrediction = String(prediction || "RING1").toUpperCase(); 
    const finalGameName = "twistspin"; 
    const targetWallet = wallet || "main";

    if (reqAmount < 1 || reqAmount > 20000 || !["RING1", "RING2", "RING3"].includes(userPrediction)) {
        return res.json({ success: false, message: "🚨 Invalid Bet Parameter! Select RING1, RING2 or RING3." });
    }

    try {
        // 🔒 [ব্যালেন্স ডেবিট প্রোটোকল]: বাজি প্লে করার সাথে সাথে ১ম হিটে একবারই অ্যাকাউন্ট থেকে বাজি কাটার রিকোয়েস্ট যাবে ভাই ভাই
        const balResponse = await axios.post(`${MAIN_SITE_URL}/api_callback.php`, {
            action: "bet", username: userId, amount: reqAmount, wallet: targetWallet, game: finalGameName
        }, { timeout: 30000 });
        
        if (!balResponse.data || balResponse.data.status !== "ok") {
            return res.json({ success: false, message: "❌ Database Sync Error or Insufficient Balance!" });
        }

        let currentDbBalance = parseFloat(balResponse.data.balance);
        
        let index1 = 0, index2 = 0, index3 = 0;
        let val1 = "3.9X", val2 = "2.5X", val3 = "1.55X";
        let winMultiplier = 0.00;
        let hitMultiplierText = "0X";
        let finalStatus = "lose";

        let isLoopActive = true;
        let loopSafety = 0;

        // 🎰 [🎰 ৯৫% গলোবাল ক্যাসিনো RTP এবং ৩-লেয়ার ইন্ডিপেন্ডেন্ট হুইল লুপ ভাই ভাই]
        while (isLoopActive && loopSafety < 150) {
            loopSafety++;
            
            // ৩টি রিংয়ের কাস্টম র্যান্ডম ইনডেক্স মেকার লুপ
            index1 = Math.floor(Math.random() * ring1ValuesPool.length);
            index2 = Math.floor(Math.random() * ring2ValuesPool.length);
            index3 = Math.floor(Math.random() * ring3ValuesPool.length);

            val1 = ring1ValuesPool[index1];
            val2 = ring2ValuesPool[index2];
            val3 = ring3ValuesPool[index3];

            // প্লেয়ার যে রিং সিলেক্ট করেছে, সেই নির্দিষ্ট রিংয়ের ল্যান্ডিং ভ্যালু অনুযায়ী মাল্টিপ্লায়ার ডিক্লেয়ারেশন
            let targetHitValueText = val1;
            if (userPrediction === "RING2") targetHitValueText = val2;
            if (userPrediction === "RING3") targetHitValueText = val3;

            hitMultiplierText = targetHitValueText;
            winMultiplier = parseFloat(targetHitValueText.replace("X", "")) || 0;

            // আন্তর্জাতিক গাণিতিক ক্যাসিনো রুলস অনুযায়ী ওডস কন্ডিশন সেটেলমেন্ট বর্ম
            if (winMultiplier >= 1.0) {
                finalStatus = "win";
            } else {
                finalStatus = "lose";
            }

            // এডমিন প্যানেল কাস্টম ফোর্স কন্ট্রোল নব ফিল্টারিং চ্যাম
            if (balResponse.data && balResponse.data.twist_target) {
                let target = String(balResponse.data.twist_target).toUpperCase();
                if (target === "FORCE_LOSE" && finalStatus === "win") isLoopActive = false;
                if (target === "FORCE_WIN" && finalStatus === "win") isLoopActive = false;
            } else {
                if (finalStatus === "win") {
                    // আন্তর্জাতিক নিয়মে সুপ্রিম আরটিপি স্বাভাবিক ক্যাসিনো ট্র্যাকে ৪৩% এ ব্যালেন্সড স্পিন লক ভাই ভাই!
                    if (Math.random() <= 0.43) isLoopActive = false;
                } else {
                    isLoopActive = false;
                }
            }
        }

        // ৩টি রিংয়ের প্রতিটি স্লাইসের মিলিমিটার নিখুঁত রোটেশন ডিগ্রী ক্যালকুলেশন চ্যাম ওস্তাদ!
        let singleSliceAngle = 360 / 6; // যেহেতু প্রতিটা রিংয়ে ৬টি করে স্লাইস ঘর আছে ভাই
        let ring1TargetDegree = index1 * singleSliceAngle;
        let ring2TargetDegree = index2 * singleSliceAngle;
        let ring3TargetDegree = index3 * singleSliceAngle;

        // 🎯 [মেগা কিলার জিরো-ডাবল-ডেবিট স্টেক ব্যালেন্সার বর্ম ভাই ভাই]
        let winAmount = 0;
        let dbAction = "win"; 
        let dbAmount = 0;

        if (finalStatus === "win") {
            winAmount = Math.round(reqAmount * winMultiplier);
            dbAction = "win";
            dbAmount = parseFloat(winAmount); 
        } else {
            dbAction = "win"; 
            dbAmount = 0; // 🔒 বাজি লস হলে ডাটাবেজে ২য় বার কোনো টাকা কাটার কমান্ড যাবে না ভাই ভাই!
        }

        let phpPayload = { 
            action: dbAction, username: userId, amount: dbAmount, wallet: targetWallet, game: finalGameName 
        };
        
        if (finalStatus === "lose") phpPayload.status = "lose";
        else phpPayload.status = "win";

        phpPayload.bet_amount = reqAmount;

        // 🛫 ③ মেইন সাইটের সিকিউরড গেটওয়েতে রিয়েল-টাইম উইন-লস সেটেলমেন্ট এפיআই হিট (কড়া ৪৫ সেকেন্ড সিঙ্ক লক)
        const response = await axios.post(`${MAIN_SITE_URL}/api_callback.php`, phpPayload, { timeout: 45000 });

        if (response.data && response.data.status === "ok") {
            io.emit("balanceUpdate", { username: userId, balance: response.data.balance });
            
            return res.json({
                success: true,
                balance: response.data.balance,
                data: { balance: response.data.balance },
                gameData: { 
                    ring1TargetDegree, 
                    ring2TargetDegree, 
                    ring3TargetDegree, 
                    status: finalStatus, 
                    winAmount, 
                    hitMultiplierText 
                }
            });
        } else {
            let latestBal = (response.data && response.data.balance !== undefined) ? response.data.balance : currentDbBalance;
            return res.json({ success: false, balance: latestBal, message: "X Bet Settlement Declined by Database!" });
        }
    } catch (e) { 
        console.error("Twist Spin International Engine Error:", e.message);
        return res.json({ success: false, message: "⚠️ Timeout! Click SPIN again." }); 
    }
});

app.get('/', (req, res) => { res.sendFile(path.resolve(__dirname, 'index.html')); });
io.on('connection', (socket) => {});

const PORT = process.env.PORT || 35000; // 🎯 টুইস্ট স্পিনের জন্য আন্তর্জাতিক ডেডিকেটেড পোর্ট ৩৬০০০ লক ভাই ভাই
server.listen(PORT, () => { console.log(`🎡 Twist Spin International Engine Running on port ${PORT}`); });
