import { OAuth2Client, TokenPayload } from "google-auth-library";
import { Request, Response } from "express";
import User from "../models/user";

const CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);

interface TokenRequestBody {
  token: string;
}

const login = async (req: Request, res: Response) => {
  let success = false;
  const { token } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });

    const payload: TokenPayload | undefined = ticket.getPayload();

    if (payload) {
      const {
        sub: userId,
        email,
        email_verified: emailVerified,
        name,
        given_name: givenName,
        family_name: familyName,
        picture,
        iat,
        exp,
        jti,
      } = payload;

      let user = await User.findOne({ userId });

      if (!user) {
        user = new User({
          userId,
          email,
          emailVerified,
          name,
          givenName,
          familyName,
          picture,
          iat,
          exp,
          jti,
        });
        await user.save();
      }

      return res.status(200).json({
        success: true,
        message: "Token verified and user saved successfully",
        data: {
          userId,
          email,
          emailVerified,
          name,
          givenName,
          familyName,
          picture,
          iat,
          exp,
          jti,
        },
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Invalid token payload",
      });
    }
  } catch (error) {
    return res.status(500).json({ success, error: "Internal Server Error!" });
  }
};
