import { getAuth } from "firebase-admin/auth"
import { app } from "../config/firebase.js"
import User from "../models/user.model.js"
import crypto from "crypto"
import redis from "../../../Shared/redis/redis.js"

export const login = async (req, res) => {
    try {

        const { token } = req.body

        // 1. Verify Firebase ID token
        const decoded = await getAuth(app).verifyIdToken(token)

        console.log("Decoded Firebase user:", decoded)

        // 2. Check whether user already exists
        let user = await User.findOne({
            firebaseUid: decoded.uid
        })

        // 3. If user doesn't exist, create one
        if (!user) {
            user = await User.create({
                firebaseUid: decoded.uid,
                name: decoded.name,
                email: decoded.email,
                avatar: decoded.picture
            })
        }

        // 4. Create session ID
        const sessionId = crypto.randomUUID()
        await redis.set(`session-${sessionId}`,JSON.stringify({
            userId:user._id,
            name:user.name,
            email:user.email,
            avatar:user.avatar   
        }),"EX",7*24*60*60)

        // 5. Store session in cookie
        res.cookie("session", sessionId, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        // 6. Send user back to frontend
        return res.status(200).json(user)

    } catch (error) {

        console.log("LOGIN ERROR:", error)

        return res.status(500).json({message: `login error ${error}`})
    }
}

export const logOut=async (req,res)=>{
    try {
        const sessionId=req.cookie?.sesson
        await redis.del(`session-${sessionId}`)

        res.clearCookie("session")
        return res.status(200).json({message:"logout successfully"})
        
    } catch (error) {
        return res.status(500).json({message: `logout error ${error}`})
        
    }
}