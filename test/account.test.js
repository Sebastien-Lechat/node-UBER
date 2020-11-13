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
        return response.json({ successs: false, message: 'Invalid json' });
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

let user1Info = {};

describe('Account routes', () => {
    test("OK - Register Account and verify email", async done => {

        /** Register */

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

        /** Verify Email */

        const res1 = await request(app) /** Lance l'email avec le code */
            .post("/UBER-EEDSI/account/request-verify-email")
            .send({ email: user1.email })
            .set('Accept', 'application/json')
            .expect("Content-Type", /json/)
            .expect(200);
        expect(res1.body.success).toBe(true);

        const res2 = await request(app) /** Récupère le code dans la base de donnée */
            .get("/getVerifiedCode")
            .send({ email: user1.email })
            .set('Accept', 'application/json')
            .expect("Content-Type", /json/)
            .expect(200);
        expect(res2.body.success).toBe(true);
        expect(res2.body.code).not.toBe(undefined);
        const code = res2.body.code;

        const res3 = await request(app) /** Vérification de l'email avec le code */
            .post("/UBER-EEDSI/account/verify-email")
            .send({ email: user1.email, code: code })
            .set('Accept', 'application/json')
            .expect("Content-Type", /json/)
            .expect(200);
        expect(res3.body.success).toBe(true);

        /** Login */

        const res4 = await request(app)
            .post("/UBER-EEDSI/account/login")
            .send(user1Credentials)
            .set('Accept', 'application/json')
            .expect("Content-Type", /json/)
            .expect(200);
        expect(res4.body.success).toBe(true);
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


    test("Refresh Token", async done => {
        /** Refresh token */
        const res10 = await request(app)
            .post("/UBER-EEDSI/account/refresh-token")
            .send({id : user1Info.id, refresh_token : user1Info.refresh_token})
            .set('Accept', 'application/json')
            .expect("Content-Type", /json/)
            .expect(200);
            expect(res10.body.success).toBe(true);
            expect(res10.body.id).not.toBe(undefined);
            expect(res10.body.name).not.toBe(undefined);
            expect(res10.body.email).not.toBe(undefined);
            expect(res10.body.connexionDate).not.toBe(undefined);
            expect(res10.body.createdAt).not.toBe(undefined);
            expect(res10.body.token).not.toBe(undefined);
            expect(res10.body.refresh_token).not.toBe(undefined);
        done();
    });

    test("Disconnect", async done => {
        /** Disconnect */
        const res11 = await request(app)
            .post("/UBER-EEDSI/account/disconnect")
            .set('Accept', 'application/json')
            .set({ 'Authorization': user1Info.token })
            .expect("Content-Type", /json/)
            .expect(200);
            expect(res11.body.success).toBe(true);
            expect(res11.body.message).toBe('Successfully logout');
        done();
    });

    test("Delete Account", async done => {
        /** Login for Delete*/
        const res4 = await request(app)
            .post("/UBER-EEDSI/account/login")
            .send(user1Credentials)
            .set('Accept', 'application/json')
            .expect("Content-Type", /json/)
            .expect(200);
        expect(res4.body.success).toBe(true);
        expect(res4.body.id).not.toBe(undefined);
        expect(res4.body.name).not.toBe(undefined);
        expect(res4.body.email).not.toBe(undefined);
        expect(res4.body.connexionDate).not.toBe(undefined);
        expect(res4.body.createdAt).not.toBe(undefined);
        expect(res4.body.token).not.toBe(undefined);
        expect(res4.body.refresh_token).not.toBe(undefined);

        /** Delete Account*/
        const res13 = await request(app)
            .delete("/UBER-EEDSI/account/")
            .send({id : user1Info.id, email: user1.email, password : user1.password})
            .set({ 'Authorization': res4.body.token })
            .set('Accept', 'application/json')
            .expect("Content-Type", /json/)
            .expect(200);
            expect(res13.body.success).toBe(true);
            expect(res13.body.message).toBe('Successfully deleted');
        done();
    });
});
