import { register, login, logout } from "../controllers/authController";
import { auth } from "../utils/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(() => ({ signOut: jest.fn() })),
  createUserWithEmailAndPassword: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  sendEmailVerification: jest.fn(),
  updateProfile: jest.fn(),
  signOut: jest.fn(),
}));

jest.mock("../utils/firebaseConfig", () => {
  const authMock = { signOut: jest.fn() };
  return { auth: authMock };
});

describe("Auth Controller", () => {
  let req: any;
  let res: any;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  test("register should create a new user, update profile, send email verification, and save user data", async () => {
    req.body = {
      email: "test@example.com",
      password: "password",
      username: "Test User",
    };

    const mockUser = {
      uid: "123",
      email: "test@example.com",
      displayName: "Test User",
      emailVerified: false,
    };

    (createUserWithEmailAndPassword as jest.Mock).mockResolvedValue({
      user: mockUser,
    });

    await register(req, res);

    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
      auth,
      "test@example.com",
      "password"
    );
    expect(updateProfile).toHaveBeenCalledWith(mockUser, {
      displayName: "Test User",
    });
    expect(sendEmailVerification).toHaveBeenCalledWith(mockUser);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      uid: "123",
      name: "Test User",
      email: "test@example.com",
      emailVerified: false,
    });
  });

  test("login should authenticate a user and return user data", async () => {
    req.body = {
      email: "test@example.com",
      password: "password",
    };

    const mockUser = {
      uid: "123",
      email: "test@example.com",
      displayName: "Test User",
      emailVerified: true,
    };

    (signInWithEmailAndPassword as jest.Mock).mockResolvedValue({
      user: mockUser,
    });

    await login(req, res);

    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
      auth,
      "test@example.com",
      "password"
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      uid: "123",
      name: "Test User",
      email: "test@example.com",
      emailVerified: true,
    });
  });

  test("logout should sign out the user", async () => {
    await logout(req, res);

    expect(signOut).toHaveBeenCalledWith(auth);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "Logged out successfully" });
  });
});
