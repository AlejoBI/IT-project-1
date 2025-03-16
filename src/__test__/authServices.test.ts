import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../server/config/firebaseConfig";
import {
  loginService,
  registerService,
  logoutService,
} from "../server/services/auth/authService";
import { getUserFromFirestore } from "../server/services/user/userService";

// Mockear funciones de Firebase
jest.mock("firebase/auth", () => ({
  signInWithEmailAndPassword: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
  updateProfile: jest.fn(),
  sendEmailVerification: jest.fn(),
}));

jest.mock("../server/config/firebaseConfig", () => ({
  firebaseConfig: {
    apiKey: "test-api-key",
    authDomain: "test-auth-domain",
    projectId: "test-project-id",
    storageBucket: "test-storage-bucket",
    messagingSenderId: "test-messaging-sender-id",
    appId: "test-app-id",
  },
}));

// Mockear getUserFromFirestore
jest.mock("../server/services/user/userService", () => ({
  getUserFromFirestore: jest.fn(),
}));

describe("Auth Services", () => {
  const mockUser = {
    uid: "mock-uid",
    email: "test@example.com",
    displayName: "Test User",
    emailVerified: true,
  };

  const mockUserData = {
    uid: "mock-uid",
    name: "Test User",
    email: "test@example.com",
    emailVerified: true,
    role: "standard_user",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("loginService", () => {
    it("should log in a user and return user data", async () => {
      // Simular signInWithEmailAndPassword
      (signInWithEmailAndPassword as jest.Mock).mockResolvedValue({
        user: mockUser,
      });

      // Simular getUserFromFirestore
      (getUserFromFirestore as jest.Mock).mockResolvedValue(mockUserData);

      const result = await loginService({
        email: "test@example.com",
        password: "password123",
      });

      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
        auth,
        "test@example.com",
        "password123"
      );
      expect(getUserFromFirestore).toHaveBeenCalledWith(mockUser.uid);
      expect(result).toEqual({
        uid: mockUser.uid,
        name: mockUser.displayName,
        email: mockUser.email,
        emailVerified: mockUser.emailVerified,
        role: mockUserData.role,
        createdAt: mockUserData.createdAt,
        updatedAt: mockUserData.updatedAt,
      });
    });

    it("should throw an error if the email is not verified", async () => {
      (signInWithEmailAndPassword as jest.Mock).mockResolvedValue({
        user: { ...mockUser, emailVerified: false },
      });

      await expect(
        loginService({ email: "test@example.com", password: "password123" })
      ).rejects.toThrow("Debes verificar tu correo electrónico.");

      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
        auth,
        "test@example.com",
        "password123"
      );
    });

    it("should throw an error if user data is not found in Firestore", async () => {
      (signInWithEmailAndPassword as jest.Mock).mockResolvedValue({
        user: mockUser,
      });
      (getUserFromFirestore as jest.Mock).mockResolvedValue(null);

      await expect(
        loginService({ email: "test@example.com", password: "password123" })
      ).rejects.toThrow("No se encontraron datos del usuario en Firestore.");

      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
        auth,
        "test@example.com",
        "password123"
      );
      expect(getUserFromFirestore).toHaveBeenCalledWith(mockUser.uid);
    });

    it("should handle Firebase errors during login", async () => {
      const firebaseError = {
        code: "auth/wrong-password",
        message: "Invalid credentials",
      };
      (signInWithEmailAndPassword as jest.Mock).mockRejectedValue(
        firebaseError
      );

      await expect(
        loginService({ email: "test@example.com", password: "password123" })
      ).rejects.toThrow("Invalid credentials");

      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
        auth,
        "test@example.com",
        "password123"
      );
    });
  });

  describe("registerService", () => {
    it("should register a new user and send email verification", async () => {
      (createUserWithEmailAndPassword as jest.Mock).mockResolvedValue({
        user: mockUser,
      });

      const result = await registerService({
        email: "test@example.com",
        password: "password123",
        username: "Test User",
      });

      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
        auth,
        "test@example.com",
        "password123"
      );
      expect(updateProfile).toHaveBeenCalledWith(mockUser, {
        displayName: "Test User",
      });
      expect(sendEmailVerification).toHaveBeenCalledWith(mockUser);
      expect(result).toEqual({
        uid: mockUser.uid,
        name: mockUser.displayName,
        email: mockUser.email,
        emailVerified: mockUser.emailVerified,
      });
    });

    it("should handle Firebase errors during registration", async () => {
      const firebaseError = {
        code: "auth/email-already-in-use",
        message: "Email already in use",
      };
      (createUserWithEmailAndPassword as jest.Mock).mockRejectedValue(
        firebaseError
      );

      await expect(
        registerService({
          email: "test@example.com",
          password: "password123",
          username: "Test User",
        })
      ).rejects.toThrow("auth/email-already-in-use");

      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
        auth,
        "test@example.com",
        "password123"
      );
    });
  });

  describe("logoutService", () => {
    it("should log out the user successfully", async () => {
      await logoutService();

      expect(signOut).toHaveBeenCalledWith(auth);
    });

    it("should handle Firebase errors during logout", async () => {
      const firebaseError = {
        code: "auth/network-request-failed",
        message: "Network error",
      };
      (signOut as jest.Mock).mockRejectedValue(firebaseError);

      await expect(logoutService()).rejects.toThrow("auth/network-request-failed");

      expect(signOut).toHaveBeenCalledWith(auth);
    });
  });
});
