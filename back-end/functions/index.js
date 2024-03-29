// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
const functions = require('firebase-functions');
// const collection = require('firebase/firestore/collection');
// const doc = require('firebase/firestore/doc');
// const setDoc = require('firebase/firestore/setDoc');
const fs = require('fs').promises;
const keccak256 = require("keccak256");
const { MerkleTree } = require("merkletreejs");
const Web3 = require("web3");
const ethers = require("ethers");
const SHA256 = require('crypto-js/sha256')

// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');


admin.initializeApp();

const AttendanceType = {
	General: "general",
	Speaker: "speaker",
	Hacker: "hacker",
	Team: "team"
}



const address = {
    "general": [
      "andrew.hamilton@gatech.edu",
      "jasmine.guerra@ubs.com",
      "rivera.richard83@gmail.com",
      "im.thinhvu@gmail.com",
      "avery.bartlett@avalabs.org",
      "adityap@alumni.duke.edu",
      "ekatz@gatech.edu",
      "jpseabrook22@gmail.com",
      "sidd1134@gmail.com",
      "evelyn.bolden@coxinc.com",
      "acochon6@gatech.edu",
      "romanmendesjr@gmail.com",
      "jakelevy30@gmail.com",
      "ktran323@gatech.edu",
      "trav62801@gmail.com",
      "mstalvey3@gatech.edu",
      "ywu820@gatech.edu",
      "ankit.tandon.mba@gmail.com",
      "achen446@gatech.edu",
      "rob@revest.finance",
      "aj.alix@cox.com",
      "luciengkl@gatech.edu",
      "vseeram1@student.gsu.edu",
      "headquartersteam@gmail.com",
      "sam.friedman@smartcontract.com",
      "matt.r.evans7@gmail.com",
      "hampiholi@gatech.edu",
      "austin.chrislock@gmail.com",
      "willchesson@gmail.com",
      "avanaken@gmail.com",
      "pruitt.martin@gmail.com",
      "sahuja63@gatech.edu",
      "mdb1710@gmail.com",
      "atoland3@gatech.edu",
      "james.ray267@gmail.com",
      "spmartin3@gmail.com",
      "kenny.bunch@gmail.com",
      "anainani3@gatech.edu",
      "speceny3@gatech.edu",
      "mosmolovskiy@gmail.com",
      "sammmastenn@gmail.com",
      "yuriy@orbiter.one",
      "nityaarora.921@gmail.com",
      "gopalgoel@gatech.edu",
      "yli2755@emory.edu",
      "rshirur3@gatech.edu",
      "mcbridekevin21@gmail.com",
      "skb@vrynt.io",
      "owjones@protonmail.com",
      "judp81@gmail.com",
      "jeremiahdlong@gmail.com",
      "chill310@gatech.edu",
      "jaleelbeasley@me.com",
      "nbsantos@gmail.com",
      "tiffany.lung@binance.com",
      "chris@georgiablockchain.io",
      "cmm385@mocs.utc.edu",
      "lruane3@gatech.edu",
      "shaybhayani@gmail.com",
      "destinyadamsinternational@gmail.com",
      "tycoo@strmline.co",
      "rdavis44204@yahoo.com",
      "tahmad31@gatech.edu",
      "barnett.jazmine2000@gmail.com",
      "egarcia78@gatech.edu",
      "lukas.schmid@yahoo.de",
      "ivan.k@bnbchain.org",
      "grant.a.cloud@gmail.com",
      "sriramuniverse@gmail.com",
      "jashandeepsinghkaleka@gmail.com",
      "elisea.hamilton@fideleschristianschool.com",
      "tiyash@symbiosisstrategies.com",
      "corky@prasaga.com",
      "scott.seabolt@walkingtree.tech",
      "cbrownlee13@gmail.com",
      "cduffy8@gatech.edu",
      "aaltman9@gatech.edu",
      "jwashburne3@gatech.edu",
      "sropp3@gatech.edu",
      "metaversemediacompany@gmail.com",
      "cwhite304@gatech.edu",
      "ngoyal48@gatech.edu",
      "yuming.huang@gatech.edu",
      "fceccagnoli@gmail.com",
      "elizabeth.morrison@unstoppabledomains.com",
      "skhandaker@gatech.edu",
      "raschleusner@gmail.com",
      "mcurtis40@gatech.edu",
      "whitblass@gmail.com",
      "samratsahoo2013@gmail.com",
      "kyerra.cheyenne15@gmail.com",
      "austin.przybysz@smartcontract.com",
      "fyncoach@gmail.com",
      "nicole.williams@gatech.edu",
      "fozia@digopp.group",
      "safiy.malik@gmail.com",
      "steve.goeke@khelpfinancial.com",
      "teddymfeldmann@gmail.com",
      "o.f.villacorta@gmail.com",
      "kevinyjsong04@gmail.com",
      "tsmarket@alumni.utexas.net",
      "mccormickt9@gmail.com",
      "archchaudhury02@gmail.com",
      "jlumansoc@gmail.com",
      "sloane.brakeville@gmail.com",
      "jprry22@gmail.com",
      "hfreedman8@gatech.edu",
      "bho36@gatech.edu",
      "mpholder@me.com",
      "p.yang@fenbushi.vc",
      "saribek@gatech.edu",
      "djbaudhuin@gmail.com",
      "bzwerner@thebtgnetwork.com",
      "37slickrick@gmail.com",
      "ewillner3@gatech.edu",
      "gregsk@hotmail.com",
      "bqi8@gatech.edu",
      "bocai101105@gmail.com",
      "shep@offbeat.xyz",
      "jain.vidushi106@gmail.com",
      "jeffrey.wu@emory.edu",
      "bbartels7@gatech.edu",
      "chase.zhang@openzeppelin.com",
      "miked6544@yahoo.com",
      "ejacobso@student.gptc.edu",
      "dgosdin19@gmail.com",
      "fkozakos3@gatech.edu",
      "johnnwokeji376@gmail.com",
      "dan@atlantachain.io",
      "elaine.wen01@gmail.com",
      "mcao5@student.gsu.edu",
      "nader.abdallah@outlook.com",
      "julietteshelton@gatech.edu",
      "connor@nf-dos.com",
      "m3.elabs@gmail.com",
      "lnesbitt03@gmail.com",
      "4148gazu@gmail.com",
      "quon2100@gmail.com",
      "rgurnani96@gmail.com",
      "plrehm@gmail.com",
      "matthewrmcmullin@gmail.com",
      "jasmine.ka.johnson@gmail.com",
      "psmith@a16z.com",
      "reneeallums@gmail.com",
      "fbates1998@gmail.com",
      "hooptown11@gmail.com",
      "tremayne42@me.com",
      "dalton@digopp.group",
      "1@jbk.me",
      "jovanyfunes87@gmail.com",
      "jonathan.fw21@gmail.com",
      "connor.oshea@binance.com",
      "stevenholder172@gmail.com",
      "mhall309@gatech.edu",
      "annie.he2@emory.edu",
      "rdatta38@gatech.edu",
      "colton@primeprotocol.xyz",
      "xinye.wei@emory.edu",
      "tthakur9@gatech.edu",
      "everettcc10925@gmail.com",
      "leonard.robert.h@gmail.com",
      "vandalecallender@gmail.com",
      "tanguduvivek@gmail.com",
      "jnasr@acoer.com",
      "dabdoub.ahmad@gmail.com",
      "mendoza.n.eros@gmail.com",
      "ananthvivekanand@gmail.com",
      "jkaplin3@gatech.edu",
      "walsheamon@pm.me",
      "sydneyhahn3@gmail.com",
      "bgessessew@gmail.com",
      "hsyancey10@gmail.com",
      "tyler.acree@ncr.com",
      "online_j@majck.com",
      "namblard3@gatech.edu",
      "brian@giglabs.io",
      "cay34@mac.com",
      "vehard17@gmail.com",
      "jguzmanmarcos1@student.gsu.edu",
      "david@chapterone.com",
      "jenny.huang@emory.edu",
      "khadijah@infanity.xyz",
      "zfrench721@gmail.com",
      "coachtiaw@gmail.com",
      "tszulc@emory.edu",
      "gwynethmori12@gmail.com",
      "ryantinder56@gmail.com",
      "abhatia88@gatech.edu",
      "daniel.may@insperity.com",
      "sandeep3180@gmail.com",
      "bconklin@me.com",
      "satriapriambada@gmail.com",
      "powellce@me.com",
      "joseph@heirloom.io",
      "iv17yoo@gmail.com",
      "dot.gilchrist95@gmail.com",
      "rgangavarapu@gsu.edu",
      "aahluwalia30@gatech.edu",
      "mikab@anuuway.org",
      "dbailey28782@gmail.com",
      "cooper@koii.network",
      "angellolazar@gmail.com",
      "philipius94@gmail.com",
      "nkarthik3@gatech.edu",
      "nicoskatsafanas@gmail.com",
      "zaydenchin1@gmail.com",
      "emorton6@student.gsu.edu",
      "ouwen.chu@gmail.com",
      "sribhuvan.reddy@gmail.com",
      "jongonzalez1996@gmail.com",
      "lewisgrana15@gmail.com",
      "ljohnson372@gatech.edu",
      "sschendl@comcast.net",
      "wade@prevailroasters.com",
      "anshvijay28@gmail.com",
      "cr@gatech.edu",
      "pjonson2@gmail.com",
      "govind.gnanakumar@outlook.com",
      "singhal.aditya2506@gmail.com",
      "jason@formless.xyz",
      "ssanniot@gmail.com",
      "yang.adija@warnermedia.com",
      "amanda@blueprintconcepts.com",
      "11042206@live.mercer.edu",
      "d.t.smith6@gmail.com",
      "pchetal@gatech.edu",
      "dvillacorta@cajunairinc.com",
      "ljakub@g.clemson.edu",
      "asingh682@gatech.edu",
      "dylanwong007@gmail.com",
      "brent@gillett.com",
      "birdbamboo22@gmail.com",
      "5caseyhutch@gmail.com",
      "bjones361@gatech.edu",
      "kmmanoj1990@gmail.com",
      "naninikhil.p@gmail.com",
      "mgandhi44@gatech.edu",
      "c.polarr.c@gmail.com",
      "christian@easteregglabs.com",
      "ymbiamah1@student.gsu.edu",
      "melania.araujo82@gmail.com",
      "ben@chainsight.dev",
      "erfanp99@gmail.com",
      "alexlwn123@gmail.com",
      "sbelhareth3@gatech.edu",
      "trahman41@gatech.edu",
      "swatigupta@gatech.edu",
      "minsol.lee@gatech.edu",
      "samantharendon8@gmail.com",
      "htreu@gatech.edu",
      "luke@daolabs.technology",
      "dixonproducts@yahoo.com",
      "xjonwang@gmail.com",
      "cshayaan1@gmail.com",
      "sean.seansdesigns@gmail.com",
      "lorenaventura331@gmail.com",
      "rwatkins37@gatech.edu",
      "ryan.klopfer@gmail.com",
      "aagarwal434@gatech.edu",
      "bgoldblatt3@gatech.edu",
      "jmeere@clemson.edu",
      "ekdasher@gmail.com",
      "gabriel@knightley.co",
      "t1delcharco@gmail.com",
      "thomassb1625@gmail.com",
      "lwan452@emory.edu",
      "mhpruner@gmail.com",
      "feigenbaum.je@gmail.com",
      "amitkulkarni181@gmail.com",
      "walterpli@gmail.com",
      "phillip@digopp.group",
      "wesfloyd@protocol.ai",
      "hpatel163@student.gsu.edu",
      "kanemcgukin@gmail.com",
      "lilyeglass@gmail.com",
      "zionmelson@gmail.com",
      "dkmk1149@gmail.com",
      "kevinq2020@gmail.com",
      "vyokley3@gatech.edu",
      "joe@tadaima.finance",
      "rtiruveedhi3@gatech.edu",
      "marznorth01@gmail.com",
      "cdavis339@gatech.edu",
      "jfbloom22@gmail.com",
      "sbokhari6@gatech.edu",
      "ttrinh33@gatech.edu",
      "ldavis@a16z.com",
      "lqtruong@ncsu.edu",
      "ryangan1214@gmail.com",
      "blake@vngle.com",
      "howard88tw@gmail.com",
      "jacky.wang@emory.edu",
      "taylor.deng@emory.edu",
      "abradford@georgia.org",
      "solange.aniekwu2@gmail.com",
      "tylerjones81@gmail.com",
      "akeyes@mba2024.hbs.edu",
      "johnirvine999@gmail.com",
      "edithrr007@yahoo.com",
      "amy.boudreau@celo.org",
      "matt@blackboxcollective.io",
      "chaitanya3245@gmail.com",
      "jacqueypoo52@gmail.com",
      "agardiner8@gatech.edu",
      "cosochris@gmail.com",
      "erik@desci.com",
      "allanwgulley@gmail.com",
      "malone.willie@ymail.com",
      "vishruth.madhu@gmail.com",
      "jhambolu3@gatech.edu",
      "animysore@gatech.edu",
      "kylehobdy7@gmail.com",
      "avaloystudios@gmail.com",
      "stevensneel@gmail.com",
      "ronithry@outlook.com",
      "dylan.kynoch@gatech.edu",
      "svillegas@bitpay.com",
      "acao9@student.gsu.edu",
      "thanhtrinh280506@gmail.com",
      "trentconley@gmail.com",
      "crypto.prunes@gmail.com"
    ],
    "speaker": [
      "avery.bartlett@avalabs.org",
      "jakelevy30@gmail.com",
      "rob@revest.finance",
      "sam.friedman@smartcontract.com",
      "elizabeth.morrison@unstoppabledomains.com",
      "austin.przybysz@smartcontract.com",
      "archchaudhury02@gmail.com",
      "p.yang@fenbushi.vc",
      "bzwerner@thebtgnetwork.com",
      "psmith@a16z.com",
      "connor.oshea@binance.com",
      "colton@primeprotocol.xyz",
      "jnasr@acoer.com",
      "brian@giglabs.io",
      "david@chapterone.com",
      "mikab@anuuway.org",
      "erfanp99@gmail.com",
      "alexlwn123@gmail.com",
      "wesfloyd@protocol.ai",
      "erik@desci.com",
      "svillegas@bitpay.com",
      "thanhtrinh280506@gmail.com",
      "coltonconley@gmail.com",
      "josh@revest.finance",
      "tariqawaseem@gmail.com",
      "ewvanwinkle@gmail.com"
    ],
    "hacker": [
      "pruitt.martin@gmail.com",
      "sahuja63@gatech.edu",
      "jeremiahdlong@gmail.com",
      "lruane3@gatech.edu",
      "destinyadamsinternational@gmail.com",
      "tahmad31@gatech.edu",
      "sropp3@gatech.edu",
      "ngoyal48@gatech.edu",
      "yuming.huang@gatech.edu",
      "safiy.malik@gmail.com",
      "bbartels7@gatech.edu",
      "m3.elabs@gmail.com",
      "lnesbitt03@gmail.com",
      "reneeallums@gmail.com",
      "rdatta38@gatech.edu",
      "namblard3@gatech.edu",
      "jguzmanmarcos1@student.gsu.edu",
      "abhatia88@gatech.edu",
      "sandeep3180@gmail.com",
      "bconklin@me.com",
      "satriapriambada@gmail.com",
      "dot.gilchrist95@gmail.com",
      "anshvijay28@gmail.com",
      "govind.gnanakumar@outlook.com",
      "ben@chainsight.dev",
      "xjonwang@gmail.com",
      "rwatkins37@gatech.edu",
      "bgoldblatt3@gatech.edu",
      "thomassb1625@gmail.com",
      "amitkulkarni181@gmail.com",
      "ttrinh33@gatech.edu",
      "tylerjones81@gmail.com",
      "thanhtrinh280506@gmail.com"
    ],
    "team": [
      "pruitt.martin@gmail.com",
      "nikitapopik600@gmail.com",
      "ashleyf1124@gmail.com",
      "thomassb1625@gmail.com",
      "jacksanniota@gmail.com",
      "austin.chrislock@gmail.com",
      "rschleusner@gatech.edu",
      "itsturley1@gmail.com",
      "thanhtrinh280506@gmail.com",
      "manny@404dao.io",
      "cole@404dao.io"
    ]
  }
 

// Take the text parameter passed to this HTTP endpoint and insert it into 
// Firestore under the path /messages/:documentId/original
exports.addEmail = functions.https.onRequest(async (req, res) => {
    const original = req.query.param;
    console.log(original);
    let email = original[0].toLowerCase();
    let type = original[1].toLowerCase();

    const db = admin.firestore();
    const doc = db.collection('Email').doc("Attendance List").get();
    let data = (await doc).data();

    if(data[type] == null) {
        data[type] = [email+","]
        db.collection('Email').doc("Attendance List").set(data);
        res.send(original + " email has been added to " + type + " email list!");
    } else  {
        data[type].push(email+",");
        db.collection('Email').doc("Attendance List").set(data);
        res.send(original + " email has been added to " + type + " email list!");
    }
});


exports.generateProof = functions.https.onRequest(async (req, res) => {
    const original = req.query.param;
    console.log(original);
    let email = original[0].toLowerCase();
    let type = original[1].toLowerCase();
    
    let addressList = address[type];

    leave = addressList.map(x => keccak256(x));
    merkleTree = new MerkleTree(leave, keccak256, { sortPairs: true });

    leaf = keccak256(email)
    proof = merkleTree.getHexProof(leaf)

    res.json(proof);
});

exports.verifyEmail = functions.https.onRequest(async (req, res) => {
    const email = req.query.param.toLowerCase();
 
    const db = admin.firestore();
    const doc = db.collection('Email').doc("Attendance List").get();
    let data = (await doc).data();

    console.log(email)


    let list = data["team"]
    let size = list.length
    let bool = false;
    let formattedEmail = ""
    
    for (let i = 0; i<size; i++) {
        listPara = list[i].split(",")
        let currentEmail = listPara[0].toLowerCase()
        if (currentEmail.localeCompare(email)==0) {
            if(listPara.length > 1) {
                let address = listPara[1];
                console.log(address.length);
                if(address.length > 0) {
                    bool = true;
                    res.json("Already Registered")
                } else {
                    bool = true;
                    res.json("team");
                }
            } else {
                bool = true;
                res.json("team");
            }
        } 
    }

    list = data["speaker"]
    size = list.length
    
    for (let i = 0; i<size; i++) {
        listPara = list[i].split(",")
        let currentEmail = listPara[0].toLowerCase()
        if (currentEmail.localeCompare(email)==0) {
            if(listPara.length > 1) {
                let address = listPara[1];
                console.log(address.length);
                if(address.length > 0) {
                    bool = true;
                    res.json("Already Registered")
                } else {
                    bool = true;
                    res.json("speaker");
                }
            } else {
                bool = true;
                res.json("speaker");
            }
        } 
    }

    list = data["hacker"]
    size = list.length
    
    for (let i = 0; i<size; i++) {
        listPara = list[i].split(",")
        let currentEmail = listPara[0].toLowerCase()
        if (currentEmail.localeCompare(email)==0) {
            if(listPara.length > 1) {
                let address = listPara[1];
                console.log(address.length);
                if(address.length > 0) {
                    bool = true;
                    res.json("Already Registered")
                } else {
                    bool = true;
                    res.json("hacker");
                }
            } else {
                bool = true;
                res.json("hacker");
            }
        } 
    }

    list = data["general"]
    size = list.length
    
    for (let i = 0; i<size; i++) {
        listPara = list[i].split(",")
        let currentEmail = listPara[0].toLowerCase()
        if (currentEmail.localeCompare(email)==0) {
            if(listPara.length > 1) {
                let address = listPara[1];
                console.log(address.length);
                if(address.length > 0) {
                    bool = true;
                    res.json("Already Registered")
                } else {
                    bool = true;
                    res.json("general");
                }
            } else {
                bool = true;
                res.json("general");
            }
        } 
    }

    if(!bool) {
        res.json("none!");
    }
});


exports.updateAddress = functions.https.onRequest(async (req, res) => {
    const original = req.query.param;
    console.log(original);
    let email = original[0].toLowerCase();
    let type = original[1].toLowerCase();
    let address = original[2].toLowerCase();
 
    const db = admin.firestore();
    const doc = db.collection('Email').doc("Attendance List").get();
    let data = (await doc).data();


    let list = data[type]
    let size = list.length
    let bool = false;
    
    for (let i = 0; i<size; i++) {
        let currentString = list[i]
        console.log(currentString)
        let components = currentString.split(",")
        let currentEmail = components[0]
        if (currentEmail.localeCompare(email)==0) {
            list[i] = currentEmail+","+address;
            data[type] = list
            db.collection('Email').doc("Attendance List").set(data)
            bool = true;
            res.send("Have updated the given email with address " + address);
        } 
    }
    if(!bool) {
        res.send("Cannot find given email in given list");
    }
});


exports.initiateListTest = functions.https.onRequest(async (req, res) => {
    const db = admin.firestore();

    data = {
        general: ["general1@gmail.com", "General2@gmail.com", "general3@gmail.com,", "generaL4@gmail.com,0123123"],
        team: ["test1@gmail.com", "Test2@gmail.com"],
        speaker: ["speaker1@gmail.com", "Speaker2@gmail.com"],
        hacker: ["hacker1@gmail.com", "Hacker2@gmail.com", "hacker3@gmail.com,081298319283","HaCkE@Gmail.com,"],

    }

    const doc = db.collection('Email').doc("Attendance List").set(data);
    res.send("Finish setting up list for testing!");
});

exports.queryList = functions.https.onRequest(async (req, res) => {
    const db = admin.firestore();
    const doc = db.collection('Email').doc("Attendance List").get();
    let data = (await doc).data();
    res.json({"general": data["general"], "speaker": data["speaker"], "hacker": data["hacker"], "team": data["team"], "sponser": data["sponser"]})
});


/**
 * Turn all o fhte 
 */
exports.deCaseSensitivity = functions.https.onRequest(async (req, res) => {
    const db = admin.firestore();
    const doc = db.collection('Email').doc("Attendance List").get();

    let data = (await doc).data();

    for (let item in AttendanceType) {
        console.log(AttendanceType[item])
        let list = data[AttendanceType[item]]
        console.log(list)

        for (let i=0; i<list.length; i++) {
            let currentString = list[i]
            let components = currentString.split(",")
            let address = ""
            console.log(components.length)
            //TODO: test on simulators 
            if (components.length > 1) {
                address = components[1];
            }
            let currentEmail = components[0]
            list[i] = currentEmail.toLowerCase()+","+address;
        }

        data[AttendanceType[item]] = list
    }
    db.collection('Email').doc("Attendance List").set(data)
    res.send("Finish lowercasing all of the email");
    
});




