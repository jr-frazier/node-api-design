import * as user from "../user";

describe("userhandler", () => {
  it("should create a new user", async () => {
    const req = {
      body: {
        username: "testName2",
        password: "test",
      },
    };

    const res = {
      json({ token: token }: { token: string }) {
        expect(token).toBeTruthy();
      },
    };
    // @ts-ignore
    const newUser = await user.createNewUser(req, res);
  });
});
