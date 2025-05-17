import JWT from 'jsonwebtoken'

/*
 Function tạo mới một token cần 3 tham số đầu vào
 userinfo: Những thông tin muốn đính kèm vào token
 secretsignature    chữ ký bí mật (dạng một chuỗi string ngẫu nhiên) trên doc thì để tên privatekey
 tokenlife thời gian sống của token
 */
const generateToken = async (userInfo, secretSignature, tokenLife) => {
    try {

        return JWT.sign(userInfo, secretSignature, { algorithm: 'HS256', expiresIn: tokenLife })
    } catch (error) {
        throw Error(error)
    }
}
/**
 function ktr một token có hợp lệ hay không 
 */
const verifyToken = async (token, secretSignature) => {
    try {

        return JWT.verify(token, secretSignature)
    } catch (error) {
        throw Error(error)
    }
}

export const JwtProvider = {
    generateToken,
    verifyToken
}