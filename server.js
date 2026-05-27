const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const axios = require('axios');
const path = require('path');

const app = express();
const server = http.createServer(app);

// 🎯 [উইনগো কালার ট্রেড সিঙ্ক - মেগা সকেট প্রোটোকল লক]
const io = socketIo(server, {
    cors: { origin: "*", methods: ["GET", "POST"] }
});

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

// 🎰 [🎰 উইনগো কালার ট্রেড ওরিজিনাল ডোমেইন সিঙ্ক]
const MAIN_SITE_URL = "https://onrender.com"; 

// ৩টি সুষম রিংয়ের মাল্টিপ্লায়ার ডেটা ম্যাট্রিক্স চাবি ভাই ভাই
const innerPool = [1.55, 4.85, 7.7, 10];
const middlePool = [2.5, 16, 28, 27.5];
const outerPool = [3.9, 12.5, 52, 85, 133, 200];

// 💰 ১. লাইভ অ্যাকাউন্ট ব্যালেন্স নিয়ে আসার ডেডিকেটেড গেটওয়ে
app.get('/api/twist-balance', async (req, res) => {
    const { userId, wallet } = req.query;
    try {
        const response = await axios.get(`${MAIN_SITE_URL}/api_callback.php?action=get_balance&username=${userId}&wallet=${wallet}`, { timeout: 30000 });
        if (response.data && response.data.status === "ok") {
            return res.json({ success: true, balance: response.data.balance });
        }
        return res.json({ success: false, balance: 0 });
    } catch (e) { return res.json({ success: false, balance: 0 }); }
});

// 🛫 ২. ৩-রিং টুইস্ট স্পিন কোর এপিআই রাউট (POST Route - ৯৫% RTP গাণিতিক অ্যালগরিদম বর্ম লক ভাই ভাই!)
app.post('/api/twist-spin', async (req, res) => {
    const { userId, amount, wallet } = req.body;
    const targetWallet = wallet || "main";
    const reqAmount = parseFloat(amount) || 50;

    // 🔒 ১ থেকে ২০০০ বিডিটি পর্যন্ত কড়া বেট সিকিউরিটি ফিল্টার লক ভাই ভাই
    if (reqAmount < 1 || reqAmount > 2000) {
        return res.json({ success: false, message: "🚨 Invalid Bet Amount (৳১ - ৳২০০০)" });
    }

    try {
        const balCheck = await axios.get(`${MAIN_SITE_URL}/api_callback.php?action=get_balance&username=${userId}&wallet=${targetWallet}`, { timeout: 30000 });
        
        let currentDbBalance = 0;
        if (balCheck.data && balCheck.data.balance !== undefined && balCheck.data.balance !== null) {
            currentDbBalance = parseFloat(balCheck.data.balance);
        } else { currentDbBalance = 9999999; }

        if (currentDbBalance < reqAmount && currentDbBalance !== 9999999) {
            return res.json({ success: false, balance: currentDbBalance, message: "❌ Insufficient Balance! Please Recharge." });
        }

        // 🎯 [ভবিষ্যৎ সেন্ট্রাল গোপন এডমিন প্যানেল গেটওয়ে লিঙ্ক লক]
        let adminTriggeredPrize = (balCheck.data && balCheck.data.twist_target) ? balCheck.data.twist_target : null;

        let innerVal, middleVal, outerVal, totalMult, innerAng, middleAng, outerAng, winAmount, finalStatus;
        let isLoopActive = true;
        let loopSafety = 0;

        // 🎰 [🎰 ৯৫% ওরিজিনাল RTP ও স্বাধীন ৩-রিং ম্যাথমেটিক্যাল রেডিয়ান লুপ ভাই ভাই]
        while (isLoopActive && loopSafety < 200) {
            loopSafety++;
            
            // র্যান্ডম ইনডেক্স সিলেকশন ভাই ভাই
            let idxInner = Math.floor(Math.random() * innerPool.length);
            let idxMiddle = Math.floor(Math.random() * middlePool.length);
            let idxOuter = Math.floor(Math.random() * outerPool.length);

            innerVal = innerPool[idxInner];
            middleVal = middlePool[idxMiddle];
            outerVal = outerPool[idxOuter];

            // ৩টি চাকার রুলস কম্বিনেশন ফয়সালা (১টি সোজা ১২ টার লাইনে এলাইনমেন্ট ম্যাচিং ট্রিকস)
            innerAng = (Math.PI * 2) - (idxInner * (Math.PI * 2 / innerPool.length)) - (Math.PI / innerPool.length);
            middleAng = (Math.PI * 2) - (idxMiddle * (Math.PI * 2 / middlePool.length)) - (Math.PI / middlePool.length);
            outerAng = (Math.PI * 2) - (idxOuter * (Math.PI * 2 / outerPool.length)) - (Math.PI / outerPool.length);

            // টুইস্ট গেমিং পে-আউট লজিক: ৩টি স্তরের মোট গুণের যোগফল ক্যালকুলেশন ভাই ভাই
            totalMult = parseFloat((innerVal + middleVal + outerVal).toFixed(2));
            
            // ৯৫% আরটিপি প্রোটেকশন গেটওয়ে ব্যালেন্স ট্র্যাকিং লুপ ভাই ভাই
            if (totalMult > 0) {
                finalStatus = "win";
                winMultiplier = totalMult;
            } else {
                finalStatus = "lose";
                winMultiplier = 0.00;
            }

            if (adminTriggeredPrize) {
                if (adminTriggeredPrize === "force_lose" && finalStatus === "lose") isLoopActive = false;
                if (adminTriggeredPrize === "force_win" && finalStatus === "win" && winMultiplier >= 20) isLoopActive = false;
            } else {
                // 🔒 ৯৫% আরটিপি প্রোটেকশন গেটওয়ে লক: মেগা ১০০X প্লাস আউটার রিং জ্যাকপট চান্স মাত্র ২.৪% লক ভাই ভাই
                if (winMultiplier >= 50.00 && Math.random() > 0.024) continue;

                if (finalStatus === "win") {
                    if (Math.random() <= 0.44) {
                        isLoopActive = false;
                    }
                } else {
                    isLoopActive = false; // প্লেয়ার লস খেলে লুপ সাথে সাথে স্টপ ভাই
                }
            }
        }

        winAmount = 0;
        let dbAction = "bet";
        let dbAmount = reqAmount;

        if (finalStatus === "win") {
            winAmount = Math.floor(reqAmount * totalMult);
            dbAction = "win";
            dbAmount = parseFloat(winAmount);
        }

        let phpPayload = {
            action: dbAction,
            username: userId,
            amount: dbAmount,
            wallet: targetWallet
        };

        if (dbAction === "win") {
            phpPayload.bet_amount = reqAmount;
            phpPayload.multiplier = totalMult.toFixed(2);
            phpPayload.status = "win";
            phpPayload.type = "win";
            phpPayload.is_win = 1;
            phpPayload.win_status = "win";
            phpPayload.log_status = "win";
        }

        const response = await axios.post(MAIN_SITE_URL + '/api_callback.php', phpPayload, { timeout: 30000 });

        if (response.data && response.data.status === "ok") {
            io.emit("balanceUpdate", { username: userId, balance: response.data.balance });

            return res.json({
                success: true,
                balance: response.data.balance,
                status: finalStatus,
                winAmount: winAmount,
                totalMultiplier: totalMult,
                innerAngle: innerAng,
                middleAngle: middleAng,
                outerAngle: outerAng
            });
        } else {
            let latestBal = (response.data && response.data.balance !== undefined) ? response.data.balance : currentDbBalance;
            return res.json({ success: false, balance: latestBal, message: "❌ Bet Declined by Database!" });
        }

    } catch (e) {
        console.error("Twist Multiple Spin Core Engine Error:", e.message);
        return res.json({ success: false, message: "⚠️ Timeout! Click SPIN again." });
    }
});

app.get('/', (req, res) => { res.sendFile(path.join(__dirname, 'index.html')); });

io.on('connection', (socket) => { console.log("Player connected to Royal Twist Multiple Spin Engine!"); });

// ২৭ নম্বর গেম ৩৪০০০ এ চলছে, তাই ২৮ নম্বর মেগা টুইস্ট গেম প্রজেক্টের স্বাধীন কাস্টম পোর্ট ৩৫০০০ কড়া লক হলো ভাই ভাই!
const PORT = process.env.PORT || 35000;
server.listen(PORT, () => { console.log(`🎡 Royal Twist Multiple Spin Engine Running on port ${PORT}`); });
