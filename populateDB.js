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
        picture: "/static/images/jett-icon.png",
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

    console.log("users created");
});

// Getting user's ID
const user_mar = await User.findOne({ username: '@mar_v' });
const user_a = await User.findOne({ username: '@anne_s' });
const user_b = await User.findOne({ username: '@bella_t' });
const user_z = await User.findOne({ username: '@zhoe_g' });
const user_j = await User.findOne({ username: '@jack_e' });
console.log("USER,, ",user_mar);
console.log(user_mar._id);

// import posts
database.connectToMongo().then(() => {
    Post.create({
        username: user_mar._id,
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
        username: user_a._id,
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
        username: user_b._id ,
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
        username: user_z._id,
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
        username: user_j._id,
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
        username: user_mar._id,
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
        username: user_a._id,
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
        username: user_b._id,
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
const post_one = await Post.findOne({title: "New Agent Speculations" });
const post_two = await Post.findOne({  title: "I Topfragged With No Crosshair" });
console.log("POST ",post_one);
console.log(post_one._id);

//import comments
database.connectToMongo().then(() => {
    Comment.create({
        username: user_z._id,
        post: post_one._id,
        date: "06/21/2023 19:02",
        content: "i hope its not another chamber. i want a sentinel stronger than kj tho.",
        upvotes: 10,
        downvotes: 3,
        edited: false,
    });
    Comment.create({
        username: user_a._id,
        post: post_one._id,
        date: "06/21/2023 19:02",
        content: "lol maybe you're just bad",
        upvotes: 10,
        downvotes: 3,
        edited: false,
    });
    Comment.create({
        username: user_mar._id,
        post: post_two._id,
        date: "06/21/2023 19:02",
        content: "thats going to make kj OP",
        upvotes: 10,
        downvotes: 3,
        edited: false,
    });


    Comment.create({
        username: user_a._id,
        post: post_two._id,
        date: "06/21/2023 19:02",
        content: "chamber meta is out. honestly theres no broken agent rn to really call it as meta.",
        upvotes: 10,
        downvotes: 3,
        edited: false,
    });

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

    console.log("comments created");
});