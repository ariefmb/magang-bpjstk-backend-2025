import bcrypt from 'bcryptjs';

// encode
export const hashing = (data: string) => {
    return bcrypt.hashSync(data, 10);
};

// decode
export const verifyHashedData = (password: string, userPassword: string) => {
    return bcrypt.compareSync(password, userPassword);
};
