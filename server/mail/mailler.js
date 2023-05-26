const Userdb = require("../model/users.model");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.SECRET);
    const user = await Userdb.findById(decoded.id);
    if (!user) return res.status(401).json({ message: "user not found" });
    if (user.status == true) {
        return res.status(401).json({ message: "user already verified" });
    }
    user.status = true;
    await user.save();
    res.status(200).json({ message: "user verified success" });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
    console.log(error);
  }
};



exports.sendingMail = async (user, token, forM, ipAdress) => {
    try {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          };
        
          const currentDate = new Date().toLocaleString('en-US', options);
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            },
        });
        const mailOptions = {
            from: process.env.EMAIL,
            to: user.email,
            subject: forM ==='login'?"verify your email":"Account Login Alert",
            html:((forM ==='login')?`
            <!DOCTYPE html>
            <html>
            <head>
            <style>
                body {
                font-family: Arial, sans-serif;
                }
                .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f5f5f5;
                }
                h1 {
                color: #333;
                }
                p {
                color: #555;
                }
                .alert {
                background-color: #ffeeee;
                border: 1px solid #ff0000;
                color: #ff0000;
                padding: 10px;
                margin-bottom: 20px;
                }
            </style>
            </head>
            <body>
            <div class="container">
                <h1>Account Login Alert</h1>
                <div class="alert">
                <p>Dear User,</p>
                <p>This is to inform you that a login attempt was made to your account.</p>
                <p>Login details:</p>
                <ul>
                    <li>name: ${user.name}</li>
                    <li>Login Time: ${currentDate}</li>
                    <li>IP Address: ${ipAdress}</li>
                </ul>
                <p>If you did not authorize this login or suspect any unauthorized activity, please contact our support team immediately.</p>
                </div>
                <p>Thank you for your attention.</p>
            </div>
            </body>
            </html>
            `:`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link href="https://fonts.googleapis.com/css2?family=poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet">
                <title>Email Verification</title>
                <style>
                    /* CSS classes */
                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                        font-family: 'poppins', sans-serif;
                    }

                    .container {
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 1rem;
                        font-family: 'Syne', sans-serif;
                    }

                    .logo {
                        text-align: center;
                        margin-bottom: 1rem;
                    }

                    .logo img {
                        max-width: auto;
                        height: 150px;
                    }

                    .btn {
                        display: inline-block;
                        padding: 0.75rem 1.5rem;
                        font-size: 1rem;
                        font-weight: 600;
                        text-align: center;
                        text-decoration: none;
                        background-color: #4299e1;
                        color: #fff;
                        border-radius: 0.25rem;
                    }

                    .text-center {
                        text-align: center;
                    }

                    .font-bold {
                        font-weight: bold;
                    }

                    /* Rest of the styles... */
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="logo">
                        <img src="https://ibb.co/LRf7WcC" alt="Logo" />
                    </div>
                    <h1 class="text-center font-extrabold">Verify your Email Address</h1>
                    <p>Hello <span class="font-bold">${user.name}</span>,</p>
                    <p>Thank you for signing up with <span class="font-bold">XX Library</span>. We're excited to have you as part of our community! To ensure the security of your account and to activate your membership, we kindly ask you to verify your email address.</p>
                    <p>Please click on the following button to complete the verification process:</p>
                    <p class="text-center">
                        <a href="http://localhost:3000/verify/${token}" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Verify Email
                            <svg aria-hidden="true" class="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        </a>
                    </p>
                    <p>If the button above doesn't work, you can also copy and paste the following link into your browser:</p>
                    <p class="font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline cursor-pointer">http://localhost:3000/verify/${token}</p>
                    <p>By verifying your email address, you will gain full access to all the features and benefits of our platform. It's an essential step to protect your account and keep your information secure.</p>
                    <p>If you did not register for an account with us, please disregard this email. However, if you believe this is an error or if you have any concerns, please contact our support team immediately.</p>
                    <p>We look forward to having you as an active member of our community. If you have any questions or need assistance, feel free to reach out to our support team, who will be more than happy to assist you.</p>
                    <p class="font-bold">Best regards,</p>
                    <p class="font-bold">Othmane<br>XX Library</p>
                </div>
            </body>
            </html>

            `)
        };
        const result = await transporter.sendMail(mailOptions);
        return result;
        }
        catch (error) {
            console.log(error);
            return error;
        }
    };



   