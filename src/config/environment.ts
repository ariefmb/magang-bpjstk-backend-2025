import "dotenv/config";
import logger from "../utils/logger";

const CONFIG = {
    db: process.env.MONGO_DB_URI,
    jwt_private_key: `-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEAkPuZ55pMqe5xMB7EGDG9axqPtjLkjnPAIgRiqpfiwPrBrkMF
K6+XTqoXf9MVJ7XhomcQLmf2WgsU6Lvl6zA5PkHP/zDiqB3zLfFZunKUITX5L92K
GHriZ5leLQ6YRE18lh/zYkjVPxEp9t0zkJmROzkpjTbROr53dOO8QRMVgAls7tKo
L4hSQIHiuUektLzcMrK9ooe5sqT1ZcPh6IZaJaxHoZPTHn265yWmPpfP1s9Np7GM
If8bTxr06GlTIvyP33toS1kqQXBejZ+4ju/iYV7eT4zjxMnEPGvGfg5HI3vTR6Gz
3Yj/WksQVq8HZKf6wPj5gUy/5Ulwpvo3IoBeBwIDAQABAoIBAGH1riqfxfb3hgDm
eMaELSEF5F5OCsH5kbMqVWRAldSgWWceH4tB7DEZmiEjBWM8cEUj7/n7AqgaXrlV
4+bCQZtAKoKZjDvdaKb9MQxaSJ4b8s+Vl64ssXcgWFKHTvivhmOFGRSqc3NWbI1B
LosgR9HFML8ab8qKUPpouZUaiOdl6XlVR1Ep9Pt+DLMgDf5qr3fEooq94wyOj9d4
hED179hTfqID7OH9MetWVQmIZpHcW6Dzu698tnY//XwowQ2+LQF0PGqzCgngYozz
Kf1tjgY2KbA5gNRZihfs0BzvW03IjZMYF0EcH0BJDw3NhJWZ5xGnEgyDhOSQcPPm
KlkT1KECgYEA+uvW03z+6Oh75Kscwqfmo+OrdfBsfhpSVFfDqf1BGH4pItghjrrf
Q4tqgGkx+ea3mnGIviaVI4bDcPZyetW0KK3M2twnQM3I2uqiRXD8B86qiENp+LCZ
UlMxOnwXYZGJy8QPb8vKDs/TDCqUxahVtIQaELHwQPQ4uweaGolaGvcCgYEAk+rW
OcwrVoXzFimFI60hP/RmmwBjUJQTZye5s0DxImwl+R+2CpyZQgL1VYGzMDjocPHo
1knaDiaHDOtyhyowcm9a3Rs1PNdWkvd2MRALpB1suWbjt5vxUpXi92PoaFRwfgsb
8dFzRbsvilsrl7DTTugNlVBMJ9ouXUV4ain8gXECgYBP/DvHwNGVNv6/XthVKKZ5
2co/VzuOWx+haTSjDGrivtyoEdNopyMiad+yPVZD/grK/aQEUVI7N+s3KChIBbVf
Pj/OCF2u56o+NosxrZl5d6SeuTafotPNDV3k8ceWP4l4XfA5x/GKFS+GclBoTYe8
elvAtKgMXI10+TBjgyMo8wKBgQCIthfhu46inZMa/K0NWErO7XiX8jfYlcOJJ/I+
dttn0UUXh/OcwzfzBwDxUrrm6vIK0cs9o2xif8F6c3Ka8qdsXPdCPI9r+CsQEp+u
oQHhYUDH6wy0+vCEP/xSYoi/RKvkEyh0y/0aifNakQEtZkUnPNqxElIQ01re4gJ1
PPEgQQKBgQCI1B8vG9I2CxsBll74bwC9QbAloWvlMjx3wMAiYwDxp5V1IY3P9f0c
rizZMciVEORA7mYtoTGTdJM4vaYTghe6XC7OP6nYxzFN2yRqUvq1Ik0BWj5WDMHX
0niESRxOL99rvNAqSBDFTy8zBQ81B4VW+Kil+/CDQe3P65ZxF9QCgA==
-----END RSA PRIVATE KEY-----`,
    jwt_public_key: `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkPuZ55pMqe5xMB7EGDG9
axqPtjLkjnPAIgRiqpfiwPrBrkMFK6+XTqoXf9MVJ7XhomcQLmf2WgsU6Lvl6zA5
PkHP/zDiqB3zLfFZunKUITX5L92KGHriZ5leLQ6YRE18lh/zYkjVPxEp9t0zkJmR
OzkpjTbROr53dOO8QRMVgAls7tKoL4hSQIHiuUektLzcMrK9ooe5sqT1ZcPh6IZa
JaxHoZPTHn265yWmPpfP1s9Np7GMIf8bTxr06GlTIvyP33toS1kqQXBejZ+4ju/i
YV7eT4zjxMnEPGvGfg5HI3vTR6Gz3Yj/WksQVq8HZKf6wPj5gUy/5Ulwpvo3IoBe
BwIDAQAB
-----END PUBLIC KEY-----`,
};

if (!CONFIG.db) {
    logger.error("Missing environment variable: MONGO_DB_URI");
    process.exit(1);
}
if (!CONFIG.jwt_private_key) {
    logger.error("Missing environment variable: JWT_PRIVATE_KEY");
    process.exit(1);
}
if (!CONFIG.jwt_public_key) {
    logger.error("Missing environment variable: JWT_PUBLIC_KEY");
    process.exit(1);
}

export default CONFIG;
