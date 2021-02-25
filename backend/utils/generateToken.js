import jwt from 'jsonwebtoken'

const generateToken = (id) => {
    return jwt.sign({ id }, 'MySecreat', {
        expiresIn: '30d',
    })
}

export default generateToken