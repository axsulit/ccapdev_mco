import "dotenv/config";
import mongoose from "mongoose";
import { User } from "./src/models/userModel.js";
import { Post } from "./src/models/postModel.js";
import { Comment } from "./src/models/commentModel.js";
//import { connect } from "./src/models/db.js";
//import { connectToMongo } from "./src/db/conn.js";
import database from "./src/models/db.js";

// import users
database.connectToMongo().then(() => {
    User.create({
        username: "@anne_s",
        password: "sulit123",
        picture: "/static/images/fade-icon.png",
        bio: "Ikaw ang binibini na ninanais ko",
      });

    User.create({
        username: "@bella_t",
        password: "torio123",
        picture: "/static/images/neon-icon.png",
        bio: "Binibining marikit na dalangin ko",
      });
    
    User.create({
        username: "@zhoe_g",
        password: "gon123",
        picture: "/static/images/killjoy-icon.png",
        bio: "Ikaw ang nagbigay ng kulay sa'king mundo",
      });

    User.create({
        username: "@mar_v",
        password: "villa123",
        picture: "/static/images/phoenix-icon.png",
        bio: "Sana ay pang-habang buhay na ito",
      }); 
    
    User.create({
        username: "@jack_e",
        password: "eli123",
        picture: "/static/images/fade-icon.png",
        bio: "Mga ngiti mong matamis na ba ay sakto na",
      });

    User.create({
        username: "@andre_a",
        password: "aqui123",
        picture: "/static/images/brimstone-icon.png",
        bio: "Mala-anghel na mukha sayo'y naakit na",
      });
    
    User.create({
        username: "@bien_m",
        password: "mir123",
        picture: "/static/images/omen-icon.png",
        bio: "Ang tangling hiling, Diyos, iyong dinggin",
      });

    User.create({
        username: "@dom_b",
        password: "bac123",
        picture: "/static/images/jett-icon.png",
        bio: "Oh, aking binibini, ikaw ang pinipili",
      }); 
    
    User.create({
        username: "@vinnie_i",
        password: "ino123",
        picture: "/static/images/omen-icon.png",
        bio: "Di ka man ginto, pero ikaw ay mamahalin",
      });

    User.create({
        username: "@luis_r",
        password: "ran123",
        picture: "/static/images/fade-icon.png",
        bio: "Kislap ng iyong mata'y tanawing napakaganda",
      }); 

    console.log("users created");
});

// import posts
database.connectToMongo().then(() => {
    Post.create({
        username: "@anne_s",
        date: "06/21/2023 18:43",
        title: "New Agent Speculations",
        content: "Hey SpikeZoners! Since Riot recently released a teaser for a new agent, what are your thoughts? Do you think this sentinel will actually be a sentinel that can extremely hold sites, or another Chamber that is more on the aggressive side? What’s your bet?",
        tag: "General Discussion",
        comments: [],
        upvotes: 23,
        downvotes: 2,
        edited: false
    });

    Post.create({
        username: "@bella_t",
        date: "07/15/2021 18:45",
        title: "I Topfragged With No Crosshair",
        content: "Title says itself. I’m even a Neon main and I love Breeze. Top fragged on a ranked game ggez",
        tag: "General Discussion",
        comments: [],
        upvotes: 15,
        downvotes: 6,
        edited: false
    });

    Post.create({
        username: "@zhoe_g",
        date: "06/03/2023 09:15",
        title: "Killjoy Buff Where",
        content: "I am so TIRED of Riot nerfing Killjoy over and over and over again. I miss Episode 1 KJ fr. Do you think they will do another rebalance of sentinel agents since there will be a new one coming? Please i miss KJ make her turrent and alarmbot placeable without restricted distance AGAIN",
        tag: "General Discussion",
        comments: [],
        upvotes: 12,
        downvotes: 11,
        edited: false
    });

    Post.create({
        username: "@mar_v",
        date: "09/12/2021 18:30",
        title: "Hardstuck Plat? (Advice from a Diamond)",
        content: "If u r hardstuck plat i think u should aim train and play more. Play 10 deathmatch before a rank game and calculate u dpi. Stop muting ur teammates and then flaming them after. Just shoot ur enemies. It’s not that hard trust me bro and ull get there",
        tag: "General Discussion",
        comments: [],
        upvotes: 2,
        downvotes: 30,
        edited: false
    });

    Post.create({
        username: "@jack_e",
        date: "11/28/2022 15:45",
        title: "LF 1 Gold Lobby",
        content: "Need 1 teammate for gold lobby. My immo friend will carry you we promise. Drop ign in the comments and we’ll add you ASAP. Will block no comms.",
        tag: "LFT",
        comments: [],
        upvotes: 1,
        downvotes: 0,
        edited: false
    });
    
    Post.create({
        username: "@andre_a",
        date: "06/26/2023 23:10",
        title: "LF Duo",
        content: "I'm so done playing with @anne_s and @jack_e D:",
        tag: "General Discussion",
        comments: [],
        upvotes: 0,
        downvotes: 2,
        edited: false
    });

    Post.create({
        username: "@bien_m",
        date: "11/27/2022 15:49",
        title: "VCT Tokyo",
        content: "The games are so fire. I couldn’t believe Paper Rex would reach that far without PRX something. PRX cgrs supremacy me thinks. #PRXWin",
        tag: "General Discussion",
        comments: [],
        upvotes: 5,
        downvotes: 1,
        edited: false
    });

    Post.create({
        username: "@dom_b",
        date: "11/26/2022 13:48",
        title: "Returning to Valorant",
        content: "Hi! Been MIA for the past few months because of academic work. Can someone give me a TLDR of what’s the meta?",
        tag: "General Discussion",
        comments: [],
        upvotes: 1,
        downvotes: 0,
        edited: false
    });

    console.log("posts created");
    //connection.close();
});

//import comments
// connect().then(() => {
//     Comment.create({
//         postid:"1",
//         commentid: "1",
//         date: "06/21/2023 19:02",
//         upvotes: 10,
//         downvotes: 3,
//         username: "@zhoe_g",
//         content: "i hope its not another chamber. i want a sentinel stronger than kj tho."
//     });

//     Comment.create({
//         postid:"1",
//         commentid: "2",
//         date: "06/21/2023 19:10",
//         upvotes: 15,
//         downvotes: 8,
//         username: "@dom_b",
//         content: "lol maybe you're just bad"
//     });

//     Comment.create({
//         postid:"3",
//         commentid: "1",
//         date: "06/11/2023 12:18",
//         upvotes: 3,
//         downvotes: 0,
//         username: "@mar_v",
//         content: "thats going to make kj OP"
//     });

//     Comment.create({
//         postid:"5",
//         commentid: "1",
//         date: "11/28/2022 15:49",
//         upvotes: 1,
//         downvotes: 0,
//         username: "@vinnie_i",
//         content: "DMED u ! carry pls"
//     });

//     Comment.create({
//         postid:"5",
//         commentid: "2",
//         date: "11/28/2022 16:02",
//         upvotes: 1,
//         downvotes: 1,
//         username: "@anne_s",
//         content: "still avail? Dmed i will carry every1"
//     });

//     Comment.create({
//         postid:"8",
//         commentid: "1",
//         date: "11/26/2022 15:00",
//         upvotes: 1,
//         downvotes: 0,
//         username: "@mar_v",
//         content: "chamber meta is out. honestly theres no broken agent rn to really call it as meta."
//     });

//     console.log("comments created");
// });