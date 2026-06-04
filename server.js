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

// 🎰 [🎰 উইনগো কালার ট্রেড ওরিজিনাল ডোমেইন সিঙ্ক ভাই ভাই]
const MAIN_SITE_URL = "https://betlover247.onrender.com"; 

// 🎡 [ইন্টারন্যাশনাল ক্যাসিনো স্ট্যান্ডার্ড স্লট পুল]: প্রতিটা রিংয়ের শেষ ঘরে ১টি করে কড়া '0X' বা লস স্লট ইনজেক্ট লক ওস্তাদ!
const ring1ValuesPool = ["200X", "3.9X", "27.5X", "52X", "85X", "0X"];   // স্লট ইনডেক্স ৫ হলো ওরিজিনাল লস ঘর 🔴
const ring2ValuesPool = ["24X", "12.5X", "52X", "2.5X", "16X", "0X"];    // স্লট ইনডেক্স ৫ হলো ওরিজিনাল লস ঘর 🔴
const ring3ValuesPool = ["10X", "1.55X", "4.85X", "2.5X", "7.7X", "0X"];  // স্লট ইনডেক্স ৫ হলো ওরিজিনাল লস ঘর 🔴

// 💰 ১. লাইভ অ্যাকাউন্ট ব্যালেন্স ইন্টারсеপ্টর গেটওয়ে (১ শতভাগ টাইমআউট ও জ্যাম ব্লকার বর্ম ওস্তাদ)
app.get('/api/twist-balance', async (req, res) => {
    const { userId, wallet } = req.query;
    const targetWallet = wallet || "main";
    try {
        const response = await axios.post(`${MAIN_SITE_URL}/api_callback.php`, {
            action: "balance", 
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
        return res.json({ success: false, balance: 0 }); 
    }
});

// 🛫 ২. ৩-লেয়ার ডাইনামিক রোটেশন রাউট (POST Route - ৯৫% সুপ্রিম ফেয়ার আরটিপি ফিল্টার লক)
app.post('/api/twist-deal', async (req, res) => {
    const { userId, amount, wallet, prediction } = req.body; 
    const reqAmount = parseFloat(amount) || 50;
    const userPrediction = String(prediction || "RING1").toUpperCase(); 
    const finalGameName = "twistspin"; 
    const targetWallet = wallet || "main";

    if (reqAmount < 1 || reqAmount > 20000 || !["RING1", "RING2", "RING3"].includes(userPrediction)) {
        return res.json({ success: false, message: "🚨 Invalid Bet Parameter!" });
    }

    try {
        // 🔒 [ব্যালেন্স ডেবিট প্রোটোকল]: বাজি প্লে করার সাথে সাথে ১ম হিটে অ্যাকাউন্ট থেকে বাজি কাটার রিকোয়েস্ট লক
        const balResponse = await axios.post(`${MAIN_SITE_URL}/api_callback.php`, {
            action: "bet", username: userId, amount: reqAmount, wallet: targetWallet, game: finalGameName
        }, { timeout: 30000 });
        
        if (!balResponse.data || balResponse.data.status !== "ok") {
            return res.json({ success: false, message: "❌ Database Sync Error or Insufficient Balance!" });
        }

        let currentDbBalance = parseFloat(balResponse.data.balance);
        
        let index1 = 0, index2 = 0, index3 = 0;
        let val1 = "0X", val2 = "0X", val3 = "0X";
        let winMultiplier = 0.00;
        let hitMultiplierText = "0X";
        let finalStatus = "lose";

        let isLoopActive = true;
        let loopSafety = 0;

        // 🎰 [🎰 ৯৫% গ্লোবাল ক্যাসিনো RTP আন্তর্জাতিক সুষম লুপ ইঞ্জিন ভাই ভাই]
        while (isLoopActive && loopSafety < 150) {
            loopSafety++;
            
            index1 = Math.floor(Math.random() * ring1ValuesPool.length);
            index2 = Math.floor(Math.random() * ring2ValuesPool.length);
            index3 = Math.floor(Math.random() * ring3ValuesPool.length);

            val1 = ring1ValuesPool[index1];
            val2 = ring2ValuesPool[index2];
            val3 = ring3ValuesPool[index3];

            let targetHitValueText = val1;
            if (userPrediction === "RING2") targetHitValueText = val2;
            if (userPrediction === "RING3") targetHitValueText = val3;

            hitMultiplierText = targetHitValueText;
            winMultiplier = parseFloat(targetHitValueText.replace("X", "")) || 0;

            // 🔒 [ইন্টারন্যাশনাল ক্লিয়ার সেটেলমেন্ট ফিল্টার]: মান ১.০ এর কম অথবা ০X হলে পিউর লস ডিফাইন লক ওস্তাদ!
            if (winMultiplier > 0 && targetHitValueText !== "0X") {
                finalStatus = "win";
            } else {
                finalStatus = "lose";
                winMultiplier = 0.00;
            }

            // এডমিন প্যানেল কাস্টম ফোর্স কন্ট্রোল নব ফিল্টারিং চ্যাম
            if (balResponse.data && balResponse.data.twist_target) {
                let target = String(balResponse.data.twist_target).toUpperCase();
                if (target === "FORCE_LOSE" && finalStatus === "win") {
                    // ফোর্স লস একটিভ থাকলে সোজা চাকা লস স্লট ইনডেক্স ৫ এ ল্যান্ড করবে ভাই
                    index1 = 5; index2 = 5; index3 = 5;
                    val1 = "0X"; val2 = "0X"; val3 = "0X";
                    hitMultiplierText = "0X"; winMultiplier = 0.00; finalStatus = "lose";
                    isLoopActive = false;
                }
                if (target === "FORCE_WIN" && finalStatus === "win") isLoopActive = false;
            } else {
                if (finalStatus === "win") {
                    // আন্তর্জাতিক ক্যাসিনো নিয়মে ৪৩% এ উইন ব্যালেন্সড সুপ্রিম আরটিপি লক ভাই ভাই!
                    if (Math.random() <= 0.43) isLoopActive = false;
                } else {
                    isLoopActive = false;
                }
            }
        }

        // ৩টি রিংয়ের প্রতিটি স্লাইসের মিলিমিটার নিখুঁত রোটেশন ডিগ্রী ক্যালকুলেশন চ্যাম ওস্তাদ!
        let singleSliceAngle = 360 / 6; 
        let ring1TargetDegree = index1 * singleSliceAngle;
        let ring2TargetDegree = index2 * singleSliceAngle;
        let ring3TargetDegree = index3 * singleSliceAngle;

        // 🎯 [মেগা কিলার জিরো-ডাবল-ডেবিট স্টেক ব্যালেন্সার বর্ম ভাই ভাই]
        let winAmount = 0, dbAction = "win", dbAmount = 0;

        if (finalStatus === "win") {
            winAmount = Math.round(reqAmount * winMultiplier);
            dbAction = "win"; dbAmount = parseFloat(winAmount); 
        } else {
            dbAction = "win"; dbAmount = 0; // 🔒 লস হলে ডাটাবেজে ২য় বার কোনো টাকা কাটার ওল্ড পেলোড ফায়ার হবে না ভাই
        }

        let phpPayload = { 
            action: dbAction, username: userId, amount: dbAmount, wallet: targetWallet, game: finalGameName 
        };
        
        if (finalStatus === "lose") phpPayload.status = "lose";
        else phpPayload.status = "win";

        phpPayload.bet_amount = reqAmount;

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
        return res.json({ success: false, message: "⚠️ Timeout! Click SPIN again." }); 
    }
});

app.get('/', (req, res) => { res.sendFile(path.resolve(__dirname, 'index.html')); });
io.on('connection', (socket) => {});

const PORT = process.env.PORT || 35000; 
server.listen(PORT, () => { console.log(`🎡 Twist Spin Dynamic Engine Running on port ${PORT}`); });
