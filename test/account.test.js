require('dotenv').config()
const route = require('../src/routes/index');
const request = require("supertest");
const express = require("express");
const { v4: uuidv4 } = require('uuid');
const authRouter = require("./auth-router-test");

require('../src/db/db');

const app = express();

app.use(express.json());
app.use((error, request, response, next) => {
    if (error !== null) {
        return response.json({ success: false, message: 'Invalid json' });
    }
    return next();
});

app.use(route)
app.use(authRouter)


/** Test unitaire pour ACCOUNT */

const uuidUser1 = uuidv4();

const user1 = {
    name: 'Name_' + uuidUser1,
    email: uuidUser1 + "@gmail.com",
    password: "1234567"
}

const user1Credentials = {
    email: user1.email,
    password: user1.password,
}

describe('Account routes', () => {
    test("OK - Register Account and verify email", async done => {
        const res = await request(app)
        .post("/UBER-EEDSI/account/register")
        .send(user1)
        .set('Accept', 'application/json')
        .expect("Content-Type", /json/)
        .expect(201);
        expect(res.body.success).toBe(true);
        expect(res.body.id).not.toBe(undefined);
        expect(res.body.name).toBe(user1.name);
        expect(res.body.email).not.toBe(undefined);

        const res1 = await request(app)
            .post("/UBER-EEDSI/account/request-verify-email")
            .send({ email: user1.email })
            .set('Accept', 'application/json')
            .expect("Content-Type", /json/)
            .expect(200);
        expect(res1.body.success).toBe(true);

        const res2 = await request(app)
            .get("/getVerifiedCode")
            .send({ email: user1.email })
            .set('Accept', 'application/json')
            .expect("Content-Type", /json/)
            .expect(200);
        expect(res2.body.success).toBe(true);
        expect(res2.body.code).not.toBe(undefined);
        const code = res2.body.code;

        const res3 = await request(app)
            .post("/UBER-EEDSI/account/verify-email")
            .send({ email: user1.email, code: code })
            .set('Accept', 'application/json')
            .expect("Content-Type", /json/)
            .expect(200);
        expect(res3.body.success).toBe(true);
        
        done();
    });
});
