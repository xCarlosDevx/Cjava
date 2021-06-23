const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const db = require('./config/database')
const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use(express.static('public'))

/* Rutas*/
app.use('/api/usuarios', require('./routes/user/user.routes'))
app.use('/api/verificacion', require('./routes/auth/auth.routes'))

const Role = db.Roles;
const ROLES = db.ROLES
const Sequelize = db.Sequelize
const Op = Sequelize.Op

db.connectionDB.sync().then(() => {
    console.log("Re-Sync Database");
    initial();
})
app.listen(PORT, () => {
    console.log(`API Running in port: ${PORT}`)
})

function initial() {
    for (let i = 0; i < ROLES.length; i++) {
        console.log(ROLES[i])
        Role.findOne({
            where: {
                name: ROLES[i]
            }
        }).then((roles) => {
            if (!roles) {
                Role.create({
                    name: ROLES[i]
                })
            }


        })

    }
}