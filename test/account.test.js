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
    password: "1234567",
    newPassword:"12345678",
    phone:"0123456789"
}

const user1Credentials = {
    email: user1.email,
    password: user1.password,
}

let user1Info = {};

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

        const res4 = await request(app)
            .post("/UBER-EEDSI/account/login")
            .send(user1Credentials)
            .set('Accept', 'application/json')
            .expect("Content-Type", /json/)
            .expect(200);
        expect(res4.body.id).not.toBe(undefined);
        expect(res4.body.name).not.toBe(undefined);
        expect(res4.body.email).not.toBe(undefined);
        expect(res4.body.connexionDate).not.toBe(undefined);
        expect(res4.body.createdAt).not.toBe(undefined);
        expect(res4.body.token).not.toBe(undefined);
        expect(res4.body.refresh_token).not.toBe(undefined);

        user1Info = res4.body;
        done();
    });

    test("OK - Edit User Profil", async done => {
        /** Edit User Profil */
        const res7 = await request(app)
            .put("/UBER-EEDSI/account/")
            .send({ email: user1.email,
                    name: user1.name ,
                    phone: user1.phone, 
                    password: user1.password })
            .set({ 'Authorization': user1Info.token })
            .set('Accept', 'application/json')
            .expect("Content-Type", /json/)
            .expect(200);
        expect(res7.body.success).toBe(true);
        expect(res7.body.id).not.toBe(undefined);
        expect(res7.body.name).not.toBe(undefined);
        expect(res7.body.email).not.toBe(undefined);
        expect(res7.body.connexionDate).not.toBe(undefined);
        expect(res7.body.createdAt).not.toBe(undefined);
        
        done();
    });

    test("OK - Change password", async done => {
        /** Change Password */
        const res8 = await request(app)
            .post("/UBER-EEDSI/account/change-password")
            .send({ email: user1.email, oldPassword: user1.password, newPassword: user1.newPassword })
            .set({ 'Authorization': user1Info.token })
            .set('Accept', 'application/json')
            .expect("Content-Type", /json/)
            .expect(200);
        expect(res8.body.success).toBe(true);
        
        done();
    });
});
